"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import FooterSection from "@/components/sections/FooterSection";

// Initial blog posts data
const initialBlogPosts = [
  {
    id: 1,
    title: "أهمية التعليم الإسلامي في العصر الحديث",
    excerpt:
      "يناقش هذا المقال أهمية الحفاظ على القيم الإسلامية في التعليم المعاصر وكيفية تحقيق التوازن بين العلوم الحديثة والتعاليم الإسلامية.",
    image: "/img1.jpg",
    date: "15 مارس 2023",
    author: "د. محمد أحمد",
    authorAvatar: "/avatars/author1.jpg",
    category: "تعليم",
    slug: "importance-of-islamic-education",
  },
  {
    id: 2,
    title: "تحديات الطلاب المسلمين في الغرب",
    excerpt:
      "استكشاف التحديات التي يواجهها الطلاب المسلمون في الدول الغربية وكيفية الحفاظ على الهوية الإسلامية.",
    image: "/img2.jpg",
    date: "22 أبريل 2023",
    author: "د. فاطمة علي",
    authorAvatar: "/avatars/author2.jpg",
    category: "مجتمع",
    slug: "challenges-of-muslim-students",
  },
  {
    id: 3,
    title: "دور التكنولوجيا في تطوير التعليم الإسلامي",
    excerpt:
      "كيف يمكن الاستفادة من التقنيات الحديثة في تطوير وتحسين طرق تدريس العلوم الإسلامية وجعلها أكثر جاذبية للأجيال الجديدة.",
    image: "/img3.jpg",
    date: "10 مايو 2023",
    author: "د. عبدالله محمود",
    authorAvatar: "/avatars/author3.jpg",
    category: "تكنولوجيا",
    slug: "technology-in-islamic-education",
  },
  {
    id: 4,
    title: "تجربتي كطالب في جامعة المروزي",
    excerpt:
      "قصة نجاح أحد خريجي الجامعة وكيف ساهمت دراسته في تشكيل مساره المهني وتحقيق طموحاته.",
    image: "/img4.jpg",
    date: "5 يونيو 2023",
    author: "أحمد الصالح",
    authorAvatar: "/avatars/author4.jpg",
    category: "قصص نجاح",
    slug: "my-experience-at-marwazi",
  },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState(initialBlogPosts);
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        // Import supabase client from your lib folder
        const { supabase } = await import("@/lib/supabaseClient");

        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;

        // Log the raw data to see the exact field names
        console.log("Raw post data from DB:", data);

        // Format the data to ensure all required fields are present
        const formattedPosts =
          data?.map((post) => {
            return {
              ...post,
              // Since the field in the database is just "image"
              image: post.image || "/default-post-image.jpg",
            };
          }) || [];

        console.log("Formatted posts:", formattedPosts);
        setPosts(formattedPosts.length > 0 ? formattedPosts : initialBlogPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
        // Fallback to initial posts if there's an error
        setPosts(initialBlogPosts);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const categories = ["الكل", "تعليم", "مجتمع", "تكنولوجيا", "قصص نجاح"];

  // Update categories dynamically based on available post categories
  const availableCategories = [
    "الكل",
    ...new Set(posts.map((post) => post.category)),
  ];

  const filteredPosts =
    activeCategory === "الكل"
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  return (
    <main dir="rtl">
      <section className="bg-[#e3fae5] py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold text-primary text-center mb-6">
            المدونة
          </h1>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xl text-gray-700 mb-8">
              آخر الأخبار والمقالات من جامعة المروزي
            </p>
            <div className="flex justify-center">
              <Link
                href="/blog/admin"
                className="px-6 py-3 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors"
              >
                لوحة إدارة المدونة
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="flex justify-center mb-12 overflow-x-auto pb-2">
            <div className="flex space-x-reverse space-x-2">
              {availableCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                    activeCategory === category
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">
                لا توجد منشورات في هذه الفئة حالياً
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={post.image || "/default-post-image.jpg"}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                      <span className="text-gray-600 text-sm">
                        {post.date || ""}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-700 mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-reverse space-x-2">
                        <span className="text-gray-700 text-sm font-medium">
                          {post.author}
                        </span>
                      </div>
                      <Link
                        href={`/blog/${post.slug || post.id}`}
                        className="text-primary font-medium hover:underline"
                      >
                        اقرأ المزيد
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <FooterSection />
    </main>
  );
}
