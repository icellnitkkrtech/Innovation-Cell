import React from 'react';

function Glance() {
  return (
    <section id="glance">
    <div className="bg-black min-h-screen w-full py-2">
      <h1 className="text-5xl md:text-7xl text-[#fe7189ea] text-center font-light leading-tight mb-10">INNOKSHETRA AT A GLANCE</h1>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <img src="\DSC_0030.jpg" alt="Event Image 1" className="w-full h-48 object-cover" />
          <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg">
            <p className="text-base md:text-lg font-medium text-center">10000+ Footfalls<br/>3000+ Participants</p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <img src="\DSC_7193.jpg" alt="Event Image 2" className="w-full h-48 object-cover" />
          <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg">
            <p className="text-base md:text-lg font-medium text-center">1,50,000+<br/>Alumni Network</p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <img src="\DSC_9983.jpg" alt="Event Image 3" className="w-full h-48 object-cover" />
          <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg">
            <p className="text-base md:text-lg font-medium text-center">Publicity in over<br/>20+ colleges</p>
          </div>
        </div>
        
      </div>
    </div>
    </section>
  );
}

export default Glance;
