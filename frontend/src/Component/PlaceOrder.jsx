import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncPlaceOrder } from "../store/Actions/orderAction";

const PlaceOrder = ({ setisOpen }) => {
  const { user } = useSelector((state) => state.userReducer);
  const { cart } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    shippingAddress: {
      country: "India",
      street: "",
      city: "",
      state: "",
      zip: "",
    },
    paymentMethod: "COD",
    items: [],
  });

  const handleInputChange = (field, value, nestedField) => {
    if (nestedField) {
      setFormData((prev) => ({
        ...prev,
        [field]: {
          ...prev[field],
          [nestedField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handlePlaceOrder = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.shippingAddress.street ||
      !formData.shippingAddress.city ||
      !formData.shippingAddress.state ||
      !formData.shippingAddress.zip
    ) {
      alert("Please fill out all required fields");
      return;
    }

    const items = cart?.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity,
      price: item.productId.price,
    }));

    if (items.length === 0) {
      alert("Your cart is empty");
      return;
    }

    const orderData = {
      ...formData,
      items,
      totalAmount: cart.reduce(
        (acc, item) => acc + item.productId.price * item.quantity,
        0
      ),
    };

    dispatch(asyncPlaceOrder(orderData));
    setisOpen(false);
  };

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name,
        email: user.email,
        phone: user.phone,
      }));
    }
  }, [user]);

  return (
    <div className="absolute top-0 left-0 z-50 w-full h-full flex items-center justify-center">
      <div className="font-[sans-serif] bg-white w-full max-w-4xl rounded-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Complete your order</h2>
        <form>
          {/* Personal Details */}
          <div>
            <h3 className="text-base text-gray-800 mb-4">Personal Details</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                type="text"
                placeholder="Full Name"
                className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
              />
              <input
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                type="email"
                placeholder="Email"
                className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
              />
              <input
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                type="text"
                placeholder="Phone No."
                className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
              />
            </div>
          </div>

          {/* Shipping Address */}
          <div className="mt-8">
            <h3 className="text-base text-gray-800 mb-4">Shipping Address</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                value={formData.shippingAddress.street}
                onChange={(e) =>
                  handleInputChange("shippingAddress", e.target.value, "street")
                }
                type="text"
                placeholder="Address Line"
                className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
              />
              <input
                value={formData.shippingAddress.city}
                onChange={(e) =>
                  handleInputChange("shippingAddress", e.target.value, "city")
                }
                type="text"
                placeholder="City"
                className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
              />
              <input
                value={formData.shippingAddress.state}
                onChange={(e) =>
                  handleInputChange("shippingAddress", e.target.value, "state")
                }
                type="text"
                placeholder="State"
                className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
              />
              <input
                value={formData.shippingAddress.zip}
                onChange={(e) =>
                  handleInputChange("shippingAddress", e.target.value, "zip")
                }
                type="text"
                placeholder="Zip Code"
                className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
              />
              <select
                value={formData.paymentMethod}
                onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
                className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
              >
                <option value="COD">Cash on Delivery</option>
                <option value="Debit Card">Debit Card</option>
                <option value="Credit Card">Credit Card</option>
                <option value="PayPal">PayPal</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              type="button"
              onClick={() => setisOpen(false)}
              className="rounded-md px-4 py-2.5 w-full text-sm bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-800"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handlePlaceOrder}
              className="rounded-md px-4 py-2.5 w-full text-sm bg-blue-600 hover:bg-blue-700 text-white"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlaceOrder;
