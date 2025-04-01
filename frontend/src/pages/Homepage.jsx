import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import About from '../components/AboutUs/AboutUs.jsx'
import EventCard from '../components/EventCard/EventCard.jsx'
import Navbar from '../components/Header'
import Teamcard1 from '../components/teamcard/Teamcard1.jsx'
import Footer from '../components/Footer.jsx'
import Hero from '../components/Hero.jsx'
import ContactSection from '../components/ContactSection.jsx'
import Innokshetra from '../components/Innokshetra.jsx'
import Testimonials from '../components/Testimonials.jsx'
import Achievements from '../components/Achievements.jsx'
import FAQ from '../components/FAQ.jsx'
import CallToAction from '../components/CallToAction.jsx'

const Homepage = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <div className='bg-gray-900 text-white min-h-screen'>
      <Navbar />
      
      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <Hero />
      </motion.div>
      
      {/* Innokshetra Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <Innokshetra />
      </motion.div>
      
      {/* About Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <About />
      </motion.div>
      
      {/* Achievements Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <Achievements />
      </motion.div>
      
      {/* Team Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <Teamcard1 />
      </motion.div>
      
      {/* Events Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Upcoming Events
              </h2>
              <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-300">
                Join us for exciting events and opportunities to connect with alumni and industry professionals.
              </p>
            </div>
            <EventCard />
            <div className="mt-10 text-center">
              <Link 
                to="/events" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
              >
                View All Events
                <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Testimonials Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <Testimonials />
      </motion.div>
      
      {/* FAQ Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <FAQ />
      </motion.div>
      
      {/* Call to Action Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <CallToAction />
      </motion.div>
      
      {/* Contact Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <ContactSection />
      </motion.div>
      
      {/* Authentication Buttons (for non-logged in users) */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
        className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-8">
            Join Our Alumni Network
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/login" 
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-amber-600 bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-10"
            >
              Sign In
            </Link>
            <Link 
              to="/register" 
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 md:py-4 md:text-lg md:px-10"
            >
              Register
            </Link>
          </div>
        </div>
      </motion.div>
      
      <Footer />
    </div>
  )
}

export default Homepage