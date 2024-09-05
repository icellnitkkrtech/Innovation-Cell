import React from "react";
import "./Hero.css";
const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-container">
        <div className="hero-text">
          <h1 className="small1">INNOVATION CELL </h1>
          <h1 className="small2">PRESENTS</h1>
          <h1 className="big">INNOKSHETRA</h1>
        </div>
        <div className="button">
          <a href="http://linktr.ee/icellnitkkr">
            <a
              href="#_"
              className="relative inline-flex items-center px-12 py-3 overflow-hidden text-lg font-medium text-white border-2 border-indigo-600 rounded-full hover:text-white group hover:bg-gray-50 "
            >
              <span className="absolute left-0 block w-full h-0 transition-all bg-indigo-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
              <span class="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span className="relative fontmon font-bold">Register Now</span>
            </a>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
