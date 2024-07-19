import React, { useState, useEffect } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import Logo from './Logo';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate= useNavigate()
  const [nav, setNav] = useState(false);
  const [socialIconColor, setSocialIconColor] = useState('#fff');

  const handleNav = () => {
    setNav(!nav);
  };
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      handleNav(); // Close the mobile menu after scrolling
    }
  };
  const navItems = [
    { id: 1, text: 'Home', sectionId: 'home' },
    { id: 2, text: 'About Us', sectionId: 'about' },
    { id: 3, text: 'Team', sectionId: 'team' },
    { id: 4, text: 'Events', sectionId: 'event' },
    { id: 5, text: 'Contact', sectionId: 'contact' },
  ];

  const socialIcons = [
    {
      id: 1,
      icon: (
          <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7"
        fill="currentColor"
        style={{ color: "white" }}
        viewBox="0 0 24 24"
      >
        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
      </svg>
      ),
      link: 'https://facebook.com',
    },
    {
      id: 2,
      icon: (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7"
        fill="currentColor"
        style={{ color: "white" }}
        viewBox="0 0 24 24"
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.689-.072 4.948-.072 3.259 0 3.668.014 4.948.072 3.26.149 4.771 1.698 4.919 4.92.059 1.281.073 1.689.073 4.948 0 3.259-.014 3.667-.072 4.947-.196 4.354-2.617 6.78-6.979 6.98-1.281-.059-1.69-.073-4.949-.073zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
      ),
      link: 'https://www.instagram.com/icell.nitkkr?igsh=d3FseTN2NXRjdGQ4',
    },
    {
      id: 3,
      icon: (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7"
        fill="currentColor"
        style={{ color: "white" }}
        viewBox="0 0 24 24"
      >
        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
      </svg>
      ),
      link: 'https://www.linkedin.com/company/icell-nitkkr/',
    },
  ];

  return (
    <div className='  w-full navbar bg-black flex justify-between items-center h-20 mx-auto px-8 m text-white z-999 '>
      <Logo />
      {/* { <h1 className='w-full text-3xl font-bold Capitalize'>Innovation Cell</h1> } */}

      {/* Desktop Navigation */}
      <ul className='hidden md:flex gap-2'>
        {navItems.map(item => (
          <li key={item.id} className='p-4 cursor-pointer hover:text-lg transition-transform duration-300 transform hover:scale-110 transition-all duration-300'>
            <span onClick={() => scrollToSection(item.sectionId)}>{item.text}</span>
          </li>
        ))}
        <li className='p-4 cursor-pointer hover:text-lg transition-transform duration-300 transform hover:scale-110 transition-all duration-300'>
          <span onClick={()=> navigate("/innokshetra")}>Innokshetra</span>
        </li>
      </ul>

      {/* Social Icons */}
      <ul className='hidden bg-black  md:flex border-white rounded-lg  p-0 social-icons'>
  {socialIcons.map(iconObj => (
    <li
      key={iconObj.id}
      className='p-4 cursor-pointer'
    >
      <a href={iconObj.link} target="_blank" rel="noopener noreferrer">
        {iconObj.icon}
      </a>
    </li>
  ))}
</ul>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className='block md:hidden mobile-nav'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
           ? ' z-10 fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500'
            : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
        }
      >
        {/* Mobile Logo */}
        <h1 className='w-full text-2xl font-bold text-[#c5973cb8] m-4'>Innovation Cell</h1>

        {/* Mobile Navigation Items */}
            {navItems.map(item => (
        <li
          key={item.id}
          className='bg-black p-4 border-b rounded-xl hover:bg-[#c5973c] duration-300 hover:text-black cursor-pointer border-gray-600'
          onClick={() => scrollToSection(item.sectionId)}
        >
          <span>{item.text}</span>
        </li>
      ))}
      </ul>
    </div>
  );
};

export default Navbar;
