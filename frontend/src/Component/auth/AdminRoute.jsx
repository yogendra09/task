import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { asyncCurrentUser } from "@/store/Actions/userAction";
import { useDispatch, useSelector } from "react-redux";

const AdminRoute = () => {
  const dispatch = useDispatch();
  const { isAdmin } = useSelector((state) => state.userReducer);
  useEffect(()=>{
    console.log(isAdmin);
    dispatch(asyncCurrentUser());
  },[dispatch,isAdmin])
  return  isAdmin ? <Outlet /> : <Navigate to="/" replace />;
};

export default AdminRoute;
