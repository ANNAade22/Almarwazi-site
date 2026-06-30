import SectionHeading from "../ui/SectionHeading";

const partners = [
  {
    name: "جامعة الأزهر",
    note: "شراكة أكاديمية في العلوم الشرعية",
  },
  {
    name: "جامعة أم القرى",
    note: "تبادل خبرات في الدراسات الإسلامية",
  },
  {
    name: "الجامعة الإسلامية بالمدينة",
    note: "مصدر معلمي الجامعة وخريجيها",
  },
  {
    name: "جامعة دار السلام",
    note: "تعاون في البحث العلمي والتدريب",
  },
];

export default function PartnerLogos() {
  return (
    <section className="py-16 md:py-20 bg-white border-y border-primary/10">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <SectionHeading
          eyebrow="شراكاتنا الأكاديمية"
          title="جامعاتنا الشريكة"
          subtitle="تعاون مع مؤسسات علمية مرموقة يعزّز جودة التعليم ومصداقية الشهادات"
          className="mb-10 md:mb-12"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="bg-sand border border-primary/10 rounded-xl px-5 py-7 text-center hover:border-accent/40 transition-colors"
            >
              <div className="w-10 h-1 bg-accent rounded-full mx-auto mb-4" />
              <p className="font-bold text-primary text-base leading-snug mb-2">
                {partner.name}
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">{partner.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
