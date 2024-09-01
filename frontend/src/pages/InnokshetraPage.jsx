import React from 'react'

import { About, Faq, Footer, Hero, Navbar, Rules, Speakers, Sponsors, Workshops, Glance, EventTimeline, VerticalTimeline } from "../InnokshetraComponents/index.js";
function InnokshetraPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Glance />
      <Speakers />
      <Workshops />
      {/* <EventTimeline /> */}
      <div id="bg-timeline">
      <VerticalTimeline />
    </div>
      <Rules />
      {/* <Sponsors /> */}
      <Faq />
      <Footer />
    </>


  )
}

export default InnokshetraPage