import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate, Outlet } from 'react-router-dom';
import Home from './Component/Home.jsx';
import About from './Component/About.jsx';
import Contact from './Component/Contact.jsx';

import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

import AdminRoute from '@/Component/auth/AdminRoute.jsx';

import PrivateRoute from '@/Component/auth/PrivateRoute.jsx';
import Admin from '@/layouts/Admin.jsx';
import Dashboard from '@/views/admin/Dashboard.jsx';
import Settings from '@/views/admin/Settings.jsx';
import Tables from '@/views/admin/Tables.jsx';
import ProductManagement from '@/views/admin/ProductManagement.jsx';
import Product from '@/pages/Product.jsx';

import Cart from '@/pages/Cart.jsx';
import ProductCheckout from '@/pages/ProductCheckout.jsx';
import Navbar from './Component/Navbar.jsx';
import Footer from './Component/Footer.jsx';
import OrederManagement from './views/admin/OrederManagement.jsx';


const App = () => {


  return (
    <>
      <Routes>
        <Route path='' element={<PrivateRoute />}>
          <Route exact path="/" element={<Home />} />
          <Route path='/auth/*' element={<UserRoutes />} />
          <Route path='/admin/*' element={<AdminRoutes />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

const UserRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="products" element={<Product />} />
        <Route path='products/:id' element={<ProductCheckout />} />
        <Route path='cart' element={<Cart />} />
      </Routes>
      <Footer />
    </>
  )
}

const AdminRoutes = () => {
  return (
    <>
    <Routes>
       <Route path='' element={<AdminRoute />}>
            <Route path="" element={<Admin />} >

              <Route path="tables" element={<Tables />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="products" element={<ProductManagement />} />
              <Route path="orders" element={<OrederManagement />} />
              <Route path="settings" element={<Settings />} />
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
            </Route>
          </Route>
          </Routes>
    </>
  )
}

export default App