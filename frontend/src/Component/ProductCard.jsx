import PropTypes from "prop-types";
import { asyncAddProductToCart } from "@/store/Actions/cartAction";
import { Link } from "react-router-dom";

const ProductCard = ({ product, dispatch }) => {
  const { name, imageUrl, price, _id } = product || {};

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:-translate-y-1 transition-transform relative">
      <Link to={`/auth/products/${_id}`} className="mb-4 bg-gray-100 rounded overflow-hidden">
        <img
          src={imageUrl || "https://via.placeholder.com/150"}
          alt={name || "Product image"}
          className="aspect-[33/35] w-full object-contain"
        />
      </Link>
      <div>
        <div className="flex justify-between items-center">
          <Link to={`/auth/products/${_id}`} className="text-base font-bold text-gray-800">
            {name || "Unknown Product"}
          </Link>
          <h6 className="text-base text-gray-800 font-bold">
            ${price || "0.00"}
          </h6>
        </div>
        <Link className="text-gray-500 text-sm mt-2">
          {name
            ? `Check out our latest ${name} offering. Perfect for your needs!`
            : "No product description available."}
        </Link>
        <div className="flex items-center gap-2 mt-4">
          {/* Wishlist Button */}
          <div
            className="bg-pink-100 hover:bg-pink-200 w-12 h-9 flex items-center justify-center rounded cursor-pointer"
            title="Add to Wishlist"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16px"
              className="fill-pink-600"
              viewBox="0 0 64 64"
            >
              <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z" />
            </svg>
          </div>
          {/* Add to Cart Button */}
          <button
            type="button"
            onClick={() => dispatch(asyncAddProductToCart(product))}
            className="text-sm px-4 h-9 font-semibold w-full bg-blue-600 hover:bg-blue-700 text-white tracking-wide outline-none border-none rounded"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    price: PropTypes.number,
    _id: PropTypes.string,
  }),
  dispatch: PropTypes.func.isRequired,
};

ProductCard.defaultProps = {
  product: {
    name: "Unknown Product",
    imageUrl: "https://via.placeholder.com/150",
    price: 0.0,
    _id: "",
  },
};

export default ProductCard;
