import { useDispatch, useSelector } from "react-redux";
import avatar from "../assets/avatar.webp";
import { useEffect } from "react";
import { asyncGetMyOrders } from "../store/Actions/orderAction";

const Profile = () => {
  const { user } = useSelector((state) => state.userReducer);
  const { orders } = useSelector((state) => state.orderReducer); // Example order data from Redux
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Fetching user data...",orders);
    dispatch(asyncGetMyOrders()); // Fetch user data from API
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-md w-full">
        {/* Profile Section */}
        <div className="bg-blue-500 h-32"></div>
        <div className="flex justify-center -mt-16">
          <img
            className="w-32 h-32 rounded-full border-4 border-white object-cover"
            src={user?.avatar || avatar}
            alt="Profile"
          />
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            {user?.name}
          </h2>
          <p className="text-gray-600 text-center">Web Developer</p>
        </div>
        <div className="p-6 border-t">
          <h3 className="text-lg font-semibold text-gray-800">About</h3>
          <p className="text-gray-600 mt-2">
            {user?.email}, {user?.phone}
          </p>
        </div>
      </div>

      {/* Orders Section */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-md w-full mt-8 p-6">
        <h3 className="text-lg font-semibold text-gray-800">Your Orders</h3>
        {orders?.length > 0 ? (
          <div className="mt-4 space-y-4">
            {orders.map((order, index) => (
              <div
                key={order.id}
                className="border rounded-lg p-4 bg-gray-50 shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-semibold text-gray-800">
                    Order #{index + 1}
                  </h4>
                  <p className="text-xs text-gray-500">{order.date}</p>
                </div>
                <p className="text-gray-600 mt-2">
                  <span className="font-bold">Items:</span> {order.items.map((item) => item.productId.name).join(", ")}
                </p>
                <p className="text-gray-600 mt-1">
                  <span className="font-bold">Status:</span> {order.orderStatus}
                </p>
                <p className="text-gray-600 mt-1">
                  <span className="font-bold">Payment:</span> {order.paymentStatus}
                </p>
                <p className="text-gray-600 mt-1">
                  <span className="font-bold">Total:</span> ${order.totalAmount}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mt-4">No orders placed yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
