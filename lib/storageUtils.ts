import { supabase } from "./supabaseClient";
import { v4 as uuidv4 } from "uuid";

/**
 * Uploads a file to Supabase storage
 * @param file The file to upload
 * @param bucket The storage bucket name
 * @param folder Optional folder path within the bucket
 * @returns The public URL of the uploaded file
 */
export async function uploadFile(
  file: File,
  bucket: string = "blog-images",
  folder: string = ""
): Promise<string> {
  try {
    // Create a unique file name to prevent collisions
    const fileExt = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = folder ? `${folder}/${fileName}` : fileName;

    // Upload the file to Supabase storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      throw error;
    }

    // Get the public URL for the file
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return urlData.publicUrl;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}

/**
 * Deletes a file from Supabase storage
 * @param url The public URL of the file to delete
 * @param bucket The storage bucket name
 */
export async function deleteFile(
  url: string,
  bucket: string = "blog-images"
): Promise<void> {
  try {
    // Extract the file path from the URL
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split("/");
    const filePath = pathParts[pathParts.length - 1];

    // Delete the file from Supabase storage
    const { error } = await supabase.storage.from(bucket).remove([filePath]);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
}
