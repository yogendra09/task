import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PlaceOrder = ({ setisOpen }) => {
    const { user } = useSelector((state) => state.userReducer);
    const { cart } = useSelector((state) => state.cartReducer);
    const [products, setProducts] = useState([])
    const [FormData, setFormData] = useState({
        name: user.name,
        email: user.email,
        phone: user.phone,
        shippingAddress: {
            street: "",
            city: "",
            state: "",
            zip: "",
        },
        paymentMethod: "",
        products: [],
    });



    const handlePlaceOrder = async () => {
   console.log(cart);
   
        const order = {
            userId: user.userId,
            items: cart.map((item) => ({
                productId: item.productId._id,
                quantity: item.quantity,
                price: item.productId.price,
            })),
            totalAmount: cart.reduce((acc, item) => acc + item.productId.price * item.quantity, 0),
        }

            console.log(order);
            

    };

    useEffect(() => {
        console.log(user,cart);
    }, [user]);

    return (
        <div className="absolute top-0 left-0 z-50 w-full h-full flex items-center justify-center ">
            <div className="font-[sans-serif] bg-white">
                <div className="flex max-sm:flex-col gap-12 max-lg:gap-4 h-full">
                    <div className="max-w-4xl w-full h-max rounded-md px-4 py-8 sticky top-0">
                        <h2 className="text-2xl font-bold text-gray-800">
                            Complete your order
                        </h2>
                        <form className="mt-8">
                            <div>
                                <h3 className="text-sm lg:text-base text-gray-800 mb-4">
                                    Personal Details
                                </h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <input
                                            value={user.name}
                                            type="text"
                                            placeholder="First Name"
                                            className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                                        />
                                    </div>
                                    {/* <div>
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div> */}
                                    <div>
                                        <input
                                            value={user.email}
                                            type="email"
                                            placeholder="Email"
                                            className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            value={user.phone}
                                            type="number"
                                            placeholder="Phone No."
                                            className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8">
                                <h3 className="text-sm lg:text-base text-gray-800 mb-4">
                                    Shipping Address
                                </h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <input
                                            onChange={(e) => {
                                                setFormData({
                                                    ...FormData,
                                                    shippingAddress: {
                                                        ...FormData.shippingAddress,
                                                        street: e.target.value,
                                                    },
                                                });
                                            }}
                                            value={FormData.shippingAddress.street}
                                            type="text"
                                            placeholder="Address Line"
                                            className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            onChange={(e) => {
                                                setFormData({
                                                    ...FormData,
                                                    shippingAddress: {
                                                        ...FormData.shippingAddress,
                                                        city: e.target.value,
                                                    },
                                                });
                                            }}
                                            value={FormData.shippingAddress.city}
                                            type="text"
                                            placeholder="City"
                                            className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            onChange={(e) => {
                                                setFormData({
                                                    ...FormData,
                                                    shippingAddress: {
                                                        ...FormData.shippingAddress,
                                                        state: e.target.value,
                                                    },
                                                });
                                            }}
                                            value={FormData.shippingAddress.state}
                                            type="text"
                                            placeholder="State"
                                            className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            onChange={(e) => {
                                                setFormData({
                                                    ...FormData,
                                                    shippingAddress: {
                                                        ...FormData.shippingAddress,
                                                        zip: e.target.value,
                                                    },
                                                });
                                            }}
                                            value={FormData.shippingAddress.zip}
                                            type="text"
                                            placeholder="Zip Code"
                                            className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="">payment option</label>
                                        <select
                                            onChange={(e) => {
                                                setFormData({
                                                    ...FormData,
                                                    paymentOption: e.target.value,
                                                })
                                            }}
                                            value={FormData.shippingAddress.paymentOption}
                                            name=""
                                            id=""
                                            className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                                        >
                                            <option value="COD">Cash on Delivery</option>
                                            <option value="Debit Card">Debit Card</option>
                                            <option value="Credit Card">Credit Card</option>
                                            <option value="PayPal">PayPal</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex gap-4 max-md:flex-col mt-8">
                                    <button
                                        onClick={() => setisOpen(false)}
                                        type="button"
                                        className="rounded-md px-4 py-2.5 w-full text-sm tracking-wide bg-transparent hover:bg-gray-100 border border-gray-300 text-gray-800 max-md:order-1"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handlePlaceOrder}
                                        type="button"
                                        className="rounded-md px-4 py-2.5 w-full text-sm tracking-wide bg-blue-600 hover:bg-blue-700 text-white"
                                    >
                                        {" "}
                                        Place Order
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrder;
