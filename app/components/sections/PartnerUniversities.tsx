"use client";

import React from "react";
import LogoLoop from "../ui/LogoLoop";

const PartnerUniversities = () => {
  // Partner university logos with realistic names
  const universityLogos = [
    {
      src: "https://via.placeholder.com/140x70/2e4832/ffffff?text=جامعة+القاهرة",
      alt: "جامعة القاهرة",
      href: "#",
      title: "جامعة القاهرة",
    },
    {
      src: "https://via.placeholder.com/140x70/93a694/ffffff?text=جامعة+الإسكندرية",
      alt: "جامعة الإسكندرية",
      href: "#",
      title: "جامعة الإسكندرية",
    },
    {
      src: "https://via.placeholder.com/140x70/10b981/ffffff?text=جامعة+عين+شمس",
      alt: "جامعة عين شمس",
      href: "#",
      title: "جامعة عين شمس",
    },
    {
      src: "https://via.placeholder.com/140x70/2e4832/ffffff?text=جامعة+الزقازيق",
      alt: "جامعة الزقازيق",
      href: "#",
      title: "جامعة الزقازيق",
    },
    {
      src: "https://via.placeholder.com/140x70/93a694/ffffff?text=جامعة+طنطا",
      alt: "جامعة طنطا",
      href: "#",
      title: "جامعة طنطا",
    },
    {
      src: "https://via.placeholder.com/140x70/10b981/ffffff?text=جامعة+المنصورة",
      alt: "جامعة المنصورة",
      href: "#",
      title: "جامعة المنصورة",
    },
    {
      src: "https://via.placeholder.com/140x70/2e4832/ffffff?text=جامعة+المنيا",
      alt: "جامعة المنيا",
      href: "#",
      title: "جامعة المنيا",
    },
    {
      src: "https://via.placeholder.com/140x70/93a694/ffffff?text=جامعة+أسيوط",
      alt: "جامعة أسيوط",
      href: "#",
      title: "جامعة أسيوط",
    },
    {
      src: "https://via.placeholder.com/140x70/10b981/ffffff?text=جامعة+سوهاج",
      alt: "جامعة سوهاج",
      href: "#",
      title: "جامعة سوهاج",
    },
    {
      src: "https://via.placeholder.com/140x70/2e4832/ffffff?text=جامعة+قنا",
      alt: "جامعة قنا",
      href: "#",
      title: "جامعة قنا",
    },
    {
      src: "https://via.placeholder.com/140x70/93a694/ffffff?text=جامعة+الأقصر",
      alt: "جامعة الأقصر",
      href: "#",
      title: "جامعة الأقصر",
    },
    {
      src: "https://via.placeholder.com/140x70/10b981/ffffff?text=جامعة+أسوان",
      alt: "جامعة أسوان",
      href: "#",
      title: "جامعة أسوان",
    },
  ];

  return (
    <section className="section bg-white py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="heading-lg text-primary mb-4">الجامعات الشريكة</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            نفتخر بشراكتنا مع أعرق الجامعات العالمية في مجال التعليم والبحث
            العلمي
          </p>
        </div>

        <div className="relative">
          <div
            className="logoloop-container"
            style={{
              height: "140px",
              position: "relative",
              overflow: "hidden",
              background: "linear-gradient(135deg, #e3fae5 0%, #f0fdf4 100%)",
              borderRadius: "16px",
              padding: "30px 0",
              boxShadow: "0 4px 20px rgba(46, 72, 50, 0.1)",
            }}
          >
            <LogoLoop
              logos={universityLogos}
              speed={60}
              direction="left"
              logoHeight={70}
              gap={80}
              pauseOnHover
              scaleOnHover
              fadeOut
              fadeOutColor="#e3fae5"
              ariaLabel="Partner universities"
              className="partner-logos"
              style={
                {
                  "--logoloop-gap": "80px",
                  "--logoloop-logoHeight": "70px",
                } as React.CSSProperties
              }
            />
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary/20 rounded-full"></div>
          <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-secondary/20 rounded-full"></div>
          <div className="absolute top-1/2 -right-4 w-2 h-2 bg-primary/30 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default PartnerUniversities;
