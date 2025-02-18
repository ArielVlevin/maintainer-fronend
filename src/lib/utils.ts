import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Formats a date safely, returning "N/A" if the value is missing.
 *
 * @param {Date | string | undefined} date - The date to format.
 * @returns {string} The formatted date or "N/A" if invalid.
 */
export const formatDate = (date?: Date | string): string => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString();
};
