import React from 'react'

const AboutUs = () => {
  return (
    <section id="about" className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 bg-amber-500/20 text-amber-500 rounded-full text-sm font-semibold mb-4">
            About Us
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Who We Are</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mb-6 rounded-full"></div>
        </div>

        {/* Main content */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Image section - responsive sizing */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <div className="relative">
              <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="/about-image.jpg" 
                  alt="Innovation Cell Team" 
                  className="w-full h-auto"
                  onError={(e) => {
                    e.target.src = '/IIC_Logo.png';
                    e.target.className = "max-w-[250px] mx-auto py-8";
                  }}
                />
              </div>
              {/* Decorative elements - hidden on small screens */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-amber-500 rounded-full opacity-20 blur-xl hidden sm:block"></div>
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-orange-500 rounded-full opacity-20 blur-xl hidden sm:block"></div>
              <div className="absolute top-1/2 -translate-y-1/2 -left-2 w-4 h-20 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full hidden lg:block"></div>
            </div>
          </div>

          {/* Text content */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Innovation Cell, NIT Kurukshetra</h3>
            <p className="text-gray-300 mb-6 text-base sm:text-lg">
              Innovation Cell is a student-driven official technical society of NIT Kurukshetra, affiliated with the Institute's Innovation Council (IIC), an initiative by the Ministry of Education (MoE) to foster a vibrant innovation ecosystem within our college.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">Our Mission</h4>
                  <p className="text-gray-300 text-sm sm:text-base">To cultivate an innovation-driven environment that empowers students to develop solutions for real-world problems.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">Our Vision</h4>
                  <p className="text-gray-300 text-sm sm:text-base">To become a leading innovation hub that transforms creative ideas into impactful solutions and nurtures future entrepreneurs.</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <a href="#team" className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-full shadow-lg hover:shadow-amber-500/20 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
                Meet Our Team
              </a>
              <a href="#events" className="px-6 py-3 border border-amber-500 text-amber-500 font-bold rounded-full hover:bg-amber-500/10 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
                Our Events
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutUs
