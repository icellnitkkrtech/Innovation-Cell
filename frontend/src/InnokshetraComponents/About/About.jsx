import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about">
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
        </section>
        <section className="about-section">
          <div className="content-container">
            <h1 className="heading-about">
              <span className="highlight1">ABOUT <br />INNOKSHETRA</span>
            </h1>
            <div className="text-container-about">
              <p>
                NIT Kurukshetra ignites innovation with its 1st
                national event, InnoKshetra! This unique name
                combines "Innovation" and "Kurukshetra," the
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
    </section>
  );
};

export default About;
