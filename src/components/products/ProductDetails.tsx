import { IProduct } from "@/types";
import Image from "next/image";
import { DEFAULT_IMAGES } from "@/config/defaultImages";
import { fetchProductById } from "@/api/product";
import { useQuery } from "@tanstack/react-query";
import { Skeleton_ProductDetails } from "./Skeleton_ProductDetails";

interface ProductDetailsProps {
  /**
   * The unique ID of the product to fetch details for.
   */
  productId: string;
}

/**
 * @component ProductDetails
 * @description Displays detailed information about a product, including its image, category, manufacturer, model, tags, and maintenance records.
 *
 * @param {ProductDetailsProps} props - The component props.
 * @param {string} props.productId - The ID of the product to fetch.
 *
 * @returns {JSX.Element} The rendered product details component.
 *
 * @example
 * ```tsx
 * <ProductDetails productId="12345" />
 * ```
 */
export function ProductDetails({ productId }: ProductDetailsProps) {
  // Fetch product data using react-query
  const {
    data: product,
    isFetching,
    error,
  } = useQuery<IProduct>({
    queryKey: ["product", productId],
    queryFn: () => fetchProductById(productId),
    enabled: !!productId, // Only fetch if productId is provided
  });

  // Loading state
  if (isFetching) return <Skeleton_ProductDetails />;

  // Error state
  if (error || !product)
    return <p className="text-red-500">❌ Error loading product</p>;

  return (
    <div className="space-y-4">
      {/* Product Image */}
      <div className="flex justify-center">
        <Image
          src={
            product.iconUrl
              ? `${process.env.NEXT_PUBLIC_API_URL}${product.iconUrl}`
              : DEFAULT_IMAGES.product
          }
          alt={product.name}
          width={100}
          height={100}
          className="rounded-md object-cover"
        />
      </div>

      {/* Product Information */}
      <p>
        <strong>Name:</strong> {product.name}
      </p>
      <p>
        <strong>Category:</strong> {product.category || "No Category"}
      </p>
      <p>
        <strong>Manufacturer:</strong> {product.manufacturer || "Unknown"}
      </p>
      <p>
        <strong>Model:</strong> {product.model || "N/A"}
      </p>
      <p>
        <strong>Tags:</strong>{" "}
        {product.tags?.length
          ? Array.isArray(product.tags)
            ? product.tags.join(", ")
            : ""
          : "No Tags"}
      </p>
      <p>
        <strong>Purchase Date:</strong>{" "}
        {new Date(product.purchaseDate).toLocaleDateString()}
      </p>

      {/* Maintenance Information */}
      <p>
        <strong>Last Maintenance:</strong>{" "}
        {product.lastOverallMaintenance
          ? `${product.lastOverallMaintenance.taskName} - ${new Date(
              product.lastOverallMaintenance.lastMaintenance
            ).toLocaleDateString()}`
          : "No Maintenance Data"}
      </p>
      <p>
        <strong>Next Maintenance:</strong>{" "}
        {product.nextOverallMaintenance
          ? `${product.nextOverallMaintenance.taskName} - ${new Date(
              product.nextOverallMaintenance.nextMaintenance
            ).toLocaleDateString()}`
          : "No Upcoming Maintenance"}
      </p>
    </div>
  );
}
