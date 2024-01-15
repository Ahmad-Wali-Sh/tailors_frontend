import axios from "axios";
import React from "react";
import { AsyncPaginate } from "react-select-async-paginate";

function CustomerSearch({resetToNew, selectedCustomer}) {


  const handleLoadOptions = async (search, loadedOptions) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/customers/?search=${search}`);
      const options = response?.data.results.map((item) => ({
        first_name: item.first_name, // Adjust according to your API response
        last_name: item.last_name,   // Adjust according to your API response
        contact: item.contact,   // Adjust according to your API response
        id: item.id,   // Adjust according to your API response
        description: item.description,   // Adjust according to your API response
      }));

      console.log(loadedOptions);
      return {
        options,
      };
    } catch (error) {
      console.error('Error fetching data:', error);
      return {
        options: [],
      };
    }
  };

  const formatOptionLabel = ({
    first_name,
    last_name,
    contact,
    id,
    description,
  }) => (
    <div className="flex select-options">
      <div>{id}</div>
      <div>
        <strong>{`${first_name} ${last_name}`}</strong>
      </div>
      <div>{contact}</div>
      <div>{description}</div>
    </div>
  );

  

  return (
    <div className="new-container">
      <div className="flex w-full align-middle">
        <div className="w-full">
          <label className="block mb-2">جستوجو: </label>
          <AsyncPaginate
            loadOptions={handleLoadOptions}
            isClearable
            placeholder="جستوجو توسط اسم. شماره. آی دی یا توضیحات"
            autoFocus
            onChange={(selectedOption) => selectedCustomer(selectedOption)}
            formatOptionLabel={formatOptionLabel}
          />
        </div>
        <div className="w-16 mt-10 mr-5 text-bold text-xl plus-button" onClick={resetToNew}>+</div>
      </div>
    </div>
  );
}

export default CustomerSearch;
