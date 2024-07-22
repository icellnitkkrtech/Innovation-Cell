import React from 'react'

import {About,Faq,Footer,Hero,Navbar,Rules,Speakers, Sponsors,Workshops,Glance, EventTimeline} from "../InnokshetraComponents/index.js";
function InnokshetraPage() {
  return (
    <> 
    <Navbar />
    <Hero />
    <About />
    <Glance />
    <EventTimeline />
    <Speakers />
    <Workshops />
    <Rules />
    <Sponsors />
    <Faq />
    <Footer />
    </>
   
    
  )
}

export default InnokshetraPage