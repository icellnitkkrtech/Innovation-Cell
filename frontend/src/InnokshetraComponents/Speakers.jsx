import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

const Speaker = () => {
  const speakers = [
    { name: "Aman Dhattarwal", date: "15 Sept 2023", desc: "Educationist & Co-founder of Apna College", image: "./Speakers/Aman_dhattarwal.png", id: 1 },
    { name: "Ankush Singla", date: "12 Oct 2023", desc: "Co-founder & CEO of Coding Ninja", image: "./Speakers/ankush.png", id: 2 },
    { name: "Pratik Narang", date: "12 Sept 2023", desc: "Co-founder of Coding Minutes", image: "./Speakers/pratik.png", id: 3 },
    { name: "Samrat Shegal", date: "12 Sept 2023", desc: "Head of Supply Chain and Procurement- Dabur India", image: "./Speakers/samrat.png", id: 4 },
    { name: "Dr. Abhas Mitra", date: "12 Sept 2023", desc: "Indian Astrophysicist - pioneering big bang theory", image: "./Speakers/abhas_mitra.jpg", id: 5 },
    { name: "VK Raizada", date: "12 Sept 2023", desc: "Executive Director-Indian Oil Corporation Limited", image: "./Speakers/vk_raizada.jpg", id: 6 },
    { name: "Anil Kumar Aggrawal", date: "12 Sept 2023", desc: "Scientist- G and Director ER & IPR at DRDO Headquarters", image: "./Speakers/anil_kumar.jpg", id: 7 }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      }
    ]
  };

  return (
    <section id="speakers" className="">
      <div className='bg-slate-900 min-h-screen w-full flex flex-col items-center py-10'>
        {/* Updated Heading Color */}
        <h1 className='text-5xl md:text-7xl text-cyan-400 text-center font-extrabold leading-tight mb-12'>SPEAKERS</h1>
        <div className='slider-container w-[90%] md:w-[80%] lg:w-[70%]'>
          <Slider {...settings}>
            {speakers.map(item => (
              <div className='mx-4 px-4 carousel-item flex justify-center' id={item.id} key={item.id}>
                {/* Updated Card Background and Text Colors */}
                <div className="bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg p-5 flex flex-col items-center">
                  <img src={item.image} alt={item.name} className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover mb-4 shadow-lg" />
                  <div className="text-white text-center">
                    <div className="font-bold text-xl md:text-2xl mb-2">{item.name}</div>
                    <div className="text-sm md:text-base mb-2 text-gray-300">{item.desc}</div>
                    <div className="text-gray-400 text-sm">{item.date}</div>
                    <button className="bg-white text-black mt-4 py-2 px-4 rounded-full font-semibold hover:bg-gray-300 transition-all">
                      Join Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Speaker;
