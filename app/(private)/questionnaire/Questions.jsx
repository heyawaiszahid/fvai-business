"use client";

import Modal from "@/Components/UI/Modal";
import Typography from "@/Components/UI/Typography";
import { Fragment, useEffect, useState } from "react";
import Navigation from "./Navigation";
import Question from "./Question";
import questionnaire from "./questionnaire.json";
import Result from "./Result";
import StepIndicator from "./StepIndicator";

const Questions = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [answers, setAnswers] = useState({});
  const [stepValid, setStepValid] = useState(false);
  const [result, setResult] = useState({});
  const [modalState, setModalState] = useState({
    isOpen: false,
    status: null,
    title: "",
    message: "",
    buttonText: "",
  });
  const [questionnaireId, setQuestionnaireId] = useState(null);

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  const standardizedQuestions = questionnaire.steps.map((step) => ({
    ...step,
    questions: step.questions.map((q) => ({
      ...q,
      index: q.index.toString(),
      subQuestions: q.subQuestions?.map((sq) => ({
        ...sq,
        index: sq.index.toString(),
      })),
    })),
  }));

  const handleAnswerChange = (questionPath, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionPath]: value,
    }));
  };

  const shouldShowQuestion = (q) => {
    if (!q.showIf) {
      return true;
    }

    const referencedQuestion = q.showIf.question.toString();

    const answer = answers[referencedQuestion] || answers[parseInt(referencedQuestion)];
    if (answer === undefined) {
      return false;
    }

    if (q.showIf.answerNot !== undefined) {
      return answer !== q.showIf.answerNot;
    } else {
      return answer === q.showIf.answer;
    }
  };

  const validateStep = (questions) => {
    let allValid = true;

    const checkQuestions = (questions) => {
      questions.forEach((q) => {
        const currentPath = q.index;
        const isVisible = shouldShowQuestion(q);

        if (isVisible) {
          const isParentWithoutInput = q.subQuestions && !q.options && !q.placeholder;

          if (!isParentWithoutInput) {
            if (!answers[currentPath] && answers[currentPath] !== 0) {
              allValid = false;
            }
          }

          if (q.subQuestions) {
            checkQuestions(q.subQuestions);
          }
        }
      });
    };

    checkQuestions(questions);
    return allValid;
  };

  useEffect(() => {
    setStepValid(validateStep(standardizedQuestions[currentStep - 1].questions));
  }, [answers, currentStep]);

  const renderQuestions = (questions) => {
    return questions.map((q) => {
      const currentPath = q.index;
      const showQuestion = shouldShowQuestion(q);

      if (!showQuestion) return null;

      return (
        <Fragment key={`q-${currentPath}`}>
          <Question
            index={q.index}
            text={q.text}
            options={q.options}
            placeholder={q.placeholder}
            inline={q.inline}
            value={answers[currentPath] || ""}
            onChange={(val) => handleAnswerChange(currentPath, val)}
          />
          {q.subQuestions && <div className="flex flex-col gap-6">{renderQuestions(q.subQuestions)}</div>}
        </Fragment>
      );
    });
  };

  const handleNext = async () => {
    if (!stepValid) return;

    if (currentStep < standardizedQuestions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      closeModal();
      setSubmitting(true);

      try {
        const valuationResponse = await fetch("/api/valuation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(answers),
        });

        if (!valuationResponse.ok) {
          const errorData = await valuationResponse.json();
          throw new Error(errorData.error || "Failed to submit valuation");
        }

        const result = await valuationResponse.json();

        if (result?.status === "accepted") {
          const conversationsResponse = await fetch("/api/conversations", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              type: "project",
              title: result?.company_name || "Untitled",
            }),
          });

          if (!conversationsResponse.ok) {
            const errorData = await conversationsResponse.json();
            throw new Error(errorData.error || "Failed to create project");
          }

          const conversation = await conversationsResponse.json();

          const questionnaireResponse = await fetch(`/api/questionnaire/${conversation.questionnaire.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              answers: answers,
              results: result,
            }),
          });

          if (!questionnaireResponse.ok) {
            const errorData = await questionnaireResponse.json();
            throw new Error(errorData.error || "Questionnaire update error");
          }

          const questionnaire = await questionnaireResponse.json();
          setQuestionnaireId(questionnaire.id);
        }

        setResult(result);
        setIsSubmitted(true);
      } catch (error) {
        setModalState({
          isOpen: true,
          status: "error",
          title: "Something Went Wrong",
          message: error.message,
          buttonText: "Try Again",
        });
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleBack = () => currentStep > 1 && setCurrentStep(currentStep - 1);

  if (isSubmitted) {
    window.scrollTo(0, 0);
    return <Result result={result} questionnaireId={questionnaireId} />;
  }

  const currentStepData = standardizedQuestions[currentStep - 1];

  return (
    <div className="container lg:max-w-[1080px] lg:pt-10">
      <StepIndicator currentStep={currentStep} totalSteps={standardizedQuestions.length} className="mb-10 lg:mb-20" />

      <div className="mb-6">
        <Typography size="h4" lg="h3" className="mb-6">
          {currentStepData.title}
        </Typography>

        <div className="flex flex-col gap-6">{renderQuestions(currentStepData.questions)}</div>
      </div>

      <Navigation
        className="mb-6"
        currentStep={currentStep}
        onNext={handleNext}
        onBack={handleBack}
        disabled={!stepValid}
        submitting={submitting}
      />

      <Modal isOpen={modalState.isOpen} onClose={closeModal} className="text-center">
        <Typography size="h4" className="mb-6">
          {modalState.title}
        </Typography>
        <Typography size="body2" className="mb-6 max-w-[576px] mx-auto">
          {modalState.message}
        </Typography>
        <button onClick={handleNext} className="text-main underline font-medium cursor-pointer">
          {modalState.buttonText}
        </button>
      </Modal>
    </div>
  );
};

export default Questions;
