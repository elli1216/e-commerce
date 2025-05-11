import React from "react";
import { SearchInput } from "../../components/SearchInput";

const Products = (): React.JSX.Element => {
  return (
    <div>
      <SearchInput placeholder="Search Products" />
      <div>Products</div>
    </div>
  );
};

export default Products;
