import { FormData } from "./form";

export interface CheckboxesProps {
  handleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  formData: FormData;
}

export interface InputProps {
  label: string;
  name: string;
  type: string;
  className?: string;
  element?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface DropdownProps {
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
}

export interface SearchInputProps {
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}