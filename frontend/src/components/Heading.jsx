import React from 'react'

const Heading = (props) => {
    return (
        <div>
            <h1 className='font-extrabold text-orange-500 lg:text-5xl md:text-4xl sm:text-3xl text-2xl hover:text-orange-400'
                href="#paragraph" >{props.title}</h1>
        </div>
    )
}

export default Heading