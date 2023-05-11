import React from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import groupWallet from '../../images/groupwallet.png';
import { hideWalletModal } from '../Features/ModalSlice';

function WalletModal() {
  const dispatch = useDispatch()

  return (
    <div className="">
      <div className="bg-[#061111B8] fixed w-full h-fit min-h-[100vh] top-0 left-0 backdrop-blur-[4px] z-50"></div>
        <div className='bg-[#152F30] w-full max-w-[464px] sm:w-[464px] h-[564px] p-4 absolute top-8 left-1/2 -translate-x-1/2 z-50 rounded-lg'>
            <header className='flex items-center mb-5'>
                <h3 className='ml-auto'>Connect to a wallet</h3>
                <div className='ml-auto cursor-pointer' onClick={() => dispatch(hideWalletModal())}><AiOutlineClose /></div>
            </header>

            <div>
              <a href="" className='block h-[72px] w-full px-3 bg-[#1B595B] border-[1px] border-[#69CED1] rounded-[8px] mb-3'><button className='flex justify-between items-center w-full h-full'><span>XLRAsset</span><img src={groupWallet} alt="wallet-icon" /></button></a>
              <a href="" className='block h-[72px] w-full px-3 bg-[#1B595B] border-[1px] border-[#69CED1] rounded-[8px] mb-3'><button className='flex justify-between items-center w-full h-full'><span>WAlletConnect</span><img src={groupWallet} alt="wallet-icon" /></button></a>
              <a href="" className='block h-[72px] w-full px-3 bg-[#1B595B] border-[1px] border-[#69CED1] rounded-[8px] mb-3'><button className='flex justify-between items-center w-full h-full'><span>Coinbase Wallet</span><img src={groupWallet} alt="wallet-icon" /></button></a>
              <a href="" className='block h-[72px] w-full px-3 bg-[#1B595B] border-[1px] border-[#69CED1] rounded-[8px] mb-3'><button className='flex justify-between items-center w-full h-full'><span>Fortmatic</span><img src={groupWallet} alt="wallet-icon" /></button></a>
              <a href="" className='block h-[72px] w-full px-3 bg-[#1B595B] border-[1px] border-[#69CED1] rounded-[8px] mb-3'><button className='flex justify-between items-center w-full h-full'><span>Portis</span><img src={groupWallet} alt="wallet-icon" /></button></a>
            </div>
        </div>
    </div>
  )
}

export default WalletModal