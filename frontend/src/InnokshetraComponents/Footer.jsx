import React from 'react'
import "./Footer.css"
const Footer = () => {
  return (
    <div className='footer-footer'>
      <hr></hr>
      <div className='upper-footer'>
      <h1 className='footer-followus'>FOLLOW US</h1>
        <div className='logos-footer'>
       <a href='https://www.instagram.com/icell.nitkkr?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='><img src='./footerhero/insta.jpeg'/></a> 
       <a href='https://www.linkedin.com/company/icell-nitkkr/'> <img src='./footerhero/linkdin.jpeg'/></a>
        <img src='./footerhero/twitter.jpeg'/>
        </div>
      </div>
        
        <div className='end-footer'>
        <div className='info-footer'>
            <h3 className='h3-footer'>INNOVATION CELL</h3>
            <h3 className='h3-footer'>NIT KURUKSHETRA</h3>
            <h3 className='h3-footer'>ICELL@NIT.AC.IN</h3>
            <h3 className='h3-footer'>7418529630</h3>
        </div>
        <div className='logo-footer'>
          <img src='./footerhero/logo.jpeg'></img>
        </div>
        </div>
        <p className='text-footer'>Made with ❤ by Innovation Cell</p>
    </div>
  )
}

export default Footer
