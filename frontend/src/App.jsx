import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Homepage from './pages/Homepage'
import TrendingPost from './components/TrendingPost';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Hello</h1>
      <Homepage />
      {/* Trending Post Component*/}
      <div className="App">
      <h1 className="heading1">OUR TRENDING POST</h1>
      <div className="posts">
      <TrendingPost />
      <TrendingPost />
      <TrendingPost />
      </div>
    </div>
    {/* Trending Post Component ends*/}
    </>
  )
}

export default App
