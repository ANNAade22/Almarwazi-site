import { universityContent } from "@/lib/universityContent";

export const siteConfig = {
  name: universityContent.name,
  nameShort: universityContent.nameShort,
  description: universityContent.introduction,
  mainNav: [
    {
      title: "الرئيسية",
      href: "/",
      mobileOnly: false,
    },
    {
      title: "عن الجامعة",
      href: "/about",
      mobileOnly: false,
    },
    {
      title: "البرامج الدراسية",
      href: "/courses",
      mobileOnly: false,
    },
    {
      title: "المدونة",
      href: "/blog",
      mobileOnly: false,
    },
    {
      title: "اتصل بنا",
      href: "/contact",
      mobileOnly: false,
    },
  ],
  mobileBreakpoint: 768,
  mobileMenuPosition: "right" as const,
  enableMobileMenu: true,
};
