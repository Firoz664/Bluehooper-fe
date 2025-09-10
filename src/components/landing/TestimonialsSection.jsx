import { memo } from 'react';
import { testimonials } from '../../data/landingPageData';

const TestimonialCard = memo(({ testimonial }) => (
  <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
    <div className="text-4xl mb-4" role="img" aria-label={`Photo of ${testimonial.name}`}>
      {testimonial.image}
    </div>
    <blockquote className="text-gray-700 mb-6 italic">
      "{testimonial.quote}"
    </blockquote>
    <div>
      <div className="font-semibold text-gray-900">{testimonial.name}</div>
      <div className="text-gray-600">{testimonial.role}</div>
      <div className="text-blue-600 font-medium">{testimonial.company}</div>
    </div>
  </div>
));

TestimonialCard.displayName = 'TestimonialCard';

const TestimonialsSection = memo(() => {
  return (
    <section className="py-24 bg-white" aria-labelledby="testimonials-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 id="testimonials-heading" className="text-4xl font-bold text-gray-900 mb-6">
            Trusted by Construction Professionals
          </h2>
          <p className="text-xl text-gray-600">
            See what our customers say about BlueHooper
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={`${testimonial.name}-${index}`} 
              testimonial={testimonial} 
            />
          ))}
        </div>
      </div>
    </section>
  );
});

TestimonialsSection.displayName = 'TestimonialsSection';

export default TestimonialsSection;