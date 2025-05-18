import * as React from 'react';
import Product from '../components/Product';
import UserHeader from '../components/UserHeader';
import FilterTabs from '../components/FilterTabs';
import { type IProduct } from '../types/product';
import { axiosInstance } from '../config/axios';
import { useAuth, useCart } from '../hooks/context';

const Home = (): React.JSX.Element => {
  const [products, setProducts] = React.useState<IProduct[] | null>(null);
  const { user } = useAuth();
  const { fetchCartItems } = useCart();

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get<{ product: IProduct[] }>('/products');
        const products = response.data.product;
        setProducts(products);

      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (product: IProduct, quantity = 1): Promise<void> => {
    if (!user) return;

    try {
      await axiosInstance.post('/cart/add', {
        userId: user.uid,
        productId: product.id,
        price: product.productPrice,
        quantity
      });

      await fetchCartItems();
    } catch (err) {
      console.error(err);
      return;
    }
  }

  return (
    <>
      <UserHeader />
      <div className="max-w-7xl mx-auto px-2">
        <FilterTabs />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
          {products?.map(product => (
            <Product
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
