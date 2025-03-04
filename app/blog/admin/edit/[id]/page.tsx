import { Metadata } from "next";
import EditPostClient from "@/app/blog/admin/edit/[id]/EditPostClient";

export const metadata: Metadata = {
  title: "تعديل المنشور | جامعة المروزي",
  description: "تعديل منشور في مدونة جامعة المروزي",
};

interface PageProps {
  params: {
    id: string;
  };
}

export default function EditPostPage({ params }: PageProps) {
  return <EditPostClient id={params.id} />;
}
