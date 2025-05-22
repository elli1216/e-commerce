import React from "react";
import { Link } from "react-router-dom";

const AddButton = React.memo((): React.JSX.Element => {
  return (
    <Link to="/admin/new-product">
      <button className="btn btn-primary">
        <p className="text-sm font-semibold">Add Product</p>
      </button>
    </Link>
  );
});

export default AddButton;