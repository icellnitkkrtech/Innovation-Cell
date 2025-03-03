import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./teamcard.css"; 
import Heading from "../Heading";


const teamData = [
  {
    name: `Shobhit Sharma`,
    img: `Shobhit Sharma_President.jpg`,
    post: 'President',
  },
  {
    name: `Suryansh Singh`,
    img:  `Suryansh Singh_Vice President.jpg`,
    post: 'Vice-president',
  },
  {
    name: `Suhani Singh`,
    img:  `Suhani Singh_Secretary.jpg`,
    post: 'Secretary',
  },
  {
    name: `Divanshu Agarwal`,
    img:  `Divanshu Agarwal_Joint Secretary.jpg`,
    post: 'Additional Secretary',
  },
  {
    name: `Shreyas Srivastava`,
    img:  `Shreyas Srivastava_Treasurer.jpg`,
    post: 'Treasurer',
  },
  {
    name: `Aditya Raj`,
    img:  `Aditya Raj_Ideation.jpg`,
    post: 'Ideation Team Head',
  },
  // {
  //   name: `Anubhav Goel`,
  //   img:  `Anubhav Goel _ Ideation Team Co-Head.jpg`,
  //   post: 'Ideation Team Co-Head',
  //   desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s`
  // },
  {
    name: `Dhruv Dhankhar`,
    img:  `Dhruv Dhankhar_Finance.jpg`,
    post: 'Finance Team Head',
  },
  // {
  //   name: `Dhruv Dhankhar`,
  //   img:  `Dhruv Dhankhar _ Finance Team Co-Head.jpg`,
  //   post: 'Finance Team Co-Head',
  //   desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s`
  // },
  {
    name: `Shobhit Sharma`,
    img:  `Shobhit Sharma_Outreach.jpg`,
    post: 'Outreach Team Head',
  },
  // {
  //   name: `Shobhit Sharma`,
  //   img:  `Shobhit Sharma _ Outreach Team Co-Head.jpg`,
  //   post: 'Outreach Team Co-Head',
  //   desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s`
  // },
  {
    name: `Dev Varshney`,
    img:  `Dev Varshney_Tech .jpg`,
    post: 'Tech Team Head',
  },
  // {
  //   name: `Dev varshaney`,
  //   img:  `Dev varshaney _ Tech Team Co-Head.jpg`,
  //   post: 'Tech Team Co-Head',
  //   desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s`
  // },
  {
    name: `Deepanshu Bharadwaj`,
    img:  `Deepanshu Bharadwaj_Management.jpg`,
    post: 'Management Head',
  },
  // {
  //   name: `Deepanshu Bhardwaj`,
  //   img:  `Deepanshu Bhardwaj _ Management Co-Head.jpg`,
  //   post: 'Management Co-Head',
  //   desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s`
  // },
  {
    name: `Siddhi Jadhav`,
    img:  `Siddhi Jadhav_D&C.jpg`,
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
