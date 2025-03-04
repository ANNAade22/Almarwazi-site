"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import ImageUpload from "@/components/ImageUpload";

// Remove "use client" since we'll create a client component wrapper
import ClientEditPage from "./ClientEditPage";

interface PageProps {
  params: {
    id: string;
  };
}

export default function EditPostPage({ params }: PageProps) {
  return <ClientEditPage id={params.id} />;
}
