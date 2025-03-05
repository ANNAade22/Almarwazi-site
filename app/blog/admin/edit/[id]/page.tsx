import { Metadata } from "next";
import EditPostClient from "./EditPostClient";

export const metadata: Metadata = {
  title: "تعديل المنشور | جامعة المروزي",
  description: "تعديل منشور في مدونة جامعة المروزي",
};

export default function EditPostPage({ params }: { params: { id: string } }) {
  return <EditPostClient id={params.id} />;
}
