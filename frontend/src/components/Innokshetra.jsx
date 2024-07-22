import React from 'react';

function Innokshetra() {
  return (
    <div className='h-[65vh] min-w-400:h-[75vh] sm:h-[85vh] md:h-screen w-full flex items-center justify-center'>

      <div className="relative w-[95vw] h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/website-icell.png")' }}>

        {/* NIT LOGO */}
        <img src="/NIT_WHITE.png" alt="NIT LOGO"
          className='absolute h-12 w-12 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:w-28 lg:h-28 top-2  sm:top-3 left-2 md:left-4' />


        {/* IIC LOGO */}
        <img src="/IIC_White.png" alt="IIC LOGO"
          className='absolute h-10 w-10 sm:h-16 sm:w-16 md:h-20 md:w-20 top-2  sm:top-3 right-2 md:right-4' />


        {/* Center Heading */}
        <div className='absolute top-6 sm:top-7 md:top-8 w-full flex flex-col items-center'>
          <h1 className='text-md min-w-400:text-xl sm:text-2xl md:text-3xl tracking-wider'>
            INNOVATION CELL</h1>
          <h1 className='text-md min-w-400:text-xl sm:text-2xl md:text-3xl tracking-wider'>
            PRESENTS</h1>
        </div>


        {/* Title */}
        <div className='absolute top-24 sm:top-28 md:top-32 w-full flex items-center justify-center'>
          <h1 className='min-w-400:text-5xl text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold sm:font-bold md:font-extrabold transform scale-y-125'
         >
            INNOKSHETRA
          </h1>
        </div>


        {/* Register Buttons */}
        <div className='absolute left-1/2 transform -translate-x-1/2 bottom-20 sm:bottom-24 md:bottom-32 flex flex-wrap w-full max-w-[25rem] md:max-w-[30rem] justify-between'>
          <button className='h-10 w-28 min-w-400:h-10 min-w-400:w-32 sm:h-11 sm:w-36 md:h-12 md:w-40 border-2
                             border-pink-500 rounded-full bg-pink-600 bg-opacity-20 text-sm'
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
          <button className='h-10 w-28 min-w-400:h-10 min-w-400:w-32 sm:h-11 sm:w-36 md:h-12 md:w-40 border-2
                               border-pink-500 rounded-full bg-pink-600 bg-opacity-20 text-md'
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
