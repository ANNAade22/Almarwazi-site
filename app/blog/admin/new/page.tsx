"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import ImageUpload from "@/components/ImageUpload";

interface FormData {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  image_url: string; // Add image_url to the form data
}

export default function NewPostPage() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    author: "Admin",
    image_url: "", // Initialize image_url as empty string
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [alertInfo, setAlertInfo] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
  }>({
    open: false,
    message: "",
    severity: "info",
  });
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/auth");
        return;
      }
      setIsAuthenticated(true);
    };

    checkAuth();
  }, [router]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add a function to handle image upload
  const handleImageUploaded = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      image_url: url,
    }));
  };

  const handleCloseAlert = () => {
    setAlertInfo({ ...alertInfo, open: false });
  };

  const showAlert = (
    message: string,
    severity: "success" | "error" | "info" | "warning"
  ) => {
    setAlertInfo({
      open: true,
      message,
      severity,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Create a new post in Supabase
      const { data, error } = await supabase
        .from("posts")
        .insert([
          {
            title: formData.title,
            excerpt: formData.excerpt,
            content: formData.content,
            category: formData.category,
            author: formData.author,
            image: formData.image_url, // Changed from image_url to image
            slug: formData.title.toLowerCase().replace(/\s+/g, "-"),
            status: "published",
            created_at: new Date().toISOString(),
          },
        ])
        .select();

      if (error) throw error;

      showAlert("تم إنشاء المنشور بنجاح", "success");

      // Redirect to admin dashboard after a short delay
      setTimeout(() => {
        router.push("/blog/admin");
      }, 1500);
    } catch (error: any) {
      console.error("Error creating post:", error);
      showAlert(
        `حدث خطأ أثناء إنشاء المنشور: ${error?.message || "خطأ غير معروف"}`,
        "error"
      );
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحقق من صلاحيات الوصول...</p>
        </div>
      </div>
    );
  }

  return (
    <main dir="rtl" className="min-h-screen bg-gray-50">
      <Snackbar
        open={alertInfo.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alertInfo.severity}
          sx={{
            width: "100%",
            fontSize: "1.1rem",
            "& .MuiAlert-icon": {
              fontSize: "2rem",
            },
            padding: "12px 16px",
          }}
          variant="filled"
        >
          {alertInfo.message}
        </Alert>
      </Snackbar>

      <div className="bg-white shadow">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">
              إضافة منشور جديد
            </h1>
            <Link
              href="/blog/admin"
              className="text-gray-600 hover:text-primary"
            >
              العودة إلى لوحة الإدارة
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
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
                placeholder="أدخل عنوان المنشور"
              />
            </div>

            {/* Add image upload component */}
            <div>
              <label
                htmlFor="image"
                className="block text-gray-700 font-medium mb-2"
              >
                صورة المنشور
              </label>
              <ImageUpload onImageUploaded={handleImageUploaded} />
              {formData.image_url && (
                <p className="mt-2 text-sm text-green-600">
                  تم رفع الصورة بنجاح
                </p>
              )}
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
                placeholder="أدخل ملخصًا قصيرًا للمنشور"
              ></textarea>
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
                placeholder="أدخل محتوى المنشور"
              ></textarea>
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
                placeholder="أدخل اسم الكاتب"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-70"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    جاري الحفظ...
                  </span>
                ) : (
                  "نشر المقال"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
