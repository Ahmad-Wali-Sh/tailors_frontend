import React, { useEffect } from 'react'

function Mesurement({type, register, submitCustomerMeasurement, customerDetails,setValue,customerMesurement ,handleSubmit}) {
    const fields = Object.entries(type.fields).map(([key, value]) => ({
        ...value
    }));



    useEffect(() => {
        fields?.forEach((field) => {
          const fieldName = field.name;
          const mesurementobject = customerDetails?.measurements?.filter((obj) => {return obj.measurement_type == type.id})
          console.log(mesurementobject);
          const fieldValue = mesurementobject?.[0]?.measurement_type == type.id && mesurementobject?.[0].data[fieldName] || ''

          
          setValue(`measurment.${type.name}.${field.name}`, fieldValue)
        })
    }, [fields, customerMesurement, setValue])

    const submitwithType = (data) => {
      submitCustomerMeasurement(data, type)
    }

  return (
    <div className="new-container">
    <div className="new-header">
      <h2>اندازه:{type?.name}</h2>
    </div>

    <form >
      <div className="new-form w-full grid grid-cols-3">
        {fields?.map((field, num) => (
            <div className="pr-3 mt-2" key={num}>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {field.name}:
            </label>
            <input
              {...register(`measurment.${type.name}.${field.name}`, {required: 'لطفا تکمیل کنید.'})}
              type='text'
              className="w-full py-2 px-3 default-inputs focus:outline-none"
              placeholder="برای ویرایش کلیک کنید."
            />
          </div>
        ))}
      </div>
      <div className="new-footer">
        <button
          onClick={handleSubmit(submitwithType)}
          className="text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
          >
          ذخیره
        </button>
      </div>
          </form>
  </div>
  )
}

export default Mesurement