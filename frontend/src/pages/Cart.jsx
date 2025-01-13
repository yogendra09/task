import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncUpdateCart } from "@/store/Actions/cartAction";
import CartProduct from "@/Component/CartProduct";
import { useNavigate } from "react-router-dom";
import PlaceOrder from "../Component/PlaceOrder";

const Cart = () => {
  const { cart } = useSelector((state) => state.cartReducer);
  const [isOpen, setisOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(asyncUpdateCart());
  }, [dispatch]);

  // Calculate subtotal
  const subtotal = cart.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  );

  return (
    <>
      <div className="font-sans max-w-4xl mx-auto p-4 bg-gray-100 mt-10">
        <h1 className="text-2xl font-extrabold text-gray-800">Your Cart</h1>
        {cart.length === 0 ? (
          <div className="mt-8 text-center text-gray-800">
            <p>Your cart is empty.</p>
            <button
              onClick={() => navigate("/auth/products")}
              type="button"
              className="text-sm px-4 py-2.5 mt-4 font-semibold tracking-wide bg-gray-800 hover:bg-gray-800 text-white rounded-md"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            {/* Cart Products */}
            <div className="md:col-span-2 space-y-4">
              {cart.map((item, index) => (
                <CartProduct key={index} item={item} />
              ))}
            </div>

            {/* Cart Summary */}
            <div className="bg-white rounded-md px-4 py-6 shadow-md">
              <ul className="text-gray-800 space-y-4">
                <li className="flex justify-between text-sm">
                  Subtotal{" "}
                  <span className="font-bold">₹{subtotal.toFixed(2)}</span>
                </li>
                <li className="flex justify-between text-sm">
                  Shipping <span className="font-bold">₹50.00</span>
                </li>
                <li className="flex justify-between text-sm">
                  Tax <span className="font-bold">₹20.00</span>
                </li>
                <hr className="border-gray-300 my-4" />
                <li className="flex justify-between text-sm font-bold">
                  Total{" "}
                  <span>
                    ₹{(subtotal + 50 + 20).toFixed(2)}
                  </span>
                </li>
              </ul>
              <div className="mt-8 space-y-2">
                <button
                 onClick={() => {
                    setisOpen(true);
                  }}
                  type="button"
                  className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-gray-800 hover:bg-gray-800 text-white rounded-md"
                >
                  Buy Now
                </button>
                <button
                 onClick={() => navigate("/auth/products")}
                  type="button"
                  className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent hover:bg-[#dadada] text-gray-800 border border-gray-800 rounded-md"
                >
                  Continue Shopping
                </button>
              </div>
              <div className="mt-4 flex justify-center gap-4">
                <img
                  src="https://readymadeui.com/images/master.webp"
                  alt="MasterCard"
                  className="w-10 object-contain"
                />
                <img
                  src="https://readymadeui.com/images/visa.webp"
                  alt="Visa"
                  className="w-10 object-contain"
                />
                <img
                  src="https://readymadeui.com/images/american-express.webp"
                  alt="American Express"
                  className="w-10 object-contain"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      { isOpen && <PlaceOrder setisOpen={setisOpen} />}
    </>
  );
};

export default Cart;
