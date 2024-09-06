import React from "react";
import style from "./verticalTimeline.module.css";
import wk from "./images/wk.jpg";
import hack from "./images/hack.jpg";
import speaker from "./images/speaker.jpg";
import end from "./images/end.jpg";
import * as THREE from "three";
import RINGS from "vanta/dist/vanta.rings.min";
import { useEffect } from "react";
const events = [
  {
    title: "Workshop",
    time: "10AM - 12PM",
    day: "14th SEP 2024",
    backgroundColor: "#FFDDC1",
    number: "1st",
    imgSrc: hack,
    description:
      "FEST INTRO + IDEATION WORKSHOP",
    classD: "leftContainer",
    arrow: "leftContainerArray",
  },
  {
    title: "HACKATHON",
    time: "4PM - 12AM",
    day: "14th SEP 2024",
    backgroundColor: "#FFABAB",
    number: "2nd",
    imgSrc: wk,
    description:
      "A workshop focusing on key skills and tools necessary for the hackathon. Learn from industry experts.",
    classD: "rightContainer",
    arrow: "rightContainerArray",
  },
  {
    title: "HACKATHON (ROUND-2)",
    time: "9PM - 12AM",
    day: "Wed,Apr 04",
    backgroundColor: "#FFC3A0",
    number: "3rd",
    imgSrc: hack,
    description:
      "Round-2 of the hackathon where teams continue working on their projects and refine their ideas.",
    classD: "leftContainer",
    arrow: "leftContainerArray",
  },
  {
    title: "HACKATHON (ROUND-3)",
    time: "1AM - 10AM",
    day: "Wed,Apr 05",
    backgroundColor: "#B9FBC0",
    number: "4th",
    imgSrc: hack,
    description:
      "Final round of the hackathon. Teams present their prototypes and finalize their projects.",
    classD: "rightContainer",
    arrow: "rightContainerArray",
  },
  {
    title: "SPEAKER SESSION-1",
    time: "10AM - 1PM",
    day: "Wed,Apr 05",
    backgroundColor: "#A0E7E5",
    number: "5th",
    imgSrc: speaker,
    description:
      "Engaging speaker session covering trends and insights in technology and innovation.",
    classD: "leftContainer",
    arrow: "leftContainerArray",
  },
  {
    title: "HACKATHON (ROUND-4)",
    time: "2PM - 5PM",
    day: "Wed,Apr 05",
    backgroundColor: "#B9FBC0",
    number: "6th",
    imgSrc: hack,
    description:
      "Final chance for teams to make last-minute adjustments to their projects before submission.",
    classD: "rightContainer",
    arrow: "rightContainerArray",
  },
  {
    title: "WORKSHOP 2",
    time: "9AM - 11AM",
    day: "Wed,Apr 06",
    backgroundColor: "#C4E538",
    imgSrc: wk,
    number: "7th",
    description:
      "A follow-up workshop focusing on advanced topics and further skill development.",
    classD: "leftContainer",
    arrow: "leftContainerArray",
  },
  {
    title: "SPEAKER SESSION 2",
    time: "11AM - 1PM",
    day: "Wed,Apr 06",
    backgroundColor: "#3A86FF",
    imgSrc: speaker,
    number: "8th",
    description:
      "Another insightful speaker session with industry leaders sharing their experiences and knowledge.",
    classD: "rightContainer",
    arrow: "rightContainerArray",
  },
  {
    title: "VALEDICTORY",
    time: "3PM - 6PM",
    day: "Wed,Apr 06",
    backgroundColor: "#F9A825",
    imgSrc: end,
    number: "9th",
    description:
      "The closing ceremony of the event where winners are announced, and achievements are celebrated.",
    classD: "leftContainer",
    arrow: "leftContainerArray",
  },
];
const VerticalTimeline = () => {
  useEffect(() => {
    let effect;
    try {
      effect = RINGS({
        el: "#bg",
        THREE: THREE,
        color: 0x000000,
        speed: 0.7,
        turbulence: 1,
        amplitude: 0.3,
      });
    } catch (error) {
      console.error("Error initializing Vanta.js RINGS:", error);
    }

    return () => {
      if (effect) effect.destroy();
    };
  }, []);
  return (
    <>
    
    <div className=""
        style={{
          fontSize: "4rem",
          textAlign: "center",
          color: "#FF69B4",
          fontWeight: "lighter",
        }
        

      }
      >
        Event Timeline
      </div>
      <div className={style.timeline} id="bg">

        {events.map((event) => (
          <div className={`${style.container} ${style[event.classD]}`}>
            <img src={event.imgSrc} alt="error" />
            <div className={style.textBox}>
              <h2>{event.title}</h2>
              <small>
                {event.day} ,{event.time}
              </small>
              <p>{event.description}</p>

              <span className={style[event.arrow]}></span>
            </div>
          </div>
        ))}
      </div>
     
    </>
  );
};

export default VerticalTimeline;
