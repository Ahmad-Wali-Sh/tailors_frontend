import React, { useState } from "react";
import PersonalForm from "./PersonalForm";
import AfghaniMesures from "./AfghaniMesures";
import StepGuide from "./StepGuide";

function New() {
  const [currentStep, setCurrentStep] = useState(1)

  const goToNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const goToPrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const goToStep = (step) => {
    setCurrentStep(step);
  };


  return (
    <div className="multistep-form">
      <StepGuide currentStep={currentStep} onStepClick={goToStep} />
      {currentStep === 1 && <PersonalForm onNextStep={goToNextStep} />}
      {currentStep === 2 && <AfghaniMesures onNextStep={goToNextStep} onPrevStep={goToPrevStep} />}
    </div>
  );
}

export default New;
