import React from 'react'
import About from './Aboutpage'
import TrendingSection from '../components/Trending Section/TrendingSection'

import Navbar from '../components/Header'

const Homepage = () => {
  return (
    <div>
      <Navbar />      
      <About />
      <TrendingSection />
    </div>
  )
}

export default Homepage