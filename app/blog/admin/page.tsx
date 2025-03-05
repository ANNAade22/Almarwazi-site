"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
// import { deletePost } from "../actions/posts";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  status: "published" | "draft";
  created_at: string;
}

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [alertInfo, setAlertInfo] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
  }>({
    open: false,
    message: "",
    severity: "info",
  });
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    open: boolean;
    postId: string | null;
  }>({
    open: false,
    postId: null,
  });
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    fetchPosts();
    // Set up real-time listener for posts table
    const postsSubscription = supabase
      .channel("posts-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "posts",
        },
        (payload) => {
          console.log("Real-time update:", payload);
          // Refresh posts data when any change occurs
          fetchPosts();
        }
      )
      .subscribe();

    // Cleanup subscription on component unmount
    return () => {
      postsSubscription.unsubscribe();
    };
  }, []);
  const checkAuth = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      router.push("/auth");
    }
  };

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase error:", error.message);
        throw error;
      }

      setPosts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
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

  const openDeleteConfirmation = (id: string) => {
    setDeleteConfirmation({
      open: true,
      postId: id,
    });
  };

  const closeDeleteConfirmation = () => {
    setDeleteConfirmation({
      open: false,
      postId: null,
    });
  };
  // Then update your delete handler:
  const handleDeletePost = async (id: string) => {
    closeDeleteConfirmation();
    console.log("Attempting to delete post with ID:", id);

    try {
      // First check if the post exists
      const { data: existingPost, error: checkError } = await supabase
        .from("posts")
        .select("id")
        .eq("id", id)
        .single();

      if (checkError) {
        console.error("Error checking post existence:", checkError);
        showAlert("خطأ في التحقق من وجود المنشور", "error");
        return;
      }

      if (!existingPost) {
        console.log("Post not found in database");
        showAlert("المنشور غير موجود أو تم حذفه بالفعل", "error");
        return;
      }

      console.log("Post found, proceeding with deletion");

      // Perform the delete operation
      const { error: deleteError } = await supabase
        .from("posts")
        .delete()
        .eq("id", id);

      if (deleteError) {
        console.error("Supabase delete error:", deleteError);
        throw deleteError;
      }

      console.log("Post successfully deleted from Supabase");

      // Update local state after successful deletion
      setPosts((currentPosts) => currentPosts.filter((post) => post.id !== id));
      showAlert("تم حذف المنشور بنجاح", "success");

      // Refresh the posts list to ensure UI is in sync with database
      fetchPosts();
    } catch (error: any) {
      console.error("Error deleting post:", error);
      showAlert(
        `حدث خطأ أثناء حذف المنشور: ${error?.message || "خطأ غير معروف"}`,
        "error"
      );
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/auth");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full size-12 border-t-2 border-b-2 border-primary"></div>
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

      {/* Delete Confirmation Dialog */}
      {deleteConfirmation.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">تأكيد الحذف</h3>
            <p className="mb-6">
              هل أنت متأكد من حذف هذا المنشور؟ لا يمكن التراجع عن هذا الإجراء.
            </p>
            <div className="flex justify-end space-x-reverse space-x-3">
              <button
                onClick={closeDeleteConfirmation}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                إلغاء
              </button>
              <button
                onClick={() =>
                  deleteConfirmation.postId &&
                  handleDeletePost(deleteConfirmation.postId)
                }
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                حذف
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="bg-white shadow">
        <div className="container mx-auto py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">
              لوحة إدارة المدونة
            </h1>
            <div className="flex items-center space-x-reverse space-x-4">
              <Link href="/blog" className="text-gray-600 hover:text-primary">
                العودة إلى المدونة
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800"
              >
                تسجيل الخروج
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8">
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">المنشورات</h2>
          <Link
            href="/blog/admin/new"
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            إضافة منشور جديد
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  العنوان
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  الكاتب
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  التصنيف
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  الحالة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  التاريخ
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <tr key={post.id}>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {post.title}
                      </div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {post.excerpt}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{post.author}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {post.category}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          post.status === "published"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {post.status === "published" ? "منشور" : "مسودة"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(post.created_at).toLocaleDateString("ar-SA")}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-reverse space-x-2">
                        <Link
                          href={`/blog/admin/edit/${post.id}`}
                          className="text-primary hover:text-primary/80"
                        >
                          تعديل
                        </Link>
                        <button
                          onClick={() => openDeleteConfirmation(post.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          حذف
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    لا توجد منشورات بعد. قم بإضافة منشور جديد.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
