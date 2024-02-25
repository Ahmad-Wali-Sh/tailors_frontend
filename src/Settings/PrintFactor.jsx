import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function PrintFactor() {
  const { register, handleSubmit, reset } = useForm();
  const [trigger, setTrigger] = useState("");
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/print-form/").then((res) => {
      console.log(res.data.results[0]);
      let form = res.data.results[0];
      reset({
        in_albaghi: form.in_albaghi,
        in_created: form.in_created,
        in_delivery: form.in_delivery,
        in_metraj: form.in_metraj,
        in_price_address: form.in_price_address,
        in_price_dokht: form.in_price_dokht,
        in_price_grand: form.in_price_grand,
        in_price_parcha: form.in_price_parcha,
        in_price_rasid: form.in_price_rasid,
        in_quantity: form.in_quantity,
        in_parcha: form.in_parcha,
        sar_albaghi: form.sar_albaghi,
        sar_created: form.sar_created,
        sar_delivery: form.sar_delivery,
        sar_metraj: form.sar_metraj,
        sar_price_address: form.sar_price_address,
        sar_price_dokht: form.sar_price_dokht,
        sar_price_grand: form.sar_price_grand,
        sar_price_parcha: form.sar_price_parcha,
        sar_price_rasid: form.sar_price_rasid,
        sar_quantity: form.sar_quantity,
        sar_parcha: form.sar_parcha,
        font_size: form.font_size,
        paper_width: form.paper_width
      });
    });
  }, [trigger]);

  const patcher = (data) => {
    const Form = new FormData();
    Form.append("font_size", data.font_size);
    Form.append("paper_width", data.paper_width);
    Form.append("in_albaghi", data.in_albaghi);
    Form.append("in_created", data.in_created);
    Form.append("in_delivery", data.in_delivery);
    Form.append("in_metraj", data.in_metraj);
    Form.append("in_price_address", data.in_price_address);
    Form.append("in_price_dokht", data.in_price_dokht);
    Form.append("in_price_grand", data.in_price_grand);
    Form.append("in_parcha", data.in_parcha);
    Form.append("in_price_parcha", data.in_price_parcha);
    Form.append("in_price_rasid", data.in_price_rasid);
    Form.append("in_quantity", data.in_quantity);
    Form.append("sar_albaghi", data.sar_albaghi);
    Form.append("sar_created", data.sar_created);
    Form.append("sar_delivery", data.sar_delivery);
    Form.append("sar_metraj", data.sar_metraj);
    Form.append("sar_price_address", data.sar_price_address);
    Form.append("sar_price_dokht", data.sar_price_dokht);
    Form.append("sar_price_grand", data.sar_price_grand);
    Form.append("sar_parcha", data.sar_parcha);
    Form.append("sar_price_parcha", data.sar_price_parcha);
    Form.append("sar_price_rasid", data.sar_price_rasid);
    Form.append("sar_quantity", data.sar_quantity);
    axios.patch("http://127.0.0.1:8000/api/print-form/1/", Form).then(() => {
      setTrigger(new Date());
      toast.success("موفقانه بود");
    });
  };
  return (
    <div className="new-container">
      <div className="new-header">فاکتور چاپ (سربرگ)</div>
      <div className="shortcuts-container">
        <div className="new-header shortcut-item">
          <div className="flex justify-between w-1/2 mr-12">
            <div>تاریخ سفارش </div>
            <input type="checkbox" {...register("sar_created")} />
          </div>
          <div className="flex justify-between w-1/2 mr-12">
            <div>تاریخ تحویل</div>
            <input type="checkbox" {...register("sar_delivery")} />
          </div>
        </div>
        <div className="new-header shortcut-item">
          <div className="flex justify-between w-1/2 mr-12">
            <div>تعداد</div>
            <input type="checkbox" {...register("sar_quantity")} />
          </div>
          <div className="flex justify-between w-1/2 mr-12">
            <div>الباقی</div>
            <input type="checkbox" {...register("sar_albaghi")} />
          </div>
        </div>
        <div className="new-header shortcut-item">
          <div className="flex justify-between w-1/2 mr-12">
            <div>پارچه</div>
            <input type="checkbox" {...register("sar_parcha")} />
          </div>
          <div className="flex justify-between w-1/2 mr-12">
            <div>متراژ</div>
            <input type="checkbox" {...register("sar_metraj")} />
          </div>
        </div>
        <div className="new-header shortcut-item">
          <div className="flex justify-between w-1/2 mr-12">
            <div>قیمت دوخت</div>
            <input type="checkbox" {...register("sar_price_dokht")} />
          </div>
          <div className="flex justify-between w-1/2 mr-12">
            <div>قیمت پارچه</div>
            <input type="checkbox" {...register("sar_price_parcha")} />
          </div>
        </div>
        <div className="new-header shortcut-item">
          <div className="flex justify-between w-1/2 mr-12">
            <div>قیمت کل</div>
            <input type="checkbox" {...register("sar_price_grand")} />
          </div>
          <div className="flex justify-between w-1/2 mr-12">
            <div>رسید</div>
            <input type="checkbox" {...register("sar_price_rasid")} />
          </div>
        </div>
        <div className="new-header shortcut-item">
          <div className="flex justify-between w-1/2 mr-12">
            <div>آدرس</div>
            <input type="checkbox" {...register("sar_price_address")} />
          </div>
        </div>
      </div>
      <div className="new-header">فاکتور چاپ (جزئیات)</div>
      <div className="shortcuts-container">
        <div className="new-header shortcut-item">
          <div className="flex justify-between w-1/2 mr-12">
            <div>تاریخ سفارش </div>
            <input type="checkbox" {...register("in_created")} />
          </div>
          <div className="flex justify-between w-1/2 mr-12">
            <div>تاریخ تحویل</div>
            <input type="checkbox" {...register("in_delivery")} />
          </div>
        </div>
        <div className="new-header shortcut-item">
          <div className="flex justify-between w-1/2 mr-12">
            <div>تعداد</div>
            <input type="checkbox" {...register("in_quantity")} />
          </div>
          <div className="flex justify-between w-1/2 mr-12">
            <div>الباقی</div>
            <input type="checkbox" {...register("in_albaghi")} />
          </div>
        </div>
        <div className="new-header shortcut-item">
          <div className="flex justify-between w-1/2 mr-12">
            <div>پارچه</div>
            <input type="checkbox" {...register("in_parcha")} />
          </div>
          <div className="flex justify-between w-1/2 mr-12">
            <div>متراژ</div>
            <input type="checkbox" {...register("in_metraj")} />
          </div>
        </div>
        <div className="new-header shortcut-item">
          <div className="flex justify-between w-1/2 mr-12">
            <div>قیمت دوخت</div>
            <input type="checkbox" {...register("in_price_dokht")} />
          </div>
          <div className="flex justify-between w-1/2 mr-12">
            <div>قیمت پارچه</div>
            <input type="checkbox" {...register("in_price_parcha")} />
          </div>
        </div>
        <div className="new-header shortcut-item">
          <div className="flex justify-between w-1/2 mr-12">
            <div>قیمت کل</div>
            <input type="checkbox" {...register("in_price_grand")} />
          </div>
          <div className="flex justify-between w-1/2 mr-12">
            <div>رسید</div>
            <input type="checkbox" {...register("in_price_rasid")} />
          </div>
        </div>
        <div className="new-header shortcut-item">
          <div className="flex justify-between w-1/2 mr-12">
            <div>آدرس</div>
            <input type="checkbox" {...register("in_price_address")} />
          </div>
        </div>
      </div>
      <div className="new-header">
            تنظیمات چاپ
      </div>
      <div className="shortcuts-container">
        <div className="new-header shortcut-item">
          <div className="flex justify-between w-1/2 mr-12">
            <div>فونت (px)</div>
            <input type="number" className="number-inputs" {...register("font_size")} />
          </div>
          <div className="flex justify-between w-1/2 mr-12">
            <div>عرض_کاغذ(px)</div>
            <input type="number" className="number-inputs"  {...register("paper_width")} />
          </div>
        </div>





      </div>
      <div>
        <button
          tabIndex={-1}
          onClick={handleSubmit(patcher)}
          type="submit"
          className={
            "bg-emerald-900 text-white font-bold py-2 px-6 m-2 rounded-full focus:outline-none focus:shadow-outline"
          }
        >
          ذخیره
        </button>
      </div>
    </div>
  );
}

export default PrintFactor;
