import React from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Rahul Sharma',
    role: 'Computer Science Student',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    quote: 'Innovation Cell has been instrumental in my growth as a tech enthusiast. The workshops and hackathons they organize are top-notch and provide real-world experience.',
  },
  {
    id: 2,
    name: 'Priya Patel',
    role: 'Electronics Engineering Student',
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
    quote: 'Being part of Innovation Cell has opened numerous opportunities for me. The mentorship and guidance from seniors have helped me develop my entrepreneurial skills.',
  },
  {
    id: 3,
    name: 'Amit Kumar',
    role: 'Mechanical Engineering Student',
    image: 'https://randomuser.me/api/portraits/men/3.jpg',
    quote: 'The Innovation Cell creates a perfect environment for students to explore their creative ideas. Their support in turning concepts into prototypes is exceptional.',
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-16 bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-white">What Students Say</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Hear from students who have been part of our innovation journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/150';
                  }}
                />
                <div>
                  <h3 className="text-xl font-bold text-white">{testimonial.name}</h3>
                  <p className="text-amber-500">{testimonial.role}</p>
                </div>
              </div>
              <div className="mb-6">
                <svg className="w-10 h-10 text-amber-500/50 mb-2" fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 8c-4.4 0-8 3.6-8 8s3.6 8 8 8h.5c-.3-1-.5-2-.5-3 0-5.5 4.5-10 10-10V8h-10zm20 0h-10v3c5.5 0 10 4.5 10 10 0 1-.2 2-.5 3h.5c4.4 0 8-3.6 8-8s-3.6-8-8-8z" />
                </svg>
                <p className="text-gray-300 italic">{testimonial.quote}</p>
              </div>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-5 h-5 text-amber-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 