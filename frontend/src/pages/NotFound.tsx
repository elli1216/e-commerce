import * as React from "react";
import { Link } from "react-router-dom";

const NotFound = (): React.JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-lg">Page Not Found</p>
      <Link to="/home" className="btn btn-primary mt-4">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
