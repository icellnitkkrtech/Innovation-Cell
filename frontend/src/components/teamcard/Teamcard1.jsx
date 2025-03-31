import React from "react";
import { motion } from "framer-motion";
import { teamMembers } from "./teamData.js";

// Remove the import for the placeholder image
// import placeholderImage from "/images/placeholders/team-placeholder.jpg";

const Teamcard1 = () => {
  // Function to handle image loading errors
  const handleImageError = (e) => {
    e.target.onerror = null; // Prevent infinite loop
    
    // Use a data URI as fallback (a simple gray background with text)
    e.target.src = "data:image/svg+xml;charset=UTF-8,%3csvg width='400' height='400' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='400' height='400' fill='%234B5563'/%3e%3ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='%23E5E7EB' text-anchor='middle' dominant-baseline='middle'%3eTeam Member%3c/text%3e%3c/svg%3e";
  };

  return (
    <section className="py-12 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Meet Our Team
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-300 sm:mt-4">
            Dedicated individuals working together to build a stronger alumni network.
          </p>
        </div>
        
        <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              whileHover={{ y: -10 }}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
            >
              <img 
                className="w-full h-64 object-cover object-center" 
                src={member.image} 
                alt={member.name} 
                onError={handleImageError}
              />
              <div className="p-6">
                <h3 className="text-lg font-medium text-white">{member.name}</h3>
                <p className="text-amber-500 mb-2">{member.role}</p>
                <p className="text-gray-400 mb-4">{member.bio}</p>
                <div className="flex space-x-4">
                  {member.social.linkedin && (
                    <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                      <span className="sr-only">LinkedIn</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                  )}
                  {/* Other social links */}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Teamcard1;
