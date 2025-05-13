import React from 'react';
import UserHeader from '../components/UserHeader';
import CartItem from '../components/CartItem';

const Cart = (): React.JSX.Element => {
  return (
    <>
      <UserHeader />
      <div className="max-w-7xl mx-auto my-8 p-3">
        <h1 className="text-4xl font-semibold w-fit">Your Cart</h1>
      </div>
      <div className="flex flex-col gap-5 max-w-7xl w-full mx-auto p-3 md:flex md:flex-row-reverse">
        {/* Order Summary */}
        <div className="flex flex-col gap-3 border border-base-300 p-5  h-fit md:flex-1/4">
          <h2 className="text-2xl">Order Summary</h2>
          <div>
            <div className="flex flex-row justify-between">
              <span>Items(2):</span>
              <span>₱959</span>
            </div>
            <div className="flex flex-row justify-between">
              <span>Shipping:</span>
              <span>₱40</span>
            </div>
          </div>
          <div className="divider p-0 m-0" />
          <div className="flex flex-row justify-between font-semibold">
            <span>Order total:</span>
            <span>₱999</span>
          </div>
          <button className='btn btn-primary mt-5'>Place your order</button>
        </div>

        {/* Cart Item */}
        <div className="flex flex-col gap-5 flex-1/2">
          <CartItem prodId='123' />
          <CartItem prodId='321' />
        </div>
      </div>
    </>
  );
};

export default Cart;
