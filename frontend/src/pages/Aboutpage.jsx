import React from "react";
import Heading from "../components/Heading";
import SmallerHeading from "../components/SmallerHeading";

function About() {

    const features = [
        {
            title: 'Feature 1',
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid quia at soluta officiis, eveniet maxime perferendis et explicabo accusamus quaerat sunt ea a eos quas ex error dolores consequatur asperiores!'
        },
        {
            title: 'Feature 2',
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid quia at soluta officiis, eveniet maxime perferendis et explicabo accusamus quaerat sunt ea a eos quas ex error dolores consequatur asperiores!'
        },
        {
            title: 'Feature 3',
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid quia at soluta officiis, eveniet maxime perferendis et explicabo accusamus quaerat sunt ea a eos quas ex error dolores consequatur asperiores!'
        },
        {
            title: 'Feature 2',
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid quia at soluta officiis, eveniet maxime perferendis et explicabo accusamus quaerat sunt ea a eos quas ex error dolores consequatur asperiores!'
        },
    ];

    return (
        <>
            <section className='bg-black p-28'>
                <div className='p-4 pb-0'>
                    <Heading title="About Us" />
                    <hr className='sm:border-t-2 ml-48 md:ml-72 lg:ml-96 sm:ml-64 md:border-t-3 border-orange-500 ' />
                </div>
                <section className=' m-2 mt-0  justify-evenly md:flex sm:flex lg:flex'>
                    <div className='m-2 md:w-2/5 lg:w-2/5 sm:w-2/5'>
                        <SmallerHeading title="Innovation Cell" />
                        <img 
                            src='https://cdn.mos.cms.futurecdn.net/nWiuSCNGSL8rfrBgE5PMcJ.jpg'
                            className='shadow-lg w-full border-zinc-300 border-3 rounded-md hover:rounded-xl hover:opacity-70 transition duration-300 ease-out-in transform hover:scale-95'
                            style={{ height: 'auto', aspectRatio: '1 / 1' }}
                            alt='About Image'
                        />
                    </div>
                    <div id='paragraph' className='text-white mx-2 md:w-3/5 lg:w-3/5 sm:w-3/5 lg:mt-16 md:mt-14 sm:mt-12 lg:text-xl  md:text-md sm:text-sm text-justify'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error vitae velit dicta voluptas distinctio numquam repellendus hic impedit odit, ullam perferendis. Voluptatem officia dolores ut nostrum vel nisi laborum porro?
                        minus ratione eligendi, dolores, sed voluptatem quod dignissimos
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae perspiciatis impedit numquam obcaecati, quis error corrupti accusantium iure maxime mollitia officiis. Distinctio in fuga animi suscipit est hic, delectus iure? aliquid velit nam molestiae unde. Dignissimos exercitationem dolores, porro doloremque at quidem totam expedita repellat perferendis quam. Voluptatem, disti soluta sint sit voluptate unde. Voluptatem reprehenderit repudiandae doloremque aliquid adipisci quia eum perspiciatis reiciendis dolores, eos voluptatum inventore esse sed ipsa nobis voluptates neque, nostrum nemo quo!
                    </div>
                </section>
                <section className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        {features.map((feature, index) => (
                            <div key={index} className="p-6 bg-inherit rounded-lg shadow-lg hover:shadow-transparent shadow-orange-200 border-orange-400 flex-row  transition duration-300 ease-out-in transform hover:scale-110 border-2">
                                <h2 className="lg:text-2xl md:text-xl text-lg font-bold text-center text-orange-400 mb-3 hover:font-extrabold hover:underline">
                                    {feature.title}
                                </h2>
                                <p className="text-white lg:text-lg md:text-md text-sm opacity-80 hover:opacity-100">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            </section>
        </>
    );
}

export default About;