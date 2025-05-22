import * as React from "react";
import { SearchInput } from "../../components/admin/SearchInput";
import AddButton from "../../components/admin/products/AddButton";
import ProductRow from "../../components/admin/products/ProductRow";
// import { mockProductData } from "../../data/mockData";
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

  // Use the debounce hook to delay the search term processing
  const debouncedSearchTerm = useDebounce<string>(searchTerm);

  const handleSearch = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setSearchTerm(e.target.value);
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

  // Memoize the product table
  const productTable = React.useMemo(() => {
    if (filteredProducts.length === 0) {
      return (
        <p className="flex items-center justify-center w-full h-[50vh] text-lg">
          No products found
        </p>
      );
    }

    return (
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
        <tbody>
          {filteredProducts.map((product) => (
            <ProductRow
              key={product.id}
              product={product}
              fetchProducts={fetchProducts}
            />
          ))}
        </tbody>
      </table>
    );
  }, [filteredProducts, fetchProducts]);

  // Memoize the pagination controls
  const paginationControls = React.useMemo(
    () => (
      <div className="flex flex-row items-center justify-center w-[20vw]">
        <button className="btn border border-[#D9D9D9] hover:bg-[#D9D9D9]">
          <ChevronLeft />
        </button>
        <h1 className="px-4">1</h1>
        <button className="btn border border-[#D9D9D9] hover:bg-[#D9D9D9]">
          <ChevronRight />
        </button>
      </div>
    ),
    []
  );

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="flex flex-col items-center justify-center w-[50vw] h-full gap-4 p-4">
        <div className="flex flex-row items-center justify-between w-full">
          <SearchInput placeholder="Search Products" onChange={handleSearch} />
          <AddButton />
        </div>
        <div className="overflow-x-auto w-full h-[70vh] border border-[#D9D9D9] rounded-lg">
          {productTable}
        </div>
        {paginationControls}
      </div>
    </div>
  );
};

export default React.memo(Products);
