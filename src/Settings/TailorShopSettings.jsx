import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useApi from "../Services/AxiosInstance";
import { EnglishNumeric } from "../Services/EnglishNumeric";

function TailorShopSettings() {
  const { register, handleSubmit, reset} = useForm()

  const { data, get, patch} = useApi()



  useEffect(() => {
    get('/tailorshop/1/')
  }, [])

  useEffect(() => {
    data && reset({
      name: data.name,
      contact: EnglishNumeric(data.contact),
      address: data.address,
      description: data.description
    })
  }, [data])

  const editTailorShop = (data) => {
    const Form = new FormData()
    Form.append('name', data.name)
    Form.append('contact',  data.contact)
    Form.append('address', data.address)
    Form.append('description', data.description)
    
    patch('/tailorshop/1/', Form, () => {
      get('/tailorshop/1/')
    })
  }


  return (
    <div className="new-container">
      <div className="new-header">اطلاعات عمومی خیاطی</div>
      <form onSubmit={handleSubmit(editTailorShop)}>


      <div className="new-form w-full grid grid-cols-3">
        <div className="pr-3 mt-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            نام خیاطی:
          </label>
          <input
            type="text"
            {...register('name', {required: true})}
            className="w-full py-2 px-3 default-inputs focus:outline-none"
            placeholder="برای ویرایش کلیک کنید."
          />
        </div>
        <div className="pr-3 mt-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            شماره (ها):
          </label>
          <input
            {...register('contact', { required: true})}
            type="text"
            className="w-full py-2 px-3 default-inputs focus:outline-none"
            placeholder="برای ویرایش کلیک کنید."
          />
        </div>
        <div className="pr-3 mt-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            آدرس:
          </label>
          <input
            type="text"
            {...register('address', { required: true})}
            className="w-full py-2 px-3 default-inputs focus:outline-none"
            placeholder="برای ویرایش کلیک کنید."
          />
        </div>
      </div>
      <div className="new-form w-full grid grid-cols-1">
        <div className="pr-3 w-full mt-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            توضیحات:
          </label>
          <input
          {...register('description')}
            type="text"
            className="w-full py-2 px-3 default-inputs focus:outline-none"
            placeholder="برای ویرایش کلیک کنید."
          />
        </div>
      </div>
      <div className="new-footer">
      <button
          tabIndex={-1}
          type="submit"
          className={`bg-emerald-900 text-white font-bold py-2 px-6 m-2 rounded-full focus:outline-none focus:shadow-outline"`}
          >
              ذخیره
          </button>
      </div>
            </form>
    </div>
  );
}

export default TailorShopSettings;
