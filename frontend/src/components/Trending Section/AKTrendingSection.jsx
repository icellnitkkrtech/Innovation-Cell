import React, { useState } from 'react'
import TrendingPost from './TrendingPost'
import  "./trendingpost.css";
import SmallerHeading from '../SmallerHeading';
import Slider from 'react-slick';

const AKTrendingSection = () => {

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1


    };

    

    const [datas , setDatas] = useState([{
        date : "April 18 , 2024" ,
        title : "Title 1" ,
        description : "Description 1"
    } , {
        date : "April 18 , 2024" ,
        title : "Title 2" ,
        description : "Description 2"
    } , {
        date : "April 18 , 2024" ,
        title : "Title 3" ,
        description : "Description 3"
    } , {
        date : "April 18 , 2024" ,
        title : "Title 3" ,
        description : "Description 3"
    }])
    return (
        <div>
            
            <div className="App">
            <div className='p-4 pb-0'>
                    <a className='font-extrabold text-orange-500 lg:text-5xl md:text-4xl sm:text-3xl text-2xl hover:text-orange-400'
                        href="#paragraph" >Our Trending</a>
                    <hr className='sm:border-t-2 ml-48 md:ml-72 lg:ml-96 sm:ml-64 md:border-t-3 border-orange-500 ' />
                </div>
                <div className='m-2 md:w-2/5 lg:w-2/5 sm:w-2/5'>
                        <h1 className='text-white mb-4 font-extrabold lg:text-5xl md:text-4xl sm:text-3xl text-2xl'>
                            <SmallerHeading title="Posts" />
                        </h1>
                        
                    </div>
                <div className="posts slider-container">
                   {/* This Function will call the divs */}
                   <Slider {...settings}>
                   {
                    datas.map((data)=>{
                        return(
                            <div><TrendingPost data={data.date} title={data.title} description={data.description}/></div>
                        )
                    })
                   }
                   </Slider>
                </div>
            </div>
            
        </div>
    )
}

export default AKTrendingSection