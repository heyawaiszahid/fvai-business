"use client";

import Button from "@/Components/UI/Button";

const Navigation = ({ className, currentStep, onNext, onBack, disabled = false, submitting }) => {
  return (
    <div className={`flex justify-between items-center ${className}`}>
      <button
        onClick={onBack}
        className="text-main text-base underline font-semibold cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        disabled={currentStep === 1}
      >
        Back
      </button>
      <Button onClick={onNext} className="w-44" disabled={disabled || submitting}>
        {submitting ? "Submitting..." : currentStep < 5 ? "Next" : "Submit"}
      </Button>
    </div>
  );
};

export default Navigation;
