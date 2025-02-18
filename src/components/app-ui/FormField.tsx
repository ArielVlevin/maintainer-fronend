import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

/**
 * @interface FormFieldProps
 * @description Props for the `FormField` component.
 * @property {string} label - The label text for the input field.
 * @property {string} [type="text"] - The type of the input field (default is "text").
 * @property {string} name - The name attribute for the input field.
 * @property {string} [placeholder] - Placeholder text for the input field (defaults to label).
 * @property {string | number} value - The current value of the input field.
 * @property {(e: React.ChangeEvent<HTMLInputElement>) => void} onChange - Function to handle input changes.
 * @property {boolean} [required=true] - Whether the field is required (default is true).
 */
interface FormFieldProps {
  label: string;
  type?: string;
  name: string;
  placeholder?: string;
  value: string | number | Date | string[]; // Fixed `any` type to be either a string or a number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
}

/**
 * @component FormField
 * @description A reusable input field with a label for forms.
 *
 * @param {FormFieldProps} props - The properties of the component.
 * @returns {JSX.Element} A labeled input field.
 *
 * @example
 * // Example usage for a text input
 * <FormField
 *   label="Username"
 *   name="username"
 *   value={username}
 *   onChange={(e) => setUsername(e.target.value)}
 * />
 *
 * @example
 * // Example usage for a number input
 * <FormField
 *   label="Age"
 *   name="age"
 *   type="number"
 *   value={age}
 *   onChange={(e) => setAge(Number(e.target.value))}
 * />
 */
export default function FormField({
  label,
  type = "text",
  name,
  placeholder = label,
  value,
  onChange,
  required = true,
  className,
}: FormFieldProps) {
  return (
    <div className={cn(className, "flex flex-col gap-1 mb-4")}>
      <Label htmlFor={name} className="block font-medium mb-1">
        {label}
      </Label>
      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        name={name}
        value={String(value)}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}
