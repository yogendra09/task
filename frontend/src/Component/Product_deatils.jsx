import React, { useState } from 'react';
import product_image from '../assets/image/product_image.jpeg';

const Product_details = () => {
  const [selected_product, set_selected_product] = useState(0);

  return (
    <div className="min-h-screen bg-[#FFEAC5] px-4 md:px-16 lg:px-32 py-12">
      {/* Product Details Section */}
      <section className="max-w-7xl mx-auto">
        <div className="flex flex-col-reverse md:flex-row gap-12">
          {/* Product Information */}
          <div className="flex flex-col w-full md:w-1/2 text-[#62381A] space-y-6">
            <div className="space-y-3">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Pure Robusta</h1>
              <div className="flex items-center gap-4">
                <span className="bg-[#FFEAC5] text-sm font-medium px-4 py-1.5 rounded-full">
                  In stock
                </span>
                <div className="flex items-center text-yellow-500">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">153 reviews</span>
                </div>
              </div>
            </div>

            <p className="text-lg leading-relaxed text-[#62381A]/80">
              Typically prepared by brewing the roasted and ground Robusta beans with hot water, 
              resulting in a strong, bold, and slightly bitter flavor.
            </p>

            <div className="text-3xl font-bold">£149</div>

            <div className="space-y-6">
              <div className="flex gap-4">
                {['500g Pouch', '250g Pouch'].map((size, index) => (
                  <button
                    key={size}
                    onClick={() => set_selected_product(index)}
                    className={`
                      flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-300
                      border-2 hover:shadow-lg
                      ${selected_product === index 
                        ? 'bg-[#FBB07B] border-[#FBB07B] text-[#62381A]' 
                        : 'border-[#FBB07B] text-[#62381A] hover:bg-[#FBB07B]/10'
                      }
                    `}
                  >
                    {size}
                  </button>
                ))}
              </div>

              <button className="w-full bg-[#FBB07B] text-[#62381A] py-4 rounded-xl font-bold
                text-lg hover:bg-[#FBB07B]/90 transition-all duration-300 hover:shadow-lg
                transform hover:-translate-y-0.5">
                Order Now
              </button>
            </div>
          </div>

          {/* Product Image Gallery */}
          <div className="w-full md:w-1/2 space-y-4">
            <div className="relative group">
              <img
                src={product_image}
                alt="Pure Robusta Coffee"
                className="w-full h-[400px] object-cover rounded-2xl shadow-lg
                  transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            <div className="grid grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <img
                  key={i}
                  src={product_image}
                  alt=""
                  className="w-full h-20 object-cover rounded-lg cursor-pointer
                    transition-all duration-300 hover:shadow-lg hover:scale-105"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="max-w-7xl mx-auto mt-24">
        <div className="bg-gradient-to-br from-[#FFDBB5] to-[#FFDBB5]/50 rounded-3xl overflow-hidden">
          <div className="flex flex-col md:flex-row p-8 md:p-12 gap-8">
            <div className="w-full md:w-1/2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-[#62381A]">
                Description
              </h2>
              <ul className="space-y-4 text-[#62381A]/80">
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-[#FBB07B] rounded-full" />
                  <span>100% pure coffee</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-[#FBB07B] rounded-full" />
                  <span>Made from carefully selected Arabica and Robusta beans</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-[#FBB07B] rounded-full" />
                  <span>Blended to perfection for a refreshing experience</span>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/2">
              <img
                src={product_image}
                className="w-full h-[300px] md:h-[400px] object-cover rounded-2xl shadow-lg"
                alt="Coffee blend description"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Product_details;
