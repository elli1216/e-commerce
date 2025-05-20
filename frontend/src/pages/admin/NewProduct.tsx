import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { tags } from "../../data/data";
import { axiosInstance } from "../../config/axios";
import { dataURLtoFile } from "../../utils";

const renderCheckboxes = (
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
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

const DropDown = ({
  onChange,
}: {
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
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
        defaultValue="Pick a category"
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
  productBrand: string;
  productName: string;
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
    };
    usageBased: {
      gaming: string;
      office: string;
      programming: string;
      videoEditing: string;
      streaming: string;
      homeUse: string;
      business: string;
      student: string;
    };
    features: {
      rgb: string;
      mechanical: string;
      backlit: string;
      ergonomic: string;
      portable: string;
      silent: string;
    };
    miscellaneous: {
      newArrival: string;
      limitedEdition: string;
      ecoFriendly: string;
      energyEfficient: string;
    };
  };
}

const initialFormData: FormData = {
  category: "",
  productImage: "",
  productBrand: "",
  productName: "",
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
};

const NewProduct = (): React.JSX.Element => {
  const [formData, setFormData] = React.useState<FormData>(initialFormData);
  const [productImage, setProductImage] = React.useState<string>("");

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
            ...prevFormData.productTags[
              category as keyof typeof prevFormData.productTags
            ],
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (
      !formData.category ||
      !productImage ||
      !formData.productBrand ||
      !formData.productName ||
      !formData.productPrice ||
      !formData.productStock ||
      !formData.productDescription
    ) {
      alert("Please fill in all fields");
      return;
    }

    const clearForm = (): void => {
      setFormData(initialFormData);
    };

    const addProduct = async () => {
      try {
        // Create a FormData object
        const formDataObj = new FormData();

        // Append form fields
        formDataObj.append("category", formData.category);
        formDataObj.append("productBrand", formData.productBrand);
        formDataObj.append("productName", formData.productName);
        formDataObj.append("productPrice", formData.productPrice);
        formDataObj.append("productStock", formData.productStock);
        formDataObj.append("productDescription", formData.productDescription);

        // Convert base64 image to File
        const imageFile = dataURLtoFile(
          productImage,
          `${formData.productName.replace(/\s+/g, "-")}.jpg`
        );
        formDataObj.append("productImage", imageFile);
        formDataObj.append("productTags", JSON.stringify(formData.productTags));


        await axiosInstance.post(
          "/add-product",
          formDataObj
        );

        alert("Product added successfully");
      } catch (error) {
        console.error(error);
        alert("Failed to add product: " + error);
      }
    };

    addProduct();

    clearForm();
    navigate("/admin/products");
  };

  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center w-full h-full">
      <form
        className="flex flex-col items-center justify-center w-[50vw] h-full gap-4 p-4"
        onSubmit={handleSubmit}
      >
        <DropDown onChange={handleChange} />
        {renderInput({
          label: "Product Image URL",
          name: "productImage",
          type: "file",
          className: "file-input",
          onChange: handleImageChange,
        })}
        {renderInput({
          label: "Product Brand",
          name: "productBrand",
          type: "text",
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
          label: "Product Stocks",
          name: "productStock",
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
          <Link to="/admin/products">
            <button className="btn btn-secondary">Discard</button>
          </Link>
          <button className="btn btn-primary" type="submit">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewProduct;
