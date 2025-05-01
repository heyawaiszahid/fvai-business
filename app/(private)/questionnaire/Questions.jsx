"use client";

import Typography from "@/Components/Typography";
import { useEffect, useState } from "react";
import Navigation from "./Navigation";
import Question from "./Question";
import questionnaire from "./questionnaire.json";
import StepIndicator from "./StepIndicator";

const Questions = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState(() =>
    questionnaire.steps.map((step) => Array(step.questions.length).fill(""))
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  const handleNext = () => currentStep < questionnaire.steps.length && setCurrentStep(currentStep + 1);
  const handleBack = () => currentStep > 1 && setCurrentStep(currentStep - 1);

  const handleAnswerChange = (stepIndex, questionIndex, value) => {
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[stepIndex] = [...newAnswers[stepIndex]];
      newAnswers[stepIndex][questionIndex] = value;
      return newAnswers;
    });
  };

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
                index={q.index}
                question={q.text}
                options={q.options}
                placeholder={q.placeholder}
                value={currentAnswers[questionIndex] || ""}
                onChange={(val) => handleAnswerChange(currentStep - 1, questionIndex, val)}
                isParent={q.isParent}
                extra={q.extra}
              />
            );
          })}
        </div>
      </div>

      <Navigation currentStep={currentStep} onNext={handleNext} onBack={handleBack} className="mb-6" />
    </div>
  );
};

export default Questions;
