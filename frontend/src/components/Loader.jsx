import React, { useState } from 'react'
import Logo from '../assets/IIC_Loader.json'
import Lottie from "lottie-react"

const Loader = () => {
    const [isOff, setIsOff] = useState(true);

    useState(()=>{
        setTimeout(() => {
            setIsOff(false)
        }, 2658);
    } , [])



    if (isOff) {
        return (
            <div style={{background : "#2F3235"}} className='flex h-full w-full'>
                <div className=' w-80 m-auto h-screen flex items-center justify-center'>
                    <Lottie animationData={Logo} />
                </div>
            </div>
        )
    } else {
        return (
            <div style={{background : "#FFB80D"}} className='flex h-full w-full'>
                <div className=' w-80 m-auto h-screen flex items-center justify-center'>
                    <Lottie animationData={Logo} />
                </div>
            </div>
        )
    }

}

export default Loader