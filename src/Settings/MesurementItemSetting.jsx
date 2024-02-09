import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import useApi from "../Services/AxiosInstance";
import { useForm } from "react-hook-form";

const MyItem = ({
  index,
  arr,
  handleEditField,
  handleDeleteField,
  handleEditList,
  handleAddListItem,
  handleDeleteListItem,
}) => {
  const [modalopen, setModalOpen] = useState(false);

  const open = () => {
    setModalOpen(true);
  };

  const close = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Modal
        isOpen={modalopen}
        onRequestClose={close}
        contentLabel="Your Modal"
        className="custom-modal"
        overlayClassName="custom-overlay"
      >
        <button onClick={close}>X</button>
        {arr?.list?.map((item, listIndex) => (
          <div className="new-form w-full flex mt-2" key={listIndex}>
            <input
              type="text"
              onKeyDown={(e) => {
                e.key == "Tab" && handleAddListItem(index);
              }}
              value={item}
              className="w-full py-2 px-3 default-inputs focus:outline-none"
              onChange={(e) => handleEditList(index, listIndex, e.target.value)}
              placeholder="برای ویرایش کلیک کنید."
            />
            <button
              onClick={() => handleDeleteListItem(index, listIndex)}
              type="text"
              tabIndex={-1}
              className="bg-rose-600 rounded-xl text-white plus-button-form"
            >
              حذف
            </button>
          </div>
        ))}
        <button
          onClick={() => handleAddListItem(index)}
          type="text"
          className="new-button"
        >
          جدید
        </button>
      </Modal>
      <div className="pr-3 mt-2 flex gap-3">
        <label className="mt-3">{index + 1}.</label>
        <input
          type="text"
          value={arr.name}
          className="w-full py-2 px-3 default-inputs focus:outline-none"
          placeholder="نام"
          onChange={(e) => handleEditField(index, "name", e.target.value)}
        />
        <input
          type="text"
          value={arr.default}
          className="w-full py-2 px-3 default-inputs focus:outline-none"
          placeholder="مقدار اولی"
          onChange={(e) => handleEditField(index, "default", e.target.value)}
        />
        <button
          onClick={() => open()}
          type="text"
          className="bg-emerald-600 rounded-xl text-white plus-button-form"
        >
          لست
        </button>
        <button
          onClick={() => handleDeleteField(index)}
          type="text"
          className="bg-rose-600 rounded-xl text-white plus-button-form"
        >
          حذف
        </button>
      </div>
    </>
  );
};

function MesurementItemSetting({ type, setTrigger }) {
  const initialField = { name: "", default: "", list: [] };
  const [fields, setFields] = useState([]);
  const { register, handleSubmit, reset, watch } = useForm();

  useEffect(() => {
    setFields(type.fields);
    reset({
      name: type?.name,
      required: type?.required,
    });
  }, [type]);

  const { patch } = useApi();

  const editMesure = (data) => {
    const Form = new FormData();
    Form.append("name", data.name);
    Form.append("required", data.required);
    Form.append("fields", JSON.stringify(fields));
    patch("/measurement-types/" + type.id + "/", Form, () => {
      setTrigger(new Date());
    });
  };

  const handleAddField = () => {
    setFields([...fields, { ...initialField }]);
  };

  const handleDeleteField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  const handleEditField = (index, key, value) => {
    const updatedFields = [...fields];
    updatedFields[index][key] = value;
    setFields(updatedFields);
  };

  const handleEditList = (index, listIndex, value) => {
    const updatedFields = [...fields];
    updatedFields[index].list[listIndex] = value;
    setFields(updatedFields);
  };

  const handleAddListItem = (index) => {
    const updatedFields = [...fields];
    updatedFields[index].list.push("");
    setFields(updatedFields);
  };

  const handleDeleteListItem = (index, listIndex) => {
    const updatedFields = [...fields];
    updatedFields[index].list.splice(listIndex, 1);
    setFields(updatedFields);
  };

  const setDefault = () => {
    watch("name") == "افغانی" &&
      setFields([
        { name: "قد", default: "", list: [""] },
        { name: "مدل دامن", default: "", list: [] },
        { name: "آستین", default: "", list: [] },
        { name: "مدل آستین", default: "", list: [] },
        { name: "شانه", default: "", list: [] },
        { name: "مدل دکمه", default: "", list: [] },
        { name: "یخن", default: "", list: [] },
        { name: "مدل یخن", default: "", list: [] },
        { name: "بغل", default: "", list: [] },
        { name: "مدل برتمان", default: "", list: [] },
        { name: "بر دامن", default: "", list: [] },
        { name: "کیسه رو", default: "", list: [] },
        { name: "قد شلوار", default: "", list: [] },
        { name: "کیسه شلوار", default: "", list: [] },
        { name: "دم پارچه", default: "", list: [] },
        { name: "توضیحات", default: "", list: [] },
      ]);
    watch("name") == "دریشی" &&
      setFields([
        { name: "شانه", default: "", list: [] },
        { name: "قد", default: "", list: [] },
        { name: "آستین", default: "", list: [] },
        { name: "بغل", default: "", list: [] },
        { name: "کمر", default: "", list: [] },
        { name: "باسن", default: "", list: [] },
        { name: "ران", default: "", list: [] },
        { name: "قد شلوار", default: "", list: [] },
        { name: "دم پا", default: "", list: [] },
        { name: "مدل", default: "", list: [] },
      ]);
  };

  return (
    <>
      <div className="new-header text-white">{type?.name}</div>
      <div className="new-container mx-auto">
        <div className="w-full grid grid-cols-5 mr-12">
          <div className="pr-3 mt-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              نام اندازه گیری:
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              disabled
              className="w-full py-2 px-3 default-inputs focus:outline-none"
              placeholder="برای ویرایش کلیک کنید."
            />
          </div>
          <div className="pr-3 mt-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              وضعیت:
            </label>
            <input
              {...register("required")}
              type="checkbox"
              className="w-5 mt-2 mr-3 py-2 px-3 default-inputs focus:outline-none h-5"
              placeholder="برای ویرایش کلیک کنید."
            />
          </div>
          <div className="pr-3 mt-2 col-start-5 col-span-1 ml-10">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              برگشت به حالت پیش فرض:
            </label>
            <input
              type="button"
              onClick={() => setDefault()}
              className="w-full py-2 px-3 focus:outline-none rounded-xl default-select-button cursor-pointer text-white"
              placeholder="برای ویرایش کلیک کنید."
              value="برگشت"
            />
          </div>
        </div>
        <label className="block mt-3 mr-3 text-gray-700 text-sm font-bold mb-2">
          مشخصات:
        </label>
        <div className="new-form w-full grid grid-cols-2">
          {fields?.map((arr, index) => (
            <MyItem
              index={index}
              arr={arr}
              handleEditField={handleEditField}
              handleEditList={handleEditList}
              handleDeleteField={handleDeleteField}
              handleAddListItem={handleAddListItem}
              handleDeleteListItem={handleDeleteListItem}
            />
          ))}
          <button
            onClick={handleAddField}
            type="text"
            className="plus-button mt-4 mr-2"
          >
            +
          </button>
        </div>
        <div className="new-footer">
          <button
            onClick={handleSubmit(editMesure)}
            tabIndex={-1}
            type="submit"
            className={
              "bg-emerald-900 text-white font-bold py-2 px-6 m-2 rounded-full focus:outline-none focus:shadow-outline"
            }
          >
            ذخیره
          </button>
        </div>
      </div>
    </>
  );
}

export default MesurementItemSetting;
