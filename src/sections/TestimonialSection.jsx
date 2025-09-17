import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { FaChevronCircleRight, FaChevronCircleLeft } from "react-icons/fa";
import { ImQuotesLeft } from "react-icons/im";

const TestimonialSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Marco Kihn",
      role: "Software Engineer",
      title: "Amazing services",
      content:
        "This platform transformed my job search experience. Within two weeks, I landed my dream position at a top tech company. The personalized recommendations and seamless application process made all the difference.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 2,
      name: "Kristin Hester",
      role: "Product Manager",
      title: "Everything simple",
      content:
        "I was skeptical about online job platforms, but this one exceeded all my expectations. The user interface is intuitive, and I received multiple interview calls within days of updating my profile. Highly recommend!",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 3,
      name: "Zion Cisneros",
      role: "Marketing Director",
      title: "Awesome, thank you!",
      content:
        "The quality of job matches was incredible. Every opportunity presented aligned perfectly with my skills and career goals. The support team was also fantastic throughout the entire process. Couldn't be happier!",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  // Autoslider

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: rating }, (_, index) => (
      <span key={index} className="text-yellow-400 text-xl">
        <FaStar />
      </span>
    ));
  };

  return (
    <div className="flex items-center mt-8 py-8 bg-primary-100">
      <div className="container mx-auto py-6  px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl pb-4  ">Testimonials from our Users</h2>
          <p>
            Discover how our platform has helped thousands of professionals find
            their dream jobs and advance their careers.
          </p>
        </div>

        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              key={testimonial.id}
            >
              <div className="flex mb-4">{renderStars(testimonial.rating)}</div>
              <h3 className="text-xl font-bold text-neutral-900 mb-4">
                {testimonial.title}
              </h3>
              <p className="text-neutral-600 mb-6 italic">
                "{testimonial.content}"
              </p>
              <div className="text-primary-500 text-4xl font-bold flex justify-end mb-4">
                <ImQuotesLeft />
              </div>
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-neutral-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-neutral-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="md:hidden relative">
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-xl p-8 shadow-lg">
                    <div className="flex mb-4">{renderStars(testimonial.rating)}</div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-4">
                      {testimonial.title}
                    </h3>
                    <p className="text-neutral-600 mb-6 italic leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    <div className="flex justify-end mb-4">
                      <div className="text-primary-500 text-4xl font-bold"><ImQuotesLeft /></div>
                    </div>
                    <div className="flex items-center">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h4 className="font-semibold text-neutral-900">
                          {testimonial.name}
                        </h4>
                        <p className="text-neutral-500 text-sm">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-secondary rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
            aria-label="Previous testimonial"
          >
            <FaChevronCircleLeft className="w-6 h-6 text-primary-600" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-secondary rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
            aria-label="Next testimonial"
          >
            <FaChevronCircleRight className="w-6 h-6 text-primary-600" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-primary-500' : 'bg-neutral-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
