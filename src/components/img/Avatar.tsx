import { DEFAULT_IMAGES } from "@/config/defaultImages";
import { useImageUpload } from "@/hooks/use-image-upload";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";

type AvatarProps = {
  /**
   * Optional previous image URL to display if available.
   */
  prevImage?: string;
} & ReturnType<typeof useImageUpload>; // Merges all the properties from `useImageUpload`

/**
 * @component Avatar
 * @description A reusable avatar component that supports image uploads, previews, and removal.
 * It allows users to upload an image, preview it, and remove it if necessary.
 *
 * @param {AvatarProps} props - Component props.
 * @param {string} [props.prevImage] - Optional previous image URL.
 * @param {Function} props.handleFileChange - Function to handle file selection.
 * @param {string} props.previewUrl - The current image preview URL.
 * @param {Function} props.handleThumbnailClick - Function triggered when clicking the upload button.
 * @param {Function} props.handleRemove - Function to remove the current image.
 * @param {React.RefObject<HTMLInputElement>} props.fileInputRef - Reference to the file input element.
 *
 * @returns {JSX.Element} The rendered avatar component.
 *
 * @example
 * import { useImageUpload } from "@/hooks/use-image-upload";
 *
 * function Profile() {
 *   const imageUpload = useImageUpload();
 *   return <Avatar {...imageUpload} />;
 * }
 */
export default function Avatar({
  prevImage,
  handleFileChange,
  previewUrl,
  handleThumbnailClick,
  handleRemove,
  fileInputRef,
}: AvatarProps) {
  const currentImage = previewUrl;

  return (
    <div className="mb-2">
      {/* Avatar container */}
      <div className="relative flex size-20 items-center justify-center overflow-hidden rounded-full border-4 border-background bg-muted shadow-sm shadow-black/10">
        {/* Display the uploaded or default image */}
        {currentImage && (
          <Image
            src={currentImage || DEFAULT_IMAGES.product}
            className="h-full w-full object-cover"
            width={80}
            height={80}
            alt="Avatar image"
            priority
            unoptimized={
              currentImage.startsWith("data:") ||
              currentImage.startsWith("/uploads")
            }
          />
        )}

        {/* Upload button (visible when no image is selected) */}
        {!currentImage ? (
          <button
            type="button"
            className="absolute flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-offset-2 transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
            onClick={handleThumbnailClick}
            aria-label="Change profile picture"
          >
            <ImagePlus size={16} strokeWidth={2} aria-hidden="true" />
          </button>
        ) : (
          /* Remove image button (visible when an image is selected) */
          <button
            type="button"
            className="absolute flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-offset-2 transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
            onClick={handleRemove}
            aria-label="Remove image"
          >
            <X size={16} strokeWidth={2} aria-hidden="true" />
          </button>
        )}

        {/* Hidden file input for image selection */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
          aria-label="Upload profile picture"
        />
      </div>
    </div>
  );
}
