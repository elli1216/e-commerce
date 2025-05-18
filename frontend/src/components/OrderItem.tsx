import React from 'react';
import { axiosInstance } from '../config/axios';
import { type Item } from '../types/order';
import { type IProduct } from '../types/product';
import { formatArrivingDate } from '../utils/date';
import { useNavigate } from 'react-router-dom';

const OrderItem = (item: Item): React.JSX.Element => {
  const [products, setProducts] = React.useState<IProduct[] | null>(null);
  const product = products?.find(p => p.id === item.productId);
  const navigate = useNavigate();

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

  const handleTrackOrder = (): void => {
    navigate(
      `/order/:${item.productId}}`,
      {
        state: {
          item,
          product
        }
      }
    )
  }

  return (
    <div className="p-3 sm:flex sm:flex-row sm:gap-5">
      <div>
        <img src="https://picsum.photos/200" alt="Product image" />
      </div>
      <div className="flex flex-col justify-between gap-2 md:flex-row md:flex-1/2">
        <div className="flex flex-col gap-2">
          <span>{product?.productName}</span>
          <span>Arriving on: {formatArrivingDate(item.arrivingDate)}</span>
          <span>₱{product?.productPrice}</span>
          <span>Quantity: {item.quantity}</span>
        </div>
        <button
          onClick={handleTrackOrder}
          className='btn btn-sm w-full btn-secondary self-center sm:w-3xs'
        >
          Track Order
        </button>
      </div>
    </div >
  );
};

export default OrderItem;
