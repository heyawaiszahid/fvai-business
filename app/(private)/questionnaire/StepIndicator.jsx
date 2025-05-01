"use client";

import Step from "@/Components/Icons/Step";
import Typography from "@/Components/Typography";

const StepIndicator = ({ className, currentStep, totalSteps }) => {
  const getStepVariant = (stepNumber) => {
    if (stepNumber === currentStep) return "active";
    if (stepNumber < currentStep) return "complete";
    return "inactive";
  };

  return (
    <div className={className}>
      <Typography size="body2" className="lg:hidden text-main text-center mb-4">
        Section {String.fromCharCode(64 + currentStep)}
      </Typography>
      <div className="flex items-center">
        {Array.from({ length: totalSteps }, (_, i) => {
          const stepNumber = i + 1;
          return (
            <Step key={stepNumber} variant={getStepVariant(stepNumber)} divider={stepNumber !== totalSteps}>
              {String.fromCharCode(64 + stepNumber)}
            </Step>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
