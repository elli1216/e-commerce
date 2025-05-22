import React from "react";
import { axiosInstance } from "../../../config/axios";
import { DropdownProps } from "../../../types/input";

const DropDown = ({ onChange, value }: DropdownProps) => {
  const [categories, setCategories] = React.useState<string[] | null>(null);

  React.useEffect(() => {
    const fetchCategories = async () => {
      const response = await axiosInstance.get<{ category: string[] }>(
        "/categories"
      );
      const categories = response.data.category;
      setCategories(categories);
    };

    fetchCategories();
  }, []);

  return (
    <div className="grid grid-cols-[2fr_8fr] gap-2 items-center w-full">
      <label className="text-sm" htmlFor="category">
        * Category
      </label>
      <select
        id="category"
        name="category"
        defaultValue={value}
        className="select w-full"
        onChange={onChange}
      >
        <option disabled={true}>Pick a category</option>
        {categories?.map((category) => (
          <option key={category}>{category}</option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
