"use client";

import React from "react";
import { useParams } from "next/navigation";
// ... other imports

export default function BlogPostPage() {
  // Use the useParams hook instead of accessing params directly
  const params = useParams();
  const slug = params.slug;

  // Rest of your component code
  // ...
}
