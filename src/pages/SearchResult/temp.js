import React, { useEffect, useState } from "react";
import { Table } from "antd";
import qs from "qs";
import { Input, Space } from "antd";
import axios from "axios";

const { Search } = Input;

const onSearch = async (value, _e, info) => {
  console.log(info?.source, value);
  // const searchData = await axios.get(
  //   `http://${process.env.REACT_APP_BACKEND_URL}/search/title?query=${value}`
  // );

  // console.log("search data", searchData);

  SearchResultPage(value);
};

const columns = [
  {
    title: "titleName",
    dataIndex: "titleName",
    sorter: true,
    width: "20%",
  },
  {
    title: "authorName",
    dataIndex: "authorName",
    filters: [
      {
        text: "Male",
        value: "male",
      },
      {
        text: "Female",
        value: "female",
      },
    ],
    width: "20%",
  },
  {
    title: "publisherName",
    dataIndex: "publisherName",
  },
  {
    title: "price",
    dataIndex: "price",
  },
  {
    title: "imageUrl",
    dataIndex: "imageUrl",
  },
  {
    title: "bookIntroduction",
    dataIndex: "bookIntroduction",
  },
];
const getRandomuserParams = (params) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.pageNo,
  ...params,
});
const SearchResultPage = (inputVaue) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      pageNo: 1,
      pageSize: 10,
    },
  });
  // const inputValue = inputVaue
  const fetchData = (inputVaue) => {
    setLoading(true);

    const inputValue = inputVaue;
    fetch(
      `http://${
        process.env.REACT_APP_BACKEND_URL
      }/search/title?query=${inputValue}&${qs.stringify(
        getRandomuserParams(tableParams)
      )}`
    )
      .then((res) => res.json())
      .then(({ total, sourceList: results }) => {
        console.log(results, total);
        setData(results);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: 200,
            // 200 is mock data, you should read it from server
            // total: data.totalCount,
          },
        });
      });
  };
  useEffect(() => {
    fetchData(inputVaue);
  }, [JSON.stringify(tableParams)]);
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };
  return (
    <>
      <Space direction="vertical">
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          enterButton
        />
      </Space>
      <Table
        columns={columns}
        // rowKey={(record) => record.login.uuid}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </>
  );
};
export { Temp };
