import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { removeConfirmSupplyModal } from '../Features/PoolSlice'


function ConfirmSupplyModal() {
  

  const dispatch = useDispatch()

  return (
    <div className=''>
        <div className="bg-[#061111B8] fixed w-full h-[100vh] min-h-[100vh] top-0 left-0 backdrop-blur-[4px] z-50"></div>
        <div className='bg-[#152F30] w-10/12 max-w-[464px] sm:w-[464px] h-[533px] p-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 rounded-lg flex flex-col'>
            <header className='flex items-center mb-5'>
                <h3 className='ml-auto'>You Will Receive</h3>
                <div className='ml-auto cursor-pointer' onClick={() => dispatch(removeConfirmSupplyModal())}><AiOutlineClose /></div>
            </header>
            <h1 className='text-[34px] mb-5'>0.000092210891</h1>    
            <section className='text-[#DCDCDC] mb-7'>
                <p className='text-white mb-4'>ETH/AWC Pool Tokens</p>
                <p>Output is estimated. If the price changes by more than 0.5% your transaction revert</p>
            </section>  
            <section className='text-[#DCDCDC]'>
                <div className="flex justify-between mb-4">
                    <p>ETH Deposited</p>
                    <div>
                        <p></p>
                        <p>0.0425</p>
                    </div>
                </div>  
                <div className="flex justify-between mb-4">
                    <p>USDT Deposited</p>
                    <div>
                        <p></p>
                        <p>0.0425</p>
                    </div>
                </div>  
                <div className="flex justify-between mb-4">
                    <p>Rates</p>
                    <div className='text-right'>
                        <p>1ETH = 1,084.40 AWC</p>
                        <p>1AWC = 0.0000922 ETH</p>
                    </div>
                </div>  
                <div className="flex justify-between mb-4">
                    <p>Share of Pool</p>
                    <p>0.14%</p>
                </div>
            </section>

            <button className='text-[#011718] h-[48px] w-full max-w-[384px] sm:w-[384px] bg-[#69CED1] block m-auto mt-7 rounded-[100px]'>Confirm Supply</button>
        </div>
    </div>
  )
}

export default ConfirmSupplyModal