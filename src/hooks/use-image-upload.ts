/**
 * `useImageUpload` Hook
 *
 * A custom React hook for handling image uploads, previews, and removal.
 * This hook provides state management for file selection, preview generation,
 * and file removal.
 *
 * @returns {object} An object containing:
 * - `previewUrl`: The URL of the selected image for preview.
 * - `fileInputRef`: A reference to the hidden file input element.
 * - `handleThumbnailClick`: A function to trigger the file input.
 * - `handleFileChange`: A function to handle file selection and generate a preview.
 * - `handleRemove`: A function to remove the selected image.
 *
 * @example
 * ```tsx
 * import { useImageUpload } from "@/hooks/useImageUpload";
 *
 * function ProfileImageUpload() {
 *   const { previewUrl, fileInputRef, handleThumbnailClick, handleFileChange, handleRemove } =
 *     useImageUpload();
 *
 *   return (
 *     <div>
 *       <button onClick={handleThumbnailClick}>Upload Image</button>
 *       <input ref={fileInputRef} type="file" onChange={handleFileChange} hidden />
 *       {previewUrl && (
 *         <div>
 *           <img src={previewUrl} alt="Preview" />
 *           <button onClick={handleRemove}>Remove</button>
 *         </div>
 *       )}
 *     </div>
 *   );
 * }
 * ```
 */

import { useState, useRef } from "react";

export function useImageUpload() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Opens the file picker when the user clicks the button.
   */
  const handleThumbnailClick = () => {
    fileInputRef.current?.click();
  };

  /**
   * Handles file selection, creates a preview URL, and updates state.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - The file input change event.
   */
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  /**
   * Removes the selected image, clears preview, and resets input field.
   */
  const handleRemove = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return {
    previewUrl, // URL for the preview image
    fileInputRef, // Ref to the file input field
    handleThumbnailClick, // Function to open file picker
    handleFileChange, // Function to handle file selection
    handleRemove, // Function to remove the image
  };
}
