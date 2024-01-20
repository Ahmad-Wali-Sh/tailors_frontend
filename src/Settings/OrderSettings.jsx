import React, { useEffect } from "react";
import useApi from "../Services/AxiosInstance";
import { useForm } from "react-hook-form";

function OrderSettings() {

  const { register, handleSubmit, reset} = useForm()
  const { data, patch, get} = useApi()

  useEffect(()=> {
    get('tailorshop/1/')
  }, [])

  useEffect(() => {
      reset({
        day_to_deliver: data?.day_to_deliver,
        date_to_deliver: data?.date_to_deliver,
        default_price: data?.default_price
      })
  }, [data])

  const editOrderingDefaults = (data) => {
    const Form = new FormData()
    Form.append('day_to_deliver', data?.day_to_deliver)
    Form.append('date_to_deliver', data?.date_to_deliver ? data?.date_to_deliver : '')
    Form.append('default_price', data?.default_price)
    patch('tailorshop/1/', Form)
  }
  return (
    <div className="new-container">
      <div className="new-header">تنظیمات پیش فرض سفارشات</div>
      <div className="new-form w-full grid grid-cols-3">
        <div className="pr-3 mt-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
           اختلاف تاریخ سفارش تا تحویل (به روز):
          </label>
          <input
            type="text"
            {...register('day_to_deliver')}
            className="w-full py-2 px-3 default-inputs focus:outline-none"
            placeholder="برای ویرایش کلیک کنید."
          />
        </div>
        <div className="pr-3 mt-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            تاریخ تحویل ثابت (در مواقع نیاز):
          </label>
          <input
            type="date"
            {...register('date_to_deliver')}
            className="w-full py-2 px-3 default-inputs focus:outline-none"
            placeholder="برای ویرایش کلیک کنید."
          />
        </div>
        <div className="pr-3 mt-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            قیمت دوخت:
          </label>
          <input
            type="text"
            {...register('default_price')}
            className="w-full py-2 px-3 default-inputs focus:outline-none"
            placeholder="برای ویرایش کلیک کنید."
          />
        </div>
      </div>
      <div className="new-footer">
        <button
          tabIndex={-1}
          onClick={handleSubmit(editOrderingDefaults)}
          className={`bg-emerald-900 text-white font-bold py-2 px-6 m-2 rounded-full focus:outline-none focus:shadow-outline"`}
        >
          ذخیره
        </button>
      </div>
    </div>
  );
}

export default OrderSettings;
