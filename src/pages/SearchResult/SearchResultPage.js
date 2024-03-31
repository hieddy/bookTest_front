import React, { useState, useEffect } from "react";
import { Table, Input, Space, Pagination, Select, AutoComplete } from "antd";
import axios from "axios";
// import MyAutoComplete from "./MyAutoComplete";

const { Search } = Input;
const { Option } = Select;

const autocompleteResult = async (value) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/search/autocomplete`,
      {
        params: {
          searchText: value,
          // searchType: "uncertain", // Specify the search type as uncertain
        },
      }
    );
    // console.log(response.data.results);
    return response.data.results.map((each) => ({
      label: each.titleName,
      value: each.titleName,
    }));
    // return { value: setOptions(response.data.results) };
  } catch (error) {
    console.log(error);
  }
};

const SearchResultPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchType, setSearchType] = useState("title");
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetchData();
    // }, [pagination.current]); // Fetch data when pagination changes
  }, [pagination.current, searchText, searchType, options]); // Fetch data when pagination changes

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3001/search/title`, {
        params: {
          page: pagination.current,
          pageSize: pagination.pageSize,
          searchText,
          searchType,
          // You can add more params as needed
        },
      });
      // console.log(searchText);
      // console.log(response);

      setData(response.data.results); // Assuming your API response has a "results" field with the data
      setPagination((prevPagination) => ({
        ...prevPagination,
        total: response.data.total, // Assuming your API returns total number of items
      }));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleSearch = (searchText) => {
    setSearchText(searchText);
    setPagination((prevPagination) => ({
      ...prevPagination,
      current: 1, // Reset pagination to the first page when searching
    }));
  };

  const handlePaginationChange = (page, pageSize) => {
    setPagination({ current: page, pageSize });
  };

  const handleSelectChange = (value) => {
    setSearchType(value);
  };

  const handleAutocompleteSearch = async (value) => {
    const objs = await autocompleteResult(value);
    // console.log("objs", objs);
    setOptions(value ? objs : []);
  };

  // const filteredData = data.filter((item) =>
  //   item.name.toLowerCase().includes(searchText.toLowerCase())
  // );

  const columns = [
    {
      title: "제목",
      dataIndex: "titleName",
      key: "titleName",
    },
    {
      title: "작가",
      dataIndex: "authorName",
      key: "authorName",
    },
    {
      title: "출판사",
      dataIndex: "publisherName",
      key: "publisherName",
    },
    {
      title: "가격",
      dataIndex: "price",
      key: "price",
      render: (value) => `₩${value}`,
    },
    {
      title: "이미지",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (imageUrl) => {
        if (imageUrl) {
          return <img src={imageUrl} alt="Book Cover" style={{ width: 100 }} />;
        } else {
          return "No Image";
        } // Render image
      },
    },
    {
      title: "소개",
      dataIndex: "bookIntroduction",
      key: "bookIntroduction",
    },
  ];

  return (
    <div style={{ height: "90%", width: "90%", margin: "0 auto" }}>
      <Space style={{ margin: 20 }}>
        <Select
          defaultValue="title"
          style={{ width: 100, height: 35 }}
          onChange={handleSelectChange}
        >
          <Option value="title">제목</Option>
          <Option value="author">작가</Option>
          <Option value="publisher">출판사</Option>
          <Option value="introduction">소개</Option>
        </Select>
        <AutoComplete
          popupMatchSelectWidth={252}
          onSelect={handleSelectChange}
          onChange={handleAutocompleteSearch}
          options={options}
          style={{ height: 40, width: 300 }}
        >
          <Input.Search
            size="large"
            placeholder="Searching for..."
            enterButton
            onSearch={handleSearch}
          />
        </AutoComplete>
      </Space>

      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={false} // Disable built-in pagination
        style={{
          width: "100%",
        }}
      />
      <Pagination
        style={{ marginTop: 16, marginBottom: 20, textAlign: "center" }}
        current={pagination.current}
        pageSize={pagination.pageSize}
        total={pagination.total}
        onChange={handlePaginationChange}
      />
    </div>
  );
  // return (
  //   <div style={{ height: "90%", width: "90%", margin: "0 auto" }}>
  //     <Space>
  //       <Select
  //         defaultValue="title"
  //         style={{ width: 100 }}
  //         onChange={handleSelectChange}
  //       >
  //         <Option value="title">제목</Option>
  //         <Option value="author">작가</Option>
  //         <Option value="publisher">출판사</Option>
  //         <Option value="introduction">소개</Option>
  //       </Select>
  //       <Search
  //         placeholder="Search by Title"
  //         allowClear
  //         onSearch={handleSearch}
  //         style={{
  //           width: 200,
  //           marginBottom: 16,
  //           marginTop: 20,
  //           marginLeft: 20,
  //         }}
  //       />
  //     </Space>
  //     <Space>
  //       <AutoComplete
  //       popupMatchSelectWidth={252}
  //       style={{
  //         width: 300,
  //       }}
  //       onSelect={handleSelectChange}
  //       onSearch={handleAutocompleteSearch}
  //       size="large"
  //       >

  //       </AutoComplete>
  //     </Space>
  //     <Table
  //       columns={columns}
  //       dataSource={data}
  //       loading={loading}
  //       pagination={false} // Disable built-in pagination
  //       style={{
  //         width: "100%",
  //       }}
  //     />

  //     <Pagination
  //       style={{ marginTop: 16, marginBottom: 20, textAlign: "center" }}
  //       current={pagination.current}
  //       pageSize={pagination.pageSize}
  //       total={pagination.total}
  //       onChange={handlePaginationChange}
  //     />
  //   </div>
  // );
};

export { SearchResultPage };
