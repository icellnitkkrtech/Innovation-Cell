import React from 'react'
import About from './Aboutpage'
import EventCard from '../components/EventCard/EventCard.jsx'
import TrendingSection from '../components/Trending Section/TrendingSection'
import Navbar from '../components/Header'

const Homepage = () => {
  return (
    <div className='bg-black'>Homepage
      <Navbar />  
      <EventCard/>
      <About/>
      <TrendingSection />
    </div>
  )
}

export default Homepage