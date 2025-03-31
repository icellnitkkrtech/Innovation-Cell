import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import Logo from './Logo';
import MobileMenu from './MobileMenu';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  // Navigation items
  const navItems = [
    { id: 1, text: 'Home', sectionId: 'home' },
    { id: 2, text: 'About', sectionId: 'about' },
    { id: 3, text: 'Events', sectionId: 'events' },
    { id: 4, text: 'Team', sectionId: 'team' },
    { id: 5, text: 'Contact', sectionId: 'contact' },
  ];

  // Social media icons
  const socialIcons = [
    { id: 1, icon: <FaFacebook />, link: 'https://facebook.com' },
    { id: 2, icon: <FaTwitter />, link: 'https://twitter.com' },
    { id: 3, icon: <FaInstagram />, link: 'https://instagram.com' },
    { id: 4, icon: <FaLinkedin />, link: 'https://linkedin.com' },
    { id: 5, icon: <FaYoutube />, link: 'https://youtube.com' },
  ];

  // Scroll to section function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Change header background on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed w-full z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-gray-900/95 backdrop-blur-md shadow-lg py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className='flex justify-between items-center h-16 max-w-[1240px] mx-auto px-4 text-white'>
        {/* Logo */}
        <div className="cursor-pointer" onClick={() => scrollToSection('home')}>
          <Logo />
        </div>

        {/* Desktop Navigation */}
        <ul className='hidden md:flex gap-3'>
          {navItems.map(item => (
            <li 
              key={item.id} 
              className='px-4 py-2 hover:bg-gradient-to-r from-amber-500 to-orange-500 rounded-md cursor-pointer transition-all duration-300 transform hover:scale-95 hover:text-black'
            >
              <span onClick={() => scrollToSection(item.sectionId)}>{item.text}</span>
            </li>
          ))}
          <li className='px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-black rounded-md cursor-pointer transition-all duration-300 transform hover:scale-95 hover:opacity-90'>
            <span onClick={()=> navigate("/innokshetra")}>Innokshetra</span>
          </li>
        </ul>

        {/* Social Icons - Desktop */}
        <ul className='hidden md:flex items-center gap-2 social-icons'>
          {socialIcons.map(iconObj => (
            <li
              key={iconObj.id}
              className='p-2 cursor-pointer hover:text-amber-500 transition-colors duration-300'
            >
              <a href={iconObj.link} target="_blank" rel="noopener noreferrer">
                {iconObj.icon}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu */}
        <MobileMenu navItems={navItems} socialIcons={socialIcons} />
      </div>
    </div>
  );
};

export default Header;
