"use client";

import { useState } from "react";

import ProductDialog from "@/components/products/ProductDialog";
import ProductList from "@/components/products/ProductList";
import { Button } from "@/components/ui/button";
import AuthGuard from "@/components/auth/AuthGuard";

export default function ProductsPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AuthGuard>
      <div className="container mx-auto py-8 p-8">
        <div className="flex flex-col gap-4 justify-center items-center lg:w-2/3">
          <h1 className="text-2xl font-bold">Products</h1>

          <Button onClick={() => setIsOpen(true)} className="w-1/2 ">
            New Product
          </Button>

          <ProductList />
        </div>
        <ProductDialog open={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    </AuthGuard>
  );
}

/*
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";

  const router = useRouter();

<Button onClick={() => router.push("/products/new")}>
➕ הוסף מוצר
</Button>*/
