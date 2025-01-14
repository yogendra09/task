import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { asyncAddProductToCart, asyncRemoveProductFromCart } from "../store/Actions/cartAction";

const ProductCheckout = () => {
  const { products } = useSelector((state) => state.productReducer);
  const { cart } = useSelector((state) => state.cartReducer);
  const [isProductInCart, setisProductInCart] = useState({});
  const dispatch = useDispatch();
  const params = useParams();

  const [currentProduct, setCurrentProduct] = useState({})
  useEffect(() => {
    const product = products.rows.find((product) => product._id === params.id);
    setCurrentProduct(product);
    cart.find((item) => item.productId._id === products._id)
   
    
    
  }, [params.id, products.rows]);
  return (
   <div className="font-[sans-serif] p-4 bg-gray-100">
  <div className="lg:max-w-6xl max-w-xl mx-auto">
    <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-8 max-lg:gap-12 max-sm:gap-8">
      <div className="w-full lg:sticky top-0">
        <div className="flex flex-col gap-4">
          <div className="bg-white shadow p-2">
            <img src={currentProduct?.imageUrl} alt="Product" className="w-full  aspect-[11/8] object-cover object-top" />
          </div>
        </div>
      </div>
      <div className="w-full">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-800">
            {currentProduct?.name}
          </h3>
          <div className="flex items-center gap-3 mt-1">
            <div className="flex items-center gap-1">
              <p className="text-base text-gray-500">4</p>
              <svg className="w-4 h-4 fill-purple-600" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
              <svg className="w-4 h-4 fill-purple-600" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
              <svg className="w-4 h-4 fill-purple-600" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
              <svg className="w-4 h-4 fill-purple-600" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
              <svg className="w-4 h-4 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
            </div>
            <span className="text-gray-500">|</span>
            <p className="text-sm text-gray-500">76 Ratings</p>
            <span className="text-gray-500">|</span>
            <p className="text-sm text-gray-500">50 Reviews</p>
          </div>
          <div className="mt-2">
            <p className="text-gray-500 mt-1 text-sm">
              {currentProduct?.description}
            </p>
          </div>
          <div className="flex items-center flex-wrap gap-2 mt-4">
            <p className="text-gray-500 text-base">
              <strike>${currentProduct?.price}</strike>
            </p>
            <h4 className="text-purple-800 text-2xl sm:text-3xl font-bold">
              ${currentProduct?.price}
            </h4>
            <div className="flex py-1 px-2 bg-purple-600 font-semibold !ml-4">
              <span className="text-white text-sm">save 10%</span>
            </div>
          </div>
          <div>
            <h4 className="text-base mt-4 text-gray-500 font-semibold">
              Net Wt: 100G
            </h4>
          </div>
        </div>
        <hr className="my-6 border-gray-300" />
        <div>
          <div className="flex gap-2 items-center border border-gray-300 bg-white px-3 py-2.5 w-max">
            <button onClick={()=> dispatch(asyncRemoveProductFromCart(currentProduct))} type="button" className="border-none outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-2.5" viewBox="0 0 121.805 121.804">
                <path d="M7.308 68.211h107.188a7.309 7.309 0 0 0 7.309-7.31 7.308 7.308 0 0 0-7.309-7.309H7.308a7.31 7.31 0 0 0 0 14.619z" data-original="#000000" />
              </svg>
            </button>
            <span className="text-gray-800 text-sm font-semibold px-3">{ isProductInCart ? isProductInCart.quantity : 0}</span>
            <button onClick={()=> dispatch(asyncAddProductToCart(currentProduct))} type="button" className="border-none outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-2.5" viewBox="0 0 512 512">
                <path d="M256 509.892c-19.058 0-34.5-15.442-34.5-34.5V36.608c0-19.058 15.442-34.5 34.5-34.5s34.5 15.442 34.5 34.5v438.784c0 19.058-15.442 34.5-34.5 34.5z" data-original="#000000" />
                <path d="M475.392 290.5H36.608c-19.058 0-34.5-15.442-34.5-34.5s15.442-34.5 34.5-34.5h438.784c19.058 0 34.5 15.442 34.5 34.5s-15.442 34.5-34.5 34.5z" data-original="#000000" />
              </svg>
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-4">
           {isProductInCart ? <button onClick={()=>{
            dispatch(asyncAddProductToCart(currentProduct));
           }} type="button" className="px-4 py-3 w-[45%] border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 text-sm font-semibold">
              Add to cart
            </button> :
            <Link to={`/auth/cart`} type="button" className="px-4 py-3 w-[45%] border border-purple-600 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold text-center">
              Go to Cart
            </Link>}
          </div>
        </div>
        <hr className="my-6 border-gray-300" />
       
      </div>
    </div>
  </div>
</div>

  );
};

export default ProductCheckout;
