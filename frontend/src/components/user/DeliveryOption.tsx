import React from "react";
import { useAuth, useCart } from "../../context/context";
import { axiosInstance } from "../../config/axios";

interface DeliveryOptionProps {
  prodId: string;
  label: string;
  subLabel: string;
  shippingFee: string;
  isSelected: boolean;
  onSelect: () => void;
}

const DeliveryOption = ({
  prodId,
  label,
  subLabel,
  shippingFee,
  isSelected,
  onSelect,
}: DeliveryOptionProps): React.JSX.Element => {
  const { userCart, fetchCartItems } = useCart();
  const { user } = useAuth();

  const handleDeliveryOptionChange = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!userCart || !user) return;

    try {
      await axiosInstance.post("/cart/update-shipping-fee", {
        userId: user.uid,
        productId: prodId,
        shippingFee: shippingFee,
      });
      onSelect();
      await fetchCartItems();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className={`flex items-center gap-2 p-2 border rounded-lg cursor-pointer transition-colors ${
        isSelected
          ? "border-primary bg-primary/10"
          : "border-base-300 hover:border-primary/50"
      }`}
      onClick={handleDeliveryOptionChange}
    >
      <input
        type="radio"
        name={`delivery-${prodId}`}
        checked={isSelected}
        onChange={() => {}} // Required for controlled component
        className="radio radio-primary"
      />
      <div className="flex-1">
        <div className="font-medium">{label}</div>
        <div className="text-sm opacity-70">{subLabel}</div>
      </div>
    </div>
  );
};

export default DeliveryOption;
