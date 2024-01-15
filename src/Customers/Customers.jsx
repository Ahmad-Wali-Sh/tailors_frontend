import React, { useState } from "react";
import { useEffect } from "react";
import New from "../New/New";
import useApi from "../Services/AxiosInstance";
import CustomerButtons from "./CustomerButtons";
import CustomerNewOrder from "./CustomerNewOrder";
import CustomerOrders from "./CustomerOrders";
import CustomerSearch from "./CustomerSearch";

function Customers() {
  const [currentStep, setCurrentStep] = useState(1);

  const goToStep = (step) => {
    setCurrentStep(step);
  };
  const { data: customerDetails, get: get_customer_details, dataSeter: customerDetailsSet } = useApi();

  const resetToNew = () => {
    customerDetailsSet(new Date())
    setTimeout(() => {
      customerDetailsSet(null)
    },200)
  }

  const selectedCustomer = (data) => {
    customerDetailsSet(data)
  }


  return (
    <>
      <CustomerSearch resetToNew={resetToNew} selectedCustomer={selectedCustomer}/>
      <CustomerButtons currentStep={currentStep} onStepClick={goToStep} />
      {currentStep === 1 && <New CustomerInformation={customerDetails}/>}
      {currentStep === 2 && <CustomerNewOrder />}
      {currentStep === 3 && <CustomerOrders />}
    </>
  );
}

export default Customers;
