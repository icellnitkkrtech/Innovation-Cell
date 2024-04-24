// Footer.js

import React from 'react';
import { FaHeart } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 text-center">
      <p className="text-sm">
        Made with  <FaHeart className="text-red-500 inline-block" /> by <span className="font-bold">Innovation Cell</span>
      </p>
    </footer>
  );
}

export default Footer;
