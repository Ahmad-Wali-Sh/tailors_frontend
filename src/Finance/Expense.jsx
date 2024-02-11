import React, { useEffect, useState } from "react";

function Expense() {
  const [filterListShow, setFilterListShow] = useState(true)


  useEffect(() => {
    console.log(filterListShow);

  }, [filterListShow])
  return (
    <>
    <div className="new-container">
      <div className="new-header">مصارف و خریداری - جدید</div>
    </div>
    <div className="new-container">
      <div className="flex gap-6 cursor-pointer">
      <div className="text-lg" onClick={() => setFilterListShow((prev) => !prev)}>{filterListShow ? '<' : '>'}</div>
      </div>
      <div className="new-header">مصارف و خریداری - لست فلتر</div>
      <div className="flex mb-4" style={{display: !filterListShow && 'none'}}>
        <div className="w-1/3 pr-3">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            نام:
          </label>
          <input className="w-full py-2 px-3 default-inputs focus:outline-none" />
        </div>
        <div className="w-1/3 pr-3">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            حالت پرداختی:
          </label>
          <select className="w-full py-2 px-3 default-inputs focus:outline-none">
            <option>همه</option>
            <option>پرداخت شده</option>
            <option>پرداخت نشده</option>
          </select>
        </div>
        <div className="w-1/3 pr-3">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            نوعیت:
          </label>
          <select className="w-full py-2 px-3 default-inputs focus:outline-none">
            <option>همه</option>
            <option>مصارف</option>
            <option>خریداری</option>
            <option>معاشات</option>
            <option>کرایه</option>
            <option>برق</option>
          </select>
        </div>
      </div>
      <div className="flex mb-4" style={{display:  !filterListShow &&'none'}}>
        <div className="w-1/3 pr-3">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            لست به اساس زمان:
          </label>
          <select className="w-full py-2 px-3 default-inputs focus:outline-none">
            <option></option>
            <option>همه زمان ها</option>
            <option>امسال</option>
            <option>این ماه</option>
            <option>این هفته</option>
            <option>امروز</option>
          </select>
        </div>
        <div className="w-1/3 pr-3">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            از تاریخ:
          </label>
          <input className="w-full py-2 px-3 default-inputs focus:outline-none" />
        </div>
        <div className="w-1/3 pr-3">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            تا تاریخ:
          </label>
          <input className="w-full py-2 px-3 default-inputs focus:outline-none" />
        </div>
      </div>
    </div>

    <div className="new-container">
        <div className="new-header">
            مصارف و خریداری - لست
        </div>
    </div>
    </>
  );
}

export default Expense;
