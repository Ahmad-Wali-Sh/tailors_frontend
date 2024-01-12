import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import New from "../New/New";

function Customers() {
  const loadOptions = async (search, loadedOptions, { page }) => {

    const data = Array.from({ length: 10 }, (_, index) => ({
      value: `${search}-${page}-${index}`,
      label: `Option ${search}-${page}-${index}`,
      firstName: `حسیب الله${index}`,
      lastName: `شریفی${index}`,
      contact: `۰۷۱۲۳۲۱۳۳۲${index}`,
      id: index + 1,
      description: `Description ${index}`,
    }));

    return {
      options: data,
    };
  };
  const formatOptionLabel = ({ firstName, lastName, contact, id, description }) => (
    <div className="flex select-options">
      <div>{id}</div>
      <div><strong>{`${firstName} ${lastName}`}</strong></div>
      <div>{contact}</div>
      <div>{description}</div>
    </div>
  );

  return (
    <>
    <div className="new-container">
      <div>
        <label className="block mb-2">جستوجو: </label>
        <AsyncPaginate
          loadOptions={loadOptions}
          isClearable
          placeholder='جستوجو توسط اسم. شماره. آی دی یا توضیحات'
          cacheOptions
          autoFocus
          additional={{
            page: 1,
          }}
          onChange={(selectedOption) => console.log(selectedOption)}
          filterOption={() => true}
          formatOptionLabel={formatOptionLabel}
          loadOptionsOnMenuOpen={true}
          />
      </div>
    </div>
      <New />
    </>
  );
}

export default Customers;
