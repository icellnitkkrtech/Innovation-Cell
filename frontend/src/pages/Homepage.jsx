import React from 'react'
import About from './Aboutpage'
import EventCard from '../components/EventCard/EventCard.jsx'

const Homepage = () => {
  return (
    <div className='bg-black'>Homepage
      <EventCard/>
      <About />
    </div>
  )
}

export default Homepage