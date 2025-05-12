import React from 'react';

const Product = (): React.JSX.Element => {
  return (
    <div className="flex flex-col w-fit gap-2">
      <div>
        <img src="https://picsum.photos/200" alt="Product image" />
      </div>
      <div className="flex flex-col gap-2">
        <span>Product name</span>
        <span>Price</span>
        <select name="quantity" className="select select-sm w-fit">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>
      <button className='btn btn-sm btn-secondary self-center'>
        Add to cart
      </button>
    </div>
  );
};

export default Product;