import React from 'react';

function Glance() {
  return (
    <section id="glance">
      <div className="bg-slate-900 min-h-screen w-full py-12">
        <h1 className="text-5xl md:text-7xl text-cyan-400 text-center font-extrabold leading-tight mb-12">
          INNOKSHETRA AT A GLANCE
        </h1>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          
          <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden border border-cyan-700">
            <img src="\DSC_0030.jpg" alt="Event Image 1" className="w-full h-48 object-cover" />
            <div className="p-6 bg-gray-900 text-cyan-400">
              <p className="text-base md:text-lg font-medium text-center">
                10000+ Footfalls<br/>3000+ Participants
              </p>
            </div>
          </div>

          <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden border border-cyan-700">
            <img src="\DSC_7193.jpg" alt="Event Image 2" className="w-full h-48 object-cover" />
            <div className="p-6 bg-gray-900 text-cyan-400">
              <p className="text-base md:text-lg font-medium text-center">
                1,50,000+<br/>Alumni Network
              </p>
            </div>
          </div>

          <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden border border-cyan-700">
            <img src="\DSC_9983.jpg" alt="Event Image 3" className="w-full h-48 object-cover" />
            <div className="p-6 bg-gray-900 text-cyan-400">
              <p className="text-base md:text-lg font-medium text-center">
                Publicity in over<br/>20+ colleges
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

export default Glance;
