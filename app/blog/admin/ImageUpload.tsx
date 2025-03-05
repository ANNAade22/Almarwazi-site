"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Initialize the Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export const supabase = createClient(supabaseUrl, supabaseKey);
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

interface ImageUploadProps {
  onImageUploaded: (url: string) => void;
  existingImageUrl?: string;
}

export default function ImageUpload({
  onImageUploaded,
  existingImageUrl,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    existingImageUrl || null
  );
  const [error, setError] = useState<string | null>(null);
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("يرجى اختيار ملف صورة صالح");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("حجم الصورة كبير جدًا. الحد الأقصى هو 5 ميجابايت");
      return;
    }

    try {
      setIsUploading(true);
      setError(null);

      // Create a preview URL
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      // Get the authenticated user
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error("يجب تسجيل الدخول لرفع الصور");
      }

      // Create a unique file name
      const fileExt = file.name.split(".").pop();
      const fileName = `${uuidv4()}.${fileExt}`;

      // Use the user's ID in the path to comply with RLS policies
      const filePath = `${session.user.id}/${fileName}`;

      console.log("Uploading file to:", filePath);
      console.log("User ID:", session.user.id);

      // Upload the file to Supabase storage with public access
      let uploadData;
      try {
        const { data, error } = await supabase.storage
          .from("blog-images")
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: true,
          });

        if (error) {
          console.error("Supabase storage upload error:", error);
          throw new Error(
            `فشل رفع الصورة: ${error.message || "خطأ غير معروف"}`
          );
        }

        if (!data) {
          console.error("No data returned from upload");
          throw new Error("لم يتم استلام بيانات من الخادم");
        }
        uploadData = data;
      } catch (uploadError: any) {
        console.error("Supabase storage error:", uploadError);
        const errorMessage =
          uploadError.message ||
          (uploadError.error && uploadError.error.message) ||
          "خطأ غير معروف أثناء رفع الصورة";
        throw new Error(`فشل رفع الصورة: ${errorMessage}`);
      }

      if (!uploadData || !uploadData.path) {
        throw new Error("لم يتم استلام مسار الملف من الخادم");
      }

      // Get the public URL for the file
      const { data: urlData } = supabase.storage
        .from("blog-images")
        .getPublicUrl(uploadData.path); // Changed from data.path to uploadData.path

      if (!urlData || !urlData.publicUrl) {
        throw new Error("فشل الحصول على رابط الصورة العام");
      }

      console.log("Image uploaded successfully:", urlData.publicUrl);

      // Call the callback with the uploaded image URL
      onImageUploaded(urlData.publicUrl);
    } catch (error: any) {
      console.error("Error uploading image:", error);
      setError(error.message || "حدث خطأ أثناء رفع الصورة");
      setPreviewUrl(null);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="image-upload"
          className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer ${
            isUploading
              ? "bg-gray-100 border-gray-300"
              : "bg-gray-50 border-gray-300 hover:bg-gray-100"
          }`}
        >
          {previewUrl ? (
            <div className="relative w-full h-full">
              <Image
                src={previewUrl}
                alt="Preview"
                fill
                className="object-contain p-2"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-10 h-10 mb-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">اضغط للرفع</span> أو اسحب وأفلت
              </p>
              <p className="text-xs text-gray-500">
                PNG, JPG, GIF (الحد الأقصى: 5MB)
              </p>
            </div>
          )}
          <input
            id="image-upload"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </label>
      </div>

      {isUploading && (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
          <span className="mr-2 text-gray-600">جاري الرفع...</span>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
    </div>
  );
}
