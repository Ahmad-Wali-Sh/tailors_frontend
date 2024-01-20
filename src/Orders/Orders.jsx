import React, { useRef } from "react";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useReactToPrint } from "react-to-print";
import { PrintForm } from "../Customers/CustomerNewOrder";
import useApi from "../Services/AxiosInstance";
import moment from "jalali-moment";

function CustomerOrderItem({order, num, setTrigger}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const componentRef = useRef(null)
  const { patch: patch_order, deleter: delete_order} = useApi()


  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const archiveOrder = (checked) => {
    const Form = new FormData()
    Form.append('archieved', checked)
    patch_order('/orders/' + order.id + '/', Form, () => {
      setTrigger(new Date())
    })
  }

  const deleteOrder = () => {
    delete_order('/orders/' + order.id, () => {
      setTrigger(new Date())
    })
  }

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });



  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Your Modal"
        className="custom-modal"
        overlayClassName="custom-overlay"
      >
        <button onClick={closeModal}>X</button>
        {order.id && <div className="new-container print-container">
        <PrintForm ref={componentRef} order={order}/>
          </div>}
          <button style={{backgroundColor: 'green', width:'8rem', height:'3rem'}} onClick={() => handlePrint()}>چاپ</button>
      </Modal>
      <div className="order-items">
        <h4 onClick={() => openModal()}>{num + 1}</h4>
        <h4 onClick={() => openModal()}>{order.customer_details?.[0].first_name} {order.customer_details?.[0].last_name}</h4>
        <h4 onClick={() => openModal()}>{order.date_created}</h4>
        <h4 onClick={() => openModal()}>{order.date_delivery}</h4>
        <h4 onClick={() => openModal()}>{order.grand_total}</h4>
        <h4>
        <input type='checkbox' className="order-checkbox" defaultChecked={order.archieved} onClick={(e) => archiveOrder(e.target.checked)}></input>
        </h4>
        {!order.archieved && <h4 className="delete-order" onClick={() => deleteOrder()}>حذف</h4>}

      </div>
    </>
  );
}

function Orders() {
  const {data: orders, get: get_orders} = useApi()
  const [trigger, setTrigger] = useState(new Date())
  const [archieved, setArchieved] = useState(false)

  const currentDate = new Date();
  const nextDay = new Date(currentDate)
  nextDay.setDate(currentDate.getDate() + 1)
  const fromattedDate = nextDay.toISOString().split('T')[0]

  const jalalitoday = moment(nextDay).format('jYYYY-jM-jD')
  console.log(jalalitoday);

  useEffect(()=> {
    console.log(fromattedDate);
    get_orders(`/orders/?date_delivery_min=${jalalitoday}&archieved=${archieved ? '' : archieved}&ordering=date_delivery`)
  }, [trigger, archieved])

  return (
    <div className="new-container">
      <label>شامل تکمیل شده ها: </label>
      <input type='checkbox' onClick={(e) => setArchieved(e.target.checked)}></input>
      <div className="new-header">سفارشات</div>
      <div className="order-header">
        <h4>No</h4>
        <h4>نام</h4>
        <h4>تاریخ سفارش</h4>
        <h4>تاریخ تحویل</h4>
        <h4>قیمت</h4>
        <h4>تکمیل شده</h4>
        <h4>بیشتر</h4>
      </div>
      {orders?.results.map((order, num) => (
        <CustomerOrderItem key={order.id} order={order} num={num} setTrigger={setTrigger}/>
      ))}
    </div>
  );
}

export default Orders;
