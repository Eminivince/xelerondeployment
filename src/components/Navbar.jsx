import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Xeleron from '../images/xeleronlogo.png';
import { FaBars } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'
import { AiFillTwitterCircle } from 'react-icons/ai';
import { BsTelegram, BsDiscord, BsMedium } from 'react-icons/bs';

function Navbar() {
  const [toggleMobileNav, setToggleMobileNav] = useState(true)
  const [showDropdown, setShowDropdown] = useState(false);
  


  const scrollToElement = () => {
    const element = document.getElementById('network');
    element.scrollIntoView({ behavior: 'smooth' });
  };

  function toggleNav(){
    setToggleMobileNav(prevValue => !prevValue)
    setShowDropdown(false);
  }
  return (
    <nav className='flex items-center justify-between h-[80px] px-6 lg:px-10 fixed top-0 w-full z-[999] bg-[#1E1E1E]'>
        <Link className='text-[30px] text-[#69CED1] flex items-center'><img src={Xeleron} alt="" className='mr-3 w-[37.01px] h-[36.78px]'/> Xeleron</Link>
        <ul id='hide-scroll' className={`w-full lg:w-[35%] flex justify-between text-white lg:text-[14px] fixed lg:static lg:flex-row flex-col top-[80px] ${toggleMobileNav ? 'right-[-100%]' : 'right-0 max-h-[calc(100vh-80px)] overflow-y-scroll lg:overflow-y-hidden pb-9'} items-center bg-[#1E1E1E] z-[999] text-[24px] px-5 lg:px-0 lg:pb-0 pb-4 transition-all duration-300 delay-300 ease-in-out`}>
        <li className={`lg:mb-0 mb-6  relative ${showDropdown ? 'z-10' : ''}`} onClick={() => setShowDropdown((prevValue) => !prevValue)}>
  <Link className='hover:opacity-70'>Community</Link>
  {showDropdown && (
    <div className='absolute top-full left-0 bg-[#152627] p-5 mt-5 md:flex flex-col space-y-4 w-[200%] text-md rounded-b-lg border-t-2 z-[99999] duration-300 delay-300 ease-in'>
      <div className='flex items-center space-x-3 hover:font-semibold'>
        <AiFillTwitterCircle />
      <a href='https://twitter.com/XeleronFi'>Twitter</a>
      </div>
      <div className='flex items-center space-x-3 hover:font-semibold'>
        <BsTelegram />
      <a href='https://t.me/XeleronFinance'>Telegram</a>
      </div>
      <div className='flex items-center space-x-3 hover:font-semibold'>
        <BsDiscord />
      <a href='https://discord.com/'>Discord</a>
      </div>
      <div className='flex items-center space-x-3 hover:font-semibold'>
        <BsMedium />
      <a href='http://xeleronfi.medium.com'>Medium</a>
      </div>
      
      
    </div>
  )}
</li>

            <li className='lg:mb-0 mb-6 hover:opacity-70'><a href='https://github.com/'>Developer</a></li>
            <li onClick={scrollToElement} className='lg:mb-0 mb-6 hover:opacity-70'  ><Link>Network</Link></li>
            <li className='lg:mb-0 mb-6 hover:opacity-70'><a href='https://xeleron.gitbook.io/xeleron/' >Documentation</a></li>
            <li className='lg:hidden block text-[16px] w-full mb-5'><a href='https://t.me/XeleronFinance'><button className='h-[60px] text-[#69CED1] border border-[#69CED1] rounded-[14px] bg-[#011718] w-full hover:opacity-50'>Join Telegram</button></a></li>
            <li className='lg:hidden block text-[16px] w-full'><Link to='/swap'><button className='h-[60px] bg-[#69CED1] rounded-[14px] text-[#011718] w-full hover:opacity-50'>Swap</button></Link></li>
        </ul>
        <div  className='hidden lg:block'><button className='h-[60px] bg-[#69CED1] rounded-[14px] text-[#011718] px-7'><a href='https://t.me/XeleronFinance'>Join Telegram</a></button></div>

        <div className='lg:hidden text-[#69CED1] cursor-pointer text-2xl' onClick={toggleNav}>{ toggleMobileNav ? <FaBars /> : <AiOutlineClose />}</div>
    </nav>
  )
}

export default Navbar