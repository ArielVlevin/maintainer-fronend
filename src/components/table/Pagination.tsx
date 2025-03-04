import { Button } from "@/components/ui/button";

interface PaginationProps {
  /**
   * The current active page.
   */
  currentPage: number;

  /**
   * The total number of pages available.
   */
  totalPages: number;

  /**
   * Callback function triggered when a page number is clicked.
   * @param {number} page - The selected page number.
   */
  onPageChange: (page: number) => void;
}

/**
 * @component Pagination
 * @description A reusable pagination component that displays page numbers and navigation buttons.
 * It includes support for navigating through multiple pages efficiently.
 *
 * @param {PaginationProps} props - The component props.
 * @returns {JSX.Element | null} A rendered pagination UI or null if there is only one page.
 *
 * @example
 * <Pagination currentPage={1} totalPages={5} onPageChange={handlePageChange} />
 */
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  // If there is only one page, don't render pagination
  if (totalPages <= 1 || !totalPages) return null;

  /**
   * Generates the list of page numbers to display.
   * It ensures that the first and last pages are always visible,
   * while showing up to two pages before and after the current page.
   *
   * Example output for `currentPage = 5`, `totalPages = 10`:
   * [1, ..., 3, 4, 5, 6, 7, ..., 10]
   *
   * @returns {number[]} An array of page numbers to be displayed.
   */
  const generatePageNumbers = () => {
    const pages = new Set<number>();

    pages.add(1); // Always show the first page
    pages.add(totalPages); // Always show the last page

    // Add up to two pages before and after the current page
    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      if (i > 1 && i < totalPages) {
        pages.add(i);
      }
    }

    return Array.from(pages).sort((a, b) => a - b);
  };

  return (
    <div className="flex justify-center mt-6 space-x-2">
      {/* Previous Button */}
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        variant="outline"
      >
        Previous
      </Button>

      {/* Page Numbers */}
      {generatePageNumbers().map((pageNumber, index, arr) => (
        <div key={pageNumber} className="flex">
          {/* Show "..." for skipped pages */}
          {index > 0 && pageNumber !== arr[index - 1] + 1 && (
            <span className="px-2">...</span>
          )}
          <Button
            onClick={() => onPageChange(pageNumber)}
            variant={currentPage === pageNumber ? "default" : "outline"}
          >
            {pageNumber}
          </Button>
        </div>
      ))}

      {/* Next Button */}
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        variant="outline"
      >
        Next
      </Button>
    </div>
  );
}
