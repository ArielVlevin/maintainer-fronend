"use client";

import { MoreVertical, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { JSX } from "react";

/**
 * Type definition for menu items in the dropdown.
 */
interface MenuItem {
  label: string;
  icon?: JSX.Element;
  onClick: () => void;
  className?: string;
}

/**
 * Props for the `CardDropdownMenu` component.
 *
 * @interface CardDropdownMenuProps
 * @property {() => void} [onEdit] - Function for the edit option.
 * @property {() => void} [onDelete] - Function for the delete option.
 * @property {MenuItem[]} [menuItems] - Additional custom menu items.
 * @property {string} [className] - Additional class names for styling.
 */
interface CardDropdownMenuProps {
  onEdit?: () => void;
  onDelete?: () => void;
  menuItems?: MenuItem[];
  className?: string;
}

/**
 * A flexible dropdown menu component that supports edit, delete, and custom actions.
 *
 * @component
 * @param {CardDropdownMenuProps} props - The component props.
 * @returns {JSX.Element} A dropdown menu with edit, delete, and additional custom options.
 *
 * @example
 * <CardDropdownMenu
 *   onEdit={() => console.log("Edit")}
 *   onDelete={() => console.log("Delete")}
 *   menuItems={[
 *     { label: "Postpone Task", icon: <ClockIcon />, onClick: () => console.log("Postpone") },
 *   ]}
 * />
 */
export function CardDropdownMenu({
  onEdit,
  onDelete,
  menuItems = [],
  className,
}: CardDropdownMenuProps) {
  return (
    <DropdownMenu>
      {/* Dropdown Trigger Button */}
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={className}>
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>

      {/* Dropdown Content */}
      <DropdownMenuContent align="end">
        {/* Edit Option */}
        {onEdit && (
          <DropdownMenuItem onClick={onEdit}>
            <div className="flex items-center">
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </div>
          </DropdownMenuItem>
        )}

        {/* Delete Option */}
        {onDelete && (
          <DropdownMenuItem onClick={onDelete}>
            <div className="flex items-center text-red-600">
              <Trash className="h-4 w-4 mr-2" />
              Delete
            </div>
          </DropdownMenuItem>
        )}

        {/* Separator if needed */}
        {(onEdit || onDelete) && menuItems.length > 0 && (
          <DropdownMenuSeparator />
        )}

        {/* Custom Menu Items */}
        {menuItems.map((item, index) => (
          <DropdownMenuItem
            key={index}
            onClick={item.onClick}
            className={item.className}
          >
            <div className="flex items-center">
              {item.icon && <span className="mr-2">{item.icon}</span>}
              {item.label}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
