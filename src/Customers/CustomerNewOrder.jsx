import React, { useEffect } from "react";
import { useState } from "react";
import useApi from "../Services/AxiosInstance";
import { useForm } from "react-hook-form";
import { useReactToPrint } from 'react-to-print';
import { useRef } from "react";


export const PrintForm = React.forwardRef((props, ref) => {
  const {data: tailorsInfo, get: get_tailors_info} = useApi()

  useEffect(() => {
    get_tailors_info('/tailorshop')
  }, [])

  
  useEffect(() => {
    console.log(props.CustomerInformation);
    console.log(props.order);
    console.log(customerTypeData()); 
  },[props?.CustomerInformation, props?.order, props?.orderStyle])

  const customer = props?.CustomerInformation
  const order = props?.order
  const customerTypeData = () => {
    const customerType = customer?.measurements.filter((mesure) => {
      return mesure.measurement_type == props?.orderStyle?.id
    })

    const typesArray = customerType?.[0]?.data && Object.entries(customerType?.[0]?.data).map(([key, value]) => ({
      value,
      key
    }));

    const everyTwoArray = typesArray && typesArray.reduce((accumulator, currentValue, currentIndex, array) => {
    if (currentIndex % 2 === 0) {
      accumulator.push(array.slice(currentIndex, currentIndex + 2));
    }
    return accumulator;
  }, [])

    return everyTwoArray
  }



  return (
    <div ref={ref}>
      <table className="print-table">
        <div>
          <h3>{tailorsInfo?.results?.[0]?.name}</h3>
          <h5>تماس: {tailorsInfo?.results?.[0]?.contact}</h5>
        </div>
        <tr>
          <td>نام</td>
          <td>{customer.first_name} {customer.last_name}</td>
          <td>آی.دی</td>
          <td>{customer.id}</td>
        </tr>
        <tr>
          <td>سفارش</td>
          <td>{order.date_created}</td>
          <td>تحویل</td>
          <td>{order.date_delivery}</td>
        </tr>
        <tr>
          <td>قیمت</td>
          <td>{order.price}</td>
          <td>رسید</td>
          <td>0 Af</td>
        </tr>
          <h5>آدرس: {tailorsInfo?.results?.[0]?.address}</h5>
      </table>
      <table className="print-table">
        <div>
          <h3>{tailorsInfo?.results?.[0]?.name}</h3>
          <h3>نام مشتری: {customer.first_name} {customer.last_name}</h3>
          <h3>آی دی: {customer.id}</h3>
        </div>
        {customerTypeData()?.map((item) => (
        <tr className="flex">
          <td>{item?.[0]?.key}</td>
          <td>{item?.[0]?.value}</td>
          <td>{item?.[1]?.key}</td>
          <td>{item?.[1]?.value}</td>
        </tr>
        ))}
      </table>
    </div>
  );
});

function CustomerNewOrder({ CustomerInformation }) {
  const [orderStyle, setOrderStyle] = useState();
  const { register, handleSubmit } = useForm();
  const { data: mesurementsType, get: get_mesurement_type } = useApi();
  const { data: order, post: post_order, patch: patch_order } = useApi();

  useEffect(() => {
    get_mesurement_type("measurement-types/");
  }, []);

  useEffect(() => {
    setOrderStyle(mesurementsType?.results[0]);
  }, [mesurementsType]);

  const submitOrder = (data) => {
    const Form = new FormData();
    Form.append("customer", CustomerInformation?.id);
    Form.append("measurement_type", orderStyle?.id);
    Form.append("status", "new");
    Form.append("price", data.price);
    Form.append("date_delivery", data.date_delivery);
    Form.append("date_created", data.date_created);
    order ? patch_order("/orders/" + order?.id + '/', Form) : post_order("/orders/", Form);
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
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
            {...register("date_created", { required: true })}
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
            {...register("date_delivery", { required: true })}
            className="w-full py-2 px-3 default-inputs focus:outline-none"
            placeholder="برای ویرایش کلیک کنید."
          />
        </div>
        <div className="w-1/3 pr-3">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            قیمت:
          </label>
          <input
            {...register("price", { required: true })}
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
          className={`${order?.id ? 'bg-blue-900' : 'bg-emerald-900'} text-white font-bold py-2 px-6 m-2 rounded-full focus:outline-none focus:shadow-outline"`}
        >
          {order ? 'ویرایش' : 'ذخیره'}
        </button>
        {order?.id && <button
          tabIndex={-1}
          onClick={handlePrint}
          className={`bg-blue-600 text-white font-bold py-2 px-6 m-2 rounded-full focus:outline-none focus:shadow-outline"`}
        >
          چاپ
        </button>}
      </div>
    </div>
    {order?.id && <div className="new-container print-container">
    <PrintForm ref={componentRef} CustomerInformation={CustomerInformation} orderStyle={orderStyle} order={order}/>
    </div>}
      </>
  );
}



export default CustomerNewOrder;
