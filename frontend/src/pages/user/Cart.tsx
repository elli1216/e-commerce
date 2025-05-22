import React from "react";
import { type Cart } from "../../types/cart";
import CartItem from "../../components/user/CartItem";
import { useAuth, useCart } from "../../context/context";
import { axiosInstance } from "../../config/axios";
import { ShoppingCart } from "lucide-react";

const Cart = (): React.JSX.Element => {
  const { userCart, fetchCartItems } = useCart();
  const { user } = useAuth();

  // Ensure cart items are always in array format
  const cartItems = React.useMemo(() => {
    if (!userCart?.items?.item) return [];
    return Array.isArray(userCart.items.item)
      ? userCart.items.item
      : [userCart.items.item];
  }, [userCart]);

  const isCartEmpty = cartItems.length === 0;

  const handleIncreaseQuantity = async (productId: string) => {
    if (!userCart || !user) return;
    try {
      await axiosInstance.post("/cart/increase", {
        userId: user.uid,
        productId,
      });
      // Refetch cart after update
      await fetchCartItems();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDecreaseQuantity = async (productId: string) => {
    if (!userCart || !user) return;
    try {
      await axiosInstance.post("/cart/decrease", {
        userId: user.uid,
        productId,
      });
      await fetchCartItems();
    } catch (err) {
      console.error(err);
    }
  };

  const placeOrder = async () => {
    if (!userCart || !user) return;
    try {
      await axiosInstance.post("/order", {
        userId: user.uid,
        items: cartItems,
        orderTotal: userCart.total,
      });

      alert("Order placed successfully!");
      window.location.reload();
      await fetchCartItems();
    } catch (err) {
      console.error(err);
      alert("Failed to place order.");
    }
  };

  const handleDeleteItem = async (productId: string) => {
    if (!userCart || !user) return;
    try {
      await axiosInstance.post("/cart/delete", {
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
      <div className="max-w-7xl mx-auto my-8 p-3">
        <h1 className="text-4xl font-semibold w-fit">Your Cart</h1>
      </div>
      <div className="flex flex-col gap-5 max-w-7xl w-full mx-auto p-3 md:flex md:flex-row-reverse">
        {isCartEmpty ? (
          <div className="flex flex-col items-center justify-center w-full h-96 text-base-content/60">
            <ShoppingCart className="w-20 h-20 mb-4 text-secondary-content" />
            <span className="text-2xl text-secondary-content">
              Your cart is empty.
            </span>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-3 border border-base-300 p-5  h-fit md:flex-1/4">
              <h2 className="text-2xl">Order Summary</h2>
              <div>
                <div className="flex flex-row justify-between">
                  <span>Items({cartItems.length}):</span>
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
                <span>₱{userCart?.total || 0}</span>
              </div>
              <button onClick={placeOrder} className="btn btn-primary mt-5">
                Place your order
              </button>
            </div>

            {/* Cart Item */}
            <div className="flex flex-col gap-5 flex-1/2">
              {cartItems.map((item) => (
                <CartItem
                  key={item.productId}
                  {...item}
                  increaseQuantity={handleIncreaseQuantity}
                  decreaseQuantity={handleDecreaseQuantity}
                  onDeleteItem={handleDeleteItem}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
