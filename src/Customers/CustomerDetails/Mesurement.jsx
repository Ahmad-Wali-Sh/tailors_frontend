import React, { useEffect, useRef } from "react";
import { useState } from "react";

function Mesurement({
  type,
  register,
  submitCustomerMeasurement,
  customerDetails,
  setValue,
  customerMesurement,
  handleSubmit,
}) {
  const fields = Object.entries(type.fields).map(([key, value]) => ({
    ...value,
  }));

  const mydivRef = useRef(null);

  const scrollToDiv = () => {
    // Scroll to the top of the referenced div
    mydivRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const [existingMeasures, setExistingMeasures] = useState();

  useEffect(() => {
    customerDetails?.measurements?.filter((obj) => {
      return obj.measurement_type == type.id;
    });
    setExistingMeasures(
      customerDetails?.measurements?.filter((obj) => {
        return obj.measurement_type == type.id;
      })
    );
  }, [customerDetails?.measurements]);

  useEffect(() => {
    fields?.forEach((field) => {
      const fieldName = field.name;
      const mesurementobject = customerDetails?.measurements?.filter((obj) => {
        return obj.measurement_type == type.id;
      });
      const fieldValue =
        (mesurementobject?.[0]?.measurement_type == type?.id &&
          mesurementobject?.[0].data[fieldName]) ||
        "";
      fieldValue && mesurementobject && customerDetails?.measurements
        ? setValue(`measurment.${type.name}.${field.name}`, fieldValue)
        : setValue(`measurment.${type.name}.${field.name}`, "");
    });
  }, [
    fields,
    customerDetails?.measurements,
    customerMesurement,
    customerDetails,
    existingMeasures,
    existingMeasures?.[0]?.measurement_type,
  ]);

  const submitwithType = (data) => {
    submitCustomerMeasurement(data, type);
  };

  return (
    <div
      className={`new-container ${
        existingMeasures?.[0]?.measurement_type == type?.id
          ? "new-container-finished"
          : ""
      }`}
      ref={mydivRef}
    >
      <div className="new-header">
        <h2>اندازه:{type?.name}</h2>
      </div>

      <form>
        <div className="mesure-form w-full grid grid-cols-2">
          {fields?.map((field, num) => (
            <div className="pr-3 mt-2" key={num}>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {field.name}:
              </label>
              <input
                disabled={customerDetails?.id ? false : true}
                tabIndex={
                  type?.name === "افغانی" &&
                  (num % 2 === 0
                    ? num / 2 + 1 + 3
                    : Math.ceil(fields?.length / 2) + (num - 1) / 2 + 1 + 3)
                }
                {...register(`measurment.${type.name}.${field.name}`)}
                onKeyDown={(e) => {
                  e.target.value == "" &&
                    e.key === "Tab" &&
                    setValue(
                      `measurment.${type.name}.${field.name}`,
                      field.default
                    );

                  fields[fields.length - 1].name == field.name &&
                    !e.shiftKey &&
                    e.key == "Tab" &&
                    e.preventDefault();
                }}
                onFocus={() => {
                  scrollToDiv();
                }}
                type="text"
                className="w-full py-2 px-3 default-inputs focus:outline-none"
                placeholder="برای ویرایش کلیک کنید."
                list={field.name}
              />
              <datalist id={field.name}>
                {field?.list?.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </datalist>
            </div>
          ))}
        </div>
        <div className="new-footer">
          <button
            tabIndex={-1}
            onClick={handleSubmit(submitwithType)}
            className={`" ${
              existingMeasures?.[0]?.measurement_type == type?.id
                ? "bg-blue-900"
                : "bg-emerald-900"
            } text-white font-bold py-2 px-6 m-2 rounded-full focus:outline-none focus:shadow-outline"`}
          >
            {existingMeasures?.[0]?.measurement_type == type?.id
              ? "ویرایش"
              : "ثبت"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Mesurement;
