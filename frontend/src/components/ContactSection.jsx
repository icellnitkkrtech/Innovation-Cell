import React, { useState, useEffect } from 'react';

function ContactSection() {
  const [userLocation, setUserLocation] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

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

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className="text-gray-300 body-font relative my-16 rounded-xl overflow-hidden shadow-lg bg-gray-800">
      {userLocation && (
        <div 
          className="absolute inset-0 bg-gray-300"
          style={{ width: '100%' }}>
          <iframe
            width="100%"
            height="100%"
            title="map"
            className="absolute inset-0"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            scrolling="no"
            src={`https://maps.google.com/maps?width=100%&height=600&hl=en&q=${userLocation.lat},${userLocation.lng}&ie=UTF8&t=&z=14&iwloc=B&output=embed`}
          ></iframe>
        </div>
      )}
      <div className="container px-5 py-24 mx-auto flex">
        <div className="lg:w-1/3 md:w-1/2 bg-gray-900 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
          <h2 className="text-white text-lg mb-1 font-medium title-font">Contact Us</h2>
          <p className="leading-relaxed mb-5 text-gray-400">
            Have questions or want to collaborate? Reach out to us!
          </p>
          <form onSubmit={handleSubmit}>
            <div className="relative mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-gray-400">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-gray-800 rounded border border-gray-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/50 text-base outline-none text-gray-300 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label htmlFor="email" className="leading-7 text-sm text-gray-400">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-gray-800 rounded border border-gray-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/50 text-base outline-none text-gray-300 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label htmlFor="message" className="leading-7 text-sm text-gray-400">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-gray-800 rounded border border-gray-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/50 h-32 text-base outline-none text-gray-300 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
              ></textarea>
            </div>
            <button
              type="submit"
              className="text-white bg-gradient-to-r from-amber-500 to-orange-500 border-0 py-3 px-6 focus:outline-none hover:from-amber-600 hover:to-orange-600 rounded-lg text-lg transition-all duration-300"
            >
              Send Message
            </button>
            <p className="text-xs text-gray-500 mt-3">
              We'll get back to you as soon as possible.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
