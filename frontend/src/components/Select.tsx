import React from 'react';

interface SelectProps {
  quantity: number;
  onQuantityChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select = (props: SelectProps): React.JSX.Element => {
  return (
    <select
      onChange={props.onQuantityChange}
      value={props.quantity}
      name="quantity"
      className="select select-sm w-fit">
      {Array.from({ length: 30 }, (_, i) => (
        <option key={i + 1} value={i + 1}>
          {i + 1}
        </option>
      ))}
    </select>
  );
};

export default Select;
