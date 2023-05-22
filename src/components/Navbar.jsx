import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Xeleron from '../images/xeleronlogo.png';
import { FaBars } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'

function Navbar() {
  const [toggleMobileNav, setToggleMobileNav] = useState(true)

  function toggleNav(){
    setToggleMobileNav(prevValue => !prevValue)
  }
  return (
    <nav className='flex items-center justify-between h-[80px] px-6 lg:px-10 fixed top-0 w-full z-[999] bg-[#1E1E1E]'>
        <Link className='text-[30px] text-[#69CED1] flex items-center'><img src={Xeleron} alt="" className='mr-3 w-[37.01px] h-[36.78px]'/> Xeleron</Link>
        <ul className={`w-full lg:w-[35%] flex justify-between text-white lg:text-[14px] fixed lg:static lg:flex-row flex-col top-[80px] ${toggleMobileNav ? 'left-[-50%] scale-[0]' : 'left-0 scale-[1]'} items-center bg-[#1E1E1E] lg:scale-[1] z-[999] text-[24px] px-5 lg:px-0 lg:pb-0 pb-4 transition-all duration-700 delay-700 ease-in-out`}>
            <li className='lg:mb-0 mb-6 hover:opacity-70'><Link>Network</Link></li>
            <li className='lg:mb-0 mb-6 hover:opacity-70'><Link>Developer</Link></li>
            <li className='lg:mb-0 mb-6 hover:opacity-70'><Link>Community</Link></li>
            <li className='lg:mb-0 mb-6 hover:opacity-70'><Link>About</Link></li>
            <li className='lg:hidden block text-[16px] w-full mb-5'><Link><button className='h-[60px] text-[#69CED1] border border-[#69CED1] rounded-[14px] bg-[#011718] w-full hover:opacity-50'>Join Telegram</button></Link></li>
            <li className='lg:hidden block text-[16px] w-full'><Link><button className='h-[60px] bg-[#69CED1] rounded-[14px] text-[#011718] w-full hover:opacity-50'>Get Started Now</button></Link></li>
        </ul>
        <Link className='hidden lg:block'><button className='h-[60px] bg-[#69CED1] rounded-[14px] text-[#011718] px-7'>Join Telegram</button></Link>

        <div className='lg:hidden text-[#69CED1] cursor-pointer text-2xl' onClick={toggleNav}>{ toggleMobileNav ? <FaBars /> : <AiOutlineClose />}</div>
    </nav>
  )
}

export default Navbar