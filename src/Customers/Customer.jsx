import React, { useEffect, useState } from "react";
import CustomerDetails from "./CustomerDetails/CustomerDetails";
import useApi from "../Services/AxiosInstance";
import CustomerButtons from "./CustomerButtons";
import CustomerNewOrder from "./CustomerNewOrder";
import CustomerOrders from "./CustomerOrders";
import CustomerSearch from "./CustomerSearch";

function Customer() {
  const [currentStep, setCurrentStep] = useState(1);

  const goToStep = (step) => {
    setCurrentStep(step);
  };
  const { data: customerDetails, get: get_customer_details, dataSeter: customerDetailsSet, deleter } = useApi();

  const resetToNew = () => {
    customerDetailsSet(new Date())
    setTimeout(() => {
      customerDetailsSet(null)
    },200)
    setCurrentStep(1)
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check if the key combination matches the desired shortcut
      
      if (event.ctrlKey && (event.key === '1' || event.key === '۱')) {
        event.preventDefault()
        setCurrentStep(1)
      }
      if (event.ctrlKey && (event.key === '2' || event.key === '۲')) {
        event.preventDefault()
        setCurrentStep(2)
      }
      if (event.ctrlKey && (event.key === '3' || event.key === '۳')) {
        event.preventDefault()
        setCurrentStep(3)
      }
      if (event.ctrlKey && (event.key === 'e' || event.key === 'E' || event.key === 'ث')) {
        event.preventDefault()
        resetToNew()
      }
    };

    // Add event listener for keydown event
    window.addEventListener('keydown', handleKeyDown);

    // Clean up by removing the event listener when component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []); 


  const deleteCustomer = () => {
    customerDetails.id && deleter('/customers/' + customerDetails.id + '/')
    setCurrentStep(1)
  }
  const selectedCustomer = (data) => {
    customerDetailsSet(data)
    console.log(data);
  }

  return (
    <>
      <CustomerSearch resetToNew={resetToNew} selectedCustomer={selectedCustomer} deleteCustomer={deleteCustomer}/>
      <CustomerButtons currentStep={currentStep} onStepClick={goToStep} />
      {currentStep === 1 && <CustomerDetails CustomerInformation={customerDetails} parent_get_customer_details={get_customer_details}/>}
      {currentStep === 2 && <CustomerNewOrder CustomerInformation={customerDetails}/>}
      {currentStep === 3 && <CustomerOrders CustomerInformation={customerDetails}/>}
    </>
  );
}

export default Customer;
