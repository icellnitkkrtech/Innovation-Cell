import React from "react";
function Rules() {
  return (
    <div style={{backgroundColor:'black'}}>
      
     <div className=""
        style={{
          fontSize: "4rem",
          textAlign: "center",
          color: "#FF69B4",
          fontWeight: "lighter",
        }}
      >
        RULES AND REGULATIONS
      </div>
      
      <div className="flex flex-wrap justify-center gap-3"
      style={{marginTop:'100px',paddingBottom:'100px'}}>

        {/* left side  */}
        <div className="border-5 border-red-700"
        >
          {/* card 1 */}
          <div className="  flex "
          >
            <img src="./Images/rule1.png" alt="" />
          </div>

          
        
          {/* card2 */}
          <div className=" flex justify-end"
          >
            <img src="./Images/rule2.png" alt="" />
          </div>

          
        
       {/* card3 */}
          <div className=" flex justify-end"
          >
            <img src="./Images/rule3.png" alt="" />
          </div>
          
        </div>
      
      
      {/* right side  */}

      <div className="border-5 border-red-700"
       >

              {/* card1 */}
          <div className="  flex "
          >
            <img src="./Images/rule4.png" alt="" />
          </div>

          {/* card2 */}

          <div className=" flex "
          >
            <img src="./Images/rule5.png" alt="" />
          </div>

          {/* card3 */}
          <div className="  flex "
          >
            <img src="./Images/rule6.png" alt="" />
          </div>
      </div>
      
    </div>
    </div>

  );
}

export default Rules;
