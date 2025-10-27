"use client";
import React, { useEffect } from "react";
import Image from "next/image";

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: {
    id: string;
    message: string;
    created_time: string;
    full_picture: string;
    permalink_url: string;
    likes: {
      data: any[];
      summary: { total_count: number };
    };
    comments: {
      data: any[];
      summary: { total_count: number };
    };
  } | null;
}

export default function PostModal({ isOpen, onClose, post }: PostModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !post) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-gray-900">جامعة المروزي</h3>
              <p className="text-sm text-gray-500">
                {formatDate(post.created_time)}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg
              className="w-6 h-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Post Image */}
          {post.full_picture && (
            <div className="relative w-full h-64">
              <Image
                src={post.full_picture}
                alt={post.message.substring(0, 50)}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Post Text */}
          <div className="p-6">
            <p className="text-gray-900 leading-relaxed whitespace-pre-wrap">
              {post.message}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6">
          {/* Engagement Stats */}
          <div className="flex items-center justify-between text-gray-600 text-sm mb-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span>
                  {formatNumber(post.likes.summary.total_count)} إعجاب
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.99 4c0-1.1-.89-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z" />
                </svg>
                <span>
                  {formatNumber(post.comments.summary.total_count)} تعليق
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <a
              href={post.permalink_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg font-medium transition-colors"
            >
              عرض على فيسبوك
            </a>
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              إغلاق
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
