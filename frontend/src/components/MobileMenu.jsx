import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const MobileMenu = ({ navItems, socialIcons }) => {
  const [nav, setNav] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const handleNav = () => {
    setNav(!nav);
    // Toggle body scroll when menu is open/closed
    document.body.style.overflow = nav ? 'auto' : 'hidden';
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setNav(false);
      document.body.style.overflow = 'auto';
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && nav) {
        setNav(false);
        document.body.style.overflow = 'auto';
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [nav]);

  return (
    <div className="md:hidden flex items-center z-50">
      {/* Hamburger Icon */}
      <div onClick={handleNav} className="cursor-pointer">
        <AiOutlineMenu size={25} className="text-white hover:text-amber-500 transition-colors" />
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={
          nav
            ? 'fixed left-0 top-0 w-full h-full bg-black/70 backdrop-blur-sm z-50 transition-all duration-300 ease-in-out'
            : 'fixed left-[-100%] top-0 w-full h-full z-50 transition-all duration-300 ease-in-out'
        }
      >
        {/* Menu Content */}
        <div
          ref={menuRef}
          className={
            nav
              ? 'fixed left-0 top-0 w-[75%] sm:w-[60%] h-full bg-gradient-to-b from-gray-900 to-gray-800 p-6 ease-in duration-300'
              : 'fixed left-[-100%] top-0 p-6 ease-in duration-300'
          }
        >
          {/* Menu Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="w-32">
              <img src="/IIC_Logo.png" alt="Innovation Cell Logo" />
            </div>
            <div
              onClick={handleNav}
              className="p-3 rounded-full bg-gray-800 cursor-pointer hover:bg-gray-700 transition-colors"
            >
              <AiOutlineClose size={20} className="text-white" />
            </div>
          </div>

          {/* Menu Description */}
          <div className="border-b border-gray-700 pb-4 mb-6">
            <p className="text-white/80 text-sm">
              Innovation Cell - The official technical society of NIT Kurukshetra
            </p>
          </div>

          {/* Navigation Items */}
          <nav>
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li
                  key={item.id}
                  onClick={() => scrollToSection(item.sectionId)}
                  className="py-3 pl-4 border-l-4 border-transparent hover:border-amber-500 hover:bg-gray-800/50 rounded-r-lg transition-all duration-300 cursor-pointer"
                >
                  <span className="text-white hover:text-amber-500 transition-colors font-medium">
                    {item.text}
                  </span>
                </li>
              ))}
              <li
                onClick={() => {
                  navigate('/innokshetra');
                  setNav(false);
                  document.body.style.overflow = 'auto';
                }}
                className="py-3 pl-4 border-l-4 border-amber-500 bg-gray-800/50 rounded-r-lg transition-all duration-300 cursor-pointer"
              >
                <span className="text-amber-500 font-medium">Innokshetra</span>
              </li>
            </ul>
          </nav>

          {/* Social Icons */}
          <div className="absolute bottom-6 left-0 w-full px-6">
            <div className="border-t border-gray-700 pt-6">
              <p className="text-white/80 text-sm mb-4">Connect with us:</p>
              <div className="flex space-x-4">
                {socialIcons.map((iconObj) => (
                  <a
                    key={iconObj.id}
                    href={iconObj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-800 rounded-full hover:bg-amber-500 transition-colors duration-300 text-white"
                  >
                    {iconObj.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu; 