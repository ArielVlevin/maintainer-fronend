import { TableCell } from "../ui/table";

/**
 * @function renderTableCell
 * @description Renders a table cell with formatted data.
 *
 * @param {React.ReactNode} content - The content to display inside the cell.
 * @returns {JSX.Element} A styled table cell.
 */
export const renderTableCell = (content: React.ReactNode) => (
  <TableCell className="py-2 px-4">{content}</TableCell>
);
