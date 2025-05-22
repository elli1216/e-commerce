import * as React from "react";
import { SearchInputProps } from "../../types/input";

export const SearchInput = ({
  placeholder,
  onChange,
}: SearchInputProps): React.JSX.Element => {
  return (
    <label className="input w-[20vw]">
      <svg
        className="h-[1em] opacity-50"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 24"
      >
        <g
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="1.5"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </g>
      </svg>
      <input
        type="search"
        className="grow"
        placeholder={placeholder}
        onChange={onChange}
      />
    </label>
  );
};
