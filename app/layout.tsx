import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { Cairo } from "next/font/google";
import "./globals.css"; // Ensure global styles are imported
import { Tajawal } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });
// const tajawal = Tajawal({
//   subsets: ["arabic"], // Loads only Arabic characters
//   weight: ["400", "700"], // Choose required font weights
//   variable: "--font-tajawal", // Optional: Define a CSS variable
// });
const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "700"], // Choose desired font weights
  variable: "--font-cairo", // Define a CSS variable
});

export const metadata: Metadata = {
  title: "Almarwazi University",
  description: "University in Somalia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={cairo.variable}>
        <Header />
        {children}
      </body>
    </html>
  );
}
