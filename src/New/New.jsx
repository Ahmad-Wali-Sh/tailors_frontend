import React from "react";

function New() {
  return (
    <div className="new-container">
      <div className="new-header">
        <h2>مشتری جدید</h2>
      </div>

      <form className="new-form">
        <div className="flex mb-4">
          <div className="w-1/3 pr-3">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              نام:
            </label>
            <input
              type="text"
              className="w-full py-2 px-3 default-inputs focus:outline-none"
              placeholder="برای ویرایش کلیک کنید."
            />
          </div>
          <div className="w-1/3 pr-3">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              تخلص:
            </label>
            <input
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
              className="w-full py-2 px-3 default-inputs focus:outline-none"
              placeholder="برای ویرایش کلیک کنید."
            />
          </div>
        </div>
        ‌
        <div className="flex">
          <div className="w-full pr-3">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              توضیحات:
            </label>
            <input
              type="text"
              className="w-full py-2 px-3 default-inputs focus:outline-none"
              placeholder="برای ویرایش کلیک کنید."
            />
          </div>
        </div>
        <div className="new-footer">
          <button
            type="submit"
            className="text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
          >
            ذخیره
          </button>
        </div>
      </form>
    </div>
  );
}

export default New;
