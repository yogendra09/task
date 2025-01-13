import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { asyncUserLogout } from "@/store/Actions/userAction";

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { isAuthenticated, isAdmin } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(asyncUserLogout());
    setShowDropdown(false);
  };

  const NavLink = ({ to, children }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={`px-4 py-2 transition-colors block lg:inline-block ${isActive ? "text-blue-600 font-bold" : "hover:text-blue-600"
          }`}
        onClick={() => setShowMobileMenu(false)}
      >
        {children}
      </Link>
    );
  };

  const ProfileDropdown = () => (
    <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md z-50">
      <div className="p-4 bg-slate-100 text-gray-800 font-semibold text-center rounded-t-md">
        {isAuthenticated ? "Welcome!" : "Guest"}
      </div>
      <div className="divide-y divide-[#FFEAC5]">
        {isAuthenticated ? (
          <>
            <NavLink onClick={() => setShowDropdown(!showDropdown)} to="/auth/profile">My Profile</NavLink>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-slate-100 text-slate-800 transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </div>
    </div>
  );

  return (
    <header className="shadow-md sticky top-0 bg-white z-50">
      <div className="flex items-center justify-between px-6 sm:px-10 py-3">
        {/* Logo */}
        <Link to="/">
          <img
            src="https://readymadeui.com/readymadeui.svg"
            alt="Logo"
            className="w-36"
          />
        </Link>
        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-x-6">
          {isAdmin ? <NavLink to="/admin/dashboard">Dashboard</NavLink> : <NavLink to="/">Home</NavLink>}
          <NavLink to="/auth/products">Products</NavLink>
          <NavLink to="/auth/cart">
            <BsCart4 className="inline text-xl mr-2" /> Cart
          </NavLink>
          <div className="relative">
            <button
              className="flex items-center gap-2"
              onClick={() => setShowDropdown((prev) => !prev)}
              aria-expanded={showDropdown}
            >
              <FaUserCircle className="text-2xl" />
              Profile
            </button>
            {showDropdown && <ProfileDropdown />}
          </div>
        </div>
        {/* Mobile Menu Button */}
        <button
          className="lg:hidden"
          onClick={() => setShowMobileMenu((prev) => !prev)}
          aria-expanded={showMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {showMobileMenu ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="lg:hidden bg-white shadow-md px-6 py-4">
          {isAdmin ? <NavLink to="/admin/dashboard">Dashboard</NavLink> : <NavLink to="/">Home</NavLink>}          <NavLink to="/auth/products">Products</NavLink>
          <NavLink to="/auth/cart">
            <BsCart4 className="inline text-xl mr-2" /> Cart
          </NavLink>
          <div className="relative mt-2">
            <button
              className="flex items-center gap-2 w-full"
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              <FaUserCircle className="text-2xl" />
              Profile
            </button>
            {showDropdown && <ProfileDropdown />}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
