import React from "react";
import { InputProps } from "../../../types/input";

const Input = ({
  label,
  name,
  type,
  className,
  element,
  onChange,
}: InputProps): React.JSX.Element => {
  return (
    <div className="grid grid-cols-[2fr_8fr] gap-2 items-center w-full">
      <label className="text-sm" htmlFor={name}>
        * {label}
      </label>
      {React.createElement(element || "input", {
        className: `input w-full ${className}`,
        id: name,
        name: name,
        type: type,
        onChange,
      })}
    </div>
  );
};

export default Input;