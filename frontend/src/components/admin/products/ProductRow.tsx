import React from "react";
import { IProduct } from "../../../types/product";
import DropdownMenu from "./DropdownMenu";

const ProductRow = React.memo(
  ({
    product,
    fetchProducts,
  }: {
    product: IProduct;
    fetchProducts: () => void;
  }): React.JSX.Element => {
    return (
      <tr key={product.id}>
        <td>{product.productName}</td>
        <td>{product.category}</td>
        <td>{product.productStock}</td>
        <td>{product.productPrice}</td>
        <td className="px-0">
          <DropdownMenu product={product} fetchProducts={fetchProducts} />
        </td>
      </tr>
    );
  }
);

export default ProductRow;
