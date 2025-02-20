"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

/**
 * @component PageHeader
 * @description A reusable header component for dashboard pages.
 *
 * @param {object} props - Component props.
 * @param {string} props.title - The main title of the page.
 * @param {string} props.description - A brief description of the page content.
 * @returns {JSX.Element} The page header UI.
 *
 * @example
 * <PageHeader title="Dashboard" description="Overview of your products and tasks" />
 */
export default function PageHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
