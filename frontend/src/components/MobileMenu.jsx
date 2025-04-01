import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const MobileMenu = ({ navItems, socialIcons }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleButtonRef = useRef(null);
  const navigate = useNavigate();

  // Toggle menu open/closed
  const toggleMenu = () => {
    setIsOpen(prevState => !prevState);
  };

  // Handle navigation item click
  const handleNavItemClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Close menu first
      setIsOpen(false);
      
      // Small delay to allow menu to close before scrolling
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  // Handle Innokshetra navigation
  const handleInnokshetraClick = () => {
    setIsOpen(false);
    
    // Small delay to allow menu to close before navigation
    setTimeout(() => {
      navigate('/innokshetra');
    }, 100);
  };

  // Control body scroll when menu opens/closes
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    // Cleanup function to ensure body scroll is restored
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle clicks outside the menu to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Don't close if clicking the toggle button
      if (toggleButtonRef.current && toggleButtonRef.current.contains(event.target)) {
        return;
      }
      
      // Close if menu is open and click is outside menu
      if (isOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Add event listener with capture phase to ensure it runs before other handlers
    document.addEventListener('mousedown', handleClickOutside, true);
    document.addEventListener('touchstart', handleClickOutside, true);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
      document.removeEventListener('touchstart', handleClickOutside, true);
    };
  }, [isOpen]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen]);

  return (
    <div className="md:hidden flex items-center z-50">
      {/* Menu Toggle Button */}
      <button
        ref={toggleButtonRef}
        onClick={toggleMenu}
        className="p-2 focus:outline-none"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <AiOutlineMenu size={25} className="text-white hover:text-amber-500 transition-colors" />
      </button>

      {/* Menu Overlay - Fixed position with transform for better performance */}
      <div 
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isOpen}
        style={{ top: 0, left: 0, right: 0, bottom: 0 }}
      >
        {/* Menu Container */}
        <div
          ref={menuRef}
          className={`fixed top-0 left-0 h-full w-[80%] max-w-sm bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out overflow-y-auto ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          style={{ height: '100vh' }}
        >
          {/* Header with close button */}
          <div className="sticky top-0 bg-gray-900 z-10 flex justify-between items-center p-5 border-b border-gray-800">
            <h2 className="text-xl font-bold text-white">
              <span className="text-amber-500">Innovation</span> Cell
            </h2>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors focus:outline-none"
              aria-label="Close menu"
            >
              <AiOutlineClose size={20} className="text-white" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="p-5">
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavItemClick(item.sectionId)}
                    className="w-full text-left py-3 pl-4 border-l-4 border-transparent hover:border-amber-500 hover:bg-gray-800/50 rounded-r-lg transition-all duration-200 focus:outline-none"
                  >
                    <span className="text-white hover:text-amber-500 transition-colors font-medium block">
                      {item.text}
                    </span>
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={handleInnokshetraClick}
                  className="w-full text-left py-3 pl-4 border-l-4 border-amber-500 bg-gray-800/50 rounded-r-lg transition-all duration-200 focus:outline-none"
                >
                  <span className="text-amber-500 font-medium block">Innokshetra</span>
                </button>
              </li>
            </ul>
          </nav>

          {/* Social Icons */}
          <div className="p-5 mt-8 border-t border-gray-800">
            <p className="text-white/80 text-sm mb-4">Connect with us:</p>
            <div className="flex flex-wrap gap-3">
              {socialIcons.map((iconObj) => (
                <a
                  key={iconObj.id}
                  href={iconObj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 rounded-full hover:bg-amber-500 transition-colors duration-200 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {iconObj.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu; 