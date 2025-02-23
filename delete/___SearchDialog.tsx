"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/api/___product"; // Fetch function for products
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IProduct } from "@/types";

/**
 * @component SearchDialog
 * @description A search dialog component for finding products in the system. It fetches product names dynamically based on the search term.
 *
 * @returns {JSX.Element} The rendered search dialog component.
 *
 * @example
 * // Example usage inside a component
 * <SearchDialog />
 */
export default function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  /**
   * Fetches product names dynamically when the user starts typing.
   * The query is only enabled when there is a search term.
   */
  const { data, error, isLoading } = useQuery({
    queryKey: ["products", searchTerm],
    queryFn: () => fetchProducts(1, 100, searchTerm, undefined, ["name"]),
    enabled: searchTerm.length > 0, // Only fetch when there is input
  });

  /**
   * Keyboard shortcut (⌘K / Ctrl+K) to toggle the search dialog.
   */
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      {/* Button to open the search dialog */}
      <Button
        variant="outline"
        className="w-full max-w-md flex items-center gap-2 px-4 py-2"
        onClick={() => setOpen(true)}
      >
        <Search className="h-5 w-5 text-gray-500" />
        <span>Search for a product...</span>
      </Button>

      {/* Search dialog with product filtering */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search for a product..."
          value={searchTerm}
          onValueChange={setSearchTerm}
        />
        <CommandList>
          {isLoading ? (
            <CommandEmpty>Loading...</CommandEmpty>
          ) : error ? (
            <CommandEmpty>❌ Error loading products</CommandEmpty>
          ) : data?.products?.length === 0 ? (
            <CommandEmpty>No results found.</CommandEmpty>
          ) : (
            <CommandGroup heading="Products">
              {data?.products?.map((product: IProduct) => (
                <CommandItem
                  key={product._id}
                  onSelect={() => {
                    router.push(`/products/${product._id}`);
                    setOpen(false);
                  }}
                  className="flex justify-between items-center cursor-pointer"
                >
                  <span>{product.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
