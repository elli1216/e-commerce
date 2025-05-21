import * as React from "react";
import { SearchInput } from "../../components/SearchInput";
// import { mockProductData } from "../../data/mockData";
import { type IProduct } from "../../types/product";
import { axiosInstance } from "../../config/axios";
import { Link, useNavigate } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounce";
import {
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  SquarePen,
  PackageX as DeleteIcon,
} from "lucide-react";

const renderProductList = (
  product: IProduct,
  fetchProducts: () => void
): React.JSX.Element => {
  return (
    <tr key={product.id}>
      <td>{product.productName}</td>
      <td>{product.category}</td>
      <td>{product.productStock}</td>
      <td>{product.productPrice}</td>
      <td className="px-0 self-center">
        <DropdownMenu product={product} fetchProducts={fetchProducts} />
      </td>
    </tr>
  );
};

const AddButton = (): React.JSX.Element => {
  return (
    <Link to="/admin/new-product">
      <button className="btn btn-primary">
        <p className="text-sm font-semibold">Add Product</p>
      </button>
    </Link>
  );
};

const DropdownMenu = ({
  product,
  fetchProducts,
}: {
  product: IProduct;
  fetchProducts: () => void;
}): React.JSX.Element => {
  const navigate = useNavigate();

  const handleDelete = (): void => {
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
  };

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
          onClick={() => navigate(`/admin/edit-product/${product.id}`)}
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
};

const Products = (): React.JSX.Element => {
  const [products, setProducts] = React.useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = React.useState<IProduct[]>(
    []
  );
  const [searchTerm, setSearchTerm] = React.useState<string>("");

  // Use the debounce hook to delay the search term processing
  const debouncedSearchTerm = useDebounce<string>(searchTerm);

  const handleSearch = (searchTerm: string): void => {
    setSearchTerm(searchTerm);
  };

  // Effect that runs when the debounced search term changes
  React.useMemo(() => {
    if (!debouncedSearchTerm.trim()) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.productName
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
      console.log(filtered);
    }
  }, [debouncedSearchTerm, products]);

  const fetchProducts = async (): Promise<void> => {
    try {
      const response = await axiosInstance.get<{ product: IProduct[] }>(
        "/products"
      );
      const data = response.data.product;
      setProducts(data);
      setFilteredProducts(data); // Initialize filtered products with all products
      console.log(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  React.useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="flex flex-col items-center justify-center w-[50vw] h-full gap-4 p-4">
        <div className="flex flex-row items-center justify-between w-full">
          <SearchInput
            placeholder="Search Products"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleSearch(e.target.value)
            }
          />
          <AddButton />
        </div>
        <div className="overflow-x-auto w-full h-[70vh] border border-[#D9D9D9] rounded-lg">
          {filteredProducts.length > 0 ? (
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
                {filteredProducts.map((product) =>
                  renderProductList(product, fetchProducts)
                )}
              </tbody>
            </table>
          ) : (
            <p className="flex items-center justify-center w-full h-[50vh] text-lg ">
              No products found
            </p>
          )}
        </div>
        <div className="flex flex-row items-center justify-center w-[20vw]">
          <button className="btn border border-[#D9D9D9] hover:bg-[#D9D9D9]">
            <ChevronLeft />
          </button>
          <h1 className="px-4">1</h1>
          <button className="btn border border-[#D9D9D9] hover:bg-[#D9D9D9]">
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
