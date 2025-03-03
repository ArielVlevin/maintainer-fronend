import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface InputWrapperProps {
  name: string;
  label: string;
  children: ReactNode;
  className?: string;
  required?: boolean;
}

/**
 * @component InputWrapper
 * @description A reusable wrapper for form inputs with a floating label.
 *
 * @param {string} name - The `name` attribute of the input field.
 * @param {string} label - The label text.
 * @param {ReactNode} children - The input field component to be wrapped.
 * @param {string} [className] - Optional additional classes for styling.
 *
 * @returns {JSX.Element} The styled input wrapper.
 *
 * @example
 * <InputWrapper name="email" label="Email">
 *   <Input type="email" name="email" placeholder="Enter your email" />
 * </InputWrapper>
 */
export function InputWrapper({
  name,
  label,
  children,
  required,
  className,
}: InputWrapperProps) {
  return (
    <div className={cn("group relative", className)}>
      <Label
        htmlFor={name}
        className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
      >
        {label}
        {required && <span className="text-destructive ">*</span>}
      </Label>
      {children}
    </div>
  );
}
