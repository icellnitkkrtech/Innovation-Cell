import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import Logo from '../assets/IIC_Loader.json';

const Loader = () => {
    const [isOff, setIsOff] = useState(true);

    useEffect(() => {
        // Disable scroll
        document.body.style.overflow = 'hidden';

        const timer = setTimeout(() => {
            setIsOff(false);

            // Re-enable scroll when loading is complete
            document.body.style.overflow = 'auto';
        }, 2638); // Timeout for 2.638 seconds

        // Cleanup on unmount
        return () => {
            clearTimeout(timer);
            document.body.style.overflow = 'auto'; // Re-enable scroll if the component is unmounted
        };
    }, []);

    // Improved background gradient
    const backgroundStyle = isOff 
        ? 'bg-gradient-to-r from-gray-900 to-gray-800' 
        : 'bg-gradient-to-r from-amber-500 to-orange-500';

    return (
        <div
            className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${backgroundStyle} transition-all duration-500 z-50`}>
            <div className='w-80 transform transition-transform duration-300 hover:scale-105'>
                <Lottie animationData={Logo} />
            </div>
        </div>
    );
};

export default Loader;
