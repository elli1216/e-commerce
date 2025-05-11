import { Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import type React from "react";

const AdminLayout = (): React.JSX.Element => {
  return (
    <>
      <AdminHeader />
      <Outlet />
    </>
  );
};

export default AdminLayout;
