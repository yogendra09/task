import React from "react";
import UserDropdown from "@/components/Dropdowns/UserDropdown";

export default function Navbar() {
  return (
    <>
      {/* Navbar */}
      <nav className="fixed bg-gray-100 md:flex-row md:flex-nowrap md:justify-start flex items-center py-4 border border-gray-300 w-[85%] shadow-sm">
        <div className="w-[90%] mx-auto flex items-center justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <a
            className="text-black text-lg uppercase hidden lg:inline-block font-bold"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            Dashboard
          </a>

          {/* Search Bar */}
          <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
            <div className="relative flex w-full flex-wrap items-stretch">
              <input
                type="text"
                placeholder="Search here..."
                className="border border-gray-400 px-4 py-2 placeholder-gray-500 text-black bg-white rounded-lg text-sm shadow-md outline-none focus:outline-none focus:ring-2 focus:ring-gray-400 w-full pl-10 transition duration-300"
              />
              <span className="absolute left-3 top-2/4 transform -translate-y-2/4 text-gray-500">
                <i className="fas fa-search"></i>
              </span>
            </div>
          </form>

          {/* User Dropdown */}
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <UserDropdown />
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
