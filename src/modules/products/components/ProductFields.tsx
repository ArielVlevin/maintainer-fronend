import { AvatarField } from "@/components/img/AvatarField";
import { Field } from "@/components/input/Field";

export default function ProductFields() {
  return (
    <div className="space-y-6">
      {/* Product Image Upload */}
      <AvatarField name="profilePicture" />

      {/* Product Name */}
      <Field name="name" required isMaxLength label="Name" type="text" />

      {/* Category */}
      <Field name="category" isMaxLength label="Category" type="text" />

      {/* Manufacturer */}
      <Field name="manufacturer" isMaxLength label="Manufacturer" type="text" />

      {/* Model */}
      <Field name="model" isMaxLength label="Model" type="text" />

      {/* Tags */}
      <Field name="tags" label="tags" type="tag" />

      {/* Purchase Date */}
      <Field name="purchaseDate" label="Purchase Date" type="date" />
    </div>
  );
}
