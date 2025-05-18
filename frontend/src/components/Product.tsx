import React from 'react';
import Select from './Select';
import { type IProduct } from '../types/product';

interface ProductProps {
  product: IProduct;
  onAddToCart: (product: IProduct, quantity: number) => void;
}

const Product = ({ product, onAddToCart }: ProductProps): React.JSX.Element => {

  const [quantity, setQuantity] = React.useState<number>(1);

  const handleQuantityChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setQuantity(Number(e.target.value));
    console.log(quantity)
  }

  return (
    <div className="flex flex-col w-fit hover:bg-base-300 transition-all">
      <div>
        <img src="https://picsum.photos/200" alt="Product image" />
      </div>
      <div className="flex flex-col gap-2 p-2">
        <span>{product.productName}</span>
        <span>₱{product.productPrice}</span>
        <Select
          onQuantityChange={handleQuantityChange}
          quantity={quantity}
        />
        <button
          onClick={() => onAddToCart(product, quantity)}
          className='btn btn-sm btn-secondary self-center'
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Product;