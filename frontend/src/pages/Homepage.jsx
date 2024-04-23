import React from 'react'
import About from '../components/AboutUs/AboutUs.jsx'
import EventCard from '../components/EventCard/EventCard.jsx'
import TrendingSection from '../components/Trending Section/TrendingSection'
import Navbar from '../components/Header'
import Teamcard1 from '../components/teamcard/Teamcard1.jsx'
import Contact from '../components/contact.jsx'

const Homepage = () => {
  return (
    <div className='bg-black'>
      <Navbar />
      <EventCard/>
      <About/>
      <TrendingSection />
      <Teamcard1 />
    </div>
  )
}

export default Homepage