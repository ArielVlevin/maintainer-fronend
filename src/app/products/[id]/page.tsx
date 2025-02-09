"use client";
import React from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ProductPage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Product id:{id}</h1>
        <Button variant="outline" onClick={() => router.push("/products")}>
          🔙 חזור לרשימה
        </Button>
      </div>
    </div>
  );
}
