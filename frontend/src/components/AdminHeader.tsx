import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const AdminHeader = (): React.JSX.Element => {

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <Link
          to="/admin/users"
          className="btn btn-ghost text-xl"
        >
          Shop Name
        </Link>
      </div>
      {/* Nav Menu */}
      <ul className="menu menu-horizontal bg-base-200 navbar-center">
        <li>
          <Link to="/admin/users">Users</Link>
        </li>
        <li>
          <Link to="/admin/products">Products</Link>
        </li>
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
              <img src="https://placehold.co/64x64" alt="Profile" />
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
            <li><a onClick={handleLogout}>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
