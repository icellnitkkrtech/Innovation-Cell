import React from 'react';

function Innokshetra() {
  return (
    <div className='h-screen w-full flex items-center justify-center'>

      <div className="relative w-[95vw] h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/website-icell.png")' }}>

        {/* NIT LOGO */}
        <img src="/NIT_WHITE.png" alt="NIT LOGO"
          className='absolute h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 top-4 left-2 sm:left-8 md:left-16' />


        {/* IIC LOGO */}
        <img src="/IIC_White.png" alt="IIC LOGO"
          className='absolute h-16 w-16 sm:h-20 sm:w-20 top-4 right-2 sm:right-8 md:right-16' />


        {/* Center Heading */}
        <div className='absolute top-4 sm:top-6 md:top-8 w-full flex flex-col items-center'>
          <h1 className='text-xl sm:text-2xl md:text-3xl tracking-wider'>
            INNOVATION CELL</h1>
          <h1 className='text-xl sm:text-2xl md:text-3xl tracking-wider'>
            PRESENTS</h1>
        </div>


        {/* Title */}
        <div className='absolute top-20 sm:top-24 md:top-32 w-full flex items-center justify-center'>
          <h1 className='text-4xl sm:text-6xl md:text-8xl sm:font-bold md:font-extrabold transform scale-y-125'>
            INNOKSHETRA
          </h1>
        </div>


        {/* Register Buttons */}
        <div className='absolute left-1/2 transform -translate-x-1/2 bottom-20 sm:bottom-24 md:bottom-32 flex w-full max-w-[30rem] justify-between'>
          <button className='h-10 w-32 sm:h-11 sm:w-36 md:h-12 md:w-40 border-2 border-pink-500 rounded-full bg-pink-600 bg-opacity-20 text-white'
            style={{
              backdropFilter: 'blur(5px)',
              transition: 'box-shadow 0.3s ease-in-out',
            }}
            onMouseOver={(evt) => {
              evt.target.style.boxShadow = '0 0 15px 5px rgba(236, 72, 153, 0.5)';
            }}
            onMouseOut={(evt) => {
              evt.target.style.boxShadow = "none";
            }}>
            REGISTER NOW
          </button>

              {/* Visit Buttons */}
          <button className='h-10 w-32 sm:h-11 sm:w-36 md:h-12 md:w-40 border-2 border-pink-500 rounded-full bg-pink-600 bg-opacity-20 text-white'
            style={{
              backdropFilter: 'blur(5px)',
              transition: 'box-shadow 0.3s ease-in-out',
            }}
            onMouseOver={(evt) => {
              evt.target.style.boxShadow = '0 0 15px 5px rgba(236, 72, 153, 0.5)';
            }}
            onMouseOut={(evt) => {
              evt.target.style.boxShadow = "none";
            }}>
            VISIT WEBSITE
          </button>
        </div>
      </div>
    </div>
  );
}

export default Innokshetra;
