import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import jalaliMoment from "jalali-moment";
import "@ahmad-wali-sh/jalaali-react-date-picker/lib/styles/index.css";
import {
  InputDatePicker,
  DatePicker,
} from "@ahmad-wali-sh/jalaali-react-date-picker";

function Finance() {
  const [fromDate, setFromDate] = useState();
  const [untilDate, setUntilDate] = useState();
  const [report, setReport] = useState();
  const { register, watch } = useForm();

  useEffect(() => {
    let startDate = fromDate
      ? jalaliMoment(fromDate).format("YYYY-MM-DD")
      : "";
    let endDate = untilDate
      ? jalaliMoment(untilDate).format("YYYY-MM-DD")
      : "";

      console.log(endDate);

    startDate &&
      endDate &&
      axios
        .get(
          `http://127.0.0.1:8000/api/orders-report/?start_date=${
            startDate ? startDate : ""
          }&end_date=${endDate ? endDate : ""}${
            watch("archieved") ? "&archieved=" + watch("archieved") : ""
          }`
        )
        .then((res) => {
          setReport(res.data);
        });
  }, [fromDate, untilDate, watch("archieved")]);

  return (
    <>
      <div className="new-container">
        <div className="new-header">گزارشات</div>
        <div className="new-form w-full grid grid-cols-3">
          <div className="pr-3 mt-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              از تاریخ:
            </label>
            <div className="flex">
              <InputDatePicker
                value={fromDate || null}
                onChange={(e) => {
                  setFromDate(e);
                }}
                wrapperClassName="w-full py-2 px-3 default-inputs focus:outline-none dates-container"
                className="none-input-style"
              />
              {/* <DatePicker
                onChange={(unix, formated) => {
                  setFromDate(formated);
                }}
                controlValue={true}
                containerClass={
                  "w-full py-2 px-3 default-inputs focus:outline-none dates-container"
                }
                preSelected={fromDate || ""}
                cancelOnBackgroundClick={true}
              /> */}
            </div>
          </div>
          <div className="pr-3 mt-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              تا تاریخ:
            </label>
            <div className="flex">
              <InputDatePicker
                value={untilDate || null}
                onChange={(e) => {
                  setUntilDate(e);
                }}
                wrapperClassName="w-full py-2 px-3 default-inputs focus:outline-none dates-container"
                className="none-input-style"
              />
            </div>
          </div>
          <div className="pr-3 mt-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              حالت سفارش:
            </label>
            <select
              className="w-full py-2 px-3 default-inputs focus:outline-none"
              {...register("archieved")}
            >
              <option value=""></option>
              <option value="True">تکمیل شده</option>
              <option value="False">تکمیل نشده</option>
            </select>
          </div>
        </div>
        <br />
      </div>
      {fromDate && untilDate && (
        <div className="new-container">
          <div className="new-header">اطلاعات:</div>
          <div className="shortcuts-container">
            <div className="new-header shortcut-item">
              <div>تعداد سفارشات:</div>
              <div>{report?.total_order}</div>
            </div>
            <div className="new-header shortcut-item">
              <div>مجموع فروش پارچه:</div>
              <div>{report?.total_clothing} افغانی</div>
            </div>
            <div className="new-header shortcut-item">
              <div>مجموع فروش از دوخت:</div>
              <div>{report?.total_dokht} افغانی</div>
            </div>
            <div className="new-header shortcut-item">
              <div>مجموع فروش:</div>
              <div>{report?.total_price} افغانی</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Finance;
