import React from 'react';
import UserHeader from '../components/UserHeader';
import { type Cart } from '../types/cart';
import CartItem from '../components/CartItem';
import { useCart } from '../hooks/context';

const Cart = (): React.JSX.Element => {
  const { userCart, setUserCart } = useCart();

  const handleIncreaseQuantity = (productId: string) => {
    if (!userCart) return;

    const items =
      Array.isArray(userCart.items.item)
        ? userCart.items.item
        : [userCart.items.item]

    const updatedItems = items.map(item => {
      if (item.productId === productId) {
        const newQuantity = Number(item.quantity) + 1;
        const newSubTotal = (Number(item.price) * newQuantity).toFixed(2);
        return {
          ...item,
          quantity: String(newQuantity),
          subTotal: newSubTotal
        };
      }
      return item;
    });

    const cartTotal = updatedItems.reduce(
      (sum, item) => sum + Number(item.subTotal ?? 0),
      0
    );

    setUserCart({
      ...userCart,
      items: { item: updatedItems },
      total: cartTotal.toFixed(2)
    });


    console.log(userCart);

  }

  const handleDecreaseQuantity = (productId: string) => {
    if (!userCart) return;

    const items =
      Array.isArray(userCart.items.item)
        ? userCart.items.item
        : [userCart.items.item]

    const updatedItems = items.map(item => {
      if (item.productId === productId && Number(item.quantity) > 1) {
        const newQuantity = Number(item.quantity) - 1;
        const newSubTotal = (Number(item.subTotal) - Number(item.price)).toFixed(2);
        return {
          ...item,
          quantity: String(newQuantity),
          subTotal: newSubTotal
        };
      }
      return item;
    });

    const cartTotal = updatedItems.reduce(
      (sum, item) => sum + Number(item.subTotal ?? 0),
      0
    );

    setUserCart({
      ...userCart,
      items: { item: updatedItems },
      total: cartTotal.toFixed(2)
    });
  }

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
              <span>₱{userCart?.total}</span>
            </div>
            <button className='btn btn-primary mt-5'>Place your order</button>
          </div>
        }

        {/* Cart Item */}
        <div className="flex flex-col gap-5 flex-1/2">
          {userCart && (
            (Array.isArray(userCart.items.item)
              ? userCart.items.item
              : [userCart.items.item]
            ).map((item) =>
              <CartItem
                key={item.productId}
                {...item}
                increaseQuantity={handleIncreaseQuantity}
                decreaseQuantity={handleDecreaseQuantity}
              />
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
