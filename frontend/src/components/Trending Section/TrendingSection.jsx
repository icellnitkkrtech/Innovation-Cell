import React from 'react'
import TrendingPost from './TrendingPost'
import  "./trendingpost.css";

const TrendingSection = () => {
    return (
        <div>
            
            <div className="App">
                <h1 className="heading1">OUR TRENDING POST</h1>
                <div className="posts">
                    <TrendingPost date="April 18 , 2024" title="Title 1" description = "Description 1" />
                    <TrendingPost date="April 18 , 2024" title="Title 2" description = "Description 2" />
                    <TrendingPost date="April 18 , 2024" title="Title 3" description = "Description 3" />
                </div>
            </div>
            
        </div>
    )
}

export default TrendingSection