import React, { useState } from 'react';

const FAQS = [
  {
    question: "What is a Hackathon?",
    answer: "A hackathon is an intense event that brings together designers and developers along with industry experts to identify problems and create software solutions, usually within 24-48 hours."
  },
  {
    question: "What is Innokshetra?",
    answer: "It is an event organized by ICELL."
  },
  {
    question: "How can I participate in a Hackathon?",
    answer: "You can participate by registering on the event's official website and following the given instructions."
  },
  {
    question: "Who can join a Hackathon?",
    answer: "Anyone with an interest in technology, coding, and problem-solving can join a hackathon."
  },
  {
    question: "What should I bring to a Hackathon?",
    answer: "Bring your laptop, chargers, and any other hardware you might need. It's also good to have a notepad and some snacks."
  },
  {
    question: "Kyu nhi ho rhi padhai?",
    answer: "hum pe to hai hi na boooks"
  },
  {
    question: "Elvish bhai ke aage koi bol sakta hai kya",
    answer: "Salman bhai"
  }
];

function Faq() {
  const [visibleFAQs, setVisibleFAQs] = useState(4);
  
  const loadMore = () => {
    setVisibleFAQs(prevVisibleFAQs => prevVisibleFAQs + 2);
  };
  
  const showLess = () => {
    setVisibleFAQs(prevVisibleFAQs => prevVisibleFAQs - 2);
  };

  return (
    <div className="faq-container bg-slate-900 text-white py-8 px-4" id="faqs">
      <h1 className='text-5xl md:text-7xl text-cyan-400 text-center font-extrabold leading-tight mb-12'>
        FAQ
      </h1>
      <div className="flex flex-col items-center">
        {FAQS.slice(0, visibleFAQs).map((faq, index) => (
          <div key={index} className="bg-gray-800 border border-cyan-700 p-6 mb-4 w-full max-w-2xl rounded-lg shadow-lg">
            <div className="text-xl font-bold text-cyan-400 mb-2">
              {index + 1})
            </div>
            <div className="text-lg">
              <p className="font-semibold mb-2">{faq.question}</p>
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {visibleFAQs < FAQS.length && (
          <button
            className="bg-cyan-500 text-white border border-cyan-500 rounded-full px-6 py-2 mr-4 font-semibold transition-transform transform hover:scale-105"
            onClick={loadMore}
          >
            LOAD MORE
          </button>
        )}
        {visibleFAQs > 4 && (
          <button
            className="bg-cyan-500 text-white border border-cyan-500 rounded-full px-6 py-2 font-semibold transition-transform transform hover:scale-105"
            onClick={showLess}
          >
            SHOW LESS
          </button>
        )}
      </div>
    </div>
  );
}

export default Faq;
