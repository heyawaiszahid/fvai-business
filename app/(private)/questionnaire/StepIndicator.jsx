"use client";

import Step from "@/Components/Icons/Step";
import Typography from "@/Components/Typography";

const StepIndicator = ({ className, currentStep }) => {
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
        <Step variant={getStepVariant(1)}>A</Step>
        <Step variant={getStepVariant(2)}>B</Step>
        <Step variant={getStepVariant(3)}>C</Step>
        <Step variant={getStepVariant(4)}>D</Step>
        <Step variant={getStepVariant(5)} divider={false}>
          E
        </Step>
      </div>
    </div>
  );
};

export default StepIndicator;
