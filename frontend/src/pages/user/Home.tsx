import * as React from "react";
import Product from "../../components/user/Product";
import UserHeader from "../../components/user/UserHeader";
import FilterTabs from "../../components/user/FilterTabs";
import { type IProduct } from "../../types/product";
import { axiosInstance } from "../../config/axios";
import { useAuth, useCart } from "../../context/context";
import { PackageX } from "lucide-react";

const Home = (): React.JSX.Element => {
  const [products, setProducts] = React.useState<IProduct[] | null>(null);
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    null
  );
  const { user } = useAuth();
  const { fetchCartItems } = useCart();

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get<{ product: IProduct[] }>(
          "/products"
        );
        const products = response.data.product;
        setProducts(products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (
    product: IProduct,
    quantity = 1
  ): Promise<void> => {
    if (!user) return;

    try {
      await axiosInstance.post("/cart/add", {
        userId: user.uid,
        productImage: product.productImage,
        productId: product.id,
        price: product.productPrice,
        quantity,
      });

      await fetchCartItems();
    } catch (err) {
      console.error(err);
      return;
    }
  };

  // Filter products by selected category
  const filteredProducts = React.useMemo(() => {
    if (!products) return [];
    if (!selectedCategory) return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [products, selectedCategory]);

  return (
    <>
      <UserHeader />
      <div className="max-w-7xl mx-auto px-2">
        <FilterTabs
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-base-content/60">
            <PackageX className="size-20 mb-2 text-secondary-content" />
            <span className="text-secondary-content text-2xl">
              No products found in this category.
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
            {filteredProducts.map((product) => (
              <Product
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
