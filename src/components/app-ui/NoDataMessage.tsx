import { useState, ReactNode, JSX } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

/**
 * @component NoDataMessage
 * @description Generic component for displaying "no data" messages with an action button.
 *
 * @param {ReactNode} icon - The icon to display at the top.
 * @param {string} title - The title of the message.
 * @param {string} description - The description below the title.
 * @param {() => JSX.Element} AddDialog - A component for adding a new item.
 * @param {string} buttonText - The text for the action button.
 *
 * @returns {JSX.Element} The No Data UI component.
 */
interface NoDataMessageProps {
  icon: ReactNode;
  title: string;
  description: string;
  AddDialog: ({
    open,
    onClose,
  }: {
    open: boolean;
    onClose: () => void;
  }) => JSX.Element;
  buttonText: string;
  dialogProps?: object;
}

export function NoDataMessage({
  icon,
  title,
  description,
  AddDialog,
  buttonText,
  dialogProps,
}: NoDataMessageProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Card>
      <CardHeader />
      <CardContent>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          {icon}
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>

          <Button
            className="flex items-center"
            onClick={() => setIsDialogOpen(true)}
          >
            {buttonText}
          </Button>

          {/* ✅ Dynamic Dialog Component */}
          <AddDialog
            open={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            {...dialogProps}
          />
        </div>
      </CardContent>
    </Card>
  );
}
