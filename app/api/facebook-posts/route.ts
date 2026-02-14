import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    // Facebook Page ID for Almarwazi University
    const pageId = "Almarwazi252";

    // For now, we'll return mock data since we need Facebook App credentials
    // In production, you would use Facebook Graph API with proper authentication
    const mockPosts = [
      {
        id: "1",
        message: "نرحب بطلابنا الجدد في الفصل الدراسي الجديد! 🎓✨",
        created_time: "2024-01-15T10:30:00Z",
        full_picture: "/campus-life.jpg",
        permalink_url:
          "https://www.facebook.com/Almarwazi252/posts/1234567890123456",
        likes: { data: [], summary: { total_count: 156 } },
        comments: { data: [], summary: { total_count: 23 } },
      },
      {
        id: "2",
        message: "افتتاح مختبر الحاسوب الجديد في كلية الهندسة 🖥️🔬",
        created_time: "2024-01-14T14:20:00Z",
        full_picture: "/img1.jpg",
        permalink_url:
          "https://www.facebook.com/Almarwazi252/posts/1234567890123457",
        likes: { data: [], summary: { total_count: 89 } },
        comments: { data: [], summary: { total_count: 12 } },
      },
      {
        id: "3",
        message: "حفل تخرج طلاب الدفعة 2024 - مبروك للخريجين! 🎉🎓",
        created_time: "2024-01-13T16:45:00Z",
        full_picture: "/img2.jpg",
        permalink_url:
          "https://www.facebook.com/Almarwazi252/posts/1234567890123458",
        likes: { data: [], summary: { total_count: 234 } },
        comments: { data: [], summary: { total_count: 45 } },
      },
      {
        id: "4",
        message: "ورشة عمل حول الذكاء الاصطناعي في التعليم 🤖📚",
        created_time: "2024-01-12T09:15:00Z",
        full_picture: "/img3.jpg",
        permalink_url:
          "https://www.facebook.com/Almarwazi252/posts/1234567890123459",
        likes: { data: [], summary: { total_count: 67 } },
        comments: { data: [], summary: { total_count: 8 } },
      },
      {
        id: "5",
        message: "زيارة وفد من جامعة هارفارد لتبادل الخبرات الأكاديمية 🌍🤝",
        created_time: "2024-01-11T11:30:00Z",
        full_picture: "/img4.jpg",
        permalink_url:
          "https://www.facebook.com/Almarwazi252/posts/1234567890123460",
        likes: { data: [], summary: { total_count: 178 } },
        comments: { data: [], summary: { total_count: 34 } },
      },
      {
        id: "6",
        message: "إعلان عن فتح باب التسجيل للبرامج الصيفية 2024 ☀️📝",
        created_time: "2024-01-10T13:20:00Z",
        full_picture: "/course1.jpg",
        permalink_url:
          "https://www.facebook.com/Almarwazi252/posts/1234567890123461",
        likes: { data: [], summary: { total_count: 92 } },
        comments: { data: [], summary: { total_count: 15 } },
      },
      {
        id: "7",
        message: "مؤتمر البحث العلمي السنوي - نتائج متميزة! 🔬🏆",
        created_time: "2024-01-09T15:10:00Z",
        full_picture: "/course2.jpg",
        permalink_url:
          "https://www.facebook.com/Almarwazi252/posts/1234567890123462",
        likes: { data: [], summary: { total_count: 145 } },
        comments: { data: [], summary: { total_count: 28 } },
      },
      {
        id: "8",
        message: "تطوير المكتبة المركزية بأحدث التقنيات 📚💻",
        created_time: "2024-01-08T12:00:00Z",
        full_picture: "/download.jpeg",
        permalink_url:
          "https://www.facebook.com/Almarwazi252/posts/1234567890123463",
        likes: { data: [], summary: { total_count: 78 } },
        comments: { data: [], summary: { total_count: 11 } },
      },
    ];

    return NextResponse.json({
      success: true,
      data: mockPosts,
      page: {
        name: "جامعة المروزي",
        id: pageId,
        link: "https://www.facebook.com/Almarwazi252",
      },
    });
  } catch (error) {
    console.error("Error fetching Facebook posts:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch Facebook posts",
        data: [],
      },
      { status: 500 }
    );
  }
}
