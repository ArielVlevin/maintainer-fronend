"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IProduct } from "@/types/IProduct";
import { formatDate } from "@/lib/utils";
import { AddProductButton } from "@/components/products/ProductDialog";
import { NoProductsMessage } from "./NoProductsMessage";
import { CardDropdownMenu } from "../app-ui/card/CardDropDownMenu";
import { useProductActions } from "@/hooks/useProductActions";

/**
 * @component ProductList
 * @description Displays a list of products with last/next maintenance dates.
 *
 * @param {object} props - Component props.
 * @param {IProduct[]} props.products - Array of products to display.
 * @returns {JSX.Element} The product list UI.
 */
export default function ProductList({ products }: { products: IProduct[] }) {
  const { deleteMutation } = useProductActions();

  if (products.length === 0) return <NoProductsMessage />;
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold">Your Products</CardTitle>
          <AddProductButton />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Last Maintenance</TableHead>
              <TableHead>Next Maintenance</TableHead>
              <TableHead>View</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  {formatDate(product.lastOverallMaintenance?.lastMaintenance)}
                </TableCell>
                <TableCell>
                  {formatDate(product.nextOverallMaintenance?.nextMaintenance)}
                </TableCell>
                <TableCell>
                  <Link href={`/product/${product._id}`}>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>
                </TableCell>
                <TableCell>
                  <CardDropdownMenu
                    id={product._id!}
                    name={product.name}
                    onDelete={() => deleteMutation.mutate(product._id!)}
                    className=""
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
