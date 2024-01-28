import React from "react";

const SettingsButtons = ({ currentStep, onStepClick }) => {
  const steps = ["اطلاعات خیاطی", "اندازه گیری", "سفارشات", "میانبر ها"];

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

export default SettingsButtons;
