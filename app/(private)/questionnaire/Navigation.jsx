"use client";

import Button from "@/Components/UI/Button";

const Navigation = ({ className, currentStep, onNext, onBack }) => {
  return (
    <div className={`flex justify-between items-center ${className}`}>
      <button
        onClick={onBack}
        className="text-main text-base underline font-semibold cursor-pointer disabled:opacity-60 disabled:cursor-default"
        disabled={currentStep === 1}
      >
        Back
      </button>
      <Button onClick={onNext} className="w-44">
        {currentStep < 5 ? "Next" : "Submit"}
      </Button>
    </div>
  );
};

export default Navigation;
