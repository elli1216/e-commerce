import React from 'react';
import Select from './Select';

const Product = (): React.JSX.Element => {
  return (
    <div className="flex flex-col w-fit hover:bg-base-300 transition-all">
      <div>
        <img src="https://picsum.photos/200" alt="Product image" />
      </div>
      <div className="flex flex-col gap-2 p-2">
        <span>Product name</span>
        <span>Price</span>
        <Select />
        <button className='btn btn-sm btn-secondary self-center'>
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Product;