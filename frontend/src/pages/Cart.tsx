import React from 'react';
import UserHeader from '../components/UserHeader';
import { type Cart } from '../types/cart';
import CartItem from '../components/CartItem';
import { useAuth, useCart } from '../hooks/context';
import { axiosInstance } from '../config/axios';

const Cart = (): React.JSX.Element => {
  const { userCart, fetchCartItems } = useCart();
  const { user } = useAuth();

  const handleIncreaseQuantity = async (productId: string) => {
    if (!userCart || !user) return;
    try {
      await axiosInstance.post('/cart/increase', {
        userId: user.uid,
        productId,
      });
      // Refetch cart after update
      await fetchCartItems();
    } catch (err) {
      console.error(err);
    }
  }

  const handleDecreaseQuantity = async (productId: string) => {
    if (!userCart || !user) return;
    try {
      await axiosInstance.post('/cart/decrease', {
        userId: user.uid,
        productId,
      });
      await fetchCartItems();
    } catch (err) {
      console.error(err);
    }
  }

  const placeOrder = async () => {
    if (!userCart || !user) return;
    try {
      await axiosInstance.post('/order', {
        userId: user.uid,
        items: userCart.items.item,
        orderTotal: userCart.total,
      });
      // Optionally, clear the cart or refetch cart items here
      alert('Order placed successfully!');
      await fetchCartItems();
    } catch (err) {
      console.error(err);
      alert('Failed to place order.');
    }
  };

  const handleDeleteItem = async (productId: string) => {
    if (!userCart || !user) return;
    try {
      await axiosInstance.post('/cart/delete', {
        userId: user.uid,
        productId,
      });
      await fetchCartItems();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <UserHeader />
      <div className="max-w-7xl mx-auto my-8 p-3">
        <h1 className="text-4xl font-semibold w-fit">Your Cart</h1>
      </div>
      <div className="flex flex-col gap-5 max-w-7xl w-full mx-auto p-3 md:flex md:flex-row-reverse">
        {/* Order Summary */}
        {userCart?.items &&
          <div className="flex flex-col gap-3 border border-base-300 p-5  h-fit md:flex-1/4">
            <h2 className="text-2xl">{ }</h2>
            <div>
              <div className="flex flex-row justify-between">
                <span>Items(1):</span>
                <span>₱{userCart?.total}</span>
              </div>
              <div className="flex flex-row justify-between">
                <span>Shipping:</span>
                <span>₱40</span>
              </div>
            </div>
            <div className="divider p-0 m-0" />
            <div className="flex flex-row justify-between font-semibold">
              <span>Order total:</span>
              <span>₱{userCart.total}</span>
            </div>
            <button
              onClick={placeOrder}
              className='btn btn-primary mt-5'
            >Place your order</button>
          </div>
        }

        {/* Cart Item */}
        <div className="flex flex-col gap-5 flex-1/2">
          {userCart?.items && (
            (Array.isArray(userCart.items.item)
              ? userCart.items.item
              : [userCart.items.item]
            ).map((item) =>
              <CartItem
                key={item.productId}
                {...item}
                increaseQuantity={handleIncreaseQuantity}
                decreaseQuantity={handleDecreaseQuantity}
                onDeleteItem={handleDeleteItem}
              />
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
