import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./teamcard.css"; 

function Teamcard1() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1 ,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
    
    
  };
  
  return (
    <div className='w-3/4 m-auto'>
      <div className="mt-20">
      
    
      <div className="text-above-slider">
          
          <p style={{ fontSize: '18px' }}> our team</p>
          <h2 style={{ color: 'orange' }}>Meet our people</h2>
        </div>
      
       
        <div className="slider-container ">
       <Slider {...settings}>
        {data.map((d) => (
        <div key={d.name} className="carousel-item hover-effect">
           <div class="bg">
    
            </div>
  <div class="nft">
    <div class='main'>
    <img class='tokenImage image' src={"teamMember/"+d.img} alt={d.name} />
      <h2 class ='text-container'>{d.name}</h2>
      <p class='text-container'>{d.post}</p>
      {/* <p class='text-container'>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
      
      <hr />
      
        
     
      <button class="bn632-hover bn25 ">view more</button> */}
    </div>
  </div>
</div>
))}
</Slider> 
</div>
<hr />

      </div>
    </div>
    // </div>
  );
}

const data = [
  {
    name: `Abhishek Kumar`,
    img: `Abhishek Kumar _ President.jpg`,
    post: 'President',
    desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit`
  },
  {
    name: `Chirag Moond`,
    img:  `Chirag Moond _ Vice President.jpeg`,
    post: 'Vice-president',
    desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,.`
  },
  {
    name: `Shivam Vekhande`,
    img:  `Shivam Vekhande _ Secretary.jpg`,
    post: 'Secretary',
    desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,a.`
  },
  {
    name: `Ritik Rai`,
    img:  `Ritik Rai _ Additional Secretary.jpg`,
    post: 'Secretary',
    desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`
  },
  {
    name: `Komal Gupta`,
    img:  `Komal Gupta _ Joint Secretary.jpg`,
    post: 'Joint Secretary',
    desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s`
  },
  {
    name: `Akash Deshmukh`,
    img:  `Akash Deshmukh _ Member.jpg`,
    post: 'Member',
    desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s`
  },
  {
    name: `Deepanshu Vishwakarma`,
    img:  `Deepanshu Vishwakarma _ Member.jpg`,
    post: 'Member',
    desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s`
  },
  {
    name: `Aneesh Mohanty`,
    img:  `Aneesh Mohanty _ Member.JPG`,
    post: 'Member',
    desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s`
  },
  {
    name: `Dheeraj`,
    img:  `Dheeraj _ Member.jpeg`,
    post: 'Member',
    desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s`
  },
  {
    name: `Jassica`,
    img:  `Jassica _ Member.jpg`,
    post: 'Member',
    desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s`
  },
  {
    name: `Mukesh Goswami`,
    img:  `Mukesh Goswami _ Member.jpg`,
    post: 'Member',
    desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s`
  },
  {
    name: `Harshvardhan`,
    img:  `Harshvardhan _ Member.JPG`,
    post: 'Member',
    desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s`
  },
  {
    name: `Navjtot Singh`,
    img:  `Navjtot Singh _ Member.jpg`,
    post: 'Member',
    desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s`
  },
  {
    name: `Neha Verma`,
    img:  `Neha Verma _ Member.webp`,
    post: 'Member',
    desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s`
  },
  {
    name: `Nikhil Bhardwaj`,
    img:  `Nikhil Bhardwaj _ Member.jpg`,
    post: 'Member',
    desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s`
  },
  {
    name: `Nikunj Garg`,
    img:  `Nikunj Garg _ Member.jpeg`,
    post: 'Member',
    desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s`
  },
  {
    name: `Punit Garg`,
    img:  `Punit Garg _ Member.jpg`,
    post: 'Member',
    desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s`
  },
  {
    name: `Rahul`,
    img:  `Rahul _ Member.jpg`,
    post: 'Member',
    desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s`
  },
  {
    name: `Raj Aryan`,
    img:  `Raj Aryan _ Member.jpg`,
    post: 'Membert',
    desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s`
  },
  {
    name: `Sunil Vishnoi`,
    img:  `Sunil Vishnoi _ Member.jpg`,
    post: 'Member',
    desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s`
  },
  {
    name: `Harsh Kumar`,
    img:  `Harsh Kumar _ Member.jpg`,
    post: 'Member',
    desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s`
  },

];



export default Teamcard1;
