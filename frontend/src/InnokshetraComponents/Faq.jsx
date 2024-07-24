// src/App.js
import React, { useState } from 'react';

 
  const FAQS = [
    {
      question: "What is a Hackathon?",
      answer: "A hackathon is an intense event that brings together designers and developers along with industry experts to identify problems and create software solutions, usually within 24-48 hours."
    },
    {
      question: "What is Innokshetra?",
      answer: "It is an event organized by ICELL."
    },
    {
      question: "How can I participate in a Hackathon?",
      answer: "You can participate by registering on the event's official website and following the given instructions."
    },
    {
      question: "Who can join a Hackathon?",
      answer: "Anyone with an interest in technology, coding, and problem-solving can join a hackathon."
    },
    {
      question: "What should I bring to a Hackathon?",
      answer: "Bring your laptop, chargers, and any other hardware you might need. It's also good to have a notepad and some snacks."
    },
    {
      question:"Kyu nhi ho rhi padhai?",
      answer:"hum pe to hai hi na boooks"
    },
    {
      question:"Elvish bhai ke aage koi bol sakta hai kya ",
      answer:"Salman bhai"

    }
  ];


function Faq() {
  const [visibleFAQs, setVisibleFAQs] = useState(4);
    
  const loadMore = () => {
    setVisibleFAQs(prevVisibleFAQs => prevVisibleFAQs + 2);
  };
  
  const showless =()=>{
    setVisibleFAQs(prevVisibleFAQs=>prevVisibleFAQs-2)
  };
  return (
    <div className="App">
      <style>{`
        body, html {
          margin: 0;
          padding: 0;
          width: 100%;
          font-family: Arial, sans-serif;
          background-color: black;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .App {
          text-align: center;
          color: white;
          padding: 20px;
          width: 100%;
        }

        h1 {
          color: #ff4081;
          margin-bottom: 40px;
          font-size: 2.5em;
        }

        .faq-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 1000px;
          margin: auto;
        }

        .faq-item {
          display: flex;
          align-items: flex-start;
          background: #1a1a1a;
          border: 1px solid #333;
          padding: 20px;
          margin-bottom: 20px;
          width: 100%;
        }

        .faq-index {
          font-size: 1.4em;
          font-weight: bold;
          color: #ff4081;
          margin-right: 20px;
        }

        .faq-content {
          text-align: left;
        }

        .faq-question {
          margin: 0;
          font-size: 1.2em;
          font-weight: bold;
        }

        .faq-answer {
          margin: 10px 0 0;
          font-size: 1.1em;
        }

        .load-more, .show-less {
          background: none;
          border: 1px solid  #ff4081;
           border-radius:20px;
          color: #ff4081;
          padding: 10px 20px;
         
          cursor: pointer;
          transition: background-color 0.3s, color 0.3s;
          font-size: 1.2em;
          margin: 20px ;
        }

        .load-more:hover {
          background-color: #ff4081;
          color: white;
          z-index = 10;
        }
           .show-less:hover {
          background-color: #ff4081;
          color: white;
          z-index = 10;
        }
      `}</style>
      <h1>FAQ</h1>
      <div className="faq-container">
        {FAQS.slice(0, visibleFAQs).map((faq, index) => (
          <div key={index} className="faq-item">
            <div className="faq-index">{index + 1})</div>
            <div className="faq-content">
              <p className="faq-question">{faq.question}</p>
              <p className="faq-answer">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
      {visibleFAQs < FAQS.length && (
        <button className="load-more" onClick={loadMore}>
          LOAD MORE
        </button> 
      )}
       {visibleFAQs > 4 && (
        <button className="show-less" onClick={showless}>SHOW LESS</button>
       )}
    </div>
  );
}

export default Faq;
