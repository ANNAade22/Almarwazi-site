"use client";

import React from "react";
import { useParams } from "next/navigation";
// ... other imports

export default function BlogPostPage() {
  // Use the useParams hook instead of accessing params directly
  const params = useParams();
  const slug = params.slug;

  return (
    <main dir="rtl" className="pt-20">
      <div className="container mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-primary mb-8">مقال غير موجود</h1>
        <p className="text-gray-700 text-lg">
          عذراً، المقال المطلوب غير موجود أو تم حذفه.
        </p>
      </div>
    </main>
  );
}
