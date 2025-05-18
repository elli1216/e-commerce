import * as React from "react";
import { categoryData } from "../../data/data";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const renderCheckboxes = (
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
): React.JSX.Element => {
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
                  onChange={handleChange}
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
  onChange,
}: {
  label: string;
  name: string;
  type: string;
  className?: string;
  element?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}): React.JSX.Element => {
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

interface FormData {
  productCategory: string;
  productImage: string;
  productName: string;
  productPrice: string;
  productQuantity: string;
  productDescription: string;
}

const initialFormData: FormData = {
  productCategory: "",
  productImage: "",
  productName: "",
  productPrice: "",
  productQuantity: "",
  productDescription: "",
};

const NewProduct = (): React.JSX.Element => {
  const [formData, setFormData] = React.useState<FormData>(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    if (!formData.productCategory || !formData.productImage || !formData.productName || !formData.productPrice || !formData.productQuantity || !formData.productDescription) {
      alert("Please fill in all fields");
      return;
    }

    alert("Product added successfully");
    console.log(formData);
    clearForm();
    navigate("/admin/products");
  };

  const clearForm = (): void => {
    setFormData(initialFormData);
  };

  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center w-full h-full">
      <form
        className="flex flex-col items-center justify-center w-[50vw] h-full gap-4 p-4"
      >
        {renderInput({
          label: "Category",
          name: "productCategory",
          type: "text",
          onChange: handleChange,
        })}
        {renderInput({
          label: "Product Image URL",
          name: "productImage",
          type: "file",
          className: "file-input",
          onChange: handleChange,
        })}
        {renderInput({
          label: "Product Name",
          name: "productName",
          type: "text",
          onChange: handleChange,
        })}
        {renderInput({
          label: "Product Price",
          name: "productPrice",
          type: "number",
          onChange: handleChange,
        })}
        {renderInput({
          label: "Product Quantity",
          name: "productQuantity",
          type: "number",
          onChange: handleChange,
        })}
        {renderInput({
          label: "Product Description",
          name: "productDescription",
          type: "textarea",
          className: "textarea",
          element: "textarea",
          onChange: handleChange,
        })}
        <div className="grid grid-cols-[2fr_8fr] gap-2 items-center w-full">
          <label className="text-[0.8rem]" htmlFor="productTags">
            Select all relevant tags
          </label>
          <div className="flex flex-col gap-2">
            {renderCheckboxes(handleChange)}
          </div>
        </div>
        <div className="flex self-end gap-2">
          <Link to="/admin/products"><button className="btn btn-secondary">Discard</button></Link>
          <button className="btn btn-primary" type="submit" onClick={handleSubmit}>
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewProduct;
