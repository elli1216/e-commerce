import React from 'react';
import Select from '../components/Select';
import UserHeader from '../components/UserHeader';

const ProductDetail = (): React.JSX.Element => {
  return (
    <>
      <UserHeader />
      <div className="p-4">
        {/* Product Details */}
        <section className="border border-base-300 p-2 md:flex flex-row gap-2 mx-auto max-w-5xl mb-5">
          <div>
            <img src="https://picsum.photos/400" alt="Product image" />
          </div>
          <div className="flex flex-col gap-2 md:justify-between">
            <div className="flex flex-col">
              <span>Product name</span>
              <span>Price</span>
              <Select />
            </div>
            <div className="flex flex-row gap-2">
              <button className='btn'>Add to cart</button>
              <button className='btn btn-accent'>Buy now</button>
            </div>
          </div>
        </section>

        {/* Product Specification */}
        <section className="border border-base-300 p-2 mx-auto max-w-5xl text-base-content">
          <div>
            <h2 className="text-3xl">Product Specification</h2>
            <p>Category</p>
            <p>Stock</p>
            <p>Brand</p>
          </div>
          <div>
            <h2 className="text-3xl">Product Description</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem unde ad ab eveniet velit suscipit enim est corrupti quae voluptate!</p>
          </div>
        </section>
      </div >
    </>
  );
};

export default ProductDetail;
