import React from 'react'
import { AiOutlineClose, AiOutlineDown } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Xeleronlogo from '../../images/xeleronlogo.png'
import { showConfirmConnect } from '../Features/ELLAssetSlice'

function ApproveConnect() {

    const dispatch = useDispatch()

  return (
    <div className='w-full max-w-[464px] sm:w-[464px]'>
        <h3 className='mb-[25px] flex items-center justify-center text-[#00F6FF] text-[20.76px]'><img src={Xeleronlogo} alt='logo' className='mr-2 w-[25px]'/>Xeleron</h3>
        <h3 className='text-center text-[white] text-[24px] mb-7'>Connect to ELLAsset!</h3>
        <section className="w-full min-h-[574px] px-3 sm:px-[24px] pt-[24px] pb-[32px] bg-[#152F30] rounded-[8px] m-auto">
            <header className='flex mb-8'>
                <div className='bg-[#1C3738] w-[40px] h-[40px] rounded-full'></div>
                <div className='ml-3'>
                    <p className='flex items-center text-white'>Floyd Miles <i className='ml-1'><AiOutlineDown /></i></p>
                    <div>Ethereum Main network</div>
                </div>
                <div className='cursor-pointer ml-auto'><AiOutlineClose /></div>
            </header>

            <div className='mb-7'>
                <h4 className='text-[18px] text-white mb-5'>Signature Request</h4>
                <div className='flex justify-between'>
                    <p className='text-white'>Jersey Pinkman</p>
                    <p className='w-[55%] break-words'>https://app.devaswap.org0xBBB6...Ae96e</p>
                </div>
            </div>

            <div>
                <h4 className='text-[18px] text-white mb-5'>Message</h4>
                <div className='mb-10'>
                    <div className='flex justify-between mb-3'>
                        <p>Owner</p>
                        <p className='max-w-[67%] break-words'>0xBBB6A79A12945aC14...e96e</p>
                    </div>


                    <div className='flex justify-between mb-3'>
                        <p>Spender</p>
                        <p className='max-w-[67%] break-words'>0x83D949e0d34xrP29ABd...04</p>
                    </div>


                    <div className='flex justify-between mb-3'>
                        <p>Value</p>
                        <p>43025497</p>
                    </div>


                    <div className='flex justify-between mb-3'>
                        <p>Nonce</p>
                        <p>#12</p>
                    </div>


                    <div className='flex justify-between mb-3'>
                        <p>Deadline</p>
                        <p>1718892230</p>
                    </div>


                </div>

                <div className='flex'>
                    <button className='w-1/2 text-[#69CED1]'><Link to='/pool'>Cancel</Link></button>
                    <button className='text-[#011718] w-1/2 h-[48px] bg-[#69CED1] rounded-[100px]' onClick={() => dispatch(showConfirmConnect())}>Sign</button>
                </div>
            </div>
        </section>
    </div>
  )
}

export default ApproveConnect