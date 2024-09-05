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

    // Conditional styles for background color
    const backgroundColor = isOff ? '#2F3235' : '#FFB80D';

    return (
        <div
            style={{ background: backgroundColor, zIndex: 9999 }}
            className='fixed top-0 left-0 w-full h-full flex items-center justify-center'>
            <div className='w-80'>
                <Lottie animationData={Logo} />
            </div>
        </div>
    );
};

export default Loader;
