import React from 'react'

const Logo = () => {
  return (
    <div className="flex items-center">
      <img 
        src="/IIC_Logo.png" 
        alt="Innovation Cell Logo" 
        className="h-10 md:h-12 mr-2 transition-transform duration-300 hover:scale-105" 
      />
      <div className="hidden sm:block">
        <h1 className="text-lg font-bold leading-tight">Innovation Cell</h1>
        <p className="text-xs text-amber-500">NIT Kurukshetra</p>
      </div>
    </div>
  )
}

export default Logo 