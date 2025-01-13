import { toast } from "react-toastify";
import axios from "@/utils/axios";
import {addProductToCart, updateCart} from "@/store/Reducers/cartReducer";

export const asyncUpdateCart = () => async (dispatch) => {
    try {
      const { data } = await axios.get("/product/getcartproducts");
       dispatch(updateCart(data.data));
    } catch (error) {
      toast.error(error?.response?.data.message)
      console.log(error?.response?.data?.message || error);
    }
  };

  export const asyncAddProductToCart = (product) => async (dispatch) => {
    try {
     const {data} = await axios.post(`/product/addproducttocart/${product._id}`);
       dispatch(asyncUpdateCart());
       toast.success(data.message)
      
    } catch (error) {
      toast.error(error?.response?.data.message)
      console.log(error?.response?.data?.message || error);
    }
  };

  export const asyncRemoveProductFromCart = (product) => async (dispatch) => {
    try {
      const {data} =  await axios.post(`/product/removeproductfromcart/${product._id}`);
       dispatch(asyncUpdateCart());
       toast.success(data.message)
      
    } catch (error) {
      toast.error(error?.response?.data.message)
      console.log(error?.response?.data?.message || error);
    }
  };