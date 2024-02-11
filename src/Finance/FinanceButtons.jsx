import React from "react";

const FinanceButtons = ({ currentStep, onStepClick }) => {
  const steps = ["گذارش", "مصارف - خریداری", "حساب طلبات", "حساب قروض"];

  return (
    <div className="step-guide">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`step-item ${currentStep === step ? "active" : ""}`}
          onClick={() => onStepClick(step)}
        >
          {step}
        </div>
      ))}
    </div>
  );
};

export default FinanceButtons;
