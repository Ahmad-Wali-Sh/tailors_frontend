import React from "react";

const StepGuide = ({ currentStep, onStepClick, types, customerInfo }) => {

  return (
    <div className="step-guide">
      <div
        className={`step-item ${
          currentStep === "اطلاعات شخصی" ? "active" : ""
        }`}
        onClick={() => onStepClick("اطلاعات شخصی")}
      >
        اطلاعات شخصی
      </div>
      {customerInfo && types?.map((type, index) => (
        <div
          key={index}
          className={`step-item ${currentStep === type.name ? "active" : ""}`}
          onClick={() => onStepClick(type.name)}
        >
        اندازه: {type.name}
        </div>
      ))}
    </div>
  );
};

export default StepGuide;
