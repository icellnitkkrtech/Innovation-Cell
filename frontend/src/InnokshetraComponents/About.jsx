import React, { useRef } from 'react';
import './About.css';

const About = () => {
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);

  const handleLoadedData1 = () => {
    videoRef1.current.play();
  };
  const handleLoadedData2 = () => {
    videoRef2.current.play();
  };

  return (
    <div>
      <section className="about-section">
      <div className="content-container">
        <h1 className="heading-about">
          <span className="highlight">ABOUT <br />INSTITUTE</span>
        </h1>
        <div className="text-container-about">
          <p>
          National Institute of Technology, Kurukshetra is a
          deemed university that was established in 1963 as
          REC (Regional Engineering College). In 2007, the
          university was conferred the premium status of
          Institute of National Importance. It is one of the top
          institutes in the field of technical education. With a
          world class faculty and dedicated students, the
          quest for excellence is perennial. This desire for
          excellence is not just limited to academics. At NIT,
          students indulge in a large number of technical,
          managerial as well as cultural events that nurture
          their talent and provide them with a platform for
          overall personality development. 'INNOKSHETRA' is
          one of such platforms to foster innovation in NIT
          Kurukshetra.
          </p>
        </div>
      </div>
      <div className="video-container-about">
        <video
          ref={videoRef1}
          width="100%"
          height="auto"
          loop
          muted
          playsInline
          style={{ display: 'block' }}
          onLoadedData={handleLoadedData1}>
           <source src='./animationLogo/video2.mp4' type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
    <section className="about-section">
      <div className="video-container-about">
        <video
          ref={videoRef2}
          width="100%"
          height="auto"
          loop
          muted
          playsInline
          style={{ display: 'block' }}
          onLoadedData={handleLoadedData2}>
           <source src='./animationLogo/video1.mp4' type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="content-container">
        <h1 className="heading-about">
          <span className="highlight1">ABOUT <br />INNOKSHETRA</span>
        </h1>
        <div className="text-container-about">
          <p>
          NIT Kurukshetra ignites innovation with its 1st
          national event, InnoKshetra! This unique name
          combines "Innovation" and "Kurukshetra,
          "the
          legendary battlefield, symbolizing a new arena
          for groundbreaking ideas. InnoKshetra is hosting
          several exciting competitions, inspiring guest
          lectures, and practical workshops - all designed
          to inspire and empower young minds to be the
          future's changemakers.
          </p>
        </div>
      </div>
    </section>
    </div>
    
  );
};

export default About;