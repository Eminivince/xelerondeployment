import React from 'react'
import { AiOutlineClose, AiOutlineLeft } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import Xeleronlogo from '../../images/xeleronlogo.png'
import { removeConfirmConnect, removeCustomizeGas, showConfirmConnect } from '../Features/ELLAssetSlice';
import { setTemporaryApproval } from '../Features/PoolSlice'
import {Link} from 'react-router-dom'

function CustomizeGas() {

    const dispatch = useDispatch()
    function returnToConfirmConnect(){
        dispatch(showConfirmConnect())
        dispatch(removeCustomizeGas())
    }

    function returnToApproveConnect(){
        dispatch(removeConfirmConnect())
        dispatch(removeCustomizeGas())
    }
  return (
    <div className='w-full max-w-[464px] sm:w-[464px]'>
        <h3 className='mb-[25px] flex items-center justify-center text-[#00F6FF] text-[20.76px]'><img src={Xeleronlogo} alt='logo' className='mr-2 w-[25px]'/>Xeleron</h3>
        <h3 className='text-center text-[white] text-[24px] mb-7'>Connect to ELLAsset!</h3>
        <section className="w-full min-h-[804px] px-3 sm:px-[24px] pt-[24px] pb-[32px] bg-[#152F30] rounded-[8px] m-auto">
            <header className='flex mb-8 items-center justify-between text-white'>
                <div className='mr-1 cursor-pointer' onClick={returnToConfirmConnect}><AiOutlineLeft /></div>
                <h4>Customize Gas</h4>
                <div className='cursor-pointer' onClick={returnToApproveConnect}><AiOutlineClose /></div>
            </header>

            <h4 className='text-white text-[18px] mb-4'>Estimated Processing Times</h4>

            <p className='mb-7'>Select a higher gas fee accelerate the processing of your transaction.*</p>

            <div>
                <div className='flex justify-between bg-[#1B595B] w-full rounded-[16px] py-4 px-3 sm:px-4 mb-3 border-[#69CED1] border'>
                    <p>Slow</p>
                    <div className='text-right'>
                        <p>0.00000922 ETH</p>
                        <p>$ 0.016154</p>
                    </div>
                </div>

                <div className='flex justify-between bg-[#1B595B] w-full rounded-[16px] py-4 px-3 sm:px-4 mb-3 border-[#69CED1] border'>
                    <p>Average</p>
                    <div className='text-right'>
                        <p>0.00001844 ETH</p>
                        <p>$ 0.032308</p>
                    </div>
                </div>

                <div className='flex justify-between bg-[#1B595B] w-full rounded-[16px] py-4 px-3 sm:px-4 mb-3 border-[#69CED1] border'>
                    <p>Fast</p>
                    <div className='text-right'>
                        <p>0.00003688 ETH</p>
                        <p>$ 0.064616</p>
                    </div>
                </div>
            </div>

            <p className='mb-6'>* Accelerating a transaction by using a higher gas price increases its chances of getting processed by the network faster, but it is not always guaranteed.</p>
            
            <div className='mb-7'>
                <div className='flex justify-between mb-3'>
                    <p>Send Amount</p>
                    <p>0.00092210891 ETH</p>
                </div>

                <div className='flex justify-between mb-3'>
                    <p>Transaction Fee</p>
                    <p>0.00001844 ETH</p>
                </div>

                <div className='flex justify-between mb-3'>
                    <p className='text-white'>New Total</p>
                    <div className='text-right'>
                        <p>0.00001844 ETH</p>
                        <p>$165</p>
                    </div>
                </div>
            </div>
                
                    
            <Link to='/pool' className='block'><button className='text-[#011718] w-full block m-auto h-[48px] bg-[#69CED1] rounded-[100px] sm:w-[384px] hover:opacity-80' onClick={() => dispatch(setTemporaryApproval())}>Save</button></Link>

        </section>
    </div>
  )
}

export default CustomizeGas