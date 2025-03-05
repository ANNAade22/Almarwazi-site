"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

// Initialize the Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export const supabase = createClient(supabaseUrl, supabaseKey);
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import ImageUpload from "../../ImageUpload";

interface FormData {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  image_url: string;
}

interface ClientEditPageProps {
  postId: string;
}

export default function ClientEditPage({ postId }: ClientEditPageProps) {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    author: "",
    image_url: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    open: false,
    message: "",
    severity: "info" as "success" | "error" | "info" | "warning",
  });
  const router = useRouter();

  useEffect(() => {
    const checkAuthAndFetchPost = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/auth");
        return;
      }
      setIsAuthenticated(true);

      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("id", postId)
          .single();

        if (error) throw error;

        if (data) {
          setFormData({
            title: data.title,
            excerpt: data.excerpt,
            content: data.content,
            category: data.category,
            author: data.author,
            image_url: data.image || "",
          });
        }
      } catch (error) {
        showAlert("خطأ في تحميل بيانات المنشور", "error");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthAndFetchPost();
  }, [postId, router]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUploaded = (url: string) => {
    setFormData((prev) => ({ ...prev, image_url: url }));
  };

  const showAlert = (
    message: string,
    severity: "success" | "error" | "info" | "warning"
  ) => {
    setAlertInfo({ open: true, message, severity });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Create an update object without updated_at
      const updateData = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        category: formData.category,
        author: formData.author,
        image: formData.image_url,
      };
      
      const { error } = await supabase
        .from("posts")
        .update(updateData)
        .eq("id", postId);
        
      if (error) throw error;
      
      // Show success message
      showAlert("تم تحديث المنشور بنجاح", "success");
      
      // Force a cache revalidation and refresh
      await fetch('/api/revalidate?path=/blog');
      
      // Redirect after a short delay to allow the user to see the success message
      setTimeout(() => {
        // Use replace instead of push to ensure a fresh page load
        router.refresh();
        router.replace("/blog/admin");
      }, 1500);
    } catch (error: any) {
      showAlert(`خطأ في تحديث المنشور: ${error.message}`, "error");
    } finally {
      setIsLoading(false);
    }
  };
  if (!isAuthenticated || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <Snackbar
        open={alertInfo.open}
        autoHideDuration={6000}
        onClose={() => setAlertInfo((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={alertInfo.severity} variant="filled">
          {alertInfo.message}
        </Alert>
      </Snackbar>

      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-primary">تعديل المنشور</h1>
          <Link href="/blog/admin" className="text-gray-600 hover:text-primary">
            العودة إلى لوحة الإدارة
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-gray-700 font-medium mb-2"
            >
              عنوان المنشور
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-gray-700 font-medium mb-2"
            >
              صورة المنشور
            </label>
            <ImageUpload
              onImageUploaded={handleImageUploaded}
              existingImageUrl={formData.image_url}
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-gray-700 font-medium mb-2"
            >
              التصنيف
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">اختر التصنيف</option>
              <option value="تعليم">تعليم</option>
              <option value="مجتمع">مجتمع</option>
              <option value="تكنولوجيا">تكنولوجيا</option>
              <option value="قصص نجاح">قصص نجاح</option>
              <option value="أخرى">أخرى</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="excerpt"
              className="block text-gray-700 font-medium mb-2"
            >
              ملخص المنشور
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-gray-700 font-medium mb-2"
            >
              محتوى المنشور
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={12}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="author"
              className="block text-gray-700 font-medium mb-2"
            >
              اسم الكاتب
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className={`px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "جاري الحفظ..." : "حفظ التغييرات"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
