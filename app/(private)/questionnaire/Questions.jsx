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
    message: "",
  });

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

  const shouldShowQuestion = (question) => {
    if (!question.showIf) return true;
    const answer = answers[question.showIf.question.toString()];
    return answer === question.showIf.answer;
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
        const response = await fetch("/api/valuation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(answers),
        });

        if (!response.ok) {
          throw new Error("There was an error submitting your data. Please try again.");
        }

        const result = await response.json();

        setResult(result);
        setIsSubmitted(true);

        localStorage.setItem("answers", JSON.stringify(answers));
        localStorage.setItem("result", JSON.stringify(result));
      } catch (error) {
        setModalState({
          isOpen: true,
          message: error.message,
        });

        setSubmitting(false);
      }
    }
  };

  const handleBack = () => currentStep > 1 && setCurrentStep(currentStep - 1);

  if (isSubmitted) {
    return <Result result={result} />;
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
          Error Submitting Data
        </Typography>
        <Typography size="body2" className="mb-6 max-w-[576px] mx-auto">
          {modalState.message}
        </Typography>
        <button onClick={handleNext} className="text-main underline font-medium cursor-pointer">
          Try Again
        </button>
      </Modal>
    </div>
  );
};

export default Questions;
