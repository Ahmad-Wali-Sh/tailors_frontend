import React, { useEffect } from "react";
import { useState } from "react";
import useApi from "../Services/AxiosInstance";
import { useForm } from "react-hook-form";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import "Ahmad-Wali-Sh/jalaali-react-date-picker/lib/styles/index.css";
import { InputDatePicker } from "Ahmad-Wali-Sh/jalaali-react-date-picker";
import moment from 'jalali-moment';

export const PrintForm = React.forwardRef((props, ref) => {
  const { data: tailorsInfo, get: get_tailors_info } = useApi();

  useEffect(() => {
    get_tailors_info("/tailorshop");
  }, []);

  const customer = props?.order?.customer_details?.[0];
  const order = props?.order;
  const customerTypeData = () => {
    const typesArray =
      order.instance_measurement?.data &&
      Object.entries(order.instance_measurement?.data).map(([key, value]) => ({
        value,
        key,
      }));

    const everyTwoArray =
      typesArray &&
      typesArray.reduce((accumulator, currentValue, currentIndex, array) => {
        if (currentIndex % 2 === 0) {
          accumulator.push(array.slice(currentIndex, currentIndex + 2));
        }
        return accumulator;
      }, []);

    return everyTwoArray;
  };

  return (
    <div ref={ref}>
      <table className="print-table">
        <div>
          <h3>{tailorsInfo?.results?.[0]?.name}</h3>
          <h5>تماس: {tailorsInfo?.results?.[0]?.contact}</h5>
        </div>
        <tr>
          <td>محترم</td>
          <td>
            {customer.first_name} {customer.last_name}
          </td>
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
          <td>تعداد</td>
          <td>{order.quantity}</td>
          <td>قیمت</td>
          <td>{order.dokht_price}</td>
        </tr>
        <tr>
          <td>پارچه</td>
          <td>{order.parcha}</td>
          <td>قیمت</td>
          <td>{order.clothing_price}</td>
        </tr>
        <tr>
          <td>متراژ</td>
          <td>{order.meters}</td>
          <td>قیمت کل</td>
          <td>{order.grand_total}</td>
        </tr>
        <tr>
          <td>رسید</td>
          <td>{order.rasid}</td>
          <td>الباقی</td>
          <td>{order.al_baghi}</td>
        </tr>
        <h5>آدرس: {tailorsInfo?.results?.[0]?.address}</h5>
      </table>
      <table className="print-table">
        <div>
          <h3>{tailorsInfo?.results?.[0]?.name}</h3>
          <small>id: {customer.id}</small>
          <tr className="flex">
            <h3>محترم:</h3>
            <h3>
              {customer.first_name} {customer.last_name}
            </h3>
            <h3>قیمت کل: </h3>
            <h3>{order.grand_total}</h3>
          </tr>
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
  const { register, handleSubmit, reset, watch, setValue } = useForm();
  const { data: mesurementsType, get: get_mesurement_type } = useApi();
  const { data: order, post: post_order, patch: patch_order } = useApi();
  const { data: tailorsInfo, get: get_tailors_info } = useApi();

  useEffect(() => {
    get_tailors_info("/tailorshop");
  }, []);

  useEffect(() => {
    reset({
      grand_total:
        parseFloat(watch("dokht_price")) * parseFloat(watch("quantity")) +
        parseFloat(watch("clothing_price")),
      al_baghi: watch("grand_total") - watch("rasid"),
    });
  }, [
    watch("rasid"),
    watch("dokht_price"),
    watch("clothing_price"),
    watch("quantity"),
  ]);

  useEffect(() => {
    reset({
      dokht_price: 400,
      clothing_price: 0,
      rasid: 0,
      quantity: 1,
    });
  }, []);
  useEffect(() => {
    console.log(watch("date_created"));
  }, [watch("date_created")]);

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
    Form.append("dokht_price", data.dokht_price);
    Form.append("clothing_price", data.clothing_price);
    Form.append("quantity", data.quantity);
    Form.append("parcha", data.parcha);
    Form.append("meters", data.meters);
    Form.append("rasid", data.rasid);
    Form.append("date_delivery", data.date_delivery);
    Form.append("date_created", data.date_created);
    order
      ? patch_order("/orders/" + order?.id + "/", Form)
      : post_order("/orders/", Form);
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [createDate, setCreatedDate] = useState()

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

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
            {/* <input
            type="date"
            {...register("date_created", { required: true })}
            className="w-full py-2 px-3 default-inputs focus:outline-none"
            placeholder="برای ویرایش کلیک کنید."
          /> */}
          <InputDatePicker onChange={(e) => {
            e ? setCreatedDate(moment(e)) : setCreatedDate('')
            }} value={createDate || ''} />
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
              قیمت دوخت:
            </label>
            <input
              {...register("dokht_price", { required: true })}
              type="text"
              className="w-full py-2 px-3 default-inputs focus:outline-none"
              placeholder="برای ویرایش کلیک کنید."
            />
          </div>
        </div>
        <div className="flex mb-4">
          <div className="w-1/3 pr-3">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              پارچه:
            </label>
            <input
              type="text"
              {...register("parcha")}
              className="w-full py-2 px-3 default-inputs focus:outline-none"
              placeholder="برای ویرایش کلیک کنید."
            />
          </div>
          <div className="w-1/3 pr-3">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              متراژ:
            </label>
            <input
              type="text"
              {...register("meters")}
              className="w-full py-2 px-3 default-inputs focus:outline-none"
              placeholder="برای ویرایش کلیک کنید."
            />
          </div>
          <div className="w-1/3 pr-3">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              قیمت پارچه:
            </label>
            <input
              {...register("clothing_price")}
              type="text"
              className="w-full py-2 px-3 default-inputs focus:outline-none"
              placeholder="برای ویرایش کلیک کنید."
            />
          </div>
        </div>
        <div className="flex mb-4">
          <div className="w-1/3 pr-3">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              تعداد:
            </label>
            <input
              type="text"
              {...register("quantity", { required: true })}
              className="w-full py-2 px-3 default-inputs focus:outline-none"
              placeholder="برای ویرایش کلیک کنید."
            />
          </div>
          <div className="w-1/3 pr-3">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              رسید:
            </label>
            <input
              type="text"
              {...register("rasid", { required: true })}
              className="w-full py-2 px-3 default-inputs focus:outline-none"
              placeholder="برای ویرایش کلیک کنید."
            />
          </div>
          <div className="w-1/6 pr-3">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              قیمت کل:
            </label>
            <input
              type="text"
              disabled
              {...register("grand_total", { required: true })}
              className="w-full py-2 px-3 default-inputs focus:outline-none"
              placeholder="برای ویرایش کلیک کنید."
            />
          </div>
          <div className="w-1/6 pr-3">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              الباقی:
            </label>
            <input
              disabled
              {...register("al_baghi", { required: true })}
              type="text"
              className="w-full py-2 px-3 default-inputs focus:outline-none"
            />
          </div>
        </div>
        <div className="new-footer">
          <button
            tabIndex={-1}
            onClick={handleSubmit(submitOrder)}
            className={`${
              order?.id ? "bg-blue-900" : "bg-emerald-900"
            } text-white font-bold py-2 px-6 m-2 rounded-full focus:outline-none focus:shadow-outline"`}
          >
            {order ? "ویرایش" : "ذخیره"}
          </button>
          {order?.id && (
            <button
              tabIndex={-1}
              onClick={handlePrint}
              className={`bg-blue-600 text-white font-bold py-2 px-6 m-2 rounded-full focus:outline-none focus:shadow-outline"`}
            >
              چاپ
            </button>
          )}
        </div>
      </div>
      {order?.id && (
        <div className="new-container print-container">
          <PrintForm
            ref={componentRef}
            CustomerInformation={CustomerInformation}
            orderStyle={orderStyle}
            order={order}
          />
        </div>
      )}
    </>
  );
}

export default CustomerNewOrder;
