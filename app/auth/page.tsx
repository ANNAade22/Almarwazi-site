"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import FooterSection from "../FooterSection";
import { createClient } from "@supabase/supabase-js";

// Initialize the Supabase client
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Regular Supabase authentication
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError("تاكد من كلمة السر او المستخدم");
        setIsLoading(false);
        return;
      }

      // Set login state in localStorage as backup
      localStorage.setItem("isLoggedIn", "true");

      // Redirect to admin dashboard
      router.push("/blog/admin");
    } catch (err: any) {
      setError(err.message || "حدث خطأ أثناء المصادقة");
      setIsLoading(false);
    }
  };
  return (
    <main dir="rtl">
      <section className="min-h-screen py-20 bg-[#e3fae5]/30">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm p-8">
            <div className="text-center mb-8">
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="جامعة المروزي"
                  width={120}
                  height={60}
                  className="mx-auto mb-6"
                />
              </Link>
              <h1 className="text-2xl font-bold text-primary">تسجيل الدخول</h1>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2"
                >
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-medium mb-2"
                >
                  كلمة المرور
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-3 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-70"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    جاري التحميل...
                  </span>
                ) : (
                  "تسجيل الدخول"
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link href="/" className="text-primary hover:underline">
                العودة إلى الصفحة الرئيسية
              </Link>
            </div>
          </div>
        </div>
      </section>
      <FooterSection />
    </main>
  );
}
