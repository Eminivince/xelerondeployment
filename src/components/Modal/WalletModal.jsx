import React from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import groupWallet from '../../images/groupwallet.png';
import { hideWalletModal } from '../Features/ModalSlice';

function WalletModal() {
  const dispatch = useDispatch()

  const wallets = [
    {name: 'XLRAsset', imgSrc: groupWallet, id: 1},
    {name: 'WalletConnect', imgSrc: groupWallet, id: 2},
    {name: 'Coinbase Wallet', imgSrc: groupWallet, id: 3},
    {name: 'Fortmatic', imgSrc: groupWallet, id: 4},
    {name: 'Portis', imgSrc: groupWallet, id: 5},
  ]

  return (
    <div className="">
      <div className="bg-[#061111B8] fixed w-full h-fit min-h-[100vh] top-0 left-0 backdrop-blur-[4px] z-50"></div>
        <div className='bg-[#152F30] w-full max-w-[464px] sm:w-[464px] h-[564px] p-4 absolute top-8 left-1/2 -translate-x-1/2 z-50 rounded-lg'>
            <header className='flex items-center mb-6'>
                <h3 className='ml-auto'>Connect to a wallet</h3>
                <div className='ml-auto cursor-pointer' onClick={() => dispatch(hideWalletModal())}><AiOutlineClose /></div>
            </header>

            <div id='hide-scroll' className='h-[455px] mb-2 overflow-y-scroll'>
              {wallets.map(wallet => {
                return <Link key={wallet.id} className='block h-[72px] w-full px-3 bg-[#1B595B] border-[1px] border-[#69CED1] rounded-[8px] mb-4'><button className='flex justify-between items-center w-full h-full'><span>{wallet.name}</span><img src={wallet.imgSrc} alt="wallet-icon" /></button></Link>
              })}  
            </div>
            <p>New to Ethereum? <a href="" className='text-[#69CED1] underline decoration-[#69CED1]'>Learn more about wallets</a></p>
        </div>
    </div>
  )
}

export default WalletModal