import Sidebar from "@/components/Sidebar/Sidebar";
import AdminNavbar from "@/components/Navbars/AdminNavbar";
import FooterAdmin from "@/components/Footers/FooterAdmin";
import { Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-blueGray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 md:ml-64 bg-wh relative">
        {/* Navbar */}
        <AdminNavbar />
        <header className="px-4 md:px-10 pt-4">
          {/* <HeaderStats /> */}
        </header>

        {/* Main Outlet Section */}
        <main className="min-h-[85vh] px-4 md:px-10 py-20 mx-auto w-full pb-24">
          <Outlet />
        </main>
        <FooterAdmin />
      </div>
    </div>
  );
};

export default Admin;
