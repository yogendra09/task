import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncUserRegister } from "@/store/Actions/userAction";
import { toast } from "react-toastify";

const Register = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone: "",
    name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(formData);
    
    const { email, password, phone, name } = formData;

    if (!email || !password || !phone || !name) {
      return toast.error("Please enter email, phone, and password");
    }

    dispatch(asyncUserRegister({ email, password, phone, name }));
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
    <form
      onSubmit={submitHandler}
      className="w-full max-w-md bg-white p-8 shadow-lg rounded-md space-y-6"
    >
      <h2 className="text-2xl font-bold text-center">Register</h2>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter Name"
        className="w-full px-4 py-3 bg-gray-100 focus:bg-white border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter Email"
        className="w-full px-4 py-3 bg-gray-100 focus:bg-white border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
      />
      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Enter Phone"
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
      <button
        type="submit"
        className="w-full px-6 py-2.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-all"
      >
        Register
      </button>
      <div className="text-sm text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login here
        </Link>
      </div>
    </form>
  </div>
  
  );
};

export default Register;
