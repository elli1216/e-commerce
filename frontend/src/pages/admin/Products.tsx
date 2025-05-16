import * as React from "react";
import { SearchInput } from "../../components/SearchInput";
// import { mockProductData } from "../../data/mockData";
import { type IProduct } from "../../types/product";
import { axiosInstance } from "../../config/axios";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  SquarePen,
  PackageX as DeleteIcon,
} from "lucide-react";

const renderProductList = (product: IProduct): React.JSX.Element => {
  return (
    <tr key={product.id}>
      <td>{product.productName}</td>
      <td>{product.category}</td>
      <td>{product.productQuantity}</td>
      <td>{product.productPrice}</td>
      <td className="px-0 self-center">
        <DropdownMenu />
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

const DropdownMenu = (): React.JSX.Element => {
  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <div tabIndex={0} role="button" className="cursor-pointer p-0">
        <EllipsisVertical />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-1 w-[10vw] shadow"
      >
        <button className="btn btn-ghost self-start justify-start w-full">
          <SquarePen className="size-4" />
          Edit
        </button>
        <button className="btn btn-ghost self-start justify-start w-full">
          <DeleteIcon className="size-4" />
          Delete
        </button>
      </ul>
    </div>
  );
};

const Products = (): React.JSX.Element => {
  const [products, setProducts] = React.useState<IProduct[]>([]);

  React.useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      try {
        const response = await axiosInstance.get<{ product: IProduct[] }>('/products');
        const data = response.data.product;
        setProducts(data);
        console.log(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="flex flex-col items-center justify-center w-[50vw] h-full gap-4 p-4">
        <div className="flex flex-row items-center justify-between w-full">
          <SearchInput placeholder="Search Products" />
          <AddButton />
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
            <tbody>{products.map(renderProductList as any)}</tbody>
          </table>
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
