import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';



const Speaker = () => {
    const speakers=[{name:"Aman Dhattarwal",date:"15 sept 2023", desc:"Educationist & Co-founder of Apna College",image:"./Speakers/Aman_dhattarwal.png",id:1},{name:"Ankush Singla",date:"12 oct 2023",desc:"Co-founder & CEO of Coding Ninja",image:"./Speakers/ankush.png",id:2},{name:"Pratik Narang" ,date:"12 sept 2023",desc:"Co-founder of Coding Minutes",image:"./Speakers/pratik.png",id:3},{name:"Samrat Shegal" ,date:"12 sept 2023",desc:"Head of Supply Chain and procurement- Dabur India",image:"./Speakers/samrat.png" ,id:4},{name:"Dr. Abhas Mitra",date:"12 sept 2023",desc:"Indian Astrophysicist - pioneering big band theory ",image:"./Speakers/abhas_mitra.jpg",id:5},{name:"VK Raizada",date:"12 sept 2023",desc:"Executive Director-Indian Oil Corporation Limited",image:"./Speakers/vk_raizada.jpg",id:6},{name:"Anil Kumar Aggrawal",date:"12th sept 2023",desc:"Scientist- G and Director ER & IPR at DRDO Headquaters",image:"./Speakers/anil_kumar.jpg",id:7}]
    
    
      var settings = {
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
              infinite:true,
              dots:true
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite:true,
              dots:true
            }
          }
        ]
      }


  return (
    <section id="speakers">
    <div className='bg-black min-h-screen w-full my-5 '>
      <div className='text-5xl md:text-7xl text-[#fe7189ea] text-center font-extralight leading-[65px]'>SPEAKERS</div>
      <div className='slider-container w-[280px] md:w-[650px] lg:w-full'>
      <Slider {...settings}>

        {speakers.map(item=>{
            return<div className='flex flex-col mx-2 px-2 carousel-item' id={item.id} key={item.id}>
            <img src={item.image} className=" w-48 md:w-48 mx-auto" />
           <div className=" bg-gradient-to-r from-purple-500 to-pink-500 w-60 md:w-[18rem] lg:w-[280px] rounded-lg text-white flex-col mx-auto min-h-64 relative">
               <div className="text-left p-5">{item.date}</div>
               <div>
                 <div className="circles flex px-5">
                   <div className="circle1 h-10 w-10 rounded]-full bg-gradient-to-r from-pink-500 via-pink-500 to-orange-400 relative z-10"></div>
                   <div className="circle2 h-10 w-10 rounded-full bg-gradient-to-r from-purple-700 via-purple-700 to-pink-500 relative right-2 "></div>
                 </div>
                 <div>
                   <img src="" />
                 </div>
               </div>
               <div className="text-left px-5 py-1 font-bold text-xl">{item.name}</div>
               <div className='px-2'>{item.desc}</div>
               <div className="buttons flex p-4 justify-between">
                 <div className="flex gap-4 bottom-1">
                   <button className="bg-white rounded-full text-pink-500 px-3 font-semibold ">
                     join now
                   </button>
                 </div>
                 <div>
                   <a href="">
                     <img className="w-7 h-7 rounded-md" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLDIXdFPKo6--nzoAw6HzmB4WIYoWOHFPERA&s" />
                   </a>
                 </div>
               </div>
             </div>
             </div>
        })}
       </Slider> 
      </div>
    </div>
    </section>
  )
}

export default Speaker
