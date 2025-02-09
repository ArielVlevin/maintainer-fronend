/**
 * `ProductFields` Component
 *
 * This component renders the input fields for a product form, allowing users to enter and update product details.
 * It includes an image upload section and input fields for various product attributes.
 *
 * @component
 * @param {IProduct} formData - The current form data containing product details.
 * @param {(e: React.ChangeEvent<HTMLInputElement>) => void} handleChange - Function to handle changes in input fields.
 * @param {Object} imageUploadProps - Properties for handling image uploads, including preview, file selection, and removal.
 * @param {string | null} imageUploadProps.previewUrl - The preview URL of the selected image.
 * @param {React.RefObject<HTMLInputElement | null>} imageUploadProps.fileInputRef - Reference to the file input element.
 * @param {() => void} imageUploadProps.handleThumbnailClick - Function to handle clicking the image upload button.
 * @param {(event: React.ChangeEvent<HTMLInputElement>) => void} imageUploadProps.handleFileChange - Function to handle file selection.
 * @param {() => void} imageUploadProps.handleRemove - Function to remove the selected image.
 *
 * @returns {JSX.Element} The rendered form fields for a product.
 *
 * @example
 * <ProductFields
 *   formData={formData}
 *   handleChange={handleChange}
 *   imageUploadProps={imageUploadProps}
 * />
 */

import Avatar from "../img/Avatar";
import FormField from "../app-ui/FormField";
import { IProduct } from "@/types";

interface ProductFieldsProps {
  formData: IProduct;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imageUploadProps: {
    previewUrl: string | null;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
    handleThumbnailClick: () => void;
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleRemove: () => void;
  };
}

const ProductFields: React.FC<ProductFieldsProps> = ({
  formData,
  handleChange,
  imageUploadProps,
}) => {
  return (
    <>
      {/* Product Image Upload */}
      <Avatar {...imageUploadProps} prevImage={formData.iconUrl} />

      {/* Product Name Field */}
      <FormField
        label="Name"
        type="text"
        name="name"
        placeholder="Enter product name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      {/* Product Category Field */}
      <FormField
        label="Category"
        type="text"
        name="category"
        value={formData.category || ""}
        onChange={handleChange}
      />

      {/* Manufacturer Field */}
      <FormField
        label="Manufacturer"
        type="text"
        name="manufacturer"
        value={formData.manufacturer || ""}
        onChange={handleChange}
      />

      {/* Model Field */}
      <FormField
        label="Model"
        type="text"
        name="model"
        value={formData.model || ""}
        onChange={handleChange}
      />

      {/* Tags Field */}
      <FormField
        label="Tags"
        type="text"
        name="tags"
        placeholder="Separate tags with commas"
        value={
          Array.isArray(formData.tags)
            ? formData.tags.join(", ")
            : formData.tags || ""
        }
        onChange={handleChange}
      />

      {/* Purchase Date Field */}
      <FormField
        label="Purchase Date"
        type="date"
        name="purchaseDate"
        value={formData.purchaseDate}
        onChange={handleChange}
      />
    </>
  );
};

export default ProductFields;
