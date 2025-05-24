import * as React from "react";
import { CartContext, useAuth } from "../../context/context";
import { type Cart } from "../../types/cart";
import { axiosInstance } from "../../config/axios";

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
      const response = await axiosInstance.get<{ cart: Cart | Cart[] }>(
        "/cart"
      );
      const carts = response.data.cart;

      if (!carts) {
        setUserCart(null);
        return;
      }

      const cart = Array.isArray(carts)
        ? carts.find((c) => c.userId === user.uid)
        : carts;

      if (!cart) {
        setUserCart(null);
        return;
      }

      const items = Array.isArray(cart.items.item)
        ? cart.items.item
        : [cart.items.item];

      const cartTotal = items.reduce(
        (sum, item) => sum + Number(item.subTotal ?? 0),
        0
      );

      const updatedCart = {
        ...cart,
        total: cartTotal.toFixed(2),
        itemCount: String(items.length),
      };

      setUserCart(updatedCart);
    } catch (error) {
      setUserCart(null);
      console.error("Failed to fetch cart items:", error);
    }
  }, [user]);

  React.useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = React.useMemo(
    () => ({
      userCart,
      setUserCart,
      fetchCartItems,
    }),
    [userCart, fetchCartItems]
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
