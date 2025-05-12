import React from 'react';

const Select = (): React.JSX.Element => {
  return (
    <select name="quantity" className="select select-sm w-fit">
      {Array.from({ length: 30 }, (_, i) => (
        <option key={i + 1} value={i + 1}>
          {i + 1}
        </option>
      ))}
    </select>
  );
};

export default Select;
