import React, { useRef } from "react";
import PersonalForm from "./PersonalForm";
import { useEffect } from "react";
import useApi from "../../Services/AxiosInstance";
import Mesurement from "./Mesurement";
import { useForm } from "react-hook-form";
import { EnglishNumeric } from "../../Services/EnglishNumeric";

function CustomerDetails({CustomerInformation, parent_get_customer_details}) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const mydiv = useRef(null)

  const { data: measurmentTypes, get: getMesureTypes } = useApi();
  useEffect(() => {
    getMesureTypes("/measurement-types");
  }, []);

  const {
    data: customerInfo,
    post: post_customer_info,
    patch: patch_customer_info,
    dataSeter
  } = useApi();
  const { data: customerDetails, get: get_customer_details, dataSeter: customerDetailsSet } = useApi();

  useEffect(() => {
    customerDetailsSet && customerDetailsSet(CustomerInformation)
  }, [CustomerInformation])


  const submitPersonalInfo = (data) => {
    const Form = new FormData();
    Form.append("first_name", data.personal.first_name);
    Form.append("last_name", data.personal.last_name);
    Form.append("contact", EnglishNumeric(data.personal.contact));
    Form.append("description", data.personal.description);
    customerInfo
      ? patch_customer_info("customers/" + customerInfo.id + "/", Form, (res) => {
        parent_get_customer_details('customers/' + res.id)

      })
      : post_customer_info("customers/", Form, (res) => {
        parent_get_customer_details('customers/' + res.id)
      });
  };

  const scrollToDiv = () => {
    // Scroll to the top of the referenced div
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const {
    data: customerMesurement,
    post: post_customer_measuerment,
    patch: patch_customer_measurement,
    dataSeter: customerMeasurementSet
  } = useApi();

  const submitCustomerMeasurement = (data, type) => {
    get_customer_details("/customers/" + customerInfo.id);
    const mesurementobject = customerDetails?.measurements?.filter((obj) => {
      return obj.measurement_type == type.id;
    });
    const typename = type.name;
    const Form = new FormData();
    Form.append(
      "data",
      EnglishNumeric(JSON.stringify(data.measurment[typename]))
    );
    Form.append("customer", customerInfo.id);
    Form.append("measurement_type", type.id);
    mesurementobject?.[0]?.id
      ? patch_customer_measurement(
          "/customer-measurements/" + mesurementobject?.[0].id + "/",
          Form, () => {
            get_customer_details("/customers/" + customerInfo.id);
            parent_get_customer_details('/customers/' + customerInfo.id)
            scrollToDiv()
          }
        )
      : post_customer_measuerment("/customer-measurements/", Form, () => {
        get_customer_details("/customers/" + customerInfo.id);
        parent_get_customer_details('/customers/' + customerInfo.id)
        scrollToDiv()
      });
  };
  
  useEffect(() => {
    dataSeter(customerDetails)
  }, [customerDetails])

 
  return (
    <div className="multistep-form" ref={mydiv}>
      <PersonalForm
        register={register}
        submitPersonalInfo={handleSubmit(submitPersonalInfo)}
        customerInfo={customerInfo}
        reset={reset}
      />
      {measurmentTypes?.results.map((type) => (
        type.required && <Mesurement
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
          customerDetails={ customerDetails}
        />
      ))}
    </div>
  );
}

export default CustomerDetails;
