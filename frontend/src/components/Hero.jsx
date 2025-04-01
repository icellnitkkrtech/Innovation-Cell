import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const Hero = () => {
  const typedRef = useRef(null);

  useEffect(() => {
    const options = {
      strings: [
        'Innovation',
        'Creativity',
        'Entrepreneurship',
        'Technology',
        'Leadership'
      ],
      typeSpeed: 100,
      backSpeed: 50,
      loop: true,
      cursorChar: '|',
    };

    const typed = new Typed(typedRef.current, options);

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900">
      {/* Background with gradient overlay for better visibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900/90 to-black z-10"></div>
      
      {/* Background video with reduced opacity */}
      <video
        className="absolute w-full h-full object-cover opacity-50"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-20 flex flex-col md:flex-row items-center">
        {/* Text content - improved mobile spacing */}
        <div className="w-full md:w-3/5 text-center md:text-left mb-10 md:mb-0 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 md:mb-4">
            Welcome to <span className="text-amber-500">Innovation Cell</span>
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-4 md:mb-6">
            Where <span ref={typedRef} className="text-amber-500"></span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto md:mx-0 mb-6 md:mb-8 leading-relaxed">
            The official technical society of NIT Kurukshetra dedicated to fostering innovation, 
            entrepreneurship, and creative problem-solving among students.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4">
            <a
              href="#about"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-full shadow-lg hover:shadow-amber-500/20 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
            >
              Explore More
            </a>
            <a
              href="#contact"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-amber-400 text-black font-bold rounded-full shadow-lg hover:bg-amber-300 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
            >
              Contact Us
            </a>
          </div>
        </div>
        
        {/* Image - better mobile sizing */}
        <div className="w-full md:w-2/5 relative mt-8 md:mt-0">
          <div className="relative z-10 transform hover:scale-105 transition-transform duration-500 max-w-xs sm:max-w-sm mx-auto">
            <img 
              src="/hero-image.png" 
              alt="Innovation Cell" 
              className="max-w-full h-auto rounded-lg shadow-2xl"
              onError={(e) => {
                e.target.src = '/IIC_Logo.png'; // Fallback to logo if image doesn't exist
                e.target.className = "max-w-[200px] sm:max-w-xs mx-auto";
              }}
            />
            <div className="absolute -bottom-4 -right-4 w-16 sm:w-24 h-16 sm:h-24 bg-amber-500 rounded-full opacity-70 blur-xl"></div>
            <div className="absolute -top-4 -left-4 w-24 sm:w-32 h-24 sm:h-32 bg-orange-500 rounded-full opacity-60 blur-xl"></div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements - hidden on smallest screens */}
      <div className="absolute top-20 left-10 w-12 sm:w-20 h-12 sm:h-20 border-t-4 border-l-4 border-amber-500 opacity-30 hidden sm:block"></div>
      <div className="absolute bottom-20 right-10 w-12 sm:w-20 h-12 sm:h-20 border-b-4 border-r-4 border-amber-500 opacity-30 hidden sm:block"></div>
      
      {/* Scroll down indicator */}
      <div className="absolute bottom-5 sm:bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <a href="#about" className="text-white hover:text-amber-500 transition-colors duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 sm:h-10 sm:w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Hero;