import axios from "@/utils/axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const MyDataTable = ({
  reloadList,
  columns,
  setisOpen,
  setReload,
  getDataListURL,
  setDataList,
}) => {
  const [list, setList] = useState({});
  const [page, setPage] = useState(1);
  const [countPerPage, setCountPerPage] = useState(5);
  const [searchText, setSearchText] = useState("");

  const changePageHandler = (cp) => {
    setCountPerPage(cp);
    setPage(1);
    setReload(true);
  };

  const getDataList = async () => {
    try {
      console.log(countPerPage, page, searchText);
      const response = await axios.get(
        `${getDataListURL}&size=${countPerPage}&page=${page}&search=${searchText}`
      );
      console.log(response.data);
      if (response.data.status === true) {
        setList(response.data.data);
        if (setDataList) {
          setDataList(response.data.data);
        }
        setReload(false);
      } else {
        setList({});
        if (setDataList) {
          setDataList({ rows: [], totalItems: 0 });
        }
      }
      setReload(false);
    } catch (error) {
      console.log(error.response?.data?.message || error);
    }
  };

  const customStyles = {
    highlightOnHoverStyle: {
      backgroundColor: "#f5f5f5",
      color: "#000",
      transition: "0.3s ease-in-out",
    },
    header: {
      style: {
        backgroundColor: "#e0e0e0",
        color: "#000",
        fontSize: "18px",
        fontWeight: "bold",
      },
    },
    headRow: {
      style: {
        backgroundColor: "#d6d6d6",
        borderBottomWidth: "1px",
        borderBottomColor: "#b0b0b0",
      },
    },
    headCells: {
      style: {
        color: "#000",
        fontWeight: "bold",
      },
    },
    rows: {
      style: {
        backgroundColor: "#fff",
        "&:nth-of-type(odd)": {
          backgroundColor: "#f9f9f9",
        },
        color: "#000",
        fontWeight: "normal",
      },
    },
    cells: {
      style: {
        color: "#000",
      },
    },
  };

  useEffect(() => {
    // if (reloadList) {
      getDataList();
    // }
    console.log("reloadList", reloadList);
    
  }, [reloadList, page, countPerPage, searchText]);

  return (
    <div>
      <DataTable
        customStyles={customStyles}
        columns={columns}
        data={list.rows || []}
        responsive
        subHeader
        highlightOnHover
        pagination
        paginationServer
        paginationTotalRows={list?.totalItems}
        paginationPerPage={countPerPage}
        paginationRowsPerPageOptions={[5, 10, 15]}
        paginationComponentOptions={{
          rowsPerPageText: "Records per page:",
          rangeSeparatorText: "",
          selectAllRowsItem: true,
          selectAllRowsItemText: "ALL",
        }}
        onChangePage={(page) => {
          setPage(page);
          setReload(true);
        }}
        onChangeRowsPerPage={(countPerPage) => changePageHandler(countPerPage)}
        subHeaderComponent={
          <div className="w-full flex justify-between items-center">
            <h2 className="text-lg font-bold text-black">Product List</h2>
            <div className="flex items-center space-x-4">
              <button
                className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800"
                onClick={() => setisOpen(true)}
              >
                Add
              </button>
              <input
                type="text"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  setReload(true);
                }}
                placeholder="Search"
                className="p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
          </div>
        }
      />
    </div>
  );
};

export default MyDataTable;
