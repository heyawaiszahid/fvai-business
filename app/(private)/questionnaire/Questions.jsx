"use client";

import Typography from "@/Components/UI/Typography";
import { Fragment, useEffect, useState } from "react";
import Navigation from "./Navigation";
import Question from "./Question";
import questionnaire from "./questionnaire.json";
import Result from "./Result";
import StepIndicator from "./StepIndicator";

const Questions = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [answers, setAnswers] = useState({});
  const [stepValid, setStepValid] = useState(false);

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

  const handleNext = () => {
    if (!stepValid) return;
    if (currentStep < standardizedQuestions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      localStorage.setItem("answers", JSON.stringify(answers));
      setIsSubmitted(true);
    }
  };

  const handleBack = () => currentStep > 1 && setCurrentStep(currentStep - 1);

  if (isSubmitted) {
    return <Result accepted={true} />;
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
        currentStep={currentStep}
        onNext={handleNext}
        onBack={handleBack}
        disabled={!stepValid}
        className="mb-6"
      />
    </div>
  );
};

export default Questions;
