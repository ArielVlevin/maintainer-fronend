import { useState, useMemo } from "react";

/**
 * @hook useSearch
 * @description A reusable hook for filtering an array of objects based on a search query.
 *
 * @param {T[]} data - The array of objects to search within.
 * @param {Array<keyof T>} keys - The keys within the objects to search in.
 * @returns {[T[], string, (query: string) => void]} Filtered array, search query state, and setter.
 */
export function useSearch<T>(data: T[], keys: Array<keyof T>) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    if (!searchQuery) return data;

    const lowerCaseQuery = searchQuery.toLowerCase();

    return data.filter((item) =>
      keys.some((key) => {
        const value = item[key];
        if (typeof value === "string") {
          return value.toLowerCase().includes(lowerCaseQuery);
        }
        if (typeof value === "number") {
          return value.toString().includes(lowerCaseQuery);
        }
        return false;
      })
    );
  }, [data, searchQuery, keys]);

  return { filteredData, searchQuery, setSearchQuery };
}
