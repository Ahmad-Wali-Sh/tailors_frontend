import React from 'react'

function Mesurement({type, register, mesurementSubmit}) {
    const fields = Object.entries(type.fields).map(([key, value]) => ({
        ...value
    }));

  return (
    <div className="new-container">
    <div className="new-header">
      <h2>اندازه:{type?.name}</h2>
    </div>

    <form className="new-form w-full grid grid-cols-3">
        {fields?.map((field) => (
            <div className="pr-3">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {field.name}:
            </label>
            <input
              {...register(`measurment.${type.name}.${field.name}`, {required: 'لطفا تکمیل کنید.'})}
              type={field.type == 'String' && "text"}
              className="w-full py-2 px-3 default-inputs focus:outline-none"
              placeholder="برای ویرایش کلیک کنید."
            />
          </div>
        ))}
          </form>
      <div className="new-footer">
        <button
        //   onClick={mesurementSubmit}
          className="text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
        >
          ذخیره
        </button>
      </div>
  </div>
  )
}

export default Mesurement