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

import Avatar from "@/components/img/Avatar";
import InputField from "@/components/input/___InputField";
import { IProduct } from "@/types/IProduct";

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
    <div className="space-y-4">
      {/* Product Image Upload */}
      <Avatar {...imageUploadProps} prevImage={formData.iconUrl} />

      {/* Product Name Field */}
      <InputField
        label="Name"
        type="text"
        name="name"
        placeholder="Product name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      {/* Product Category Field */}
      <InputField
        label="Category"
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category || ""}
        onChange={handleChange}
      />

      {/* Manufacturer Field */}
      <InputField
        label="Manufacturer"
        type="text"
        name="manufacturer"
        value={formData.manufacturer || ""}
        onChange={handleChange}
      />

      {/* Model Field */}
      <InputField
        label="Model"
        type="text"
        name="model"
        value={formData.model || ""}
        onChange={handleChange}
      />

      {/* Tags Field */}
      <InputField
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
      <InputField
        label="Purchase Date"
        type="date"
        name="purchaseDate"
        value={formData.purchaseDate as Date}
        onChange={handleChange}
      />
    </div>
  );
};

export default ProductFields;
