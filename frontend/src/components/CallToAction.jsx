import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="py-12 sm:py-20 relative overflow-hidden bg-gray-900">
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">Ready to Innovate with Us?</h2>
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-10 leading-relaxed px-2">
            Join Innovation Cell and be part of a community that's shaping the future through creativity, technology, and entrepreneurship.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <a 
              href="#contact" 
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
            >
              Contact Us
            </a>
            <a 
              href="#events" 
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 font-bold rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
            >
              Upcoming Events
            </a>
          </div>
        </div>
      </div>
      
      {/* Decorative elements - smaller on mobile */}
      <div className="absolute -bottom-12 -left-12 sm:-bottom-16 sm:-left-16 w-48 sm:w-64 h-48 sm:h-64 bg-amber-500 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute -top-12 -right-12 sm:-top-16 sm:-right-16 w-48 sm:w-64 h-48 sm:h-64 bg-orange-500 rounded-full opacity-20 blur-3xl"></div>
    </section>
  );
};

export default CallToAction; 