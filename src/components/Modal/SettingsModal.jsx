import React, { useState } from 'react';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { hideTransactionSettingsModal } from '../Features/ModalSlice';
import { toggleDeadlineInfo, toggleExpertModeInfo, toggleMultihopsInfo, toggleToleranceInfo } from '../Features/TransactionSettingsSlice';
import ToggleOn from '../../images/expertMode.png';
import ToggleOff from '../../images/noviceMode.png';

function SettingsModal() {

  const dispatch = useDispatch()
  const { slippageTolerance, deadline, expertMode, multihops } = useSelector((store) => store.transaction)

  const [useExpertMode, setUseExpertMode] = useState(false)
  function toggleExpertMode(){
    setUseExpertMode(prevValue => !prevValue)
  }

  const [disableMultihops, setDisableMultihops] = useState(false)
  function toggleDisableMultihops(){
    setDisableMultihops(prevValue => !prevValue)
  }

  return (
    <div>
      <div className='w-[100%] h-[100vh] top-0 left-0 fixed z-10' onClick={() => dispatch(hideTransactionSettingsModal())}></div>
      <div className='w-full max-w-[342px] sm:w-[342px] h-[480px] bg-[#1B595B] rounded-lg absolute top-[135px] left-[10%] md:left-[40%] lg:left-1/2 z-20 flex flex-col justify-between py-7 px-3'>
        <section>
          <h5 className='text-center mb-8 text-[20px] font-[700]'>Transaction Settings</h5>
          <p className='mb-4 flex items-center relative'>
            <span>Slippage Tolerance</span>
            <i className='ml-2 cursor-pointer' onClick={() => {dispatch(toggleToleranceInfo())}}><AiOutlineQuestionCircle /></i>
            { slippageTolerance && <span className='absolute w-[205px] h-[80px]  sm:w-[261px] sm:h-[104px] rounded-lg p-4 bg-[#1C3738] -top-[350%] sm:-top-[450%] text-[12px] left-[20%] sm:left-1/2'>Your transaction will revert if the price changes unfavorably by more than this percentage.</span>}
          </p>
          <div className='flex justify-between items-center mb-7'>
            <input type="text" className='bg-[#1C3738] w-[52px] outline-none h-[40px] rounded-xl text-center' value="0.1%"/>
            <input type="text" className='bg-[#1C3738] w-[52px] outline-none h-[40px] rounded-xl text-center' value="0.5%"/>
            <input type="text" className='bg-[#1C3738] w-[52px] outline-none h-[40px] rounded-xl text-center' value="1%"/>
            <input type="text" className='bg-[#1C3738] w-[72px] outline-none h-[40px] rounded-xl text-center' value="1.00%"/>
          </div>
          <p className='mb-5 flex items-center relative'>
            <span>Transaction Deadline</span>
            <i className='ml-2 cursor-pointer' onClick={() => {dispatch(toggleDeadlineInfo())}}><AiOutlineQuestionCircle /></i>
            { deadline && <span className='absolute w-[205px] h-[80px]  sm:w-[261px] sm:h-[104px] rounded-lg p-4 bg-[#1C3738] -top-[350%] sm:-top-[450%] text-[12px] left-[20%] sm:left-1/2'>Your transaction will revert if it is pending for more than this long</span>}
          </p>
          <div className='flex items-center'>
            <input type="text" value='20' className='w-[100px] h-[40px] bg-[#1D4445] px-[16px] rounded-lg' />
            <p className='ml-[40px]'>minutes</p>
          </div>
        </section>


        <section>
          <h5 className='font-[700] text-[20px] mb-6'>Interface Setting</h5>
          <div>
            <p className='mb-5 flex items-center justify-between relative'>
              <span className='flex items-center'>Toggle Expert Mode<i className='ml-2 cursor-pointer' onClick={() => {dispatch(toggleExpertModeInfo())}}><AiOutlineQuestionCircle /></i></span>

              <img
                src={useExpertMode ? ToggleOn : ToggleOff}
                alt="toggle"
                className='ml-auto w-[45px] h-[25px] cursor-pointer'
                onClick={toggleExpertMode}
              />

              { expertMode && <span className='absolute w-[205px] h-[80px]  sm:w-[261px] sm:h-[104px] rounded-lg p-4 bg-[#1C3738] -top-[350%] sm:-top-[450%] text-[12px] left-[20%] sm:left-1/2'>Bypasses confirmation modals and allows high slippage trades. Use at your own risk</span>}
            </p>

            <p className=' flex items-center justify-between relative'>
              <span className='flex items-center'>Disable Multihops <i className='ml-2 cursor-pointer' onClick={() => {dispatch(toggleMultihopsInfo())}}><AiOutlineQuestionCircle /></i></span>

              <img
                src={disableMultihops ? ToggleOn : ToggleOff}
                alt="toggle"
                className='ml-auto w-[45px] h-[25px] cursor-pointer'
                onClick={toggleDisableMultihops}
              />
              
              { multihops && <span className='absolute w-[205px] h-[44px]  sm:w-[261px] sm:h-[64px] rounded-lg p-2 bg-[#1C3738] -top-[250%] sm:-top-[250%] text-[12px] left-[20%] sm:left-1/2'>Restricts swaps to direct pairs only</span>}
            </p>
          </div>
          <div></div>
        </section>
      </div>
    </div>
  )
}

export default SettingsModal