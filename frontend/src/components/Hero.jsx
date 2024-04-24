import React from 'react'

const Hero = () => {
    return (
        <div className='grid p-16 lg:p-32 lg:grid-cols-2'>
            <div className='w-100'>
                <h4 className='text-base'>NIT KURUKSHETRA</h4>
                <h1 className='text-5xl lg:text-6xl  '>WELCOME TO </h1>
                <h1 className='text-6xl text-orange-600 mb-6'>INNOVATION CELL</h1>
                <p className='text-sm mb-12'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

                <ul class="list-none">
                    <li><div className='flex mb-1'>
                        <svg style={{
                            marginTop: "0.1rem",
                            marginRight: "0.5rem",
                        }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#63e5ff" class="w-6 h-6">
                            <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                        </svg>

                        Innovation is our driving force
                    </div>  </li>
                    <li><div className='flex mb-1'>
                        <svg style={{
                            marginTop: "0.1rem",
                            marginRight: "0.5rem",
                        }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#63e5ff" class="w-6 h-6">
                            <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                        </svg>


                        Seeding the foundation for tomorrow's success with Startups</div> </li>
                    <li><div className='flex mb-1'>
                        <svg style={{
                            marginTop: "0.1rem",
                            marginRight: "0.5rem",
                        }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#63e5ff" class="w-6 h-6">
                            <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                        </svg>

                        Empowering minds through finance trading</div> </li>
                </ul>

                <div className='mt-8 ml-8 lg:mt-10 lg:ml-10'>
                    <button className='border p-2 pl-3 lg:p-3 lg:pl-5 lg:pr-4 rounded-full '> <div className='flex'>
                        Learn More

                        <div className='ml-8 '>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </div>
                    </div></button>
                </div>
            </div>

            <div>
            <img src="\bulb.png" alt="bulb" />
            </div>
        </div>
    )
}

export default Hero