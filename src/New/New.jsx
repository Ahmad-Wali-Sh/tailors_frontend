import React, { useState } from "react";
import PersonalForm from "./PersonalForm";
import StepGuide from "./StepGuide";
import { useEffect } from "react";
import useApi from "../Services/AxiosInstance";
import Mesurement from "./Mesurement";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { EnglishNumeric } from "../Services/EnglishNumeric";

function New() {
  const [currentStep, setCurrentStep] = useState("اطلاعات شخصی");
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const { data: measurmentTypes, get: getMesureTypes } = useApi();
  useEffect(() => {
    getMesureTypes("/measurement-types");
  }, []);

  const {
    data: customerInfo,
    post: post_customer_info,
    patch: patch_customer_info,
  } = useApi();

  const { data: customerDetails, get: get_customer_details} = useApi()

  const submitPersonalInfo = (data) => {
    const Form = new FormData();
    Form.append("first_name", data.personal.first_name);
    Form.append("last_name", data.personal.last_name);
    Form.append("contact", EnglishNumeric(data.personal.contact));
    Form.append("description", data.personal.description);
    customerInfo
      ? patch_customer_info("customers/" + customerInfo.id + "/", Form)
      : post_customer_info("customers/", Form, () => {
          setCurrentStep(measurmentTypes?.results[0].name);
        });
  };

  const {
    data: customerMesurement,
    post: post_customer_measuerment,
    patch: patch_customer_measurement,
  } = useApi();

  const submitCustomerMeasurement = (data, type) => {
    const mesurementobject = customerDetails?.measurements?.filter((obj) => {return obj.measurement_type == type.id})
    const typename = type.name;
    const Form = new FormData();
    Form.append("data", EnglishNumeric(JSON.stringify(data.measurment[typename])));
    Form.append("customer", customerInfo.id);
    Form.append("measurement_type", type.id);
    mesurementobject?.[0]?.id
      ? patch_customer_measurement(
          "/customer-measurements/" + mesurementobject?.[0].id + "/",
          Form
        )
      : post_customer_measuerment("/customer-measurements/", Form);

      get_customer_details('/customers/' +  customerInfo.id)
  };

  const goToStep = (step) => {
    setCurrentStep(step);
  };

  return (
    <div className="multistep-form">
      <StepGuide
        currentStep={currentStep}
        types={measurmentTypes?.results}
        onStepClick={goToStep}
        customerInfo={customerInfo}
      />
      {currentStep === "اطلاعات شخصی" && (
        <PersonalForm
          register={register}
          submitPersonalInfo={handleSubmit(submitPersonalInfo)}
          customerInfo={customerInfo}
          reset={reset}
        />
      )}
      {measurmentTypes?.results.map(
        (type) =>
          currentStep === type.name && (
            <Mesurement
              key={type.name}
              type={type}
              customerMesurement={customerMesurement}
              customerInfo={customerInfo}
              register={register}
              reset={reset}
              setValue={setValue}
              submitCustomerMeasurement={submitCustomerMeasurement}
              handleSubmit={handleSubmit}
              watch={watch}
              customerDetails={customerDetails}
            />
          )
      )}
    </div>
  );
}

export default New;
