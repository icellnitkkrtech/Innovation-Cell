import React from 'react'
import About from '../components/AboutUs/AboutUs.jsx'
import EventCard from '../components/EventCard/EventCard.jsx'
import TrendingSection from '../components/Trending Section/TrendingSection'
import Navbar from '../components/Header'
import Teamcard1 from '../components/teamcard/Teamcard1.jsx'
import Contact from '../components/contact.jsx'
import AKTeamCard from '../components/teamcard/AKTeamCard.jsx'
import AKTrendingSection from '../components/Trending Section/AKTrendingSection.jsx'
import Footer from '../components/Footer.jsx'
import Hero from '../components/Hero.jsx'
import ContactSection from '../components/ContactSection.jsx'
import Innokshetra from '../components/Innokshetra.jsx'

const Homepage = () => {
  return (
    <div className='bg-black'>
      <Navbar />
      <Hero />
      <Innokshetra />
      <EventCard />
      <Teamcard1 />
      <About />
      <ContactSection />
      <Footer />
    </div>
  )
}

export default Homepage