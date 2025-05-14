import * as React from "react";
import { categoryData } from "../../data/data";

const renderCheckboxes = (): React.JSX.Element => {
  return (
    <div className="grid grid-cols-[repeat(4,1fr)] gap-2">
      {categoryData.map((category) => (
        <div key={category.id} className="flex flex-col gap-1">
          <label className="text-sm" htmlFor={category.name}>
            {category.name}
          </label>
          <div className="flex flex-col gap-2">
            {category.tags.map((tag) => (
              <div key={tag.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={tag.name}
                  name={tag.name}
                  value={tag.name}
                />
                <label className="text-sm" htmlFor={tag.name}>
                  {tag.name}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const renderInput = ({
  label,
  name,
  type,
  className,
  element,
}: {
  label: string;
  name: string;
  type: string;
  className?: string;
  element?: string;
}): React.JSX.Element => {
  return (
    <div className="grid grid-cols-[2fr_8fr] gap-2 items-center w-full">
      <label className="text-sm" htmlFor={name}>
        * {label}
      </label>
      {React.createElement(
        element || "input",
        {
          className: `input w-full ${className}`,
          id: name,
          name: name,
          type: type,
        }
      )}
    </div>
  );
};

const NewProduct = (): React.JSX.Element => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <form className="flex flex-col items-center justify-center w-[50vw] h-full gap-4 p-4">
        {renderInput({
          label: "Category",
          name: "productCategory",
          type: "text",
        })}
        {renderInput({
          label: "Product Image URL",
          name: "productImage",
          type: "file",
          className: "file-input",
        })}
        {renderInput({
          label: "Product Name",
          name: "productName",
          type: "text",
        })}
        {renderInput({
          label: "Product Price",
          name: "productPrice",
          type: "number",
        })}
        {renderInput({
          label: "Product Quantity",
          name: "productQuantity",
          type: "number",
        })}
        {renderInput({
          label: "Product Description",
          name: "productDescription",
          type: "textarea",
          className: "textarea",
          element: "textarea",
        })}
        <div className="grid grid-cols-[2fr_8fr] gap-2 items-center w-full">
          <label className="text-[0.8rem]" htmlFor="productTags">
            Select all relevant tags
          </label>
          <div className="flex flex-col gap-2">{renderCheckboxes()}</div>
        </div>
        <div className="flex self-end">
          <button className="btn" type="button">
            Discard
          </button>
          <button className="btn" type="submit">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewProduct;
