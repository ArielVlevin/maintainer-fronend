import { api } from "@/api/axios";

// 🔹 Upload Image
export const uploadImage = async (
  imageFile: File,
  folder?: string
): Promise<string | null> => {
  try {
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("folder", folder ? folder : "general");

    const { data } = await api.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return data.imageUrl;
  } catch (error) {
    console.error("❌ Error uploading image:", error);
    return null;
  }
};
