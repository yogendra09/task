import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  asyncAddProductToCart,
  asyncRemoveProductFromCart,
} from "../store/Actions/cartAction";

const ProductCheckout = () => {
  const { products } = useSelector((state) => state.productReducer);
  const { cart } = useSelector((state) => state.cartReducer);
  const [isProductInCart, setisProductInCart] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    const product = products.rows?.find((product) => product._id === params.id);
    setCurrentProduct(product);
    const cartItem = cart.find((product) => product._id === params.id);
    setisProductInCart(cartItem || null);
  }, [params.id, products.rows, cart]);

  if (!currentProduct) {
    return <p className="text-center mt-10">Loading product details...</p>;
  }

  return (
    <div className="font-[sans-serif] p-4 bg-gray-100">
      <div className="lg:max-w-6xl max-w-xl mx-auto">
        <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-8 max-lg:gap-12 max-sm:gap-8">
          {/* Product Image */}
          <div className="w-full lg:sticky top-0">
            <div className="flex flex-col gap-4">
              <div className="bg-white shadow p-2">
                <img
                  src={currentProduct?.imageUrl}
                  alt="Product"
                  className="w-full aspect-[11/8] object-cover object-top"
                />
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                {currentProduct?.name}
              </h3>
              <div className="flex items-center gap-3 mt-1">
                <p className="text-sm text-gray-500">76 Ratings | 50 Reviews</p>
              </div>
              <p className="text-gray-500 mt-2">{currentProduct?.description}</p>
              <div className="flex items-center flex-wrap gap-2 mt-4">
                <p className="text-gray-500 text-base">
                  <strike>${currentProduct?.price}</strike>
                </p>
                <h4 className="text-purple-800 text-2xl sm:text-3xl font-bold">
                  ${currentProduct?.price}
                </h4>
                <div className="flex py-1 px-2 bg-purple-600 font-semibold ml-4">
                  <span className="text-white text-sm">Save 10%</span>
                </div>
              </div>
              <h4 className="text-base mt-4 text-gray-500 font-semibold">
                Net Wt: 100G
              </h4>
            </div>

            {/* Cart Actions */}
            <hr className="my-6 border-gray-300" />
            <div>
              <div className="flex gap-2 items-center border border-gray-300 bg-white px-3 py-2.5 w-max">
                <button
                  onClick={() =>
                    dispatch(asyncRemoveProductFromCart(currentProduct))
                  }
                  className="border-none outline-none"
                >
                  -
                </button>
                <span className="text-gray-800 text-sm font-semibold px-3">
                  { cart && cart.find((product) => product.productId._id === params.id)?.quantity || 0 }
                </span>
                <button
                  onClick={() => dispatch(asyncAddProductToCart(currentProduct))}
                  className="border-none outline-none"
                >
                  +
                </button>
              </div>
              <div className="mt-4 flex flex-wrap gap-4">
                {isProductInCart ? (
                  <Link
                    to={`/auth/cart`}
                    className="px-4 py-3 w-[45%] border border-purple-600 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold text-center"
                  >
                    Go to Cart
                  </Link>
                ) : (
                  <button
                    onClick={() =>
                      dispatch(asyncAddProductToCart(currentProduct))
                    }
                    className="px-4 py-3 w-[45%] border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 text-sm font-semibold"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCheckout;
