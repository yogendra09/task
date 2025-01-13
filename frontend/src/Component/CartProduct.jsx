import { useDispatch } from "react-redux";
import { asyncAddProductToCart, asyncRemoveProductFromCart } from "@/store/Actions/cartAction";


const CartProduct = ({item}) => {
    const {productId,quantity} = item;
    const dispatch = useDispatch();
    const handleProductRemoval = ()=>{
        console.log('Product removed');
         dispatch(asyncRemoveProductFromCart(productId));
    }


    const handleAddQuantity = ()=>{
        console.log('Adding quantity');
        dispatch(asyncAddProductToCart(productId));
    }
    
  return (
   
         <div className=" md:col-span-2 space-y-4 bg-white p-4 rounded-md shadow-lg">
           
           <div >
             <div className="grid grid-cols-3 items-start gap-4">
               <div className="col-span-2 flex items-start gap-4">
                 {/* Product Image */}
                 <div className="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0 p-2 bg-white rounded-md">
                   <img
                     src={productId?.imageUrl || ""} 
                     className="w-full h-full object-contain"
                     alt="product"
                   />
                 </div>
                 {/* Product Info */}
                 <div className="flex flex-col">
                   <h3 className="text-base font-bold text-black">
                    {productId.name}
                   </h3>
                   <p className="text-xs font-semibold text-gray-600 mt-0.5">
                     MD
                   </p>
                   <button
                   onClick={handleProductRemoval}
                     type="button"
                     className="mt-6 font-semibold text-red-500 text-xs flex items-center gap-1 shrink-0"
                   >
                     <i className="fas fa-trash-alt"></i>
                     REMOVE
                   </button>
                 </div>
               </div>
               {/* Price and Quantity */}
               <div className="ml-auto text-right">
                 <h4 className="text-lg max-sm:text-base font-bold text-black">
                   {productId.price * quantity}
                 </h4>
                 <div className="mt-6 flex items-center px-3 py-1.5 border border-black text-black text-xs outline-none bg-transparent rounded-md">
                   <button onClick={handleProductRemoval}>
                     <i  className="fas fa-minus"></i>
                   </button>
                   <span className="mx-3 font-bold">
                  {quantity}
                   </span>
                   <button onClick={handleAddQuantity}>
                     <i className="fas fa-plus"></i>
                   </button>
                 </div>
               </div>
             </div>
             <hr className="border-[#6C4E31] my-4" />
           </div>
        
       </div>
    
  )
}

export default CartProduct