import React from 'react';

const AdminHeader = (): React.JSX.Element => {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl">Shop Name</a>
      </div>
      {/* Nav Menu */}
      <ul className="menu menu-horizontal bg-base-200 navbar-center">
        <li><a>Users</a></li>
        <li><a>Products</a></li>
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
            <li><a href="">Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
