import React from 'react'

function CustomerOrders() {
  return (
    <div className='new-container'>
        <div className='new-header'>
            تاریخچه سفارشات
        </div>
        <div className='order-header'>
            <h4>No</h4>
            <h4>نوعیت سفارش</h4>
            <h4>تاریخ سفارش</h4>
            <h4>تاریخ تحویل</h4>
            <h4>قیمت</h4>
            <h4>وضعیت</h4>
            <h4>بیشتر</h4>
        </div>
        <div className='order-items'>
            <h4>1</h4>
            <h4>افغانی</h4>
            <h4>1402/2/3</h4>
            <h4>1401/23/12</h4>
            <h4>350 AF</h4>
            <h4>جدید</h4>
            <h4>حذف</h4>
        </div>
    </div>
  )
}

export default CustomerOrders