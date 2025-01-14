import { useEffect, useState } from "react";
import MyDataTable from "@/components/Tables/MyDataTable";
import { asyncDeleteProduct } from "@/store/Actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import AddUpdateProduct from "../services/AddUpdateProduct";

const ProductManagement = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productReducer);
  const [isOpen, setisOpen] = useState(false);
  const [editRow, setEditRow] = useState({});
  const [reloadList, setReload] = useState(false);
  const [datalist, setDataList] = useState({ currentPage: 1 });

  const handleReload = () => setReload((prev) => !prev);

  const columns = [
    {
      name: "SNo.",
      selector: (_, index) => index + 1,
      cell: (_, index) => (
        <span>{(datalist.currentPage - 1) * 1 + (index + 1)}</span>
      ),
    },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Price", selector: (row) => row.price, sortable: true },
    { name: "Stock", selector: (row) => row.stock, sortable: true },
    { name: "Status", selector: (row) => row.status, sortable: true },
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
          <button
            onClick={() => {
              if (
                !window.confirm("Are you sure you want to delete this product?")
              )
                return;
              dispatch(asyncDeleteProduct(row)).then(() => handleReload());
            }}
          >
            Del
          </button>
        </div>
      ),
      ignoreRowClick: true,
      button: true,
    },
  ];

  return (
    <div>
      <MyDataTable
        reloadList={reloadList}
        columns={columns}
        data={products?.length > 0 ? products : []}
        getDataListURL={`/product/getallproducts?`}
        setisOpen={setisOpen}
        setReload={setReload}
        setDataList={setDataList}
        title="Product Management"
        isAdd={true}
      />
      {isOpen && (
        <AddUpdateProduct
          setisOpen={setisOpen}
          editRow={editRow}
          setEditRow={setEditRow}
          reloadList={reloadList}
          setReload={handleReload}
        />
      )}
    </div>
  );
};

export default ProductManagement;
