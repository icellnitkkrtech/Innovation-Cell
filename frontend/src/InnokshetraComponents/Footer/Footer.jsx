import React from "react";

const Footer = () => {
  return (
    <div className='bg-slate-900 text-white py-8' id="contact">
      <hr className='border-t-2 border-cyan-700 mb-8' />
      <div className='text-center mb-8'>
        <h1 className='text-5xl md:text-7xl text-cyan-400 text-center font-extrabold leading-tight mb-12'>
          FOLLOW US
        </h1>
        <div className='flex justify-center space-x-6'>
          <a href='https://www.instagram.com/icell.nitkkr?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' className='hover:opacity-75'>
            <img src='.\footerhero\icons8-instagram-24.png' alt="Instagram" className='w-10 h-10'/>
          </a> 
          <a href='https://www.linkedin.com/company/icell-nitkkr/' className='hover:opacity-75'>
            <img src='.\footerhero\icons8-linkedin-24.png' alt="LinkedIn" className='w-10 h-10'/>
          </a>
          <a href='https://twitter.com/' className='hover:opacity-75'>
            <img src='.\footerhero\icons8-twitter-48.png' alt="Twitter" className='w-10 h-10'/>
          </a>
        </div>
      </div>
      <div className='flex flex-col md:flex-row justify-between items-center mx-4 mb-8'>
        <div className='text-center'>
          <h3 className='text-xl font-light text-cyan-400 mb-2'>INNOVATION CELL</h3>
          <h3 className='text-xl font-light text-cyan-400 mb-2'>NIT KURUKSHETRA</h3>
          <h3 className='text-xl font-light text-cyan-400 mb-2'>inno_incub@nitkkr.ac.in</h3>
          <h3 className='text-xl font-light text-cyan-400'>9050614615</h3>
        </div>
        <div className='my-4'>
          <img src='./footerhero/logo.jpeg' alt="Innovation Cell Logo" className='w-24'/>
        </div>
      </div>
      <p className='text-center text-cyan-400 text-lg italic'>
        Made with ❤ by Innovation Cell
      </p>
    </div>
  );
};

export default Footer;
