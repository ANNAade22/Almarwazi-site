import { universityContent } from "@/lib/universityContent";

export default function StructuredData() {
  const { contact, name, introduction } = universityContent;

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: name,
    alternateName: "Almarwazi University",
    url: `https://${contact.website}`,
    description: introduction,
    address: {
      "@type": "PostalAddress",
      addressLocality: "مقديشو",
      addressCountry: "الصومال",
      postOfficeBoxNumber: contact.poBox,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: contact.primaryPhone,
      contactType: "Admissions",
      email: contact.email,
      availableLanguage: ["Arabic", "English", "Somali"],
    },
    sameAs: [
      "https://www.facebook.com/Almarwazi252",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: name,
    url: `https://${contact.website}`,
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
