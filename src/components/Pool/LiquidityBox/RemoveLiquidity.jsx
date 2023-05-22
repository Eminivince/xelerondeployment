import React, { useState } from 'react'
import { AiOutlineClose, AiOutlineLeft, AiOutlineQuestionCircle } from 'react-icons/ai';
import { BsCheckCircle } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeRemoveLiquidity, showConfirmRemove } from '../../Features/PoolSlice'

function RemoveLiquidity() {
    const { temporaryApproval } = useSelector(state => state.poolFunc)
    const dispatch = useDispatch()
    const [display, setDisplay] = useState(temporaryApproval)
    

    function removeAlert(){
        setDisplay(false)
    }

  return (
    <div className='w-full mx-auto max-w-[464px] sm:w-[464px]'>
        <section className="w-full min-h-[518px] px-3 sm:px-[24px] pt-[24px] pb-[32px] bg-[#152F30] rounded-[8px] m-auto">
            <header className='flex mb-8 items-center justify-between text-white'>
                <div className='cursor-pointer' onClick={() => dispatch(removeRemoveLiquidity())}><AiOutlineLeft /></div>
                <h4>Remove Liquidity</h4>
                <div className='cursor-pointer'><AiOutlineQuestionCircle /></div>
            </header>

            <div className='flex justify-between items-center'>
                <p>Amount</p>
                <p>Details</p>
            </div>

            <h2 className='text-white text-[34px] text-center my-8'>50%</h2>

            <div className='flex items-center justify-center mb-5'>
                <div className='mx-[6px] bg-[#1B595B] text-[#69CED1] w-[64px] h-[32px] flex items-center justify-center rounded-lg'>25%</div>
                <div className='mx-[6px] bg-[#1B595B] text-[#69CED1] w-[64px] h-[32px] flex items-center justify-center rounded-lg'>50%</div>
                <div className='mx-[6px] bg-[#1B595B] text-[#69CED1] w-[64px] h-[32px] flex items-center justify-center rounded-lg'>75%</div>
                <div className='mx-[6px] bg-[#1B595B] text-[#69CED1] w-[64px] h-[32px] flex items-center justify-center rounded-lg'>Max</div>
            </div>
            
            <div className='mb-7 text-[#DCDCDC]'>
                <div className='flex justify-between mb-4'>
                    <p>0.000226482</p>
                    <div className='flex items-center'>
                        <div className='bg-[#1C3738] w-[24px] h-[24px] mr-2'></div>
                        <p>ETH</p>
                    </div>
                </div>

                <div className='flex justify-between mb-4'>
                    <p>0.00069562691</p>
                    <div className='flex items-center'>
                        <div className='bg-[#1C3738] w-[24px] h-[24px] mr-2'></div>
                        <p>AWC</p>
                    </div>
                </div>

                <div className='flex justify-between mb-4'>
                    <p className='text-white'>Price</p>
                    <div className='text-right'>
                        <p>1 ETH = 1,084.40 AWC</p>
                        <p>1 AWC = 0.000922 ETH</p>
                    </div>
                </div>
            </div>
                
                    
            <div className='flex'>
                <button className='w-1/2 text-[#69CED1]'><Link to='/ELLAsset'>Approve</Link></button>
                <button disabled={!temporaryApproval} className={`w-1/2 h-[48px] ${temporaryApproval ? 'bg-[#69CED1] text-[#1B595B]' : 'bg-[#1C3738] text-[#011718]'} rounded-[100px]`} onClick={() => dispatch(showConfirmRemove())}>Remove</button>
            </div>

        </section>

        <section id='filter' className={`text-white w-[80%] max-w-[300px] sm:w-[368px] z-50 rounded-lg px-3 py-5 fixed ${display ? 'top-2' : 'top-[-200%]'} right-2`}>
            <div className='flex'>
                <i className='text-[#6CDA9C] mr-2'><BsCheckCircle /></i>
                <div>
                    <p>Approve Successfully</p>
                    <a href="http://" className='text-[#69CED1] decoration-[#69CED1] underline'>View of Etherscan</a>
                </div>
                <i className='ml-auto cursor-pointer' onClick={removeAlert}><AiOutlineClose /></i>
            </div>
        </section>
    </div>
  )
}

export default RemoveLiquidity