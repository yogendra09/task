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
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-white p-8 shadow-md rounded-md space-y-6 font-sans text-gray-800"
    >
      <h2 className="text-2xl font-bold text-center">Login</h2>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter Email"
        className="w-full px-4 py-3 bg-gray-100 focus:bg-white border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Enter Password"
        className="w-full px-4 py-3 bg-gray-100 focus:bg-white border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
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
        className="w-full px-6 py-2.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-all"
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
