import React from 'react'
import { AiOutlineDown, AiOutlineSetting } from 'react-icons/ai'
import { BsArrowDownUp } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { showTransactionSettingsModal } from '../Features/ModalSlice';
import blackDiamond from '../../images/blackdiamond.png';

function CreateAPair() {

    const dispatch = useDispatch()
  return (
    <div>
        <section className='w-full max-w-[464px] sm:w-[464px] h-[432px] px-3 sm:px-[24px] pt-[24px] pb-[32px] bg-[#152F30] rounded-[8px] m-auto'>
            <header className='flex items-center mb-2'>
                <h3 className='ml-auto'>Swap</h3>
                <div className='ml-auto cursor-pointer' onClick={() => dispatch(showTransactionSettingsModal())}><AiOutlineSetting /></div>
            </header>

            <div>
                <div>
                    <h3 className='text-[20px]'>Swap from</h3>
                    <div className='flex justify-between'>
                        <input
                            type="text"
                            name="from"
                            placeholder='0'
                            className='w-[50%] sm:w-[230px] pr-[8%] sm:pr-[25px] bg-[#152F30] outline-none text-[20px] sm:text-[34px]'
                        />
        
                        <div className='flex items-center cursor-pointer'>
                            <img src={blackDiamond} alt="black-diamond" className='w-[40px] h-[40px]'/>
                            <span className='text-[18px] ml-2'>ETH</span>
                            <i className='ml-2'><AiOutlineDown /></i>
                        </div>
                    </div>
                    <p>Balance: 70.42</p>
                </div>


                <div className='bg-white h-[2px] my-7 flex items-center justify-end'>
                    <button className='bg-[#1B595B] w-[40px] h-[40px] rounded-full flex items-center justify-center cursor-pointer'><BsArrowDownUp /></button>
                </div>


                <div>
                    <h3>Swap to</h3>
                    <div className='flex justify-between'>
                        <input
                            type="text"
                            name="to"
                            id=""
                            placeholder='0'
                            className='w-[50%] sm:w-[230px] pr-2 bg-[#152F30] outline-none text-[20px] sm:text-[34px]'
                        />
                        <button className='flex items-center text-[#011718] bg-[#69CED1] w-[170px] h-[48px] justify-center rounded-[100px] hover:opacity-70 cursor-pointer'>Select a Token <i className='ml-2 text-white'><AiOutlineDown /></i></button>
                    </div>
                    <p>Balance: -</p>
                </div>
            </div>

            {
                <button className='text-[#1B595B] h-[48px] w-full max-w-[384px] sm:w-[384px] bg-[#1C3738] block m-auto mt-7 rounded-[100px]'>Enter an Amount</button>
            }
        </section>
    </div>
  )
}

export default CreateAPair