import React from 'react';

const StepGuide = ({ currentStep, onStepClick }) => {
  const steps = ['اطلاعات شخصی', 'اندازه - افغانی', 'اندازه - کت شلوار']; // Add your step names here

  return (
    <div className="step-guide">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`step-item ${currentStep === index + 1 ? 'active' : ''}`}
          onClick={() => onStepClick(index + 1)}
        >
          {step}
        </div>
      ))}
    </div>
  );
};

export default StepGuide;