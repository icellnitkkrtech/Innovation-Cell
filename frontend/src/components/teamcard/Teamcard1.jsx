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
//           <div key={d.name} className="carousel-item hover-effect">
//         <div className="card">
//         <div className="card-img">
//       <img src="\teamMember\img2.jpg" alt="" />
//         </div>
//         <div className="desc">
//             <h6 className="primary-text">{d.name}</h6>
//           <h6 className="secondary-text">{d.post}</h6>
//         </div>
//         <div classname="btn3"><button className="primary-text">View more</button></div>
       
//         <div class="details">
      
//             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elit</p>
        
//         </div>
// </div>
// </div>
<div key={d.name} className="carousel-item hover-effect">
<div class="bg">
    
  </div>
  <div class="nft">
    <div class='main'>
    <img class='tokenImage image' src="\teamMember\img1.jpg" alt="{d.name}" />
      <h2 class ='text-container'>xyz</h2>
      <p class='text-container'>president</p>
      <p class='text-container'>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
      
      <hr />
      
        
     
      <button class="bn632-hover bn25 ">view more</button>

      
    </div>
  </div>
</div>
))}
</Slider> 
</div>

      </div>
    </div>
    // </div>
  );
}


const data = [
  {
    name: `xyz`,
    img: `\teamMember\img2.jpg`,
    post: 'President',
    desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit`
  },
  {
    name: `xyz`,
    img:  `\teamMember\img2.jpg`,
    post: 'Vice-president',
    desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,.`
  },
  {
    name: `xyz`,
    img:  `\teamMember\img2.jpg`,
    post: 'Secretary',
    desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,a.`
  },
  {
    name: `xyz`,
    img:  `/teamMember/card.png`,
    post: 'President',
    desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`
  },
  {
    name: `xyz`,
    img:  `/teamMember/card.png`,
    post: 'Vice-president',
    desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s`
  },
];

export default Teamcard1;
