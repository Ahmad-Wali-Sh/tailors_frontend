import React, { useEffect } from "react";
import { useState } from "react";
import useApi from "../Services/AxiosInstance";
import { useForm } from "react-hook-form";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
// import { DatePicker, DateRangePicker } from "react-advance-jalaali-datepicker";
import jalaliMoment from "jalali-moment";
import "@ahmad-wali-sh/jalaali-react-date-picker/lib/styles/index.css";
import {
  InputDatePicker,
  DatePicker,
} from "@ahmad-wali-sh/jalaali-react-date-picker";

export const PrintForm = React.forwardRef((props, ref) => {
  const { data: tailorsInfo, get: get_tailors_info } = useApi();
  const { data: printForm, get: get_print_form } = useApi();

  useEffect(() => {
    get_tailors_info("/tailorshop");
    get_print_form("/print-form/1");
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

  const jalaaliDate = jalaliMoment(order.date_delivery, "YYYY-M-D");
  jalaaliDate.locale("fa");
  const persianDayName = jalaaliDate.format("dddd");

  const jalaaliDatecreated = jalaliMoment(order.date_created, "YYYY-M-D");
  jalaaliDatecreated.locale("fa");
  const persianDayNamecreated = jalaaliDatecreated.format("dddd");
  return (
    <div ref={ref}>
      <table className="print-table" style={{fontSize: printForm?.font_size, width: `${printForm?.paper_width}px`}}>
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
          {printForm?.sar_created && (
            <>
              <td>سفارش</td>
              <td className="relative bottom-1">
                {jalaliMoment(order.date_created, "YYYY-MM-DD").format(
                  "jYYYY-jMM-jDD"
                )}{" "}
                <br /> {persianDayNamecreated}
              </td>
            </>
          )}
          {printForm?.sar_delivery && <>
          <td>تحویل</td>
          <td className="relative bottom-1">
            {jalaliMoment(order.date_delivery, "YYYY-MM-DD").format(
              "jYYYY-jMM-jDD"
              )}{" "}
            <br /> {persianDayName}
          </td>
              </>}
        </tr>
        <tr>
          {printForm?.sar_quantity && <>
          <td>تعداد</td>
          <td>{order.quantity}</td>
          </>}
          {printForm?.sar_albaghi && <>
            <td>الباقی</td>
          <td>{order.al_baghi}</td>
          </>}
        </tr>
        <tr>
          {printForm?.sar_parcha && <>
            <td>پارچه</td>
          <td>{order.parcha}</td>
          </>}
          {printForm?.sar_metraj && <>
          <td>متراژ</td>
          <td>{order.meters}</td>
          </>}
        </tr>
        <tr>
          {printForm?.sar_price_parcha && <>
            <td>قیمت_پارچه</td>
          <td>{order.clothing_price}</td>
          </>}
          {printForm?.sar_price_dokht && <>
          <td>قیمت_دوخت</td>
          <td>{order.dokht_price}</td>
          </>}
        </tr>
        <tr>
          {printForm?.sar_price_grand && <>
            <td>قیمت_کل</td>
          <td>{order.grand_total}</td>
          </>}
          {printForm?.sar_price_rasid && <>
          <td>رسید</td>
          <td>{order.rasid}</td>
          </>}
        </tr>
        {printForm?.sar_price_address && <h5 className="mb-3">آدرس: {tailorsInfo?.results?.[0]?.address}</h5>}
      </table>
      <div
        style={{ pageBreakAfter: "always", borderTop: "1px dashed grey" }}
        className="print-section"
      ></div>
      <table className="print-table" style={{fontSize: printForm?.font_size, width: `${printForm?.paper_width}px`}}>
        <div className="mt-3">
          <h3>{tailorsInfo?.results?.[0]?.name}</h3>
          <tr className="flex">
            <h3>محترم:</h3>
            <h3>
              {customer.first_name} {customer.last_name}
            </h3>
            <h3>آی دی: </h3>
            <td className="relative bottom-1">{customer.id}</td>
          </tr>
          <tr>
          {printForm?.in_created && (
            <>
              <td>سفارش</td>
              <td className="relative bottom-1">
                {jalaliMoment(order.date_created, "YYYY-MM-DD").format(
                  "jYYYY-jMM-jDD"
                )}{" "}
                <br /> {persianDayNamecreated}
              </td>
            </>
          )}
          {printForm?.in_delivery && <>
          <td>تحویل</td>
          <td className="relative bottom-1">
            {jalaliMoment(order.date_delivery, "YYYY-MM-DD").format(
              "jYYYY-jMM-jDD"
              )}{" "}
            <br /> {persianDayName}
          </td>
              </>}
        </tr>
        <tr>
          {printForm?.in_quantity && <>
          <td>تعداد</td>
          <td>{order.quantity}</td>
          </>}
          {printForm?.in_albaghi && <>
            <td>الباقی</td>
          <td>{order.al_baghi}</td>
          </>}
        </tr>
        <tr>
          {printForm?.in_parcha && <>
            <td>پارچه</td>
          <td>{order.parcha}</td>
          </>}
          {printForm?.in_metraj && <>
          <td>متراژ</td>
          <td>{order.meters}</td>
          </>}
        </tr>
        <tr>
          {printForm?.in_price_parcha && <>
            <td>قیمت_پارچه</td>
          <td>{order.clothing_price}</td>
          </>}
          {printForm?.in_price_dokht && <>
          <td>قیمت_دوخت</td>
          <td>{order.dokht_price}</td>
          </>}
        </tr>
        <tr>
          {printForm?.in_price_grand && <>
            <td>قیمت_کل</td>
          <td>{order.grand_total}</td>
          </>}
          {printForm?.in_price_rasid && <>
          <td>رسید</td>
          <td>{order.rasid}</td>
          </>}
        </tr>
        </div>
        <div style={{ borderTop: "1px dotted grey" }}></div>
        {customerTypeData()?.map((item) => (
          <tr className="flex">
            <td>{item?.[0]?.key}</td>
            <td>{item?.[0]?.value}</td>
            <td>{item?.[1]?.key}</td>
            <td>{item?.[1]?.value}</td>
          </tr>
        ))}
            {printForm?.in_price_address && <h5 className="mb-3">آدرس: {tailorsInfo?.results?.[0]?.address}</h5>}
      </table>
    </div>
  );
});

function CustomerNewOrder({ CustomerInformation }) {
  const [orderStyle, setOrderStyle] = useState();
  const { register, handleSubmit, reset, watch, setValue } = useForm();
  const { data: mesurementsType, get: get_mesurement_type } = useApi();
  const {
    data: order,
    post: post_order,
    patch: patch_order,
    dataSeter: order_data_set,
  } = useApi();
  const { data: tailorsInfo, get: get_tailors_info } = useApi();

  useEffect(() => {
    get_tailors_info("/tailorshop/1/");
  }, []);

  const [createDate, setCreatedDate] = useState(jalaliMoment());
  const [deliverDate, setDeliverDate] = useState();

  useEffect(() => {
    const currentDate = jalaliMoment();
    setCreatedDate(currentDate);
  }, []);

  useEffect(() => {
    const currentDate = jalaliMoment();
    setValue("dokht_price", tailorsInfo?.default_price);
    // Set the created date to today
    const daysLater = currentDate.add(
      parseInt(tailorsInfo?.day_to_deliver),
      "days"
    );
    tailorsInfo?.date_to_deliver
      ? setDeliverDate(jalaliMoment(tailorsInfo?.date_to_deliver))
      : setDeliverDate(daysLater);
  }, [tailorsInfo]);

  useEffect(() => {
    reset({
      grand_total:
        parseFloat(watch("dokht_price")) + parseFloat(watch("clothing_price")),
      al_baghi: watch("grand_total") - watch("rasid"),
    });
  }, [watch("rasid"), watch("dokht_price"), watch("clothing_price")]);

  useEffect(() => {
    reset({
      clothing_price: 0,
      rasid: 0,
      quantity: 1,
    });
  }, []);

  useEffect(() => {
    get_mesurement_type("measurement-types/");
  }, []);

  useEffect(() => {
    setOrderStyle(mesurementsType?.results[0]);
  }, [mesurementsType]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check if the key combination matches the desired shortcut
      if (
        event.ctrlKey &&
        (event.key === "ح" || event.key === "p" || event.key === "P")
      ) {
        event.preventDefault();
        handlePrint();
      }
    };

    // Add event listener for keydown event
    window.addEventListener("keydown", handleKeyDown);

    // Clean up by removing the event listener when component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    order_data_set();
  }, [CustomerInformation]);

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
    Form.append(
      "date_delivery",
      jalaliMoment(deliverDate).format("YYYY-MM-DD")
    );
    Form.append("date_created", jalaliMoment(createDate).format("YYYY-MM-DD"));
    order
      ? patch_order("/orders/" + order?.id + "/", Form)
      : post_order("/orders/", Form);
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <form onSubmit={handleSubmit(submitOrder)}>
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
              <InputDatePicker
                value={createDate}
                onChange={(e) => {
                  setCreatedDate(e);
                }}
                wrapperClassName="w-full py-2 px-3 default-inputs focus:outline-none dates-container"
                className="none-input-style"
              />
            </div>
            <div className="w-1/3 pr-3">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                تاریخ تحویل:
              </label>
              <InputDatePicker
                value={deliverDate}
                onChange={(e) => {
                  setDeliverDate(e);
                }}
                wrapperClassName="w-full py-2 px-3 default-inputs focus:outline-none dates-container"
                className="none-input-style"
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
                onKeyDown={(e) => {
                  !e.shiftKey && e.key == "Tab" && e.preventDefault();
                }}
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
              type="submit"
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
      </form>
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
