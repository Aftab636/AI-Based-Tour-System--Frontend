import { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    image: "/assets/images/avatar.png",
    quote:
      "An unforgettable experience with Roam Pakistan! The guides were knowledgeable, and the tours showcased the best of Pakistan’s beauty. Highly recommended for anyone seeking adventure and culture!",
    name: "Fiza Ahmad",
  },
];

export default function Reviews() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-gray-100 py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-red-500 text-sm uppercase font-semibold mb-2 tracking-widest">Promotion</h3>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10">
          See What Our Clients Say About Us
        </h2>

        <div className="flex items-center justify-center gap-6">
          {/* Left Arrow */}
          <button
            onClick={prevTestimonial}
            className="p-3 bg-white rounded-full shadow hover:bg-gray-100 transition"
          >
            <FaChevronLeft className="text-gray-600" />
          </button>

          {/* Testimonial Card */}
          <div className="bg-white shadow-xl rounded-xl p-8 max-w-lg text-left relative">
            <img
              src={testimonials[activeIndex].image}
              alt="Client"
              className="w-16 h-16 rounded-full border-2 border-red-500 object-cover mx-auto mb-4"
            />
            <p className="text-gray-700 text-base relative">
              <FaQuoteLeft className="inline-block text-red-400 mr-2 text-lg" />
              {testimonials[activeIndex].quote}
            </p>
            <h4 className="mt-4 font-semibold text-red-600 text-lg text-center">
              {testimonials[activeIndex].name}
            </h4>
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextTestimonial}
            className="p-3 bg-white rounded-full shadow hover:bg-gray-100 transition"
          >
            <FaChevronRight className="text-gray-600" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === activeIndex ? "bg-red-500" : "bg-gray-400"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}
