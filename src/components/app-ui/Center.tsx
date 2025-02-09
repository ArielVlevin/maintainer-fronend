"use client";

import { cn } from "@/lib/utils";
import React from "react";

/**
 * @interface CenterProps
 * @description Props for the `Center` component.
 * @property {React.ReactNode} children - The content to be centered inside the container.
 * @property {string} [className] - Additional CSS classes to customize the styling.
 */
interface CenterProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * @component Center
 * @description A utility component that centers its children both horizontally and vertically.
 * Can be extended with additional CSS classes.
 *
 * @param {CenterProps} props - The properties of the component.
 * @returns {JSX.Element} A flexbox container that centers its content.
 *
 * @example
 * // Example usage to center a button
 * <Center>
 *   <button className="px-4 py-2 bg-blue-500 text-white">Click Me</button>
 * </Center>
 *
 * @example
 * // Example with additional styling
 * <Center className="h-64 bg-gray-100">
 *   <p className="text-xl font-semibold">Centered Text</p>
 * </Center>
 */
export function Center({ children, className = "" }: CenterProps) {
  return (
    <div
      className={cn("flex justify-center items-center text-center", className)}
    >
      {children}
    </div>
  );
}
