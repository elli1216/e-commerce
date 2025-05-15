import * as React from 'react';
import Product from '../components/Product';
import UserHeader from '../components/UserHeader';
import FilterTabs from '../components/FilterTabs';
import { type IProduct } from '../types/product';
import { axiosInstance } from '../config/axios';

const Home = (): React.JSX.Element => {
  const [products, setProducts] = React.useState<IProduct[] | null>(null);

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

  return (
    <>
      <UserHeader />
      <div className="max-w-7xl mx-auto px-2">
        <FilterTabs />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
          {products?.map(product => (
            <Product key={product.id} {...product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
