export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Ahmed Hassan",
      class: "Class of 2023",
      quote:
        "My experience at Almarwazi University has been transformative. The professors are knowledgeable and supportive, and the curriculum is comprehensive.",
    },
    {
      name: "Fatima Ali",
      class: "Class of 2022",
      quote:
        "The Islamic studies program at Almarwazi University provided me with deep insights and knowledge that I apply daily in my professional life.",
    },
    {
      name: "Omar Farah",
      class: "Class of 2023",
      quote:
        "Learning Arabic at Almarwazi University was an enriching experience. The teaching methods are effective and the environment is conducive to learning.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">
            What Our Students Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from our students about their experiences at Almarwazi
            University.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-500">{item.class}</p>
                </div>
              </div>
              <p className="text-gray-700 italic">{item.quote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
