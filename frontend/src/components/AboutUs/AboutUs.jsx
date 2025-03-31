import React, { useRef, useState, useEffect } from "react";
import './about.css'; 

const AboutUs = () => {
  const [showMore, setShowMore] = useState(false);
  const sectionRef = useRef(null);

  const handleToggleShowMore = () => {
    setShowMore(prevState => !prevState);
  /*
    if (!showMore) {
      sectionRef.current?.scrollIntoView({ behavior:"smooth" });
    } else {
      window.scrollTo({ behavior: "smooth" });
    }
   */
  };

  return (
    <section id="about" className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <HeroSection showMore={showMore} onToggleShowMore={handleToggleShowMore} />
        {showMore && <MoreContent />}
      </div>
    </section>
  );
};

const Header = () => (
  <section className="pt-10">
    <div className="about pl-4 py-6">
      <h1 className="font-extrabold text-orange-500 lg:text-5xl md:text-4xl sm:text-3xl text-3xl">About Us</h1>
      <hr className="sm:border-t-2 ml-48 md:ml-72 lg:ml-96 sm:ml-64 md:border-t-3 " />
    </div>
  </section>
);

const HeroSection = ({ showMore, onToggleShowMore }) => (
  <section className="bg-gray-800 text-white rounded-xl overflow-hidden shadow-xl">
    <div className="container mx-auto">
      <div className="flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 p-8 lg:p-12">
          <div className="inline-block px-3 py-1 bg-amber-500/20 text-amber-500 rounded-full text-sm font-semibold mb-6">
            About Us
          </div>
          <h1 className="lg:text-5xl md:text-4xl sm:text-4xl text-4xl font-bold text-white mb-2">Innovation Cell,</h1>
          <p className="lg:text-xl md:text-lg sm:text-md text-gray-300">The epicenter of creativity and entrepreneurship at</p>
          <h1 className="lg:text-5xl md:text-4xl sm:text-4xl text-4xl font-bold text-amber-500 mt-1 mb-6">NIT KURUKSHETRA</h1>
          <p className="lg:text-xl md:text-lg sm:text-md text-gray-300 mt-8 leading-relaxed">
            Established under the aegis of the Ministry of Education, our society is dedicated to fostering a culture of innovation, entrepreneurship, and financial literacy among students.
          </p>
          <button
            onClick={onToggleShowMore}
            className="mt-8 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-full hover:opacity-90 flex items-center transition duration-300 ease-in-out transform hover:scale-95"
          >
            {showMore ? "See less" : "Know more about us"}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-2">
              <path strokeLinecap="round" strokeLinejoin="round" d={showMore ? "M4.5 15.75l7.5-7.5 7.5 7.5" : "M19.5 8.25l-7.5 7.5-7.5-7.5"} />
            </svg>
          </button>
        </div>
        <div className="lg:w-1/2 mt-10 lg:mt-0 relative">
          <div className="relative h-full">
            <img src="/about.png" alt="About" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-l from-gray-900/90 via-gray-900/60 to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const MoreContent = () => (
  <div className="bg-gray-800 text-white p-8 rounded-xl mt-8 shadow-lg border border-gray-700">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-amber-500">Our Mission</h2>
        <p className="text-gray-300 mb-6">
          To create a vibrant ecosystem that nurtures innovation and entrepreneurship among students, enabling them to develop solutions for real-world problems and contribute to the nation's growth.
        </p>
        
        <h2 className="text-2xl font-bold mb-4 text-amber-500">Our Vision</h2>
        <p className="text-gray-300">
          To be the premier student-led innovation hub that transforms creative ideas into impactful solutions, fostering a generation of innovators and entrepreneurs who drive positive change in society.
        </p>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-4 text-amber-500">What We Do</h2>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start">
            <svg className="h-6 w-6 text-amber-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Organize workshops, hackathons, and ideathons</span>
          </li>
          <li className="flex items-start">
            <svg className="h-6 w-6 text-amber-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Provide mentorship for student startups</span>
          </li>
          <li className="flex items-start">
            <svg className="h-6 w-6 text-amber-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Conduct sessions on financial literacy</span>
          </li>
          <li className="flex items-start">
            <svg className="h-6 w-6 text-amber-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Facilitate industry-academia collaborations</span>
          </li>
          <li className="flex items-start">
            <svg className="h-6 w-6 text-amber-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Host our annual flagship event - Innokshetra</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

const TypingText = ({ text, speed = 150, startTyping }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const audioRef = useRef(null);

  // Function to reset the typing text
  const resetTyping = () => {
    setDisplayedText('');
    setIsTyping(false);
  };

  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.loop = true;
        audioRef.current.play().catch((e) => {
          console.log("Audio playback prevented by browser policy: ", e);
        });
      }
    };

    const stopAudio = () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0; // Reset sound
      }
    };

    let index = 1;

    if (startTyping) {
      setIsTyping(true);
      /*
      playAudio(); // Start the typing sound
      */

      const typingInterval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText((prev) => prev + text[index - 1]);
          index++;
        } else {
          setIsTyping(false); // Stop typing
          stopAudio(); // Stop sound
          clearInterval(typingInterval);
        }
      }, speed);

      return () => {
        clearInterval(typingInterval);
        stopAudio(); // Ensure sound stops on cleanup
      };
    } else {
      resetTyping(); // Reset typing when user scrolls out
    }
  }, [text, speed, startTyping]);

  return (
    <div className="flex items-center justify-center text-center font-bold text-white text-2xl xl:text-4xl">
      <p>
        <span>{displayedText}</span>
        <span className={`ml-1 border-r-2 border-white ${!isTyping ? 'animate-blink' : ''}`}>|</span>
      </p>
      <audio ref={audioRef} src="/keyboardsound.mp3" preload="auto"></audio>
    </div>
  );
};

const Joinsection = () => {
  const sectionRef = useRef(null);
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStartTyping(true); // Start typing animation when the section is in view
        } else {
          setStartTyping(false); // Stop typing animation when the section is out of view
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the section is in view
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-black text-white py-2">
      <div className="container mx-auto py-4 md:py-8 md:px-12 lg:px-16 sm:px-6 px-3">
        <p className="lg:text-lg md:text-md sm:text-md text-sm xl:text-xl text-center text-gray-400">
          Join us to explore new ideas, meet like-minded individuals, and take your first steps toward building a successful business. Whether you're interested in finance, technology, product development, or social entrepreneurship, there's a place for you at the Innovation Cell.
        </p>

        {/* Use the TypingText component for the animated text */}
        <div className="pt-8 text-center justify-center pb-4">
          <TypingText text="TTogether, Let's Innovate and make a difference.." speed={100} startTyping={startTyping} />
        </div>

        <hr className="mt-10 sm:border-t-2 md:border-t-3" />
      </div>
    </section>
  );
};


export default AboutUs;