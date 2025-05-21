import * as React from "react";
import { CartContext, useAuth } from "../hooks/context";
import { type Cart } from "../types/cart";
import { axiosInstance } from "../config/axios";

export const CartProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [userCart, setUserCart] = React.useState<Cart | null>(null);
  const { user } = useAuth();

  const fetchCartItems = React.useCallback(async () => {
    if (!user?.uid) {
      setUserCart(null);
      return;
    }

    try {
      // Fetch from cart.xml
      const response = await axiosInstance.get<{ cart: Cart | Cart[] }>(
        "/cart"
      );
      const carts = response.data.cart;

      // Handle case when there are no carts
      if (!carts) {
        setUserCart(null);
        return;
      }

      // Save current user cart
      const userCarts = (Array.isArray(carts) ? carts : [carts]).filter(
        (cart) => cart && cart.userId === user.uid
      );

      // If user has no cart, set to null
      if (!userCarts.length) {
        setUserCart(null);
        return;
      }

      const userCart = userCarts[0];

      // Handle case where cart exists but has no items
      if (!userCart.items || !userCart.items.item) {
        setUserCart({
          ...userCart,
          total: "0.00",
          itemCount: "0",
        });
        return;
      }

      // Save the total amount of cart
      const items = Array.isArray(userCart.items.item)
        ? userCart.items.item
        : [userCart.items.item];

      const cartTotal = items.reduce(
        (sum, item) => sum + Number(item.subTotal ?? 0),
        0
      );

      setUserCart({
        ...userCart,
        total: cartTotal.toFixed(2),
        itemCount: String(items.length),
      });
    } catch (error) {
      setUserCart(null);
      console.error("Failed to fetch cart items:", error);
    }
  }, [user]);

  React.useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  return (
    <CartContext.Provider value={{ userCart, setUserCart, fetchCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
