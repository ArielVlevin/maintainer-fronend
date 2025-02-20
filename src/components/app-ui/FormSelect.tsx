import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

/**
 * @interface FormSelectProps
 * @description Props for the `FormSelect` component.
 * @property {string} label - The label text for the select field.
 * @property {string} name - The name attribute for the select field.
 * @property {string | number} value - The currently selected value.
 * @property {Array<{ label: string; value: string | number }>} options - The dropdown options.
 * @property {(value: string | number) => void} onChange - Function to handle select changes.
 * @property {string} [placeholder="Select an option"] - Placeholder text for the select field.
 * @property {boolean} [required=true] - Whether the field is required.
 * @property {string} [className] - Additional CSS classes.
 */
interface FormSelectProps {
  label: string;
  name: string;
  value: string | number;
  options: { label: string; value: string | number }[];
  onChange: (value: string | number) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

/**
 * @component FormSelect
 * @description A reusable select dropdown component with a label.
 *
 * @param {FormSelectProps} props - The properties of the component.
 * @returns {JSX.Element} A labeled select dropdown.
 *
 * @example
 * // Example usage for selecting a product
 * <FormSelect
 *   label="Select Product"
 *   name="product"
 *   value={selectedProduct}
 *   onChange={setSelectedProduct}
 *   options={[
 *     { label: "Product A", value: "a" },
 *     { label: "Product B", value: "b" },
 *   ]}
 * />
 */
export default function FormSelect({
  label,
  name,
  value,
  options,
  onChange,
  placeholder = "Select an option",
  required = true,
  disabled = false,
  className,
}: FormSelectProps) {
  return (
    <div className={cn(className, "flex flex-col gap-1 mb-4")}>
      <Label htmlFor={name} className="block font-medium">
        {label}
      </Label>
      <Select
        value={String(value)}
        onValueChange={onChange}
        required={required}
        disabled={disabled}
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={String(option.value)}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
