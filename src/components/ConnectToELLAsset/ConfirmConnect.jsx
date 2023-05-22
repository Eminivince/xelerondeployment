import React from 'react'
import { AiOutlineClose, AiOutlineDown, AiOutlineLeft } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import Xeleronlogo from '../../images/xeleronlogo.png'
import { removeConfirmConnect, showCustomizeGas } from '../Features/ELLAssetSlice'

function ConfirmConnect() {
    const dispatch = useDispatch()

    function removeConfirm(){
        dispatch(removeConfirmConnect())
    }

    function customizeGas(){
        dispatch(removeConfirmConnect())
        dispatch(showCustomizeGas())
    }
  return (
    <div className='w-full max-w-[464px] sm:w-[464px]'>
        <h3 className='mb-[25px] flex items-center justify-center text-[#00F6FF] text-[20.76px]'><img src={Xeleronlogo} alt='logo' className='mr-2 w-[25px]'/>Xeleron</h3>
        <h3 className='text-center text-[white] text-[24px] mb-7'>Connect to ELLAsset!</h3>
        <section className="w-full min-h-[596px] px-3 sm:px-[24px] pt-[24px] pb-[32px] bg-[#152F30] rounded-[8px] m-auto">
            <header className='flex mb-8 items-center'>
                <div className='mr-1 cursor-pointer' onClick={removeConfirm}><AiOutlineLeft /></div>
                <div className='bg-[#1C3738] w-[40px] h-[40px] rounded-full'></div>
                <div className='ml-3'>
                    <p className='flex items-center text-white'>Floyd Miles <i className='ml-1'><AiOutlineDown /></i></p>
                    <div>Ethereum Main network</div>
                </div>
                <div className='cursor-pointer ml-auto' onClick={removeConfirm}><AiOutlineClose /></div>
            </header>

            <p className='text-white text-[18px] mb-8'>Allow https://app.devaswap.org to spend your Devaswap V2?</p>

            <p className='mb-8'>Do you trust this site? By granting this permission, you’re allowing Https://app.devaswap.org to withdraw your Devaswap V2 and automate transactions for you.</p>
            
            <div className='mb-7'>
                <h5 className='text-[#69CED1] mb-7'>Edit Permission</h5>
                <div className='flex justify-between mb-3'>
                    <p>Transaction Fee</p>
                    <p className='text-[#69CED1] text-[14px]'>Edit</p>
                </div>
                <div className='flex justify-between mb-3'>
                    <p>Owner</p>
                    <div className='text-right'>
                        <p><span>$</span>6.72</p>
                        <p>0.004871 ETH</p>
                    </div>
                </div>
            </div>

                <div>
                    <p className='text-center text-[#69CED1] mb-8'>View Full Transaction Details</p>
                    <div className='flex'>
                        <button className='w-1/2 text-[#69CED1]'><i>Reject</i></button>
                        <button className='text-[#011718] w-1/2 h-[48px] bg-[#69CED1] rounded-[100px]' onClick={customizeGas}>Confirm</button>
                    </div>
                </div>

        </section>
    </div>
  )
}

export default ConfirmConnect