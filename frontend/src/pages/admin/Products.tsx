import React from "react";
import { SearchInput } from "../../components/SearchInput";
import { mockProductData } from "../../data/mockData";
import { type Product } from "../../types/product";
import { addButton } from "../../components/addProductButton";
import { ChevronLeft, ChevronRight, EllipsisVertical } from "lucide-react";

const renderProductList = (product: Product): React.JSX.Element => {
  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.category}</td>
      <td>{product.quantity}</td>
      <td>{product.price}</td>
      <td className="px-0 self-center"><EllipsisVertical className="cursor-pointer" /></td>
    </tr>
  );
};

const Products = (): React.JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="flex flex-col items-center justify-center w-[50vw] h-full gap-4 p-4">
        <div className="flex flex-row items-center justify-between w-full">
          <SearchInput placeholder="Search Products" />
          <button className="btn">{addButton()}</button>
        </div>
        <div className="overflow-x-auto w-full h-[70vh] border border-[#D9D9D9] rounded-lg">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{mockProductData.map(renderProductList)}</tbody>
          </table>
        </div>
        <div className="flex flex-row items-center justify-center w-[20vw]">
          <button className="btn border border-[#D9D9D9] hover:bg-[#D9D9D9]"><ChevronLeft /></button>
          <h1 className="px-4">1</h1>
          <button className="btn border border-[#D9D9D9] hover:bg-[#D9D9D9]"><ChevronRight /></button> 
        </div>
      </div>
    </div>
  );
};

export default Products;
