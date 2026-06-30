import type { Metadata } from "next";
import "./globals.css";
import { Amiri } from "next/font/google";
import Navigation from "./components/layout/Navigation";
import ContactTopBar from "./components/layout/ContactTopBar";
import Preloader from "./components/Preloader";
import Chatbot from "./components/Chatbot";
import { HeroUIProvider } from "./components/providers/HeroUIProvider";
import StructuredData from "./components/StructuredData";
import { universityContent } from "@/lib/universityContent";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });
const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap", // Performance: swap fonts immediately
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://marwazi-university.vercel.app'),
  title: {
    default: `${universityContent.name} | Almarwazi University`,
    template: `%s | ${universityContent.nameShort}`
  },
  description: universityContent.introduction,
  keywords: [
    "جامعة المروزي",
    "Almarwazi University",
    "Islamic University Somalia",
    "جامعة إسلامية",
    "تعليم إسلامي",
    "الصومال",
    "مقديشو",
    "الدراسات الإسلامية",
    "اللغة العربية",
    "علوم القرآن",
    "Mogadishu University",
    "Islamic Studies Somalia"
  ],
  authors: [{ name: "Almarwazi University" }],
  creator: "Almarwazi University",
  publisher: "Almarwazi University",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    alternateLocale: ['en_US', 'so_SO'],
    url: 'https://marwazi-university.vercel.app',
    siteName: 'جامعة المروزي | Almarwazi University',
    title: 'جامعة المروزي - التعليم الإسلامي العالي',
    description: 'مؤسسة تعليمية رائدة تقدم تعليماً عالي الجودة يستند إلى المبادئ والقيم الإسلامية في الصومال',
    images: [
      {
        url: '/about01.jpg',
        width: 1200,
        height: 630,
        alt: 'جامعة المروزي - Almarwazi University',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'جامعة المروزي | Almarwazi University',
    description: 'مؤسسة تعليمية رائدة تقدم تعليماً عالي الجودة يستند إلى المبادئ الإسلامية',
    images: ['/about01.jpg'],
  },
  verification: {
    google: 'your-google-verification-code', // Add your verification code
  },
  alternates: {
    canonical: 'https://marwazi-university.vercel.app',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <StructuredData />
      </head>
      <body className={`${amiri.variable} bg-gray-100`}>
        <HeroUIProvider>
          <Preloader />
          <ContactTopBar />
          <Navigation />
          {children}
          <Chatbot />
        </HeroUIProvider>
      </body>
    </html>
  );
}
