import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../config/axios";
import { dataURLtoFile } from "../../utils";
import { useMemo } from "react";
import Dropdown from "../../components/admin/newProduct/Dropdown";
import Input from "../../components/admin/newProduct/Input";
import Checkboxes from "../../components/admin/newProduct/Checkboxes";
import { type FormData, initialFormData } from "../../types/form";

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

        await axiosInstance.post("/add-product", formDataObj);

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
        {useMemo(
          () => (
            <Dropdown onChange={handleChange} />
          ),
          []
        )}
        {useMemo(
          () => (
            <Input
              label="Product Image URL"
              name="productImage"
              type="file"
              className="file-input"
              onChange={handleImageChange}
            />
          ),
          []
        )}
        {useMemo(
          () => (
            <Input
              label="Product Brand"
              name="productBrand"
              type="text"
              onChange={handleChange}
            />
          ),
          []
        )}
        {useMemo(
          () => (
            <Input
              label="Product Name"
              name="productName"
              type="text"
              onChange={handleChange}
            />
          ),
          []
        )}
        {useMemo(
          () => (
            <Input
              label="Product Price"
              name="productPrice"
              type="number"
              onChange={handleChange}
            />
          ),
          []
        )}
        {useMemo(
          () => (
            <Input
              label="Product Stocks"
              name="productStock"
              type="number"
              onChange={handleChange}
            />
          ),
          []
        )}
        {useMemo(
          () => (
            <Input
              label="Product Description"
              name="productDescription"
              type="textarea"
              className="textarea"
              element="textarea"
              onChange={handleChange}
            />
          ),
          []
        )}
        {useMemo(
          () => (
            <div className="grid grid-cols-[2fr_8fr] gap-2 items-center w-full">
              <label className="text-[0.8rem]" htmlFor="productTags">
                Select all relevant tags
              </label>
              <div className="flex flex-col gap-2">
                <Checkboxes formData={formData} handleChange={handleChange} />
              </div>
            </div>
          ),
          []
        )}
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
