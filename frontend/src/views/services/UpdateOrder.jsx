import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { asyncUpdateOrder } from "../../store/Actions/orderAction";

const UpdateOrder = ({ setisOpen, editRow, setEditRow, reloadList }) => {
  const dispatch = useDispatch();

  // Initialize form state
  const [formData, setFormData] = useState({
    userId: "",
    items: [],
    totalAmount: "",
    shippingAddress: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    paymentMethod: "COD",
    paymentStatus: "Pending",
    orderStatus: "Processing",
  });

  // Populate formData when editRow changes
  useEffect(() => {
    if (editRow && editRow._id) {
      setFormData({ ...editRow });
    } else {
      resetForm();
    }
  }, [editRow]);

  // Reset form to default state
  const resetForm = () => {
    setFormData({
      userId: "",
      items: [],
      totalAmount: "",
      shippingAddress: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
      paymentMethod: "COD",
      paymentStatus: "Pending",
      orderStatus: "Processing",
    });
  };

  // Handle input changes (supports nested fields)
  const handleInputChange = (field, value, nestedField) => {
    setFormData((prev) => {
      if (nestedField) {
        return {
          ...prev,
          [field]: {
            ...prev[field],
            [nestedField]: value,
          },
        };
      }
      return { ...prev, [field]: value };
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       dispatch(asyncUpdateOrder(formData));
       setisOpen(false);
        reloadList(); // Refresh the order list
        handleCloseModal(); // Close modal after success

    } catch (error) {
      console.error("Error during order update:", error);
    }
  };

  // Close modal and reset state
  const handleCloseModal = () => {
    setisOpen(false);
    setEditRow(null);
    resetForm();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center w-full h-full z-50 p-4 bg-black bg-opacity-50 overflow-auto">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-md p-6 relative">
        {/* Close Button */}
        <button
          onClick={handleCloseModal}
          aria-label="Close"
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        {/* Title */}
        <h4 className="text-xl font-bold text-center text-gray-800 mb-6">
          {editRow && editRow._id ? "Update Order" : "Add Order"}
        </h4>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* User ID */}
          <div>
            <label className="block text-sm font-medium text-gray-800">User ID</label>
            <input
              type="text"
              value={formData.userId}
              onChange={(e) => handleInputChange("userId", e.target.value)}
              className="w-full mt-1 px-3 py-2 bg-gray-100 text-gray-800 rounded-md focus:ring-2 focus:ring-gray-800 outline-none"
              required
            />
          </div>

          {/* Total Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-800">Total Amount</label>
            <input
              type="number"
              value={formData.totalAmount}
              onChange={(e) => handleInputChange("totalAmount", e.target.value)}
              className="w-full mt-1 px-3 py-2 bg-gray-100 text-gray-800 rounded-md focus:ring-2 focus:ring-gray-800 outline-none"
              required
            />
          </div>

          {/* Shipping Address */}
          <div>
            <label className="block text-sm font-medium text-gray-800">Shipping Address</label>
            {["street", "city", "state", "zipCode", "country"].map((field) => (
              <input
                key={field}
                type="text"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData.shippingAddress[field]}
                onChange={(e) =>
                  handleInputChange("shippingAddress", e.target.value, field)
                }
                className="w-full mt-1 px-3 py-2 bg-gray-100 text-gray-800 rounded-md focus:ring-2 focus:ring-gray-800 outline-none mb-2"
              />
            ))}
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-sm font-medium text-gray-800">Payment Method</label>
            <select
              value={formData.paymentMethod}
              onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
              className="w-full mt-1 px-3 py-2 bg-gray-100 text-gray-800 rounded-md focus:ring-2 focus:ring-gray-800 outline-none"
            >
              <option value="COD">Cash on Delivery</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="PayPal">PayPal</option>
            </select>
          </div>

          {/* Payment Status */}
          <div>
            <label className="block text-sm font-medium text-gray-800">Payment Status</label>
            <select
              value={formData.paymentStatus}
              onChange={(e) => handleInputChange("paymentStatus", e.target.value)}
              className="w-full mt-1 px-3 py-2 bg-gray-100 text-gray-800 rounded-md focus:ring-2 focus:ring-gray-800 outline-none"
            >
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Failed">Failed</option>
            </select>
          </div>

          {/* Order Status */}
          <div>
            <label className="block text-sm font-medium text-gray-800">Order Status</label>
            <select
              value={formData.orderStatus}
              onChange={(e) => handleInputChange("orderStatus", e.target.value)}
              className="w-full mt-1 px-3 py-2 bg-gray-100 text-gray-800 rounded-md focus:ring-2 focus:ring-gray-800 outline-none"
            >
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-900 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateOrder;
