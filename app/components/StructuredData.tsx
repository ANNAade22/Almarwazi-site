export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "جامعة المروزي",
    "alternateName": "Almarwazi University",
    "url": "https://marwazi-university.vercel.app",
    "logo": "https://marwazi-university.vercel.app/logo.png",
    "description": "مؤسسة تعليمية رائدة في الصومال تقدم تعليماً عالي الجودة يستند إلى المبادئ الإسلامية",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "مقديشو",
      "addressCountry": "الصومال"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+966-11-000-0000",
      "contactType": "Admissions",
      "email": "info@almarwazi.edu",
      "availableLanguage": ["Arabic", "English", "Somali"]
    },
    "sameAs": [
      "https://www.facebook.com/Almarwazi252",
      "https://twitter.com/almarwazi"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "جامعة المروزي",
    "url": "https://marwazi-university.vercel.app",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://marwazi-university.vercel.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}

