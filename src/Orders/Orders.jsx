import React, { useRef } from "react";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useReactToPrint } from "react-to-print";
import { PrintForm } from "../Customers/CustomerNewOrder";
import useApi from "../Services/AxiosInstance";
import moment from "jalali-moment";
import { PrintFormView } from "../Customers/PrintFormView";
import jalaliMoment from "jalali-moment";

function CustomerOrderItem({ order, num, setTrigger }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const componentRef = useRef(null);
  const { patch: patch_order, deleter: delete_order } = useApi();

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

  const [alertModal, setAlertModal] = useState(false);

  const openAlert = () => {
    setAlertModal(true);
  };
  const closeAlert = () => {
    setAlertModal(false);
  };

  return (
    <>
            <Modal
          isOpen={alertModal}
          onRequestClose={closeAlert}
          contentLabel="Your Modal"
          className="alert-modal"
          overlayClassName="custom-overlay"
        >
          <div className="new-container">
              <div className="new-header">
                  آیا موافق با حذف این سفارش هستید؟
              </div>
              <button className="button-delete" onClick={() => {
                deleteOrder()
                closeAlert()
              }}>
                بله
              </button>
              <button className="button-no" onClick={() => {
                closeAlert()
              }}>
                نخیر
              </button>
          </div>

        </Modal>
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
              order={order}
            />
          </div>
        )}
        <button
          style={{
            backgroundColor: "green",
            width: "8rem",
            height: "3rem",
            fontSize: "1.4rem",
          }}
          onClick={() => handlePrint()}
        >
          چاپ
        </button>
        <div
          onClick={(e) => setShowPrint(!showPrint)}
          className="bg-red-200 text-center rounded-xl p-2 cursor-pointer"
        >
          <label className="cursor-pointer">
            {showPrint ? "بستن نمایش چاپ" : "نمایش فاکتور برای چاپ"}
          </label>
          <input type="checkbox" style={{ display: "none" }}></input>
        </div>
        {order.id && (
          <div
            className="print-former"
            style={{ display: showPrint ? "" : "none" }}
          >
            <PrintForm
              ref={componentRef}
              order={order}
            />
          </div>
        )}
      </Modal>
      <div className="order-items">
        <h4 onClick={() => openModal()}>{order.customer_details?.[0]?.id}</h4>
        <h4 onClick={() => openModal()}>
          {order.customer_details?.[0].first_name}{" "}
          {order.customer_details?.[0].last_name}
        </h4>
        <h4 onClick={() => openModal()}>{jalaliMoment(order.date_created, 'YYYY-MM-DD').format('jYYYY-jMM-jDD')}</h4>
        <h4 onClick={() => openModal()}>{jalaliMoment(order.date_delivery, 'YYYY-MM-DD').format('jYYYY-jMM-jDD')}</h4>
        <h4 onClick={() => openModal()}>{order.grand_total}</h4>
        <h4>
          <input
            type="checkbox"
            className="order-checkbox"
            defaultChecked={order.archieved}
            onClick={(e) => archiveOrder(e.target.checked)}
          ></input>
        </h4>
        {!order.archieved && (
          <h4 className="delete-order" onClick={() => {
            openAlert()
          }
          }>
            حذف
          </h4>
        )}
      </div>
    </>
  );
}

function Orders() {
  const { data: orders, get: get_orders } = useApi();
  const [trigger, setTrigger] = useState(new Date());
  const [archieved, setArchieved] = useState(false);

  const currentDate = new Date();
  const nextDay = new Date(currentDate);
  nextDay.setDate(currentDate.getDate() + 1);
  const fromattedDate = nextDay.toISOString().split("T")[0];

  const jalalitoday = moment(nextDay).format("jYYYY-jM-jD");

  useEffect(() => {
    archieved
      ? get_orders(
          `/orders/?date_delivery_min=${jalalitoday}&archieved=${true}&ordering=date_delivery`
        )
      : get_orders(`/orders/?&archieved=${false}&ordering=date_delivery`);
  }, [trigger, archieved]);

  return (
    <div className="new-container">
      <label>آرشیف:</label>
      <input
        type="checkbox"
        className="w-5 mt-2 mr-3 py-2 px-3 default-inputs focus:outline-none h-5"
        onClick={(e) => setArchieved(e.target.checked)}
      ></input>
      <div className="new-header">سفارشات</div>
      <div className="order-header">
        <h4>آی دی</h4>
        <h4>نام</h4>
        <h4>تاریخ سفارش</h4>
        <h4>تاریخ تحویل</h4>
        <h4>قیمت</h4>
        <h4>تکمیل شده</h4>
        <h4>بیشتر</h4>
      </div>
      {orders?.results.map((order, num) => (
        <CustomerOrderItem
          key={order.id}
          order={order}
          num={num}
          setTrigger={setTrigger}
        />
      ))}
    </div>
  );
}

export default Orders;
