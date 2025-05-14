import React from 'react';
import UserHeader from '../components/UserHeader';

const Order = (): React.JSX.Element => {
  return (
    <>
      <UserHeader />
      <div className="max-w-5xl mx-auto my-8 p-3">
        <h1 className="text-4xl font-semibold w-fit">Your Order</h1>
      </div>
      <div className="px-3">
        <div className="flex flex-col max-w-5xl w-full mx-auto border border-base-300">
          <div className="flex flex-col gap-3 border-b border-base-300 p-3 sm:flex-row-reverse sm:justify-between">
            <div>
              <span className="block font-semibold">Order ID:</span>
              <span>27cba69d-4c3d-4098-b42d-ac7fa62b7664</span>
            </div>
            <div className="flex flex-row gap-5">
              <div>
                <span className="block font-semibold">Order Placed:</span>
                <span>May 7</span>
              </div>
              <div>
                <span className="block font-semibold">Total:</span>
                <span>₱999</span>
              </div>
            </div>
          </div>

          <div className="p-3 sm:flex sm:flex-row sm:gap-5">
            <div>
              <img src="https://picsum.photos/200" alt="Product image" />
            </div>
            <div className="flex flex-col justify-between gap-2 md:flex-row md:flex-1/2">
              <div className="flex flex-col gap-2">
                <span>Product name</span>
                <span>Arriving on: May 15</span>
                <span>₱500</span>
                <span>Quantity: 4</span>
              </div>
              <button className='btn btn-sm w-full btn-secondary self-center sm:w-3xs'>
                Track Order
              </button>
            </div>
          </div>
          <div className="p-3 sm:flex sm:flex-row sm:gap-5">
            <div>
              <img src="https://picsum.photos/200" alt="Product image" />
            </div>
            <div className="flex flex-col justify-between gap-2 md:flex-row md:flex-1/2">
              <div className="flex flex-col gap-2">
                <span>Product name</span>
                <span>Arriving on: May 15</span>
                <span>₱500</span>
                <span>Quantity: 4</span>
              </div>
              <button className='btn btn-sm w-full btn-secondary self-center sm:w-3xs'>
                Track Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;