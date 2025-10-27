import { NextRequest, NextResponse } from "next/server";

// Mock data as fallback
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

export async function GET(request: NextRequest) {
  try {
    // Facebook Page ID for Almarwazi University
    const FACEBOOK_PAGE_ID = "Almarwazi252";

    // For public pages, we can use a public access token or app access token
    // This will work for public posts without requiring user authentication
    const FACEBOOK_ACCESS_TOKEN =
      process.env.FACEBOOK_ACCESS_TOKEN || "your_app_access_token_here";

    // Check if we have access token
    if (
      !FACEBOOK_ACCESS_TOKEN ||
      FACEBOOK_ACCESS_TOKEN === "your_app_access_token_here"
    ) {
      console.log("Facebook access token not configured, using mock data");
      return NextResponse.json({
        success: true,
        data: mockPosts,
        page: {
          name: "جامعة المروزي",
          id: FACEBOOK_PAGE_ID,
          link: "https://www.facebook.com/Almarwazi252",
        },
        source: "mock_data",
        message: "Using mock data - configure FACEBOOK_ACCESS_TOKEN for real posts",
      });
    }

    // For public pages, we can directly fetch posts using the page ID
    // First, let's get the page information
    const pageResponse = await fetch(
      `https://graph.facebook.com/v18.0/${FACEBOOK_PAGE_ID}?fields=name,link&access_token=${FACEBOOK_ACCESS_TOKEN}`
    );

    if (!pageResponse.ok) {
      const errorData = await pageResponse.json();
      console.error("Failed to get page info:", errorData);
      // Fallback to mock data instead of throwing error
      return NextResponse.json({
        success: true,
        data: mockPosts,
        page: {
          name: "جامعة المروزي",
          id: FACEBOOK_PAGE_ID,
          link: "https://www.facebook.com/Almarwazi252",
        },
        source: "mock_data_fallback",
        message: "Facebook API error, using mock data",
      });
    }

    const pageData = await pageResponse.json();

    // Fetch posts from Facebook Graph API
    const postsResponse = await fetch(
      `https://graph.facebook.com/v18.0/${FACEBOOK_PAGE_ID}/posts?fields=id,message,created_time,full_picture,permalink_url,likes.summary(true),comments.summary(true)&limit=8&access_token=${FACEBOOK_ACCESS_TOKEN}`
    );

    if (!postsResponse.ok) {
      const errorData = await postsResponse.json();
      console.error("Failed to fetch posts:", errorData);
      // Fallback to mock data instead of throwing error
      return NextResponse.json({
        success: true,
        data: mockPosts,
        page: {
          name: pageData.name || "جامعة المروزي",
          id: FACEBOOK_PAGE_ID,
          link: pageData.link || "https://www.facebook.com/Almarwazi252",
        },
        source: "mock_data_fallback",
        message: "Facebook posts API error, using mock data",
      });
    }

    const postsData = await postsResponse.json();

    return NextResponse.json({
      success: true,
      data: postsData.data || [],
      page: {
        name: pageData.name || "جامعة المروزي",
        id: FACEBOOK_PAGE_ID,
        link: pageData.link || "https://www.facebook.com/Almarwazi252",
      },
      source: "facebook_api",
    });
  } catch (error) {
    console.error("Error fetching Facebook posts:", error);

    // Always return mock data as fallback instead of error
    return NextResponse.json({
      success: true,
      data: mockPosts,
      page: {
        name: "جامعة المروزي",
        id: "Almarwazi252",
        link: "https://www.facebook.com/Almarwazi252",
      },
      source: "mock_data_fallback",
      message: "Unexpected error, using mock data",
    });
  }
}
