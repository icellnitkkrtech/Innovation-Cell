import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Homepage from './pages/Homepage'
import TrendingPost from './components/Trending Section/TrendingPost';
import Loader from './components/Loader'

// import Hero from './components/Hero/Hero'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    setTimeout(() => {
      setLoading(false)
    }, 4500);
  } , [])

 if(loading){
  return(
    <Loader />
  )
 } else{
  return(
    <Homepage />
  )
 }
}

export default App
