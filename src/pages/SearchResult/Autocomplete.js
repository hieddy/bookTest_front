import React, { useState } from "react";
import { AutoComplete, Input } from "antd";
import axios from "axios";

const MyAutoComplete = () => {
  const [options, setOptions] = useState([]);

  const handleSearch = async (value) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/search/autocomplete`,
        {
          params: {
            searchText: value,
            searchType: "uncertain", // Specify the search type as uncertain
          },
        }
      );
      setOptions(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AutoComplete
      style={{ width: 200 }}
      options={options}
      onSearch={handleSearch}
      placeholder="Search by Title"
      allowClear
    />
  );
};

export { MyAutoComplete };
