import React from "react";
import { searchInput } from "../../components/SearchInput";

const Products = (): React.JSX.Element => {
  return (
    <div>
      {searchInput({ placeholder: "Search Products" })}
      <div>Products</div>
    </div>
  );
};

export default Products;
