import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./about.css";

function About() {

    const features = [
        {
            title: 'Vision',
            description: 'Our vision at the Innovation Cell is to be the driving force behind a vibrant ecosystem of creativity, entrepreneurship, and financial literacy. We aim to inspire and empower students to innovate, launch startups, and excel in their chosen fields. We strive to create a dynamic community that fosters growth, collaboration, and sustainable success through robust financial knowledge'
        },
        {
            title: 'Values',
            description: 'At Innovation Cell, our values shape our community and drive our mission. We stand for innovation, fostering creativity and embracing new ideas. Entrepreneurship is at our core, encouraging initiative and risk-taking. We believe in collaboration, promoting teamwork and shared learning. Lastly, we value financial literacy, providing education and resources for informed decision-making.'
        },
        {
            title: 'Activities',
            description: 'Innovation Cell engages in a variety of activities to foster innovation and entrepreneurship. We conduct workshops on startup fundamentals, financial literacy, and portfolio management. Our events include networking sessions with industry experts and hackathons to promote teamwork. Collaborative projects and industrial visits offer hands-on experience, while pitch contests inspire creativity and confidence.'
        },
    ];

    function Paragraph() {
        return (
            <div>
                Welcome to the Innovation Cell, the epicenter of creativity and entrepreneurship at National Institute of Technology,Kurukshetra.
                Established under the aegis of the Ministry of Education, our society is dedicated to fostering a culture of innovation, entrepreneurship, and financial literacy among students.
                <br />
                Our mission is to inspire and support students who are interested in finance, startups, innovation, and entrepreneurship.
                We believe in nurturing the next generation of thinkers, innovators, and leaders who will shape the future.
                Through a variety of events, workshops, and mentorship programs, we aim to provide our members with the tools and resources they need to turn their ideas into reality.
                <br />
                Join us to explore new ideas, meet like-minded individuals, and take your first steps toward building a successful business. Whether you're interested in finance,
                technology, product development, or social entrepreneurship, there's a place for you at the Innovation Cell.
                Together, let's innovate, create, and make a difference.
            </div>
        )
    }

    const paragraphRef = useRef(null);
    const imageRef = useRef(null);
    const sliderRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [paragraphHeight, setParagraphHeight] = useState("auto");

    useEffect(() => {
        const handleResize = () => {
            if (imageRef.current && paragraphRef.current) {
                const imageHeight = imageRef.current.clientHeight;
                setParagraphHeight(imageHeight);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 350,
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: (index) => setActiveIndex(index)
    };

    const scrollToFeature = (index) => {
        if (sliderRef.current) {
            sliderRef.current.slickGoTo(index);
        }
    };

    const scrollToParagraph = () => {
        if (paragraphRef.current) {
            paragraphRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };


    return (
        <>
            <section className='md:mt-42  lg:px-12 lg:py-16 lg:pb-4 '>
                <div className='p-4 pb-0'>
                    <a className='font-extrabold text-orange-500 lg:text-5xl md:text-4xl sm:text-3xl text-2xl hover:cursor-pointer hover:text-orange-400' onClick={scrollToParagraph}>About Us</a>
                    <hr className='sm:border-t-2 ml-48 md:ml-72 lg:ml-96 sm:ml-64 md:border-t-3 border-orange-500 ' />
                    <a className='font-extrabold text-white lg:text-4xl md:text-3xl sm:text-2xl text-xl' href="#">Innovation Cell</a>
                </div>
                <section className='m-2 mt-8 justify-evenly border rounded-xl md:flex sm:flex lg:flex'>
                    <div className='m-2 md:w-2/5 lg:w-2/5 sm:w-2/5'>
                        <div className='shadow-lg w-full p-2 border-zinc-300 hover:opacity-95 transition duration-300 ease-out-in transform hover:scale-100' ref={imageRef}>
                            <img className="rounded-lg hover:border-white"
                                src="/AboutUs.png"
                                alt='About Image'
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    aspectRatio: '1 / 1',
                                    display: 'block'
                                }}
                            />
                        </div>
                    </div>
                    <div ref={paragraphRef} className='text-white p-6 md:ps-0 md:w-3/5 lg:w-3/5 sm:w-3/5 lg:text-xl md:text-md sm:text-sm text-justify overflow-y-scroll' 
                    style={{ maxHeight: paragraphHeight}}>
                        <p><Paragraph /></p>
                    </div>
                </section>
                <nav>
                    <div className="text-white flex justify-center gap-8 mt-8">
                        {features.map((feature, index) => (
                            <div key={index} className="text-xl  hover:cursor-pointer" style={{ margin: '0 8px' }}>
                                <a onClick={() => scrollToFeature(index)} style={{ color: activeIndex === index ? 'orange' : 'white', fontWeight: activeIndex === index ? 'bold' : 'light' }}>{feature.title}</a>
                            </div>
                        ))}
                    </div>
                </nav>
                <section className="p-8 py-3">
                    <div className="lg:w-1/2 p-8 md:w-3/5 sm:w-3/4 mx-auto">
                        <Slider ref={sliderRef} {...settings} >
                            {features.map((feature, index) => (
                                <div key={index} className="p-6 border border-opacity-25 border-blue-200 bg-gradient-to-b relative hover:shadow-sm hover:shadow-white z-0 rounded-lg border-orange-300 flex transition duration-300 ease-out-in transform hover:scale-95 border">
                                    <div id={`feature-${index}`} className="lg:text-2xl md:text-xl text-lg font-bold text-center text-sky-200 mb-3">
                                        {feature.title}
                                    </div>
                                    <p className="text-white text-justify lg:text-lg md:text-md text-sm opacity-80 hover:opacity-100">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </section>
            </section>
        </>
    );
}

export default About;