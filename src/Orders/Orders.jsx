import React, { useRef } from "react";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useReactToPrint } from "react-to-print";
import useApi from "../Services/AxiosInstance";

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
        {/* {order.id && <div className="new-container print-container">
        <PrintForm ref={componentRef} CustomerInformation={CustomerInformation} orderStyle={ordertypedata} order={order}/>
          </div>} */}
          <button style={{backgroundColor: 'green', width:'8rem', height:'3rem'}} onClick={() => handlePrint()}>چاپ</button>
      </Modal>
      <div className="order-items">
        <h4 onClick={() => openModal()}>{num + 1}</h4>
        <h4 onClick={() => openModal()}>اسم</h4>
        <h4 onClick={() => openModal()}>{order.date_created}</h4>
        <h4 onClick={() => openModal()}>{order.date_delivery}</h4>
        <h4 onClick={() => openModal()}>{order.price}</h4>
        <h4>
        <input type='checkbox' className="order-checkbox" defaultChecked={order.archieved} onClick={(e) => archiveOrder(e.target.checked)}></input>
        </h4>
        <h4 className="delete-order" onClick={() => deleteOrder()}>حذف</h4>

      </div>
    </>
  );
}

function Orders() {
  const {data: orders, get: get_orders} = useApi()

  useEffect(()=> {
    get_orders('/orders')
  }, [])

  return (
    <div className="new-container">
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
        <CustomerOrderItem key={order.id} order={order} num={num}/>
      ))}
    </div>
  );
}

export default Orders;
