import React from 'react'
import About from './Aboutpage'
import EventCard from '../components/EventCard/EventCard.jsx'
import TrendingSection from '../components/Trending Section/TrendingSection'
import Navbar from '../components/Header'
import TeamCard from '../components/teamcard/teamcard.jsx'

const Homepage = () => {
  return (
    <div className='bg-black'>
      <Navbar />  
      <EventCard/>
      <About/>
      <TrendingSection />
      <TeamCard />
      
    </div>
  )
}

export default Homepage