import React from "react";

const CustomerButtons = ({ currentStep, onStepClick }) => {
  const steps = ["اطلاعات مشتری", "سفارش جدید", "سفارشات"]; // Add your step names here

  return (
    <div className="step-guide">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`step-item ${currentStep === index + 1 ? "active" : ""}`}
          onClick={() => onStepClick(index + 1)}
        >
          {step}
        </div>
      ))}
    </div>
  );
};

export default CustomerButtons;
