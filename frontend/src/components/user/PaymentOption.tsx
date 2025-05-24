import React from "react";

interface PaymentOptionProps {
  label: string;
  subLabel: string;
  isSelected: boolean;
  onSelect: () => void;
  children?: React.ReactNode;
}

const PaymentOption: React.FC<PaymentOptionProps> = ({
  label,
  subLabel,
  isSelected,
  onSelect,
  children,
}) => {
  return (
    <div className="space-y-2">
      <div
        className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
          isSelected
            ? "border-primary bg-primary/5"
            : "border-base-300 hover:border-primary/50"
        }`}
        onClick={onSelect}
      >
        <div className="flex items-center gap-3 flex-1">
          <div
            className={`w-5 h-5 rounded-full border flex items-center justify-center ${
              isSelected
                ? "border-primary bg-primary text-white"
                : "border-base-300"
            }`}
          >
            {isSelected && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <div>
            <p className="font-medium">{label}</p>
            <p className="text-sm text-base-content/70">{subLabel}</p>
          </div>
        </div>
        {/* PayPal logo for the PayPal option */}
        {label.toLowerCase().includes("paypal") && (
          <div className="text-blue-500 font-bold text-lg">PayPal</div>
        )}
      </div>

      {/* Show children only when this option is selected */}
      {isSelected && children && <div className="pl-8">{children}</div>}
    </div>
  );
};

export default PaymentOption;
