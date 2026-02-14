import BlogClient from "./BlogClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "المدونة - جامعة المروزي",
  description: "آخر الأخبار والمقالات من جامعة المروزي",
};

export default function BlogPage() {
  return <BlogClient />;
}
