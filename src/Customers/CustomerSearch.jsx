import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";

function CustomerSearch({ resetToNew, selectedCustomer }) {
  const [UniqueCach, setUniqueCach] = useState(new Date())
  const asyncPaginateRef = useRef(null)
  const handleLoadOptions = async (search, loadedOptions) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/customers/?search=${search ? search : 'alskdfdj;klf'}`
      );
      const options = response?.data.results.map((item) => ({
        first_name: item.first_name,
        last_name: item.last_name,
        contact: item.contact,
        id: item.id,
        description: item.description,
        measurements: item.measurements,
        created: item.created,
        updated: item.updated,
      }));
      return {
        options,
      };
    } catch (error) {
      console.error("Error fetching data:", error);
      return {
        options: [],
      };
    }
  };

  const [value, setValue] = useState({
    first_name: "",
    last_name: "",
    contact: "",
    description: "",
    id: "",
    value: "",
  });

  const [selectedCustomerer, setSelectedCustomer] = useState({});

  const handleselectedCustomer = (data) => {
    setSelectedCustomer(data);
    setUniqueCach(new Date())
  };

  useEffect(() => {
    setValue({
      first_name: selectedCustomerer?.first_name || "",
      last_name: selectedCustomerer?.last_name || "",
      contact: selectedCustomerer?.contact || "",
      description: selectedCustomerer?.description || "",
      id: selectedCustomerer?.id || "",
      value: "",
    });
  }, [selectedCustomerer])

  const clearSearchValue = () => {
    setValue((prevValue) => ({
      ...prevValue,
      value: "",
    }));
  };

  const formatOptionLabel = ({
    first_name,
    last_name,
    contact,
    id,
    description,
  }) => (
    <div className="flex select-options">
      <div className="w-1/6">{id}</div>
      <div className="w-1/3">
        <strong>{`${first_name} ${last_name}`}</strong>
      </div>
      <div className="w-1/3">{contact}</div>
      <div className="w-1/3">{description}</div>
    </div>
  );

  return (
    <div className="new-container">
      <div className="flex w-full align-middle">
        <div className="w-full">
          <label className="block mb-2">جستوجو: </label>
          <AsyncPaginate
            ref={asyncPaginateRef}
            loadOptions={handleLoadOptions}
            placeholder="جستوجو توسط اسم. شماره. آی دی یا توضیحات"
            autoFocus
            onChange={(selectedOption) => {
              selectedCustomer(selectedOption);
              handleselectedCustomer(selectedOption);
            }}
            value={value}
            formatOptionLabel={formatOptionLabel}
            autoClearSearchValue={true}
            defaultOptions={[]} 
            filterOption={() => true}
            controlShouldRenderValue={true}
            cacheUniq={UniqueCach}
            key={UniqueCach}
          />
        </div>
        <div
          className="w-16 mt-10 mr-5 text-bold text-xl plus-button"
          onClick={() => {
            resetToNew()
            asyncPaginateRef?.current?.setValue('')
            setSelectedCustomer({})
            setUniqueCach(new Date())
            clearSearchValue()
          }
          }
        >
          +
        </div>
      </div>
    </div>
  );
}

export default CustomerSearch;
