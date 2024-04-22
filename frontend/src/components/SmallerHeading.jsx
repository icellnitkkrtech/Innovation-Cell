import React from 'react'

const SmallerHeading = (props) => {
  return (
    <div><a  className='text-white mb-4 font-extrabold lg:text-5xl md:text-4xl sm:text-3xl text-2xl ' href="#">{props.title}</a></div>
  )
}

export default SmallerHeading