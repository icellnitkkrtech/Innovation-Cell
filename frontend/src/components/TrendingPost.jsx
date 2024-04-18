import React from "react";
import "./trendingpost.css";
function TrendingPost() {

  var i=0;

  return (

    <div key={i++}>
      <div class="bg"></div>

      <div class="nft" id="nftid">
        <div class="main">
          <img
            class="tokenImage"
            src="https://papers.co/wallpaper/papers.co-hv15-girl-face-cute-kpop-29-wallpaper.jpg"
            alt="NFT"
          />
          <div class="tokenInfo">
            <div class="price">
              <p>April 04, 2024</p>
            </div>
          </div>
          <h2>Title title title</h2>
          <p class="description">
            description description description description description
            description
          </p>

          <hr />
          <div class="creator">
            <button class="btn" type="button">
              <p className="p1">Read More</p>
              <div id="container-stars">
                <div id="stars"></div>
              </div>

              <div id="glow">
                <div class="circle"></div>
                <div class="circle"></div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrendingPost;
