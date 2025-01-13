import React from 'react'
import Navbar from './Navbar.jsx'
import product_image from '../assets/image/product_image.jpeg'
import Product_deatils from './Product_deatils.jsx'
import Footer from './Footer.jsx'
const Product = () => {
  return (
    <>
    <Navbar />
    <Product_deatils />
    <span className='mt-20'><Footer  /></span>
    </>
  )
}

export default Product