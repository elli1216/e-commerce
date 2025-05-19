import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { tags } from "../../data/data";
import { axiosInstance } from "../../config/axios";
import { IProduct } from "../../types/product";

const renderCheckboxes = (
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  formData: FormData
): React.JSX.Element => {
  return (
    <div className="grid grid-cols-[repeat(4,1fr)] gap-2">
      {Object.entries(tags).map(([categoryName, categoryTags]) => (
        <div key={categoryName} className="flex flex-col gap-2">
          <label className="text-sm">
            {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
          </label>
          <div className="grid grid-cols-[1fr] gap-2">
            {Object.entries(categoryTags).map(([tagName]) => (
              <div key={tagName} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={tagName}
                  name={`${categoryName}_${tagName}`}
                  checked={(formData.productTags as any)[categoryName][tagName] === "true"}
                  onChange={handleChange}
                />
                <label className="text-sm" htmlFor={tagName}>
                  {tagName}
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
  value,
  onChange,
}: {
  label: string;
  name: string;
  type: string;
  className?: string;
  element?: string;
  value?: string;
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
        value: value,
        onChange,
      })}
    </div>
  );
};

const DropDown = ({
  onChange,
  value,
}: {
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
}) => {
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

interface FormData {
  category: string;
  productImage: string;
  productName: string;
  productBrand: string;
  productPrice: string;
  productStock: string;
  productDescription: string;
  productTags: {
    connectivity: {
      wifi: string;
      bluetooth: string;
      ethernet: string;
      usb3: string;
      thunderbolt: string;
      hdmi: string;
    },
    usageBased: {
      gaming: string;
      office: string;
      programming: string;
      videoEditing: string;
      streaming: string;
      homeUse: string;
      business: string;
      student: string;
    },
    features: {
      rgb: string;
      mechanical: string;
      backlit: string;
      ergonomic: string;
      portable: string;
      silent: string;
    },
    miscellaneous: {
      newArrival: string;
      limitedEdition: string;
      ecoFriendly: string;
      energyEfficient: string;
    },
  };
}

const initialFormData: FormData = {
  category: "",
  productImage: "",
  productName: "",
  productBrand: "",
  productPrice: "",
  productStock: "",
  productDescription: "",
  productTags: {
    connectivity: {
      wifi: "false",
      bluetooth: "false",
      ethernet: "false",
      usb3: "false",
      thunderbolt: "false",
      hdmi: "false",
    },
    usageBased: {
      gaming: "false",
      office: "false",
      programming: "false",
      videoEditing: "false",
      streaming: "false",
      homeUse: "false",
      business: "false",
      student: "false",
    },
    features: {
      rgb: "false",
      mechanical: "false",
      backlit: "false",
      ergonomic: "false",
      portable: "false",
      silent: "false",
    },
    miscellaneous: {
      newArrival: "false",
      limitedEdition: "false",
      ecoFriendly: "false",
      energyEfficient: "false",
    },
  },
}

const EditProduct = (): React.JSX.Element => {
  const [formData, setFormData] = React.useState<FormData>(initialFormData);

  React.useEffect(() => {
    const productId = window.location.pathname.split("/").pop();
    const fetchProduct = async () => {
      const response = await axiosInstance.get(`/products/${productId}`);
      const product = response.data as IProduct;
      console.log(product);

      setFormData({
        category: product.category,
        productImage: product.productImage,
        productBrand: product.productBrand,
        productName: product.productName,
        productPrice: product.productPrice,
        productStock: product.productStock,
        productDescription: product.productDescription,
        productTags: {
          connectivity: product.tags.connectivity,
          usageBased: product.tags.usageBased,
          features: product.tags.features,
          miscellaneous: product.tags.miscellaneous,
        },
      });
    };
    fetchProduct();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const target = e.target as HTMLInputElement;
    const { name, value, checked, type } = target;

    if (type === "checkbox") {
      // Find the category and tag name
      const [category, tagName] = name.split("_");
      
      setFormData((prevFormData) => ({
        ...prevFormData,
        productTags: {
          ...prevFormData.productTags,
          [category]: {
            ...prevFormData.productTags[category as keyof typeof prevFormData.productTags],
            [tagName]: checked ? "true" : "false",
          },
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    if (
      !formData.category ||
      !formData.productImage ||
      !formData.productBrand ||
      !formData.productName ||
      !formData.productPrice ||
      !formData.productStock ||
      !formData.productDescription ||
      !formData.productTags
    ) {
      alert("Please fill in all fields");
      return;
    }

    const productId = window.location.pathname.split("/").pop();
    const editProduct = async () => {
      try {
        const response = await axiosInstance.put(`/edit-product/${productId}`, formData);
        console.log(response.data);
      } catch (error) {
        console.error(error);
        alert("Failed to edit product: " + error);
      }
    };

    editProduct();

    alert("Product edited successfully");
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
        onSubmit={handleSubmit}
      >
        <DropDown onChange={handleChange} value={formData.category} />
        {renderInput({
          label: "Product Image URL",
          name: "productImage",
          type: "file",
          className: "file-input",
          onChange: handleChange,
        })}
        {renderInput({
          label: "Product Brand",
          name: "productBrand",
          type: "text",
          value: formData.productBrand,
          onChange: handleChange,
        })}
        {renderInput({
          label: "Product Name",
          name: "productName",
          type: "text",
          value: formData.productName,
          onChange: handleChange,
        })}
        {renderInput({
          label: "Product Price",
          name: "productPrice",
          type: "number",
          value: formData.productPrice,
          onChange: handleChange,
        })}
        {renderInput({
          label: "Product Quantity",
          name: "productStock",
          type: "number",
          value: formData.productStock,
          onChange: handleChange,
        })}
        {renderInput({
          label: "Product Description",
          name: "productDescription",
          type: "textarea",
          className: "textarea",
          element: "textarea",
          value: formData.productDescription,
          onChange: handleChange,
        })}
        <div className="grid grid-cols-[2fr_8fr] gap-2 items-center w-full">
          <label className="text-[0.8rem]" htmlFor="productTags">
            Select all relevant tags
          </label>
          <div className="flex flex-col gap-2">
            {renderCheckboxes(handleChange, formData)}
          </div>
        </div>
        <div className="flex self-end gap-2">
          <Link to="/admin/products">
            <button className="btn btn-secondary">Discard</button>
          </Link>
          <button className="btn btn-primary" type="submit">
            Edit Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
