import { Metadata } from "next";
import EditPostClient from "./EditPostClient";
("use client");

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import dynamic from "next/dynamic";
// import Alert from "@mui/material/Alert";
// import Snackbar from "@mui/material/Snackbar";
import "react-quill/dist/quill.snow.css";

// Import the editor dynamically to avoid SSR issues
const ReactQuill = dynamic(
  () => import("react-quill" as any).then((mod) => mod.default),
  { ssr: false }
);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function EditPostPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const postId = params.id;

  const [post, setPost] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    author: "",
    status: "published",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    open: false,
    message: "",
    severity: "info" as "success" | "error" | "info" | "warning",
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("id", postId)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          setPost(data);
        }
      } catch (error: any) {
        console.error("Error fetching post:", error);
        setAlertInfo({
          open: true,
          message: `Error fetching post: ${error.message}`,
          severity: "error",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [postId]);
  return (
    // Your component JSX
    <div>{/* Component content */}</div>
  );
}
