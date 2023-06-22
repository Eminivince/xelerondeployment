import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import {
  displayTransactionSubmitted,
  hideSwapETHforToken,
} from '../Features/ModalSlice';

function SwapETHforToken({ swapInputs, swapExactTokensForTokens, isLoading }) {
  // const [display, setFilterManage] = useState({
  //     list: '',
  //     token: ''
  //   })

  const dispatch = useDispatch();

  const [display, setDisplay] = useState({
    details: true,
    data: false,
  });

  function displayDetails() {
    setDisplay((prevValue) => {
      return { details: true, data: false };
    });
  }

  function displayData() {
    setDisplay((prevValue) => {
      return { details: false, data: true };
    });
  }
  return (
    <div>
      <div className="bg-[#061111B8] fixed w-full h-[100vh] min-h-[100vh] top-0 left-0 backdrop-blur-[4px] z-50"></div>

      <div className="bg-[#152F30] w-full max-w-[464px] sm:w-[464px] h-[518px] p-4 absolute top-8 left-1/2 -translate-x-1/2 z-50 rounded-lg ">
        <header className="flex items-center mb-[40px]">
          <h3 className="ml-auto text-[20px]">Swap Exact ETH for Token</h3>
          <div
            className="ml-auto cursor-pointer"
            onClick={() => dispatch(hideSwapETHforToken())}
          >
            <AiOutlineClose />
          </div>
        </header>

        <div>
          <h1 className="text-center text-[34px] mb-2">{swapInputs}</h1>
          <p className="text-center text-[#DCDCDC]">$39.67</p>
        </div>

        <div className="flex justify-center h-[40px] border-b-[1px] border-[#1B595B] mt-[30px] mb-8">
          <div
            className="cursor-pointer relative h-full"
            onClick={displayDetails}
          >
            Details{' '}
            <div
              className={`${
                display.details ? 'w-full' : ''
              } h-[2px] bg-white absolute bottom-0`}
            ></div>
          </div>
          <div
            className="cursor-pointer relative h-full ml-5"
            onClick={displayData}
          >
            Data{' '}
            <div
              className={`${
                display.data ? 'w-full' : ''
              } h-[2px] bg-white absolute bottom-0`}
            ></div>
          </div>
        </div>

        <div>
          {display.details ? (
            <div>
              <div className="flex justify-between mb-7">
                <p>
                  Gas fee{' '}
                  <span className="text-[#69CED1] text-[12px]">Edit</span>
                </p>
                <div>
                  <p>0.000066 ETH</p>
                  <p className="text-[#DCDCDC]">$0.12</p>
                </div>
              </div>

              <div className="flex justify-between">
                <div>
                  <p>Total</p>
                  <p className="text-[#DCDCDC]">(Amount + gas fee)</p>
                </div>
                <div>
                  <p>0.022066 ETH</p>
                  <p className="text-[#DCDCDC]">$39.78</p>
                </div>
              </div>

              <div className="flex mt-[40px] items-center">
                <div className="w-1/2 flex justify-center">
                  <p className="text-[#69CED1]">Reject</p>
                </div>
                <button
                  className="bg-[#69CED1] w-1/2 text-black hover:bg-[#266161] hover:text-white h-[48px] rounded-[100px]"
                  onClick={() => swapExactTokensForTokens()}
                  disabled={isLoading}
                >
                  Confirm
                </button>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
}

export default SwapETHforToken;
