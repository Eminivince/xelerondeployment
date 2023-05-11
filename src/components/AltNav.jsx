import React from 'react';
import { AiOutlineEllipsis } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Xeleron from '../images/xeleronlogo.png';
import { displayWalletModal } from './Features/ModalSlice';

function AltNav() {
  const dispatch = useDispatch()
  return (
    <nav className='flex items-center justify-between px-4 h-[80px]'>
        <div className='flex items-center justify-between w-[500px]'>
            <div><Link className='text-[30px] text-[#69CED1] flex items-center'><img src={Xeleron} alt="" className='mr-3 w-[37.01px] h-[36.78px]'/> Xeleron</Link></div>
            <ul className='flex items-center w-[60%]'>
                <li className='w-3/12 text-center relative'><div className='h-[2px] w-full absolute left-0 -bottom-2 bg-white'></div><Link>Swap</Link></li>
                <li className='w-3/12 text-center'><Link>Farm</Link></li>
                <li className='w-6/12 text-center'><Link>About Xeleron</Link></li>
            </ul>
        </div>

        <div className='flex items-center'>
            <button className='w-[144px] h-[40px] rounded-[100px] bg-[#1B595B] text-[14px] text-[#69CED1]' onClick={() => dispatch(displayWalletModal())}>Connect to Wallet</button>
            <button className='w-[56px] h-[40px] rounded-[100px] bg-[#1B595B] ml-[8px] flex items-center justify-center text-[25px]'><AiOutlineEllipsis /></button>
        </div>
    </nav>
  )
}

export default AltNav