import React, { useMemo, useCallback } from "react";
import { type Cart } from "../../types/cart";
import CartItem from "../../components/user/CartItem";
import { useAuth, useCart } from "../../context/context";
import { axiosInstance } from "../../config/axios";
import { ShoppingCart } from "lucide-react";
import PaymentOption from "../../components/user/PaymentOption";
import PayPalForm from "../../components/user/PayPalForm";

const Cart = (): React.JSX.Element => {
  const { userCart, fetchCartItems, setUserCart } = useCart();
  const { user } = useAuth();
  const [selectedPayment, setSelectedPayment] = React.useState<string>("cash");
  const [isPayPalFormValid, setIsPayPalFormValid] =
    React.useState<boolean>(false);

  // Ensure cart items are always in array format
  const cartItemsArray = useMemo(() => {
    if (!userCart?.items?.item) return [];
    return Array.isArray(userCart.items.item)
      ? userCart.items.item
      : [userCart.items.item];
  }, [userCart]);

  const isCartEmpty = cartItemsArray.length === 0;

  const handleIncreaseQuantity = useCallback(
    async (productId: string) => {
      if (!userCart || !user) return;
      try {
        await axiosInstance.post("/cart/increase", {
          userId: user.uid,
          productId,
        });
        await fetchCartItems();
      } catch (err) {
        console.error(err);
      }
    },
    [userCart, user, fetchCartItems]
  );

  const handleDecreaseQuantity = useCallback(
    async (productId: string) => {
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
    },
    [userCart, user, fetchCartItems]
  );

  const placeOrder = useCallback(async () => {
    if (!userCart || !user) return;

    const isConfirmed = confirm(
      "Are you sure you want to place this order?"
    );
    if (!isConfirmed) return;

    try {
      await axiosInstance.post("/order", {
        userId: user.uid,
        items: cartItemsArray,
        orderTotal: userCart.total,
        shippingFee: cartItemsArray.reduce(
          (sum, item) => sum + parseFloat(item.shippingFee || "0"),
          0
        ),
      });

      alert("Order placed successfully!");
      window.location.reload();
      await fetchCartItems();
    } catch (err) {
      console.error(err);
      alert("Failed to place order.");
    }
  }, [userCart, user, cartItemsArray, fetchCartItems]);

  const handleDeleteItem = useCallback(
    async (productId: string) => {
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
    },
    [userCart, user, fetchCartItems]
  );

  const handleShippingChange = useCallback(
    (productId: string, shippingFee: string, arrivingDate: string) => {
      if (!userCart) return;

      const updatedItems = Array.isArray(userCart.items.item)
        ? userCart.items.item.map((item) =>
            item.productId === productId
              ? { ...item, shippingFee, arrivingDate }
              : item
          )
        : userCart.items.item.productId === productId
        ? { ...userCart.items.item, shippingFee, arrivingDate }
        : userCart.items.item;

      setUserCart({
        ...userCart,
        items: {
          ...userCart.items,
          item: updatedItems,
        },
      });
    },
    [userCart, setUserCart]
  );

  // Calculate total shipping fee
  const totalShippingFee = useMemo(() => {
    if (!userCart) return 0;

    return Array.isArray(userCart.items.item)
      ? userCart.items.item.reduce(
          (sum, item) => sum + parseFloat(item.shippingFee || "0"),
          0
        )
      : parseFloat(userCart.items.item?.shippingFee || "0");
  }, [userCart]);

  // Calculate order total (subtotal + shipping)
  const orderTotal = useMemo(() => {
    if (!userCart) return "0.00";
    return (parseFloat(userCart.total) + totalShippingFee).toFixed(2);
  }, [userCart, totalShippingFee]);

  // Render cart items with shipping change handler
  const cartItems = useMemo(() => {
    if (!userCart) return [];

    return cartItemsArray.map((item) => (
      <CartItem
        key={item.productId}
        {...item}
        increaseQuantity={handleIncreaseQuantity}
        decreaseQuantity={handleDecreaseQuantity}
        onDeleteItem={handleDeleteItem}
        onShippingChange={handleShippingChange}
      />
    ));
  }, [
    userCart,
    cartItemsArray,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleDeleteItem,
    handleShippingChange,
  ]);

  const handlePayPalSubmit = async (email: string) => {
    console.log("PayPal login with email:", email);
    // In a real app, you would process the payment here
    // For demo purposes, we'll simulate a successful login after a short delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsPayPalFormValid(true);
    return Promise.resolve();
  };

  const handleCancelPayPal = () => {
    setSelectedPayment("cash");
    setIsPayPalFormValid(false);
  };

  return (
    <div className="max-w-7xl mx-auto my-8 p-3">
      <h1 className="text-4xl font-semibold w-fit">Your Cart</h1>
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
            <div className="flex flex-col gap-3 h-fit md:flex-1/4">
              <div className="flex flex-col gap-5 border border-base-300 p-5">
                <h2 className="text-2xl">Order Summary</h2>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-row justify-between">
                    <span>Items({cartItemsArray.length}):</span>
                    <span>₱{userCart?.total}</span>
                  </div>
                  <div className="flex flex-row justify-between">
                    <span>Shipping:</span>
                    <span>₱{totalShippingFee.toFixed(2)}</span>
                  </div>
                </div>
                <div className="divider p-0 m-0" />
                <div className="flex flex-row justify-between font-semibold">
                  <span>Order total:</span>
                  <span>₱{orderTotal}</span>
                </div>
              </div>
              <div className="flex flex-col gap-5 border border-base-300 p-5">
                <h2 className="text-2xl">Payment Method</h2>
                <div className="flex flex-col gap-4">
                  <PaymentOption
                    label="Cash on Delivery"
                    subLabel="Pay when the product arrives"
                    isSelected={selectedPayment === "cash"}
                    onSelect={() => {
                      setSelectedPayment("cash");
                      setIsPayPalFormValid(false);
                    }}
                  />
                  <PaymentOption
                    label="PayPal"
                    subLabel="Pay via PayPal"
                    isSelected={selectedPayment === "paypal"}
                    onSelect={() => setSelectedPayment("paypal")}
                  >
                    {selectedPayment === "paypal" && (
                      <PayPalForm
                        onSubmit={handlePayPalSubmit}
                        onCancel={handleCancelPayPal}
                        isLoggedIn={isPayPalFormValid}
                      />
                    )}
                  </PaymentOption>
                </div>
                <button
                  onClick={placeOrder}
                  className="btn btn-primary w-full mt-4"
                  disabled={selectedPayment === "paypal" && !isPayPalFormValid}
                >
                  {selectedPayment === "paypal"
                    ? "Pay with PayPal"
                    : "Place Order"}
                </button>
              </div>
            </div>

            {/* Cart Item */}
            <div className="flex flex-col gap-5 flex-1/2">{cartItems}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
