import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../config/firebase";
import { useCart } from "../../context/context";
import { generateRandomDiceBearThumbUrl } from "../../utils/dicebear";

const UserHeader = React.memo((): React.JSX.Element => {
  const [pfp, setPfp] = React.useState<string>("");
  const { userCart } = useCart();

  // Memoize the cart count to prevent unnecessary re-renders
  const cartItemCount = useMemo(() => {
    if (!userCart?.itemCount) return 0;
    return parseInt(userCart.itemCount, 10);
  }, [userCart?.itemCount]);

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    const pfp = generateRandomDiceBearThumbUrl();
    setPfp(pfp);
    console.log(pfp);
  }, []);

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link to="/home" className="btn btn-ghost text-xl">
          ByteBazaar
        </Link>
      </div>

      <div className="flex gap-2">
        {/* Search */}
        <input
          type="text"
          placeholder="Search"
          className="input w-24 md:w-auto"
        />
        {/* Order */}
        <div className="flex-1">
          <Link to="/order" className="btn btn-ghost">
            Orders
          </Link>
        </div>
        {/* Cart */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="https://api.dicebear.com/9.x/thumbs/svg?randomizeIds=false"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">
                {cartItemCount}
              </span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow"
          >
            <div className="card-body">
              <span className="text-lg font-bold">{cartItemCount} Items</span>
              <span className="text-info">
                Subtotal: {userCart?.total ?? 0.0}
              </span>
              <div className="card-actions">
                <Link to="/cart" className="btn btn-primary btn-block">
                  View cart
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Profile */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img src={pfp || "https://placehold.co/64x64"} alt="Profile" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
});

export default UserHeader;
