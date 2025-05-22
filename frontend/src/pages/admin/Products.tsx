import * as React from "react";
import { SearchInput } from "../../components/admin/SearchInput";
import AddButton from "../../components/admin/products/AddButton";
import ProductRow from "../../components/admin/products/ProductRow";
import { type IProduct } from "../../types/product";
import { axiosInstance } from "../../config/axios";
import { useDebounce } from "../../hooks/useDebounce";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Products = (): React.JSX.Element => {
  const [products, setProducts] = React.useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = React.useState<IProduct[]>(
    []
  );
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const itemsPerPage = 7;

  // Use the debounce hook to delay the search term processing
  const debouncedSearchTerm = useDebounce<string>(searchTerm);

  const handleSearch = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setSearchTerm(e.target.value);
      setCurrentPage(1); // Reset to first page on search
    },
    []
  );

  // Effect that runs when the debounced search term changes
  React.useEffect(() => {
    if (!debouncedSearchTerm.trim()) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.productName
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
      setCurrentPage(1); // Reset to first page on new search
    }
  }, [debouncedSearchTerm, products]);

  const fetchProducts = React.useCallback(async (): Promise<void> => {
    try {
      const response = await axiosInstance.get<{ product: IProduct[] }>(
        "/products"
      );
      const data = response.data.product;
      setProducts(data);
      setFilteredProducts(data); // Initialize filtered products with all products
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }, []);

  React.useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Get current products
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Change page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Memoize the product table
  const productTable = React.useMemo(() => {
    if (filteredProducts.length === 0) {
      return (
        <p className="flex items-center justify-center w-full h-[60vh] text-lg">
          No products found
        </p>
      );
    }

    return (
      <div className="relative overflow-visible">
        <table className="table w-full z-0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                fetchProducts={fetchProducts}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }, [currentProducts, fetchProducts]);

  // Memoize the pagination controls
  const paginationControls = React.useMemo(() => {
    if (totalPages <= 1) return null;

    return (
      <div className="flex items-center justify-center gap-4 mt-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`p-2 rounded ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "hover:bg-gray-200"
          }`}
        >
          <ChevronLeft />
        </button>
        <span className="mx-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`p-2 rounded ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "hover:bg-gray-200"
          }`}
        >
          <ChevronRight />
        </button>
      </div>
    );
  }, [currentPage, totalPages]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="flex flex-col items-center justify-center w-[50vw] h-full gap-4 p-4">
        <div className="flex flex-row items-center justify-between w-full">
          <SearchInput placeholder="Search Products" onChange={handleSearch} />
          <AddButton />
        </div>
        <div className="w-full border border-[#D9D9D9] rounded-lg overflow-hidden">
          <div className="overflow-x-auto w-full max-h-[61vh] overflow-y-auto">
            {productTable}
          </div>
        </div>
        {paginationControls}
      </div>
    </div>
  );
};

export default React.memo(Products);
