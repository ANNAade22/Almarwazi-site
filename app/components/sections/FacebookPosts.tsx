"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import PostModal from "../ui/PostModal";

interface FacebookPost {
  id: string;
  message: string;
  created_time: string;
  full_picture: string;
  permalink_url: string;
  likes: {
    data: unknown[];
    summary: { total_count: number };
  };
  comments: {
    data: unknown[];
    summary: { total_count: number };
  };
}

interface FacebookPostsData {
  success: boolean;
  data: FacebookPost[];
  page: {
    name: string;
    id: string;
    link: string;
  };
  error?: string;
}

export default function FacebookPosts() {
  const [posts, setPosts] = useState<FacebookPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<FacebookPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/facebook-real");
        const data: FacebookPostsData = await response.json();

        if (data.success) {
          setPosts(data.data);
        } else {
          setError(data.error || "Failed to load posts");
        }
      } catch (err) {
        setError("Failed to load posts");
        console.error("Error fetching Facebook posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "منذ دقائق";
    if (diffInHours < 24) return `منذ ${diffInHours} ساعة`;
    if (diffInHours < 48) return "منذ يوم";
    return `منذ ${Math.floor(diffInHours / 24)} أيام`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  if (loading) {
    return (
      <div className="py-16 bg-gradient-to-br from-[#2e4832] to-[#1a4d1e]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              آخر الأخبار من فيسبوك
            </h2>
            <p className="text-white/80 text-lg">
              تابع آخر أخبار جامعة المروزي
            </p>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 bg-gradient-to-br from-[#2e4832] to-[#1a4d1e]">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              آخر الأخبار من فيسبوك
            </h2>
            <p className="text-white/80 text-lg">
              عذراً، لا يمكن تحميل المنشورات حالياً
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gradient-to-br from-[#2e4832] to-[#1a4d1e] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-32 h-32 bg-white/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-white/15 rounded-full blur-lg"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-md"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white">
              آخر الأخبار من فيسبوك
            </h2>
          </div>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            تابع آخر أخبار جامعة المروزي وأنشطتها على فيسبوك
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {posts.map((post, index) => (
            <div
              key={post.id}
              className="group bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: "fadeInUp 0.6s ease-out forwards",
              }}
            >
              {/* Post Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.full_picture}
                  alt={post.message.substring(0, 50)}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute top-3 right-3">
                  <div className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                    <span className="text-white text-xs font-medium">
                      {formatDate(post.created_time)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-4">
                <p className="text-white text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.message}
                </p>

                {/* Engagement Stats */}
                <div className="flex items-center justify-between text-white/70 text-xs mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4 text-red-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                      <span>
                        {formatNumber(post.likes.summary.total_count)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4 text-blue-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21.99 4c0-1.1-.89-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z" />
                      </svg>
                      <span>
                        {formatNumber(post.comments.summary.total_count)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Read More Button */}
                <button
                  onClick={() => {
                    setSelectedPost(post);
                    setIsModalOpen(true);
                  }}
                  className="block w-full bg-white/20 hover:bg-white/30 text-white text-center py-2 rounded-lg transition-all duration-300 backdrop-blur-sm border border-white/30 hover:border-white/50"
                >
                  اقرأ المزيد
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="https://www.facebook.com/Almarwazi252"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/30 hover:border-white/50 hover:scale-105"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            تابعنا على فيسبوك
          </Link>
        </div>
      </div>

      {/* Post Modal */}
      <PostModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPost(null);
        }}
        post={selectedPost}
      />

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
