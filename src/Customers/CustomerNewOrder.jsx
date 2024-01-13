import React from "react";
import { useState } from "react";

function CustomerNewOrder() {
  const [orderStyle, setOrderStyle] = useState("afghani");
  return (
    <div className="new-container">
      <div className="new-header">انتخاب نوعیت سفارش</div>
      <div className="select-section">
        <div
          className={`select-section-item ${
            orderStyle == "afghani" && "active"
          }`}
          onClick={() => setOrderStyle("afghani")}
        >
          افغانی
        </div>
        <div
          className={`select-section-item ${orderStyle == "suit" && "active"}`}
          onClick={() => setOrderStyle("suit")}
        >
          دریشی
        </div>
      </div>
      <div className="new-header">
        <h2>اطلاعات مدل</h2>
      </div>
      {orderStyle == "afghani" && (
        <form className="new-form">
          <div className="flex mb-4">
            <div className="w-1/3 pr-3">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                مدل دامن:
              </label>
              <input
                type="text"
                className="w-full py-2 px-3 default-inputs focus:outline-none"
                placeholder="برای ویرایش کلیک کنید."
              />
            </div>
            <div className="w-1/3 pr-3">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                مدل آستین:
              </label>
              <input
                type="text"
                className="w-full py-2 px-3 default-inputs focus:outline-none"
                placeholder="برای ویرایش کلیک کنید."
              />
            </div>
            <div className="w-1/3 pr-3">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                مدل یخن:
              </label>
              <input
                type="text"
                className="w-full py-2 px-3 default-inputs focus:outline-none"
                placeholder="برای ویرایش کلیک کنید."
              />
            </div>
          </div>
          <div className="flex mb-4">
            <div className="w-1/3 pr-3">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                مدل برتمان:
              </label>
              <input
                type="text"
                className="w-full py-2 px-3 default-inputs focus:outline-none"
                placeholder="برای ویرایش کلیک کنید."
              />
            </div>
            <div className="w-1/3 pr-3">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                کیسه رو:
              </label>
              <input
                type="text"
                className="w-full py-2 px-3 default-inputs focus:outline-none"
                placeholder="برای ویرایش کلیک کنید."
              />
            </div>
            <div className="w-1/3 pr-3">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                کیسه تمان:
              </label>
              <input
                type="text"
                className="w-full py-2 px-3 default-inputs focus:outline-none"
                placeholder="برای ویرایش کلیک کنید."
              />
            </div>
          </div>
          <div className="flex mb-4">
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
          <div className="new-header">اطلاعات سفارش</div>
          <div className="flex mb-4">
            <div className="w-1/3 pr-3">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                تاریخ سفارش:
              </label>
              <input
                type="date"
                className="w-full py-2 px-3 default-inputs focus:outline-none"
                placeholder="برای ویرایش کلیک کنید."
              />
            </div>
            <div className="w-1/3 pr-3">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                تاریخ تحویل:
              </label>
              <input
                type="date"
                className="w-full py-2 px-3 default-inputs focus:outline-none"
                placeholder="برای ویرایش کلیک کنید."
              />
            </div>
            <div className="w-1/3 pr-3">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                قیمت:
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
              //   onClick={onPrevStep}
              className="text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
            >
              ثبت سفارش
            </button>
            <button
              //   onClick={onPrevStep}
              className="text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
            >
              چاپ
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default CustomerNewOrder;
