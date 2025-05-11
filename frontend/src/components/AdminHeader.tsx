import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminHeader = (): React.JSX.Element => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl">Shop Name</a>
      </div>
      {/* Nav Menu */}
      <ul className="menu menu-horizontal bg-base-200 navbar-center">
        <li><a href="/admin/users">Users</a></li>
        <li><a href="/admin/products">Products</a></li>
      </ul>
      {/* Profile */}
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img src="" alt="Profile" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a href="" className="justify-between">
                Profile
              </a>
            </li>
            <li><a href="" onClick={handleLogout}>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
