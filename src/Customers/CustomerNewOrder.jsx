import React, { useEffect } from "react";
import { useState } from "react";
import useApi from "../Services/AxiosInstance";
import { useForm } from "react-hook-form";

function CustomerNewOrder({CustomerInformation}) {
  const [orderStyle, setOrderStyle] = useState();
  const { register, handleSubmit } = useForm()

  const { data: mesurementsType, get: get_mesurement_type} = useApi()
  const { data: order, post: post_order, patch: patch_order} = useApi()

  useEffect(() => {
    get_mesurement_type('measurement-types/')
  }, [])

  useEffect(() => {
    setOrderStyle(mesurementsType?.results[0])
  }, [mesurementsType])

  const submitOrder = (data) => {
    const Form = new FormData()
    Form.append('customer', CustomerInformation?.id)
    Form.append('measurement_type', orderStyle?.id)
    Form.append('status', 'new')
    Form.append('price', data.price)
    Form.append('date_delivery', data.date_delivery)
    Form.append('date_created', data.date_created)
    post_order('/orders/', Form)
  }

  return (
    <div className="new-container">
      <div className="new-header">انتخاب نوعیت سفارش</div>
      <div className="select-section">
        {mesurementsType?.results.map((type) => (
          <div
          className={`select-section-item ${
            orderStyle?.name == type.name && "active"
          }`}
          onClick={() => setOrderStyle(type)}
        >
          {type.name}
        </div>
        ))}
      </div>
        <div className="new-header">اطلاعات سفارش</div>
          <div className="flex mb-4">
            <div className="w-1/3 pr-3">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                تاریخ سفارش:
              </label>
              <input
                type="date"
                {...register('date_created', {required: true})}
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
                {...register('date_delivery', {required: true})}
                className="w-full py-2 px-3 default-inputs focus:outline-none"
                placeholder="برای ویرایش کلیک کنید."
              />
            </div>
            <div className="w-1/3 pr-3">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                قیمت:
              </label>
              <input
                {...register('price', {required: true})}
                type="text"
                className="w-full py-2 px-3 default-inputs focus:outline-none"
                placeholder="برای ویرایش کلیک کنید."
              />
            </div>
          </div>
          <div className="new-footer">
          <button
          tabIndex={-1}
          onClick={handleSubmit(submitOrder)}
          className={`bg-blue-600 text-white font-bold py-2 px-6 m-2 rounded-full focus:outline-none focus:shadow-outline"`}
          >
            ذخیره
          </button>
            </div>
    </div>
  );
}

export default CustomerNewOrder;
