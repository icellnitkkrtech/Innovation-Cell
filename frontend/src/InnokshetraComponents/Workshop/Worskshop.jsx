import React from 'react';
import './Workshop.css';
import Workshopcard from './Workshopcard.jsx';
import Workshopcard_reverse from './Workshopcard_reverse.jsx';

function Workshop() {
  return (
    <div className='workshop'>
      <h1 className='text-5xl md:text-7xl text-cyan-400 text-center font-extrabold leading-tight mb-12'>WORKSHOPS</h1>
      <div className='card2'>
        <Workshopcard 
          name='FINANCE WORKSHOP' 
          description='This workshop demystifies key terms, exchange functions, & investment types. Explore financial and technical analysis using statements, ratios, charts, & indicators. We will guide you on choosing a brokerage executing trades and building a portfolio.' 
          image='\src\assets\image16.png' 
        />
      </div>
      <br />
      <div className='card2'>
        <Workshopcard_reverse 
          name='INNOVATION WORKSHOP' 
          description='This innovation workshop tackles societal challenges. Participants will identify pressing issues and delve deep using analytical tools Through brainstorming and collaborative problem-solving, attendees will generate creative solutions to make a positive impact.' 
          image='\src\assets\image15.png' 
        />
      </div>
    </div>
  );
}

export default Workshop;
