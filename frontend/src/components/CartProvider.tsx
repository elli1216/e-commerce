import * as React from 'react';
import { CartContext, useAuth } from '../hooks/context';
import { type Cart } from '../types/cart';
import { axiosInstance } from '../config/axios';

export const CartProvider = ({ children }: { children: React.ReactElement }) => {
  const [userCart, setUserCart] = React.useState<Cart | null>(null);
  const { user } = useAuth();

  const fetchCartItems = React.useCallback(async () => {
    try {
      // Fetch from cart.xml
      const response = await axiosInstance.get<{ cart: Cart | Cart[] }>('/cart');
      const carts = response.data.cart;

      // Save current user cart
      const [userCart] =
        (Array.isArray(carts)
          ? carts
          : [carts]).filter(cart => cart && cart.userId === user?.uid);

      // Save the total amount of cart
      if (userCart) {
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
          itemCount: String(items.length)
        });
      }

      console.log(userCart);

    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  }, [setUserCart, user]);

  React.useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);


  return (
    <CartContext.Provider value={{ userCart, setUserCart, fetchCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider