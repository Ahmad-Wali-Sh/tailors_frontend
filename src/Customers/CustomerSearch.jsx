import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";

function CustomerSearch({ resetToNew, selectedCustomer, deleteCustomer }) {
  const [UniqueCach, setUniqueCach] = useState(new Date());
  const asyncPaginateRef = useRef(null);
  const handleLoadOptions = async (search, loadedOptions) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/customers/?search=${
          search ? search : "alskdfdj;klf"
        }`
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

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check if the key combination matches the desired shortcut
      if (event.ctrlKey && (event.key === 'f' || event.key === 'F' || event.key === 'ب')) {
        event.preventDefault()
        const element = document.querySelector('[tabIndex="1"]');
        // Focus on the element if it exists
        if (element) {
          element.focus();
        }
      }
    };

    // Add event listener for keydown event
    window.addEventListener('keydown', handleKeyDown);

    // Clean up by removing the event listener when component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []); 

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
    setUniqueCach(new Date());
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
  }, [selectedCustomerer]);

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
    <>
      <div
        className="plus-for-new"
        onClick={() => {
          resetToNew();
          asyncPaginateRef?.current?.setValue("");
          setSelectedCustomer({});
          setUniqueCach(new Date());
          clearSearchValue();
        }}
      >
        +
      </div>
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
              tabIndex={1}
              defaultOptions={[]}
              filterOption={() => true}
              controlShouldRenderValue={true}
              cacheUniq={UniqueCach}
              key={UniqueCach}
            />
          </div>
          <div
            className="w-16 mt-10 mr-5 plus-button"
            onClick={() => {
              deleteCustomer()
              asyncPaginateRef?.current?.setValue("");
              setSelectedCustomer({});
              setUniqueCach(new Date());
              clearSearchValue();
            }}
          >
            حذف
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerSearch;
