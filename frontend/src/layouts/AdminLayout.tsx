import { Outlet } from "react-router-dom";
import AdminHeader from "../components/admin/AdminHeader";
import type React from "react";

const AdminLayout = (): React.JSX.Element => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div className="sticky top-0 z-10">
          <AdminHeader />
        </div>
        <div className="flex-grow overflow-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
