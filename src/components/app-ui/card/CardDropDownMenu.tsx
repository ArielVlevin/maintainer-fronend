"use client";

import { MoreVertical, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * Props for the `CardDropdownMenu` component.
 *
 * @interface CardDropdownMenuProps
 * @property {() => void} onEdit - Function to be called when the edit option is selected.
 * @property {() => void} onDelete - Function to be called when the delete option is selected.
 */
interface CardDropdownMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

/**
 * A dropdown menu component for product cards.
 * Allows users to edit or delete a product via a contextual menu.
 *
 * @component
 * @param {CardDropdownMenuProps} props - The component props.
 * @returns {JSX.Element} A dropdown menu with edit and delete options.
 *
 * @example
 * <CardDropdownMenu onEdit={handleEdit} onDelete={handleDelete} />
 */
export function CardDropdownMenu({ onEdit, onDelete }: CardDropdownMenuProps) {
  return (
    <DropdownMenu>
      {/* Dropdown Trigger Button */}
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="absolute top-2 right-2">
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>

      {/* Dropdown Content */}
      <DropdownMenuContent align="end">
        {/* Edit Option */}
        <DropdownMenuItem onClick={onEdit}>
          <div className="flex text-center">
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </div>
        </DropdownMenuItem>

        {/* Delete Option */}
        <DropdownMenuItem onClick={onDelete}>
          <div className="flex text-center text-red-600">
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
