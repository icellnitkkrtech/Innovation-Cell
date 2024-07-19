import React, { useEffect, useState } from 'react'
import Loader from './components/Loader'

function App({ children }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 4500)
  }, [])

  if (loading) {
    return <Loader />
  } else {
    return <div>{children}</div>
  }
}

export default App
