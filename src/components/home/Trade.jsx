import React from 'react';
import Swap from '../../images/swapIcon.png';
import Farm from '../../images/farmIcon.png';
import Line1 from '../../images/line1.png';
import Launch from '../../images/launchIcon.png';
import Lend from '../../images/lendIcon.png';
import { Link } from 'react-router-dom';

function Trade() {
  return (
    <section className='text-white bg-[rgba(105,206,209,0.15)] py-10 md:py-16'>
        <h5 className="text-center hidden sm:block text-[36px]">Xeleron Ecosystem</h5>
        <div className='relative mb-[80px]'>
            <h1 className='text-center text-[36px] sm:text-[45px] md:text-[64px] leading-[45px] sm:leading-[90%] md:leading-[125%] relative'>Trade . <span className='text-[#69CED1] relative'>Earn <img src={Line1} alt='line' className='absolute -left-9 -bottom-3 min-w-[150%] hidden md:block' /></span> . Lend</h1>
        </div>

        <div className='flex justify-center px-4 sm:px-0'>
            <div className='md:w-[684px] flex flex-col md:flex-row md:flex-wrap'>
                <div className='bg-[#69CED1] w-full sm:w-[327px] h-[438px] rounded-[36px] pt-[76px] pb-4 px-4 sm:px-8 flex flex-col justify-between order-1'>
                    <img src={Swap} alt="swap Icon" className='w-[82px] h-[82px] self-center'/>
                    <h3 className='self-center text-[30px] text-[#2C3131]'>Swap</h3>
                    <p className='text-center text-[#1C3738]'>Trade effortlessly on Xeleron and take full advantage of the lowest fees and deep liquidity across numerous pairs for an optimized trading experience</p>
                    <Link to="/swap"><button className='w-full bg-[#001C1D] h-[60px] rounded-[16px] text-[#69CED1] hover:bg-[#183b3b] duration-300'>Swap Now</button></Link>
                </div>

                <div className='border border-[#69CED1] w-full sm:w-[327px] h-[377px] rounded-[36px] pt-[76px] pb-4 px-4 sm:px-8 flex flex-col justify-between ml-auto mt-7 md:mt-0 order-2'>
                    <img src={Farm} alt="swap Icon" className='w-[82px] h-[82px] self-center'/>
                    <h3 className='self-center text-[30px]'>Farm</h3>
                    <p className='text-center'>Maximize Earnings in Dynamic High-Yield Farms with highly sustainable APR.</p>
                    <Link><button className='w-full text-[#1C3738] h-[60px] rounded-[16px] bg-[#69CED1] hover:bg-[#1c4b4b] duration-300 hover:text-white'>Coming Soon</button></Link>
                </div>

                <div className='border border-[#69CED1] w-full sm:w-[327px] h-[377px] rounded-[36px] pt-[46px] pb-4 px-4 sm:px-8 flex flex-col justify-between mt-7 md:mt-[30px] order-4 md:order-3'>
                    <img src={Launch} alt="swap Icon" className='w-[82px] h-[82px] self-center'/>
                    <h3 className='self-center text-[30px]'>Launchpad</h3>
                    <p className='text-center'>Stay ahead with Xeleron's Launchpad, Secure Early Access to Vetted and High-Potential Projects on Arbitrum</p>
                    <Link><button className='w-full text-white opacity-[0.6] h-[60px] rounded-[16px] bg-[#092223] hover:bg-[#091717] duration-300'>Browse Projects</button></Link>
                </div>

                <div className='bg-[#69CED1] w-full sm:w-[327px] h-[438px] rounded-[36px] pt-[76px] pb-4 px-4 sm:px-8 flex flex-col justify-between ml-auto mt-7 md:-mt-[30px] order-3 md:order-4'>
                    <img src={Lend} alt="swap Icon" className='w-[82px] h-[82px] self-center'/>
                    <h3 className='self-center text-[30px] text-[#092223]'>Lend</h3>
                    <p className='text-center text-[#011718]'>Maximize earnings with Xeleron. Use your assets as collateral to lend and amplify earning potential. Optimize your DeFi strategy now</p>
                    <Link><button className='w-full bg-[#092223] h-[60px] rounded-[16px] text-white hover:bg-[#1c4b4b] duration-300 hover:text-white'>Coming Soon</button></Link>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Trade