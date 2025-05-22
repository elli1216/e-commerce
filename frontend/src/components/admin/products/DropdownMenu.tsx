import React from "react";
import { IProduct } from "../../../types/product";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../config/axios";
import { EllipsisVertical, SquarePen, PackageX as DeleteIcon } from "lucide-react";

const DropdownMenu = React.memo(
  ({
    product,
    fetchProducts,
  }: {
    product: IProduct;
    fetchProducts: () => void;
  }): React.JSX.Element => {
    const navigate = useNavigate();

    const handleNavigateToEdit = React.useCallback(() => {
      navigate(`/admin/edit-product/${product.id}`);
    }, [navigate, product.id]);

    const handleDelete = React.useCallback((): void => {
      const deleteProduct = async (): Promise<void> => {
        try {
          await axiosInstance.delete(`/delete-product/${product.id}`);
          alert("Product deleted successfully");
          fetchProducts();
        } catch (error) {
          console.error("Failed to delete product:", error);
        }
      };
      deleteProduct();
    }, [product.id, fetchProducts]);

    return (
      <div className="dropdown dropdown-bottom dropdown-end">
        <div tabIndex={0} role="button" className="cursor-pointer p-0">
          <EllipsisVertical />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-1 w-[10vw] shadow"
        >
          <button
            className="btn btn-ghost self-start justify-start w-full"
            onClick={handleNavigateToEdit}
          >
            <SquarePen className="size-4" />
            Edit
          </button>
          <button
            className="btn btn-ghost self-start justify-start w-full"
            onClick={handleDelete}
          >
            <DeleteIcon className="size-4" />
            Delete
          </button>
        </ul>
      </div>
    );
  }
);

export default DropdownMenu