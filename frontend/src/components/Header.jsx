import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import Logo from './Logo';

const Navbar = () => {
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  // Array containing navigation items
  const navItems = [
    { id: 1, text: 'Home' },
    { id: 2, text: 'Company' },
    { id: 3, text: 'Resources' },
    { id: 4, text: 'About' },
    { id: 5, text: 'Contact' },
  ];

  // Array containing social icons and links
  const socialIcons = [
    { id: 1, icon: 'https://img.icons8.com/ios-glyphs/30/facebook-new.png', link: 'https://facebook.com' },
    { id: 2, icon: 'https://img.icons8.com/ios-glyphs/30/twitter.png', link: 'https://twitter.com' },
    { id: 3, icon: 'https://img.icons8.com/ios-glyphs/30/instagram-new.png', link: 'https://instagram.com' },
  ];

  return (
    <div className='bg-black flex justify-between items-center h-20 mx-auto px-8 m text-white z-999'>
     <Logo />
      {/* <h1 className='w-full text-3xl font-bold text-[#00df9a]'>REACT.</h1> */}

      {/* Desktop Navigation */}
      <ul className='hidden md:flex border-white rounded-3xl border-2 px-2'>
        {navItems.map(item => (
          <li
            key={item.id}
            className='p-4'
          >
            {item.text}
          </li>
        ))}
      </ul>

      {/* Social Icons */}
      <ul className='hidden bg-white  md:flex border-white rounded-lg border-2 p-0'>
        {socialIcons.map(icon => (
          <li
            key={icon.id}
            className='p-4 '
          >
            <a href={icon.link}>
              <img className='h-8 w-8' src={icon.icon} alt={icon.link}/>
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className='block md:hidden'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? 'fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500'
            : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
        }
      >
        {/* Mobile Logo */}
        <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>REACT.</h1>

        {/* Mobile Navigation Items */}
        {navItems.map(item => (
          <li
            key={item.id}
            className='p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600'
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;

