import { Outlet } from "react-router-dom";
import UserHeader from "../components/user/UserHeader";
import type React from "react";

const UserLayout = (): React.JSX.Element => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div className="sticky top-0 z-10">
          <UserHeader />
        </div>
        <div className="flex-grow overflow-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default UserLayout;
