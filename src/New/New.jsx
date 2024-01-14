import React, { useState } from "react";
import PersonalForm from "./PersonalForm";
import StepGuide from "./StepGuide";
import { useEffect } from "react";
import useApi from "../Services/AxiosInstance";
import Mesurement from "./Mesurement";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function New() {
  const [currentStep, setCurrentStep] = useState('اطلاعات شخصی');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data:measurmentTypes, get: getMeasurements} = useApi()
  const { data:customerInfo, get, post, patch} = useApi()

  useEffect(() => {
    getMeasurements('/measurement-types')
  }, []);

  const personalinfosubmit = (data) => {
    const Form = new FormData()
    Form.append('first_name', data.personal.first_name)
    Form.append('last_name', data.personal.last_name)
    Form.append('contact', data.personal.contact)
    Form.append('description', data.personal.description)
    customerInfo ? patch('customers/' + customerInfo.id + '/', Form).then(() => {
      toast.info(<div>مشخصات موفقانه تغییر کرد</div>)
    }) : post('customers/', Form).then(() => {
      toast.success(<div>موفقانه ثبت شد</div>)
    })
  }

  
  const { data:customerMesurement, postCustomeMesure, patchCustomMesure} = useApi()

  const handleSubmitMeasurement = (data, type) => {
    const typeid = type.id
    const Form = new FormData()
    Form.append('data', JSON.stringify(data.typeid.mesurement))
    Form.append('customer', customerInfo.id)
    Form.append('measurement_type', type.id)
    customerMesurement ? patchCustomMesure('/customer-measurements/' + customerMesurement.id + '/', Form).then(() => {
        toast.info('موفقانه بود.')
    }) : postCustomeMesure('/customer-measurements/', Form).then(() => {
        toast.success('موفقانه بود.')
    })
}


  
  const goToStep = (step) => {
    setCurrentStep(step);
  };

  return (
    <div className="multistep-form">
      <StepGuide currentStep={currentStep} types={measurmentTypes?.results} onStepClick={goToStep} />
      {currentStep === 'اطلاعات شخصی' && <PersonalForm  register={register} PersonalInfoSubmit={handleSubmit(personalinfosubmit)} customerInfo={customerInfo} />}
      {measurmentTypes?.results.map((type) => (
          currentStep == type.name &&  <Mesurement type={type} customerInfo={customerInfo} register={register} mesurementSubmit={handleSubmit(handleSubmitMeasurement)}/>
      ))}
    </div>
  );
}

export default New;
