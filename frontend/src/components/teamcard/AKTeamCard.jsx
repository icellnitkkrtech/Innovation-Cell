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
        name: `xyz`,
        img: `\teamMember\img2.jpg`,
        post: 'President',
        desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit`
    },
    {
        name: `xyz`,
        img: `\teamMember\img2.jpg`,
        post: 'Vice-president',
        desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,.`
    },
    {
        name: `xyz`,
        img: `\teamMember\img2.jpg`,
        post: 'Secretary',
        desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,a.`
    },
    {
        name: `xyz`,
        img: `/teamMember/card.png`,
        post: 'President',
        desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`
    },
    {
        name: `xyz`,
        img: `/teamMember/card.png`,
        post: 'Vice-president',
        desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s`
    },
];

export default AKTeamCard;
