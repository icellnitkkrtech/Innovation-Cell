import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./teamcard.css"; 
import Heading from "../Heading";


const teamData = [
  {
    name: `Deepanshu Chauhan`,
    img: `Deepanshu Chauhan _ President.jpg`,
    post: 'President',
  },
  {
    name: `Ankit Matwa`,
    img:  `WhatsApp Image 2024-12-26 at 20.30.08_6ca1b054.jpg`,
    post: 'Vice-president',
  },
  {
    name: `Tanmay Mathur`,
    img:  `Tanmay Mathur _ Secretary.jpg`,
    post: 'Secretary',
  },
  {
    name: `Saket Jethwani`,
    img:  `Saket Jethwani _ Additional Secretary.jpg`,
    post: 'Additional Secretary',
  },
  {
    name: `Suryansh Singh`,
    img:  `Suryansh Singh _ Treasurer.jpg`,
    post: 'Treasurer',
  },
  {
    name: `Prashant Gautam`,
    img:  `Prashant Gautam _ Ideation Team Head.jpg`,
    post: 'Ideation Team Head',
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
  },
  // {
  //   name: `Vishesh`,
  //   img:  `Vishesh _ D&C Team Co-Head.jpg`,
  //   post: 'D&C Team Co-Head',
  //   desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s`
  // },

];

const TeamCard = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true
        }
      },
      {
        breakpoint: 724,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true
        }
      }
    ]
  };

  return (
    <div id="team" className="team-section mb-12 w-11/12  md:px-12 mx-auto py-12">
      <div className="text-center mb-8">
        <Heading title="Meet Our Team" />
        <p className="text-gray-500 md:text-xl text-lg mt-4">
          Get to know the passionate team behind our mission.
        </p>
      </div>

      <div className="slider-container">
        <Slider {...settings}>
          {teamData.map((member) => (
            <TeamCardItem key={member.name} member={member} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

// Component for individual team member card
const TeamCardItem = ({ member }) => {
  return (
    <div className="team-card flex flex-col justify-center items-center rounded-lg bg-gradient-to-t from-black to-zinc-800 transition-all duration-300 hover:scale-95 hover:shadow-lg">
      <div className="team-image-container mb-4 flex items-center justify-center">
        <img
          className="team-image rounded-lg object-cover"
          src={`/teamMember/${member.img}`}
          alt={member.name}
        />
      </div>
      <div className="team-info text-center">
        <h3 className="team-name text-xl font-bold truncate">{member.name}</h3>
        <p className="team-post text-sm text-gray-500">{member.post}</p>
      </div>
    </div>
  );
};

export default TeamCard;
