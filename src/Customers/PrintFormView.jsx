import React, { useEffect } from "react";
import useApi from "../Services/AxiosInstance";
import jalaliMoment from "jalali-moment";

export const PrintFormView = React.forwardRef((props, ref) => {
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
  
    const jalaaliDate = jalaliMoment(order.date_delivery, "jYYYY-jM-jD");
    jalaaliDate.locale("fa");
    const persianDayName = jalaaliDate.format("dddd");
  
    const jalaaliDatecreated = jalaliMoment(order.date_created, "jYYYY-jM-jD");
    jalaaliDatecreated.locale("fa");
    const persianDayNamecreated = jalaaliDatecreated.format("dddd");
    return (
      <div ref={ref}>
        <table className="print-table">

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
            <td className="relative bottom-1">
              {order.date_created} <br /> {persianDayNamecreated}
            </td>
            <td>تحویل</td>
            <td className="relative bottom-1">
              {order.date_delivery} <br /> {persianDayName}
            </td>
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
        </table>

        <table className="print-table mt-3">
          <div className="mt-3">
            <tr className="flex">
              <h3 className="font-bold">اندازه:</h3>
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