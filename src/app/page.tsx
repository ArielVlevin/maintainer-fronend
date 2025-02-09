import ProductForm from "@/components/products/___ProductForm";
import ProductList from "../components/products/ProductList";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto p-4 text-center">
      <Separator className="my-4" />

      <ProductForm />
      <Separator className="my-4" />
      <ProductList />
      <Separator className="my-4" />
    </main>
  );
}
