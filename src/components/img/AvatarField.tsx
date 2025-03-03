import { useFormContext, Controller } from "react-hook-form";
import { FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { DEFAULT_IMAGES } from "@/config/defaultImages";
import { useImageUpload } from "@/hooks/use-image-upload";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";

interface AvatarFieldProps {
  name: string;
  description?: string;
  className?: string;
}

/**
 * @component AvatarField
 * @description A reusable form field for image uploads using react-hook-form.
 *
 * @param {string} name - The name of the field in the form.
 * @param {string} label - The label text for the field.
 * @param {string} [description] - Optional description.
 *
 * @returns {JSX.Element} The rendered form field with image upload functionality.
 *
 * @example
 * <AvatarField name="profilePicture" label="Profile Picture" />
 */
export function AvatarField({
  name,
  description,
  className,
}: AvatarFieldProps) {
  const { control } = useFormContext();
  const imageUpload = useImageUpload();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="justify-center flex">
            <div className="relative flex size-20 items-center justify-center overflow-hidden rounded-full border-4 border-background bg-muted shadow-sm shadow-black/10">
              {/* Show Uploaded Image */}
              {imageUpload.previewUrl || field.value ? (
                <Image
                  src={
                    imageUpload.previewUrl ||
                    field.value ||
                    DEFAULT_IMAGES.product
                  }
                  className="h-full w-full object-cover"
                  width={80}
                  height={80}
                  alt="Uploaded image"
                  priority
                  unoptimized={
                    (imageUpload.previewUrl || field.value || "").startsWith(
                      "data:"
                    ) ||
                    (imageUpload.previewUrl || field.value || "").startsWith(
                      "/uploads"
                    )
                  }
                />
              ) : (
                // Upload button
                <button
                  type="button"
                  className="absolute flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
                  onClick={imageUpload.handleThumbnailClick}
                  aria-label="Upload image"
                >
                  <ImagePlus size={16} strokeWidth={2} aria-hidden="true" />
                </button>
              )}

              {/* Remove image button */}
              {(imageUpload.previewUrl || field.value) && (
                <button
                  type="button"
                  className="absolute flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
                  onClick={() => {
                    imageUpload.handleRemove();
                    field.onChange(""); // Clear field value
                  }}
                  aria-label="Remove image"
                >
                  <X size={16} strokeWidth={2} aria-hidden="true" />
                </button>
              )}

              {/* Hidden file input */}
              <input
                type="file"
                ref={imageUpload.fileInputRef}
                onChange={(event) => {
                  imageUpload.handleFileChange(event);
                  if (event.target.files?.[0]) {
                    field.onChange(URL.createObjectURL(event.target.files[0]));
                  }
                }}
                className="hidden"
                accept="image/*"
                aria-label="Upload image"
              />
            </div>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
