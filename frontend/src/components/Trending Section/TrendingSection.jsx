import React, { useState } from 'react'
import TrendingPost from './TrendingPost'
import  "./trendingpost.css";

const TrendingSection = () => {

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
    }])
    return (
        <div>
            
            <div className="App">
                <h1 className="heading1">OUR TRENDING POST</h1>
                <div className="posts ">
                   {/* This Function will call the divs */}
                   {
                    datas.map((data)=>{
                        return(
                            <div><TrendingPost data={data.date} title={data.title} description={data.description}/></div>
                        )
                    })
                   }
                </div>
            </div>
            
        </div>
    )
}

export default TrendingSection