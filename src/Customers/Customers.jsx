import React, { useState } from "react";
import CustomerButtons from "./CustomerButtons";
import CustomerInformation from "./CustomerInformation";
import CustomerNewOrder from "./CustomerNewOrder";
import CustomerOrders from "./CustomerOrders";
import CustomerSearch from "./CustomerSearch";

function Customers() {
  const [currentStep, setCurrentStep] = useState(1);

  const goToStep = (step) => {
    setCurrentStep(step);
  };

  return (
    <>
      <CustomerSearch />
      <CustomerButtons currentStep={currentStep} onStepClick={goToStep} />
      {currentStep === 1 && <CustomerInformation />}
      {currentStep === 2 && <CustomerNewOrder />}
      {currentStep === 3 && <CustomerOrders />}
    </>
  );
}

export default Customers;
