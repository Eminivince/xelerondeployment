import React from 'react'
import { AiOutlineLeft, AiOutlineQuestionCircle } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { removeConfirmRemove, showRemoveLiquidity } from '../../Features/PoolSlice';

function ConfirmRemove() {

    const dispatch = useDispatch()

    function removeConfirm(){
        dispatch(removeConfirmRemove())
        dispatch(showRemoveLiquidity())
    }
  return (
    <div className='w-full mx-auto max-w-[464px] sm:w-[464px]'>
        <section className="w-full min-h-[504px] px-3 sm:px-[24px] pt-[24px] pb-[32px] bg-[#152F30] rounded-[8px] m-auto">
            <header className='flex mb-8 items-center justify-between text-white'>
                <div className='' onClick={removeConfirm}><AiOutlineLeft /></div>
                <h4>You will receive</h4>
                <div className='cursor-pointer'><AiOutlineQuestionCircle /></div>
            </header>

            <div className='mb-7'>
                <div className='flex justify-between mb-2'>
                    <p>0.000226482</p>
                    <div className='flex items-center'>
                        <div className='bg-[#1C3738] w-[24px] h-[24px] mr-2'></div>
                        <p>ETH</p>
                    </div>
                </div>

                <div className='flex justify-between'>
                    <p>0.00069562691</p>
                    <div className='flex items-center'>
                        <div className='bg-[#1C3738] w-[24px] h-[24px] mr-2'></div>
                        <p>AWC</p>
                    </div>
                </div>
            </div>

            <p className='mb-7'>Output is estimated. If the price changes by more than 0.5% your transaction will revert.</p>
            
            <div className='mb-7 text-[#DCDCDC]'>
                <h3 className='mb-4'>ETH/AWC</h3>

                <div className="bg-[#1B595B] px-2 sm:px-5 py-4 rounded-[16px]">
                    <div className='flex justify-between mb-4'>
                        <p>ETH/AWC</p>
                        <div className='flex items-center'>
                            <p>0.32557969903</p>
                            <div className='bg-[#1C3738] w-[24px] h-[24px] ml-2'></div>
                            <div className='bg-[#1C3738] w-[24px] h-[24px] ml-2'></div>
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
            </div>
                
                    
            <button className='text-[#011718] w-full block m-auto h-[48px] bg-[#69CED1] rounded-[100px] sm:w-[384px] hover:opacity-80'>Save</button>

        </section>
    </div>
  )
}

export default ConfirmRemove