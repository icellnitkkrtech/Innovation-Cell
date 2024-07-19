import React from 'react'
import { useNavigate } from 'react-router-dom'
function Navbar() {
  const navigate = useNavigate()
  return (
    <div>
      <ul><li onClick={()=>navigate("/")}>home</li></ul>
      
      Navbar</div>
  )
}

export default Navbar