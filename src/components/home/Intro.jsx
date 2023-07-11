import React from 'react'
import { Link } from 'react-router-dom';
import box1 from '../../images/Shapebox1.png';
import box2 from '../../images/Shapebox2.png';

function Intro() {
  return (
    <div className='flex flex-col md:flex-row md:items-center px-5 md:px-10 pb-16'>
        <section className='w-full md:w-6/12'>
            <h1 className='text-white text-[40px] md:text-[50px] lg:text-[73.39px] leading-[50px] md:leading-[70px] lg:leading-[83px] font-[400px] text-center md:text-left'>The <span className='text-[#69CED1]'>Gateway</span> to the ultimate DeFi experience.</h1>
            <p className='opacity-[0.7] text-white mt-8 text-[20px] lg:text-[24px] text-center md:text-left'>Your all-in-one platform for Trading, Earning, and Lending<span className='hidden sm:inline'>! Embrace unparalleled efficiency and user-friendliness that fully leverages the cutting-edge Arbitrum technology.</span></p>
            <Link to="/swap" className='mt-[50px]'><button className='bg-[#69CED1] rounded-[14px] text-[#011718] w-full md:w-[300px] h-[60px] mt-[30px] hover:brightness-75'>Get Started</button></Link>
        </section>


        <section className='md:ml-auto mt-16 md:mt-0 w-full md:w-5/12 lg:w-4/12 flex flex-col items-center bg-gradient-to-b from-[#132D2E] to-[#1E1E1E] rounded-[14px] relative'>
          <div className='w-[30px] h-[30px] sm:w-[55px] sm:h-[55px] border-dashed border border-[#D9D9D9] rounded-full absolute left-2 top-2 md:left-5 md:top-5 bg-[#1E1E1E]'></div>
          <img src={box1} alt="box 1" className='w-[157.24px] sm:w-[233px] -mt-4 md:-mt-7'/>
          <img src={box2} alt="box 2" className='w-[157.24px] sm:w-[240px]'/>
        </section>
    </div>
  )
}

export default Intro