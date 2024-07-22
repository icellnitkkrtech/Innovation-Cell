import React from 'react'
import "./Footer.css"
const Footer = () => {
  return (
    <div className='footer'>
      <hr></hr>
      <div className='upper'>
      <h1>FOLLOW US</h1>
        <div className='logos'>
       <a href='https://www.instagram.com/icell.nitkkr?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='><img src='./footerhero/insta.jpeg'/></a> 
       <a href='https://www.linkedin.com/company/icell-nitkkr/'> <img src='./footerhero/linkdin.jpeg'/></a>
        <img src='./footerhero/twitter.jpeg'/>
        </div>
      </div>
        
        <div className='end'>
        <div className='info'>
            <h3>INNOVATION CELL</h3>
            <h3>NIT KURUKSHETRA</h3>
            <h3>ICELL@NIT.AC.IN</h3>
            <h3>7418529630</h3>
        </div>
        <div className='logo'>
          <img src='./footerhero/logo.jpeg'></img>
        </div>
        </div>
        <p className='text'>Made with ❤ by Innovation Cell</p>
    </div>
  )
}

export default Footer
