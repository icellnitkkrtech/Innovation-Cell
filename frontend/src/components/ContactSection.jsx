import React, { useState, useEffect } from 'react';

function ContactSection() {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Get user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );
  }, [])

  return (
    <section id="contact" className="text-gray-600 body-font relative m-8 border-zinc-800 rounded-lg">
       {userLocation && (
        <div 
        className="absolute inset-0 bg-gray-300"
        style={{ width: '100%' }}>
          <iframe
            title="map"
            width="100%"
            height="100%"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            scrolling="no"
            src={`https://maps.google.com/maps?q=NIT%20Kurukshetra,%20Kurukshetra,%20136119,%20Haryana,%20India&z=14&output=embed`}
          ></iframe>
        </div>
      )}
      <div className="container px-5 py-24 mx-auto flex">
        <form className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
          <h2 className="text-gray-900 text-lg mb-1 font-medium title-font capitalize">
            CONTACT US
          </h2>
          <label htmlFor="user_name" className="leading-7 text-sm text-gray-600">
            Name
          </label>
          <input
            type="text"
            id="user_name"
            name="user_name"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
          <label htmlFor="user_email" className="leading-7 text-sm text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="user_email"
            name="user_email"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
          <label htmlFor="message" className="leading-7 text-sm text-gray-600">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
          ></textarea>
          <input
            type="submit"
            value="Send"
            className="text-white bg-[orange] border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-4"
          />
          <p className="text-xs text-gray-500 mt-3">
            
          </p>
        </form>
      </div>
     
    </section>
  );
}

export default ContactSection;
