import React from 'react';
import DeliveryOption from './DeliveryOption';
import type { IProduct } from '../types/product';
import { axiosInstance } from '../config/axios';
import { type Item } from '../types/cart';

const CartItem = (props: Item): React.JSX.Element => {
  const [products, setProducts] = React.useState<IProduct[] | null>(null);
  const cartProduct = products?.find((p) => p.id === props.productId);

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
    <div className="flex flex-col gap-5 p-3 border border-base-300 md:flex-row md:gap">
      <div>
        <img src="https://picsum.photos/200" alt="Product image" />
      </div>

      <div className="flex flex-col gap-2 flex-1 min-w-fit">
        <p className="font-semibold">{cartProduct?.productName}</p>
        <p>{props.subTotal}</p>
        <div className="h-7">
          <button
            onClick={() => props.decreaseQuantity?.(props.productId)}
            className='btn btn-sm bg-base-100'
          >
            -
          </button>
          <input
            type="number"
            value={props.quantity}
            readOnly
            className="input input-sm input-ghost w-12 text-center"
          />
          <button
            onClick={() => props.increaseQuantity?.(props.productId)}
            className='btn btn-sm bg-base-100 h-full'
          >
            +
          </button>
        </div>
        <button
          onClick={() => props.onDeleteItem?.(props.productId)}
          className="link-info link-hover cursor-pointer w-fit"
        >
          Delete
        </button>
      </div>

      <div className="flex flex-col gap-3 min-w-fit">
        <p className="font-semibold">Choose Delivery Option:</p>
        <DeliveryOption
          prodId={`${props.productId}`}
          label="Thursday, May 5"
          subLabel="Free - Shipping"
        />
        <DeliveryOption
          prodId={`${props.productId}`}
          label="Sunday, May 11"
          subLabel="₱40 - Shipping"
        />
        <DeliveryOption
          prodId={`${props.productId}`}
          label="Wednesday, May 7"
          subLabel="₱80 - Shipping"
        />
      </div>
    </div>
  );
};

export default CartItem;
