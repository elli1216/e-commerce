import * as React from "react";
import Product from "../../components/user/Product";
import FilterTabs from "../../components/user/FilterTabs";
import { type IProduct } from "../../types/product";
import { axiosInstance } from "../../config/axios";
import { useAuth, useCart } from "../../context/context";
import { PackageX, ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 6;

const Home = (): React.JSX.Element => {
  const [products, setProducts] = React.useState<IProduct[] | null>(null);
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    null
  );
  const [currentPage, setCurrentPage] = React.useState(1);
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

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset to first page when category changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  return (
    <>
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
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {paginatedProducts.map((product) => (
                <Product
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8 mb-4">
                <div className="join">
                  <button
                    className="join-item btn btn-sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        className={`join-item btn btn-sm ${
                          currentPage === page ? "btn-primary" : ""
                        }`}
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </button>
                    )
                  )}

                  <button
                    className="join-item btn btn-sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Home;
