import React, { useRef } from "react";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useReactToPrint } from "react-to-print";
import useApi from "../Services/AxiosInstance";
import { PrintForm } from "./CustomerNewOrder";
import { PrintFormView } from "./PrintFormView";

function CustomerOrderItem({ order, CustomerInformation, num, setTrigger }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const componentRef = useRef(null);
  const { data: ordertypedata, get: get_order_type_data, dataSeter } = useApi();
  const { patch: patch_order, deleter: delete_order } = useApi();
  useEffect(() => {
    CustomerInformation?.id
      ? get_order_type_data("/measurement-types/" + order?.measurement_type)
      : dataSeter([]);
  }, [CustomerInformation?.id, order.measurement_type]);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const archiveOrder = (checked) => {
    const Form = new FormData();
    Form.append("archieved", checked);
    patch_order("/orders/" + order.id + "/", Form, () => {
      setTrigger(new Date());
    });
  };

  const deleteOrder = () => {
    delete_order("/orders/" + order.id, () => {
      setTrigger(new Date());
    });
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [showPrint, setShowPrint] = useState(false)

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
        {order.id && (
          <div className="print-former">
            <PrintFormView
              CustomerInformation={CustomerInformation}
              orderStyle={ordertypedata}
              order={order}
            />
          </div>
        )}
        <button
          style={{ backgroundColor: "green", width: "8rem", height: "3rem", fontSize: '1.4rem' }}
          onClick={() => handlePrint()}
          >
          چاپ
        </button>
          <div onClick={(e) => setShowPrint(!showPrint)} 
          className="bg-red-200 text-center rounded-xl p-2 cursor-pointer">
        <label className="cursor-pointer">{showPrint ? 'بستن نمایش چاپ' : 'نمایش فاکتور برای چاپ'}</label>
        <input
          type="checkbox"
          style={{display: 'none'}}
          >
        </input>
          </div>
        {order.id && (
          <div className="print-former" style={{ display: showPrint ? '' : 'none'}}>
            <PrintForm
              ref={componentRef}
              CustomerInformation={CustomerInformation}
              orderStyle={ordertypedata}
              order={order}
            />
          </div>
        )}
      </Modal>
      <div className="order-items">
        <h4 onClick={() => openModal()}>{num + 1}</h4>
        <h4 onClick={() => openModal()}>{order.measurements_name}</h4>
        <h4 onClick={() => openModal()}>{order.date_created}</h4>
        <h4 onClick={() => openModal()}>{order.date_delivery}</h4>
        <h4 onClick={() => openModal()}>{order.grand_total}</h4>
        <h4>
          <input
            type="checkbox"
            className="order-checkbox"
            defaultChecked={order.archieved}
            onClick={(e) => archiveOrder(e.target.checked)}
          ></input>
        </h4>
        <h4 className="delete-order" onClick={() => deleteOrder()}>
          حذف
        </h4>
      </div>
    </>
  );
}

function CustomerOrders({ CustomerInformation }) {
  const { data: CustomerOrders, get: get_customer_orders } = useApi();
  const [trigger, setTrigger] = useState(new Date());

  useEffect(() => {
    CustomerInformation?.id &&
      get_customer_orders(
        "/orders/?customer=" +
          CustomerInformation?.id +
          "&ordering=date_delivery"
      );
    console.log("triggerd");
  }, [CustomerInformation?.id, trigger]);

  return (
    <div className="new-container">
      <div className="new-header">تاریخچه سفارشات</div>
      <div className="order-header">
        <h4>No</h4>
        <h4>نوعیت سفارش</h4>
        <h4>تاریخ سفارش</h4>
        <h4>تاریخ تحویل</h4>
        <h4>قیمت</h4>
        <h4>تکمیل شده</h4>
        <h4>بیشتر</h4>
      </div>
      {CustomerOrders?.results.map((order, num) => (
        <CustomerOrderItem
          key={order.id}
          order={order}
          num={num}
          CustomerInformation={CustomerInformation}
          setTrigger={setTrigger}
        />
      ))}
    </div>
  );
}

export default CustomerOrders;
