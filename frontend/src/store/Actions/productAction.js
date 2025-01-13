import { toast } from 'react-toastify';
import axios from '@/utils/axios';
import { updateProducts } from '@/store/Reducers/productReducer';

export const asyncUpdateProduct = () => async (dispatch) => {
    try {
      const { data } = await axios.get("/product/getallproducts");
       dispatch(updateProducts(data.data))
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message || error);
    }
  };

  export const asyncAddUpdateProduct = (product) => async (dispatch) => {
    try {
      const { data } = await axios.post("/product/addupdateproduct",product);
       dispatch(updateProducts(data.data))
       toast.success(data.message)
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error.response.data.message || error);
    }
  };

  export const asyncDeleteProduct = (product) => async (dispatch) => {
    try {
      const { data } = await axios.post("/product/deleteproduct",product);
       dispatch(updateProducts(data.data))
       toast.success(data.message)
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error.response.data.message || error);
    }
  };