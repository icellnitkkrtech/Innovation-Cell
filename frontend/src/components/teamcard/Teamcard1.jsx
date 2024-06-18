import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./teamcard.css"; 
import Heading from "../Heading";
import SmallerHeading from "../SmallerHeading";

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
    <div id="team" className='w-3/4 m-auto'>
      <div className="">
      
    
      <div className="text-above-slider">
          
          <p > <SmallerHeading title="Our Team"/></p>
          <p><Heading title="Meet our people" /></p>
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
    name: `Deepanshu Chauhan`,
    img: `Deepanshu Chauhan _ President.jpg`,
    post: 'President',
    desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit`
  },
  {
    name: `Alok Mishra`,
    img:  `Alok Mishra _ Vice President.jpg`,
    post: 'Vice-president',
    desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,.`
  },
  {
    name: `Tanmay Mathur`,
    img:  `Tanmay Mathur _ Secretary.jpg`,
    post: 'Secretary',
    desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,a.`
  },
  {
    name: `Saket Jethwani`,
    img:  `Saket Jethwani _ Additional Secretary.jpg`,
    post: 'Additional Secretary',
    desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`
  },
  {
    name: `Suryansh Singh`,
    img:  `Suryansh Singh _ Treasurer.jpg`,
    post: 'Treasurer',
    desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s`
  },
  {
    name: `Prashant Gautam`,
    img:  `Prashant Gautam _ Ideation Team Head.jpg`,
    post: 'Ideation Team Head',
    desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s`
  },
  // {
  //   name: `Anubhav Goel`,
  //   img:  `Anubhav Goel _ Ideation Team Co-Head.jpg`,
  //   post: 'Ideation Team Co-Head',
  //   desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s`
  // },
  {
    name: `Divyanshu Yadav`,
    img:  `Divyanshu Yadav _ Finance Team Head.jpg`,
    post: 'Finance Team Head',
    desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s`
  },
  // {
  //   name: `Dhruv Dhankhar`,
  //   img:  `Dhruv Dhankhar _ Finance Team Co-Head.jpg`,
  //   post: 'Finance Team Co-Head',
  //   desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s`
  // },
  {
    name: `Dhriti`,
    img:  `Dhriti _ Outreach Team Head.jpg`,
    post: 'Outreach Team Head',
    desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s`
  },
  // {
  //   name: `Shobhit Sharma`,
  //   img:  `Shobhit Sharma _ Outreach Team Co-Head.jpg`,
  //   post: 'Outreach Team Co-Head',
  //   desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s`
  // },
  {
    name: `Akarshit`,
    img:  `Akarshit _ Tech Team Head.jpg`,
    post: 'Tech Team Head',
    desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s`
  },
  // {
  //   name: `Dev varshaney`,
  //   img:  `Dev varshaney _ Tech Team Co-Head.jpg`,
  //   post: 'Tech Team Co-Head',
  //   desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s`
  // },
  {
    name: `Sarthak`,
    img:  `Sarthak _ Management Head.jpg`,
    post: 'Management Head',
    desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s`
  },
  // {
  //   name: `Deepanshu Bhardwaj`,
  //   img:  `Deepanshu Bhardwaj _ Management Co-Head.jpg`,
  //   post: 'Management Co-Head',
  //   desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s`
  // },
  {
    name: `Vivek`,
    img:  `Vivek _ D&C Team Head.jpg`,
    post: 'D&C Team Head',
    desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s`
  },
  // {
  //   name: `Vishesh`,
  //   img:  `Vishesh _ D&C Team Co-Head.jpg`,
  //   post: 'D&C Team Co-Head',
  //   desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s`
  // },

];





export default Teamcard1;
