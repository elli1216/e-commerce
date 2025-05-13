import React from 'react';

interface DeliveryOptionProps {
  prodId: string;
  label: string;
  subLabel: string;
}

const DeliveryOption = ({ prodId, label, subLabel }: DeliveryOptionProps): React.JSX.Element => {
  return (
    <label
      htmlFor={`${prodId}-${label}`}
      className="grid grid-flow-col grid-rows-2 gap-x-4 w-fit"
    >
      <input
        type="radio"
        name={`deliveryOption-${prodId}`}
        id={`${prodId}-${label}`}
        className="radio radio-primary radio-sm row-span-2 self-center"
      />
      <span className=''>{label}</span>
      <span className="text-base-content/40">{subLabel}</span>
    </label>
  );
};

export default DeliveryOption;
