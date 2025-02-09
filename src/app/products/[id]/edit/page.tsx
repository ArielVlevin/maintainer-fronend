"use client";

import ProductForm from "@/components/products/___ProductForm";
import { useParams } from "next/navigation";

export default function NewProductPage() {
  const { id } = useParams() as { id: string };

  //TODO :: create new function that use the ProductFields.tsx
  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <ProductForm productId={id} />
    </div>
  );
}
