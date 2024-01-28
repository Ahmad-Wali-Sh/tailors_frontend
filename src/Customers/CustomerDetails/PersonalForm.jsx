import React, { useEffect } from "react";

function PersonalForm({ register, submitPersonalInfo, customerInfo, reset }) {
  useEffect(() => {
    console.log(customerInfo);
    reset({
      personal: {
        first_name: customerInfo?.first_name || '',
        last_name: customerInfo?.last_name || '',
        contact: customerInfo?.contact || '',
        description: customerInfo?.description || '',
      },
    });
  }, [customerInfo]);

  return (
    <div
      className={`new-container ${
        customerInfo ? "new-container-finished" : ""
      }`}
    >
      <div className="new-header">
        <h2>اطلاعات شخصی</h2>
      </div>

      <form className="new-form">
        <div className="flex mb-4">
          <div className="w-1/3 pr-3">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              نام:
            </label>
            <input
              type="text"
              tabIndex={1}
              {...register("personal.first_name", {
                required: "نام ضروری است.",
              })}
              className="w-full py-2 px-3 default-inputs focus:outline-none"
              placeholder="برای ویرایش کلیک کنید."
            />
          </div>
          <div className="w-1/3 pr-3">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              تخلص:
            </label>
            <input
              {...register("personal.last_name", {
                required: "نام فامیلی ضروری است",
              })}
              tabIndex={2}
              type="text"
              className="w-full py-2 px-3 default-inputs focus:outline-none"
              placeholder="برای ویرایش کلیک کنید."
            />
          </div>
          <div className="w-1/3 pr-3">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              شماره تماس:
            </label>
            <input
              type="text"
              tabIndex={3}
              {...register("personal.contact", { required: "شماره ضروری است" })}
              className="w-full py-2 px-3 default-inputs focus:outline-none"
              placeholder="برای ویرایش کلیک کنید."
              onKeyDown={(e) => {
                e.key === 'Tab' && submitPersonalInfo()
                const element = document.querySelector('[tabIndex="4"]');
                
                // Focus on the element if it exists
                if (element) {
                  setTimeout(() => {
                    
                    element.focus();
                  }, 200);
                }
              }}
            />
          </div>
        </div>
        <div className="flex">
          {/* <div className="w-full pr-3">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              توضیحات:
            </label>
            <input
              type="text"
              {...register("personal.description")}
              className="w-full py-2 px-3 default-inputs focus:outline-none"
              placeholder="برای ویرایش کلیک کنید."
            />
          </div> */}
        </div>
          <button
            onClick={submitPersonalInfo}
            className={`" ${
              customerInfo ? "bg-blue-900" : "bg-emerald-900"
            } text-white font-bold py-2 px-6 m-2 rounded-full focus:outline-none focus:shadow-outline"`}
          >
            {customerInfo ? "ویرایش" : "ثبت"}
          </button>
      </form>
    </div>
  );
}

export default PersonalForm;
