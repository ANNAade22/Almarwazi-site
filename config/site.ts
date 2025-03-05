export const siteConfig = {
  name: "جامعة المروزي",
  description: "تمكين العقول، تشكيل المستقبل",
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
  // Add mobile configuration
  mobileBreakpoint: 768, // px
  mobileMenuPosition: "right", // 'right' or 'left'
  enableMobileMenu: true,
};
