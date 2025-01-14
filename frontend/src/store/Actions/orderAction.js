import { toast } from "react-toastify";
import axios from "../../utils/axios";
import { updateOrder } from "../Reducers/OrderReducer";

  export const asyncPlaceOrder = (order) => async () => {
    try {
      const { data } = await axios.post("/user/placeorder",order);
       if(data.status === true){
        toast.success(data.message)
       }else{
        toast.error(data.message)
       }
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error.response.data.message || error);
    }
  };

  export const asyncGetMyOrders = () => async (dispatch) => {
    try {
      const { data } = await axios.get("/user/getmyorders");
       if(data.status === true){
      console.log(data.data)
        dispatch(updateOrder(data.data))
       }else{
        toast.error(data.message)
       }
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error.response.data.message || error);
    }
  };

  
  export const asyncUpdateOrder = (order) => async () => {
    try {
      const { data } = await axios.put("/order/updateorder/"+order._id,order);
       if(data.status === true){
        toast.success(data.message)
       }else{
        toast.error(data.message)
       }
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error.response.data.message || error);
    }
  };