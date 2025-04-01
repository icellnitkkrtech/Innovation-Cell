import React, { useState } from 'react';

const faqs = [
  {
    id: 1,
    question: 'What is Innovation Cell?',
    answer: 'Innovation Cell is a student-driven official technical society of NIT Kurukshetra, affiliated with the Institute\'s Innovation Council (IIC), an initiative by the Ministry of Education (MoE) to foster a vibrant innovation ecosystem within our college.',
  },
  {
    id: 2,
    question: 'How can I join Innovation Cell?',
    answer: 'We conduct recruitment drives at the beginning of each academic year. Keep an eye on our social media channels and college notice boards for announcements. You can also reach out to us via email to express your interest.',
  },
  {
    id: 3,
    question: 'What kind of events does Innovation Cell organize?',
    answer: 'We organize a wide range of events including hackathons, workshops, seminars, ideathons, and entrepreneurship boot camps. Our flagship event is Innokshetra, which brings together innovators from across the country.',
  },
  {
    id: 4,
    question: 'Do I need technical skills to be part of Innovation Cell?',
    answer: 'Not necessarily. While technical skills are valuable, we welcome students with diverse skills including management, design, marketing, and content creation. Innovation thrives on diversity of thought and expertise.',
  },
  {
    id: 5,
    question: 'How can Innovation Cell help with my startup idea?',
    answer: 'We provide mentorship, resources, and connections to help you develop your startup idea. We can also guide you through the process of applying for incubation at the college incubation center and connecting with potential investors.',
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-white">Frequently Asked Questions</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Find answers to common questions about Innovation Cell and how you can get involved.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={faq.id} className="mb-4">
              <button
                className={`flex justify-between items-center w-full p-5 font-medium text-left rounded-lg ${
                  activeIndex === index
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                } transition-all duration-300 shadow-md`}
                onClick={() => toggleAccordion(index)}
              >
                <span className="text-lg">{faq.question}</span>
                <svg
                  className={`w-6 h-6 transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-5 bg-gray-800 border border-gray-700 rounded-b-lg shadow-inner">
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ; 