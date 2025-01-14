import { useEffect, useState } from "react";
import MyDataTable from "@/components/Tables/MyDataTable";
import {
  asyncUpdateProduct,
} from "@/store/Actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import UpdateOrder from "../services/UpdateOrder";

const OrederManagement = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productReducer);
  const [isOpen, setisOpen] = useState(false);
  const [editRow, setEditRow] = useState({});
  const [reloadList, setReload] = useState(true);
  const [datalist, setDataList] = useState({ currentPage: 1 });
 
  const columns = [
    {
      name: "SNo.",
      selector: (_, index) => index + 1,
      // cell: (_, index) => (
      //   <span>{(datalist.currentPage - 1) * 1 + (index + 1)}</span>
      // ),
    },
    { name: "Items", selector: (row) => row.items.map((item) => item.productId.name+","), sortable: true },
    { name: "Payment Method", selector: (row) => row.paymentMethod, sortable: true },
    { name: "Order Status", selector: (row) => row.orderStatus, sortable: true },
    { name: "Total Amount", selector: (row) => row.totalAmount, sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => {
              setisOpen(true);
              setEditRow(row);
            }}
          >
            Edit
          </button>
        </div>
      ),
      ignoreRowClick: true,
      // allowOverflow: true,
      button: true,
    },
  ];

  useEffect(() => {
    dispatch(asyncUpdateProduct());
    
  }, [dispatch, editRow?._id, products?.length, reloadList]);

  return (
    <div>
      <MyDataTable
      reloadList={true}
        columns={columns}
        data={products?.length > 0 ? products : []}
        getDataListURL={`/order/getallorders?`}
        setisOpen={setisOpen}
        setReload={setReload}
        setDataList={setDataList}
        title="Oreder Management"
      />
      {isOpen && (
        <UpdateOrder
          setisOpen={setisOpen}
          editRow={editRow}
          setEditRow={setEditRow}
          reloadList={reloadList}
          setReload={setReload}
        />
      )}
    </div>
  );
};

export default OrederManagement;
