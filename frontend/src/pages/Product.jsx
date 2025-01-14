import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "@/Component/ProductCard";
import { asyncUpdateProduct } from "@/store/Actions/productAction";
import { asyncUpdateCart } from "@/store/Actions/cartAction";

// Custom Hook for Fetching Data
const useFetchData = (dispatch) => {
  const fetchData = useCallback(() => {
    dispatch(asyncUpdateProduct());
    dispatch(asyncUpdateCart());
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
};

const Product = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productReducer);
  useEffect(() => {

  }, [products]);
  // Fetch data using custom hook
  useFetchData(dispatch);

  return (
  <div className="font-[sans-serif] ">
  <div className="p-4 mx-auto lg:max-w-7xl md:max-w-4xl sm:max-w-xl max-sm:max-w-sm">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-xl:gap-4 gap-6">
    {
           products?.rows?.length > 0 && 
           products?.rows?.map((product) => (
             <ProductCard key={product.id} product={product} dispatch={dispatch} />
           ))
         }

    </div>
  </div>
</div>


  );
};

export default Product;
