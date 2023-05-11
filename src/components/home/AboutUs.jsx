import React from 'react';
import Rocket from '../../images/rocket.png';
import Star from '../../images/star.png';

function AboutUs() {
  return (
    <section className='text-[#011718] bg-[#83D6D8] pt-10 relative'>
        <h5 className='text-[#000000] px-3 text-left sm:text-center text-[20px] md:text-[40px]'>About us</h5>
        <h1 className='text-[#000000] px-3 text-left sm:text-center text-[36px] lg:text-[64px]'>Discover Xeleron</h1>

        <div className='flex flex-col-reverse lg:flex-row items-center'>
            <div className='min-w-fit'>
                <img src={Rocket} alt="rocket-img" className='w-full md:w-[630px] lg:w-[695.24px] ' />
                </div>

            <div className='px-3 md:pl-8 md:pr-5 lg:pl-12 lg:pr-7'>
                <p className='mb-9'>Xeleron is dedicated to delivering an unparalleled DeFi experience on zkSync by combining robust security, rewarding opportunities, and user-friendly accessibility. Our vision is to become the go-to platform for trading, earning, lending, and investing, on the zkSync Era.</p>
                <p>Our team is committed to pushing the boundaries of sustainable value distribution, striving to serve the next generation of top-performing DeFi users on zkSync. Through our innovative infrastructure, we aim to cater to the evolving needs of our users, empowering them to excel and outperform on zkSync.</p>
            </div>
        </div>
        <img src={Star} alt="" className='absolute top-10 right-28 w-[77.21px] h-[77.21px] hidden md:block'/>
    </section>
  )
}

export default AboutUs