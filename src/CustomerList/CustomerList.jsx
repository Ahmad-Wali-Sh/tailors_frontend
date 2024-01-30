import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import useApi from "../Services/AxiosInstance";
import jalaliMoment from "jalali-moment";

function CustomerItem({ customer, num, deleteCustomer }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const componentRef = useRef(null);
  console.log(customer);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  

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
        {customer?.measurements?.map((mesure) => (
            <>
        <table className="mesurements-forms">
        {Object.entries(mesure?.data).map(([key, value]) => (
        <div key={key} className="p-2 border">
          <div className="font-semibold">{key}</div>
          <div>{value}</div>
        </div>
      ))}
        </table>
            </>
        ))}
      </Modal>
      <div className="customer-item">
        <h4 onClick={openModal}>{num + 1}</h4>
        <h4 onClick={openModal}>
          {customer.first_name} {customer.last_name}
        </h4>
        <h4 onClick={openModal}>{customer.id}</h4>
        <h4 onClick={openModal}>{customer.contact}</h4>
        <h4 onClick={openModal}>
          {jalaliMoment(customer?.created).format("jYYYY-jMM-jDD")}
        </h4>
        <h4 onClick={openModal}>
          {jalaliMoment(customer?.updated).format("jYYYY-jMM-jDD")}
        </h4>
        <h4
          className="text-red-700"
          onClick={() => {
            deleteCustomer(customer.id);
          }}
        >
          حذف
        </h4>
      </div>
    </>
  );
}

function CustomerList() {
  const {
    data: customer,
    get: get_customer,
  } = useApi();
  const [page, setPage] = useState(1);
  const { register, watch, reset } = useForm();
  const { deleter: delete_customer, data} = useApi()
  const [trigger, setTrigger] = useState(new Date())

  useEffect(() => {
    reset({
      search: "",
    });
  }, []);

  useEffect(() => {
    get_customer(`/customers/?search=${watch("search")}&page=${page}`);
  }, [watch("search"), page, trigger]);

  const deleteCustomer = (id) => {
    delete_customer(`/customers/${id}/`, () => {
        setTrigger(new Date())
    });
  };

  return (
    <div className="new-container">
      <div className="new-header">مشتریان</div>
      <div className="flex mb-4">
        <div className="w-1/3 pr-3">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            جستوجو:
          </label>
          <input
            type="text"
            {...register("search")}
            className="w-full py-2 px-3 default-inputs focus:outline-none"
            placeholder="برای ویرایش کلیک کنید."
          />
        </div>
      </div>
      <div className="order-header">
        <h4>شماره</h4>
        <h4>نام</h4>
        <h4>آی دی</h4>
        <h4>شماره تماس</h4>
        <h4>تاریخ ثبت</h4>
        <h4>تاریخ آپدیت</h4>
        <h4>حذف</h4>
      </div>
      {customer?.results?.map((customerItem, num) => (
        <CustomerItem
          customer={customerItem}
          num={num}
          deleteCustomer={deleteCustomer}
        />
      ))}
      <div className="new-footer">
        <div className="w-full pagination-container">
          <div className="pagination-buttons">
            {page > 1 && <div
              className="paginate-button"
              onClick={() => {
               page > 1 && setPage((prev) => prev - 1);
              }}
            >
              {"<"}
            </div>}
            
              {customer?.next != null && <div
                className="paginate-button"
                onClick={() => {
                  setPage((prev) => prev + 1);
                }}
              >
                {">"}
              </div>}
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerList;
