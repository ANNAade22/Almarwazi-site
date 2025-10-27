import type { Metadata } from "next";
import "./globals.css";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"; // Ensure global styles are imported
import { Amiri } from "next/font/google";
import "./globals.css";
import Navigation from "../components/layout/Navigation";
import { HeroUIProvider } from "@heroui/react";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });
const amiri = Amiri({
  subsets: ["arabic"], // Loads only Arabic characters
  weight: ["400", "700"], // Choose required font weights
  variable: "--font-amiri", // Optional: Define a CSS variable
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
      <body className={(amiri.variable, "bg-gray-100")}>
        <HeroUIProvider>
          <Navigation />
          {children}
        </HeroUIProvider>
      </body>
    </html>
  );
}
