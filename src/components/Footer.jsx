import React from 'react';
import { Link } from 'react-router-dom';
import Xeleron from '../images/xeleronlogo.png';
import icon1 from '../images/icon1.png';
import telegram from '../images/telegram.png';
import twitter from '../images/twitter.png';
import bubble from '../images/bubble.png';

function Footer() {
  return (
    <footer className='bg-[black] flex flex-col md:flex-row text-white justify-between px-3 sm:px-8 py-24'>
        <div className='w-4/6 md:w-[224px] flex flex-col justify-between'>
            <Link className='text-[#69CED1] text-[25.1511px] flex'><img src={Xeleron} alt="" className='mr-3'/> Xeleron</Link>
            <p className='md:hidden my-4 text-[#808080] text-[12px]'>Xeleron aims to cater to the evolving needs of her users with her innovative infrastructures</p>
            <div>
                <div className='flex mb-8'>
                    <Link className='mr-2'><img src={icon1} alt="" /></Link>
                    <Link className='mr-2'><img src={telegram} alt="" /></Link>
                    <Link className='mr-2'><img src={twitter} alt="" /></Link>
                    <Link className='mr-2'><img src={bubble} alt="" /></Link>
                </div>
                <p className='text-[#808080] text-[12px] hidden md:block'>2023 Xeleron. All rights reserved</p>
            </div>
        </div>

        <div className='flex w-full md:w-8/12 justify-between flex-wrap'>
            <div className='w-1/2 md:w-fit mt-7 md:mt-0'>
                <h5 className='text-[#69CED1] mb-4 text-[20px]'>Network</h5>
                <p className='mb-2'>Etherum</p>
                <p className='mb-2'>Polygon</p>
                <p className='mb-2'>Salana</p>
                <p className='mb-2'>PolkaDot</p>
            </div>

            <div className='w-1/2 md:w-fit mt-7 md:mt-0'>
                <h5 className='text-[#69CED1] mb-4 text-[20px]'>Developer</h5>
                <p className='mb-2'>Audit</p>
                <p className='mb-2'>Bug Bounty</p>
                <p className='mb-2'>Git</p>
            </div>

            <div className='w-1/2 md:w-fit mt-7 md:mt-0'>
                <h5 className='text-[#69CED1] mb-4 text-[20px]'>About</h5>
                <p className='mb-2'>Blog</p>
                <p className='mb-2'>Terms of service</p>
                <p className='mb-2'>Cookies Privacy</p>
            </div>

            <div className='w-1/2 md:w-fit mt-7 md:mt-0'>
                <h5 className='text-[#69CED1] mb-4 text-[20px]'>Community</h5>
                <p className='mb-2'>Twitter</p>
                <p className='mb-2'>Discord</p>
                <p className='mb-2'>Medium</p>
                <p className='mb-2'>Telegram</p>
            </div>
        </div>
    </footer>
  )
}

export default Footer