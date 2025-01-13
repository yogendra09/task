import axios from "@/utils/axios";
import { addUser, removeUser, updateAdmin } from "@/store/Reducers/userReducer";
import { toast } from "react-toastify";
import {asyncUpdateProduct} from "@/store/Actions/productAction"
export const asyncCurrentUser = () => async (dispatch) => {
  try {
    const { data } = await axios.post("/user", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
   
    
    if (data.status == true) {
      // console.log(data.data);
      dispatch(addUser(data.data));
      if(data?.data?.role === "admin"){
        dispatch(updateAdmin())
      }
    }else{
      dispatch(removeUser());
      localStorage.removeItem("token");
      return;
    }
    
  } catch (error) {
    toast.error(error.response.data.message|| "unauthorized")
    // console.log(error.response.data.message || error);
  }
};
export const asyncUserRegister = (newUser) => async (dispatch) => {
  try {
    const { data } = await axios.post("/user/register", newUser);
    localStorage.setItem("token", data.token);
    dispatch(asyncCurrentUser());
  } catch (error) {
    toast.error(error.response.data.message)
    console.log(error.response.data.message || error);
  }
};

export const asyncUserLogin = (user) => async (dispatch) => {
  try {
    const { data } = await axios.post("/user/login", user);
    localStorage.setItem("token", data.token);
    dispatch(asyncCurrentUser());
    dispatch(asyncUpdateProduct());
    toast.success(data.message);
  } catch (error) {
    toast.error(error.response.data.message)
    console.log(error.response.data.message || error);
  }
};

export const asyncUserLogout = () => async (dispatch) => {
  try {
    const { data } = await axios.post("/user/logout", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    
    if(data){
        localStorage.removeItem("token");
        dispatch(removeUser());
        toast.success(data.message)
    }else{
        toast.error("error occured")
    }

  } catch (error) {
    toast.error(error.response.data.message)
    console.log(error.response.data.message || error);
  }
};
