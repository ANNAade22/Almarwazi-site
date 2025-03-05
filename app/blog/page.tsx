import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import BlogClient from "./BlogClient";
import { Metadata } from "next";

export const metadata = {
  title: "المدونة - جامعة المروزي",
  description: "آخر الأخبار والمقالات من جامعة المروزي",
};

export default function BlogPage() {
  return <BlogClient />;
}
