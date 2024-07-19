import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./teamcard.css";
import TrendingPost from "../Trending Section/TrendingPost";

function AKTeamCard() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1


    };

    return (
        <div className='w-100 m-auto'>
            <div className="mt-20">
                <div className="text-above-slider">

                    <p style={{ fontSize: '18px' }}> our team</p>
                    <h2 style={{ color: 'orange' }}>Meet our people</h2>
                </div>


                <div className="slider-container ">
                    <Slider {...settings}>
                        {data.map((d) => (
  
                            <div><TrendingPost /></div>
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
      name: `Abhishek Kumar`,
      img: `\teamMember\Abhishek Kumar _ President.jpg`,
      post: 'President',
      desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit`
    },
    {
      name: `Chirag Moond`,
      img:  `\teamMember\Chirag Moond _ Vice President.jpeg`,
      post: 'Vice-president',
      desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,.`
    },
    {
      name: `Shivam Vekhande`,
      img:  `\teamMember\Shivam Vekhande _ Secretary.jpg`,
      post: 'Secretary',
      desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,a.`
    },
    {
      name: `Ritik Rai`,
      img:  `\teamMember\Ritik Rai _ Additional Secretary.HEIC`,
      post: ' Additional Secretary',
      desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`
    },
    {
      name: `Komal Gupta`,
      img:  `\teamMember\Komal Gupta _ Joint Secretary.jpg`,
      post: 'Joint Secretary',
      desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s`
    },
    {
      name: `Akash Deshmukh`,
      img:  `\teamMember\Akash Deshmukh _ Member.jpg`,
      post: 'Member',
      desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s`
    },
    {
      name: `Deepanshu Vishwakarma`,
      img:  `\teamMember\Deepanshu Vishwakarma _ Member.jpg`,
      post: 'Member',
      desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s`
    },
    {
      name: `Aneesh Mohanty`,
      img:  `\teamMember\Aneesh Mohanty _ Member.JPG`,
      post: 'Member',
      desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s`
    },
    {
      name: `Dheeraj`,
      img:  `\teamMember\Dheeraj _ Member.jpeg`,
      post: 'Member',
      desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s`
    },
    {
      name: `Jassica`,
      img:  `\teamMember\Jassica _ Member.jpg`,
      post: 'Member',
      desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s`
    },
    {
      name: `Mukesh Goswami`,
      img:  `\teamMember\Mukesh Goswami _ Member.jpg`,
      post: 'Member',
      desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s`
    },
    {
      name: `Harshvardhan`,
      img:  `\teamMember\Harshvardhan _ Member.JPG`,
      post: 'Member',
      desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s`
    },
    {
      name: `Navjtot Singh`,
      img:  `\teamMember\Navjtot Singh _ Member.jpg`,
      post: 'Member',
      desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s`
    },
    {
      name: `Neha Verma`,
      img:  `\teamMember\Neha Verma _ Member.webp`,
      post: 'Member',
      desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s`
    },
    {
      name: `Nikhil Bhardwaj`,
      img:  `\teamMember\Nikhil Bhardwaj _ Member.jpg`,
      post: 'Member',
      desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s`
    },
    {
      name: `Nikunj Garg`,
      img:  `\teamMember\Nikunj Garg _ Member.jpeg`,
      post: 'Member',
      desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s`
    },
    {
      name: `Punit Garg`,
      img:  `\teamMember\Punit Garg _ Member.jpg`,
      post: 'Member',
      desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s`
    },
    {
      name: `Rahul`,
      img:  `\teamMember\Rahul _ Member.jpg`,
      post: 'Member',
      desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s`
    },
    {
      name: `Raj Aryan`,
      img:  `\teamMember\Raj Aryan _ Member.jpg`,
      post: 'Membert',
      desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s`
    },
    {
      name: `Sunil Vishnoi`,
      img:  `\teamMember\Sunil Vishnoi _ Member.jpg`,
      post: 'Member',
      desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s`
    },
    {
      name: `Harsh Kumar`,
      img:  `\teamMember\Harsh Kumar _ Member.jpg`,
      post: 'Member',
      desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s`
    },
  
  ];
export default AKTeamCard;
