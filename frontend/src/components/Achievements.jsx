import React from 'react';

const achievements = [
  {
    id: 1,
    count: 50,
    title: 'Events Organized',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-12 sm:w-12 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 2,
    count: 2000,
    title: 'Students Impacted',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-12 sm:w-12 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    id: 3,
    count: 25,
    title: 'Startups Incubated',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-12 sm:w-12 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    id: 4,
    count: 15,
    title: 'Awards Won',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-12 sm:w-12 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
];

const Achievements = () => {
  return (
    <section id="achievements" className="py-12 sm:py-20 bg-gray-800 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-500"></div>
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-orange-500 rounded-full opacity-10 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-block px-3 py-1 bg-amber-500/20 text-amber-500 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            Our Impact
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">Our Achievements</h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mb-4 sm:mb-6 rounded-full"></div>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base px-2">
            Over the years, Innovation Cell has achieved significant milestones in fostering innovation and entrepreneurship at NIT Kurukshetra.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 lg:p-8 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/10 border border-gray-700"
            >
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="p-3 sm:p-4 rounded-full bg-amber-500/10">
                  {achievement.icon}
                </div>
              </div>
              <div>
                <h3 className="text-3xl sm:text-4xl font-bold text-amber-500 mb-2">
                  {achievement.count}+
                </h3>
                <p className="text-gray-300 text-base sm:text-lg">{achievement.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements; 