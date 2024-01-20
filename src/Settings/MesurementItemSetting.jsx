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
  const initialField = { name: "", default: "", list: []};
  const [fields, setFields] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    setFields(type.fields);
    reset({
      name: type?.name,
    });
  }, [type]);

  const { patch } = useApi();

  const editMesure = (data) => {
    const Form = new FormData();
    Form.append("name", data.name);
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

  return (
    <>
      <div className="new-header text-white">{type?.name}</div>
        <div className="new-container">
          <div className="new-form w-full grid grid-cols-3">
            <div className="pr-3 mt-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                نام اندازه گیری:
              </label>
              <input
                {...register("name", { required: true })}
                type="text"
                className="w-full py-2 px-3 default-inputs focus:outline-none"
                placeholder="برای ویرایش کلیک کنید."
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
