"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useSearch } from "@/hooks/useSearch";

/**
 * @component GenericList
 * @description A reusable table list component with optional search functionality.
 *
 * @param {string} title - The title of the list.
 * @param {T[]} data - The array of objects to display.
 * @param {Array<keyof T>} searchKeys - The keys to search within.
 * @param {boolean} [enableSearch] - Whether to enable the search feature.
 * @param {React.ReactNode} [addButton] - Button to add a new item.
 * @param {(item: T) => React.ReactNode} renderRow - Function to render each row.
 * @param {string[]} headers - Column headers.
 * @returns {JSX.Element} The reusable list UI.
 */
export default function GenericList<T>({
  title,
  data,
  searchKeys,
  enableSearch = false,
  extraContent,
  addButton,
  renderRow,
  headers,
}: {
  title: string;
  data: T[];
  searchKeys: Array<keyof T>;
  enableSearch?: boolean;
  addButton?: React.ReactNode;
  renderRow: (item: T) => React.ReactNode;
  headers: string[];
  extraContent?: React.ReactNode;
}) {
  const { filteredData, searchQuery, setSearchQuery } = useSearch(
    data,
    searchKeys
  );
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          {addButton}
        </div>
        {enableSearch && (
          <Input
            type="text"
            placeholder={`Search ${title.toLowerCase()}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mt-4"
          />
        )}
      </CardHeader>
      <CardContent>
        {extraContent}

        {!data || data.length === 0 ? (
          <p className="text-center py-4">No data available.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                {headers.map((header, index) => (
                  <TableHead key={index}>{header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => renderRow(item))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={headers.length}
                    className="text-center py-4"
                  >
                    No {title.toLowerCase()} match your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
