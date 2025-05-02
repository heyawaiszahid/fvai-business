"use client";

import Typography from "@/Components/Typography";
import { useEffect, useState } from "react";
import Navigation from "./Navigation";
import Question from "./Question";
import questionnaire from "./questionnaire.json";
import Result from "./Result";
import StepIndicator from "./StepIndicator";

const Questions = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [answers, setAnswers] = useState(() =>
    questionnaire.steps.map((step) => Array(step.questions.length).fill(""))
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  const isStepComplete = (stepIndex) => {
    const step = questionnaire.steps[stepIndex];
    const stepAnswers = answers[stepIndex] || [];

    return step.questions.every((question, qIndex) => {
      if (question.isParent || question.optional) return true;

      return stepAnswers[qIndex] !== "";
    });
  };

  const handleNext = () => {
    if (currentStep < questionnaire.steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => currentStep > 1 && setCurrentStep(currentStep - 1);

  const handleAnswerChange = (stepIndex, questionIndex, value) => {
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[stepIndex] = [...newAnswers[stepIndex]];
      newAnswers[stepIndex][questionIndex] = value;
      return newAnswers;
    });
  };

  const handleSubmit = () => {
    const cleanedAnswers = answers.map((stepAnswers, stepIndex) => {
      return stepAnswers.filter((_, qIndex) => {
        const question = questionnaire.steps[stepIndex].questions[qIndex];
        return !question.isParent;
      });
    });

    console.log("Form submitted with answers:", cleanedAnswers);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return <Result accepted={true} />;
  }

  const currentStepData = questionnaire.steps[currentStep - 1];
  const currentAnswers = answers[currentStep - 1] || [];

  return (
    <div className="container lg:max-w-[1080px] lg:pt-10">
      <StepIndicator currentStep={currentStep} totalSteps={questionnaire.steps.length} className="mb-10 lg:mb-20" />

      <div className="mb-6">
        <Typography size="h4" lg="h3" className="mb-6">
          {currentStepData.title}
        </Typography>

        <div className="flex flex-col gap-6">
          {currentStepData.questions.map((q, questionIndex) => {
            return (
              <Question
                key={`step-${currentStep}-q-${q.index}`}
                value={currentAnswers[questionIndex] || ""}
                onChange={(val) => handleAnswerChange(currentStep - 1, questionIndex, val)}
                {...q}
              />
            );
          })}
        </div>
      </div>

      <Navigation
        currentStep={currentStep}
        onNext={handleNext}
        onBack={handleBack}
        disabled={!isStepComplete(currentStep - 1)}
        className="mb-6"
      />
    </div>
  );
};

export default Questions;
