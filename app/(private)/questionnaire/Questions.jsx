"use client";

import { useState } from "react";
import Step1 from "./(steps)/Step1";
import Step2 from "./(steps)/Step2";
import Step3 from "./(steps)/Step3";
import Step4 from "./(steps)/Step4";
import Step5 from "./(steps)/Step5";
import Navigation from "./Navigation";
import StepIndicator from "./StepIndicator";

const Questions = () => {
  const steps = {
    1: <Step1 />,
    2: <Step2 />,
    3: <Step3 />,
    4: <Step4 />,
    5: <Step5 />,
  };

  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => currentStep < 5 && setCurrentStep(currentStep + 1);
  const handleBack = () => currentStep > 1 && setCurrentStep(currentStep - 1);

  return (
    <div className="container lg:max-w-[1080px] lg:pt-10">
      <StepIndicator currentStep={currentStep} className="mb-10 lg:mb-20" />
      <div className="mb-6">{steps[currentStep]}</div>
      <Navigation currentStep={currentStep} onNext={handleNext} onBack={handleBack} className="mb-6" />
    </div>
  );
};

export default Questions;
