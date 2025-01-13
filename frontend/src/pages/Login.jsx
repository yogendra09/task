import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { asyncCurrentUser, asyncUserLogin } from "@/store/Actions/userAction";

const Login = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) {
      return toast.error("Please enter email and password");
    }
    dispatch(asyncUserLogin({ email, password }));
  };

  useEffect(() => {
    dispatch(asyncCurrentUser());
    if (isAuthenticated) navigate("/");
  }, [dispatch, isAuthenticated, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto space-y-6 font-[sans-serif] text-[#333] mt-8 "
    >
      <h2 className="text-2xl font-bold text-center">Login</h2>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter Email"
        className="px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm focus:outline-[#333] rounded-sm transition-all"
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Enter Password"
        className="px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm focus:outline-[#333] rounded-sm transition-all"
      />
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="rememberMe"
          checked={formData.rememberMe}
          onChange={handleChange}
          className="w-4 h-4"
        />
        <label htmlFor="rememberMe" className="text-sm">
          Remember me
        </label>
      </div>
      <button
        type="submit"
        className="w-full px-6 py-2.5 text-sm bg-[#333] hover:bg-[#222] text-white rounded-sm transition-all"
      >
        Submit
      </button>
      <div className="text-sm text-center">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Register here
        </Link>
      </div>
    </form>
    </div>
  );
};

export default Login;
