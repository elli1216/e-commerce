import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../config/axios";
import { IProduct } from "../../types/product";
import { dataURLtoFile } from "../../utils";
import Checkboxes from "../../components/admin/editProduct/Checkboxes";
import Input from "../../components/admin/editProduct/Input";
import Dropdown from "../../components/admin/editProduct/Dropdown";
import { type FormData, initialFormData } from "../../types/form";

const EditProduct = (): React.JSX.Element => {
  const [formData, setFormData] = React.useState<FormData>(initialFormData);
  const [productImage, setProductImage] = React.useState<string>("");
  const navigate = useNavigate();

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
        const formDataObj = new FormData();

        formDataObj.append("category", formData.category);
        formDataObj.append("productBrand", formData.productBrand);
        formDataObj.append("productName", formData.productName);
        formDataObj.append("productPrice", formData.productPrice);
        formDataObj.append("productStock", formData.productStock);
        formDataObj.append("productDescription", formData.productDescription);

        // Handle the image upload
        if (productImage) {
          try {
            const imageFile = dataURLtoFile(
              productImage,
              `${formData.productName.replace(/\s+/g, "-")}.jpg`
            );
            formDataObj.append("productImage", imageFile);
          } catch (error) {
            console.error("Failed to process image:", error);
            alert(
              "Failed to process image. Please try again with a different image."
            );
            return;
          }
        } else {
          // If no new image, keep existing image path
          formDataObj.append("productImage", formData.productImage);
        }

        formDataObj.append("productTags", JSON.stringify(formData.productTags));

        await axiosInstance.put(`/edit-product/${productId}`, formDataObj);

        alert("Product edited successfully");
        clearForm();
        navigate("/admin/products");
      } catch (error) {
        console.error(error);
        alert("Failed to edit product: " + error);
      }
    };

    editProduct();
  };

  const clearForm = (): void => {
    setFormData(initialFormData);
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      <form
        className="flex flex-col items-center justify-center w-[50vw] h-full gap-4 p-4"
        onSubmit={handleSubmit}
      >
        <Dropdown onChange={handleChange} value={formData.category} />
        {<Input
          label="Product Image URL"
          name="productImage"
          type="file"
          className="file-input"
          onChange={handleImageChange}
        />}
        {<Input
          label="Product Brand"
          name="productBrand"
          type="text"
          value={formData.productBrand}
          onChange={handleChange}
        />}
        {<Input
          label="Product Name"
          name="productName"
          type="text"
          value={formData.productName}
          onChange={handleChange}
        />}
        {<Input
          label="Product Price"
          name="productPrice"
          type="number"
          value={formData.productPrice}
          onChange={handleChange}
        />}
        {<Input
          label="Product Quantity"
          name="productStock"
          type="number"
          value={formData.productStock}
          onChange={handleChange}
        />}
        {<Input
          label="Product Description"
          name="productDescription"
          type="textarea"
          className="textarea"
          element="textarea"
          value={formData.productDescription}
          onChange={handleChange}
        />}
        <div className="grid grid-cols-[2fr_8fr] gap-2 items-center w-full">
          <label className="text-[0.8rem]" htmlFor="productTags">
            Select all relevant tags
          </label>
          <div className="flex flex-col gap-2">
            <Checkboxes handleChange={handleChange} formData={formData} />
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
