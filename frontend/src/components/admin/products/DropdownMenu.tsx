import React, { useRef, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { IProduct } from "../../../types/product";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../config/axios";
import {
  EllipsisVertical,
  SquarePen,
  PackageX as DeleteIcon,
} from "lucide-react";

const DropdownMenu = React.memo(
  ({
    product,
    fetchProducts,
  }: {
    product: IProduct;
    fetchProducts: () => void;
  }): React.JSX.Element => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const buttonRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleNavigateToEdit = useCallback(() => {
      navigate(`/admin/edit-product/${product.id}`);
      setIsOpen(false);
    }, [navigate, product.id]);

    const handleDelete = useCallback((): void => {
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
      setIsOpen(false);
    }, [product.id, fetchProducts]);

    const toggleDropdown = useCallback(() => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setPosition({
          top: rect.bottom + window.scrollY,
          left: rect.right + window.scrollX,
        });
      }
      setIsOpen(!isOpen);
    }, [isOpen]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node) &&
          buttonRef.current &&
          !buttonRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen]);

    return (
      <div className="relative">
        <button
          ref={buttonRef}
          type="button"
          onClick={toggleDropdown}
          className="p-1 hover:bg-base-200 rounded-full"
          aria-label="Actions"
        >
          <EllipsisVertical className="w-5 h-5" />
        </button>

        {isOpen &&
          createPortal(
            <div
              ref={dropdownRef}
              className="fixed z-[9999] bg-base-100 rounded-box shadow-xl border border-base-200 w-fit"
              style={{
                top: `${position.top}px`,
                left: `${position.left - 120}px`, // Adjust this value to position the dropdown
                transform: "translateY(4px)",
              }}
            >
              <ul className="menu p-2">
                <li>
                  <button
                    className="btn btn-ghost justify-start w-full"
                    onClick={handleNavigateToEdit}
                  >
                    <SquarePen className="size-4" />
                    Edit
                  </button>
                </li>
                <li>
                  <button
                    className="btn btn-ghost justify-start w-full text-error"
                    onClick={handleDelete}
                  >
                    <DeleteIcon className="size-4" />
                    Delete
                  </button>
                </li>
              </ul>
            </div>,
            document.body
          )}
      </div>
    );
  }
);

export default DropdownMenu;
