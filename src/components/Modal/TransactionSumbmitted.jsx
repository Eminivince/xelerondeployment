import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import Swapdone from '../../images/swapDone.png';
import {
  hideManageModal,
  hideSwapETHforToken,
  hideTransactionSubmitted,
} from '../Features/ModalSlice';

function TransactionSumbmitted({
  swapInputs,
  returnToSwap,
  clearSwapInput,
  txHash,
}) {
  const dispatch = useDispatch();
  function closeModal() {
    dispatch(hideTransactionSubmitted());
    dispatch(hideSwapETHforToken());
    dispatch(hideManageModal());
    returnToSwap();
    clearSwapInput();
  }
  return (
    <div>
      <div className="bg-[#061111B8] fixed w-full h-[100vh] min-h-[100vh] top-0 left-0 backdrop-blur-[4px] z-50"></div>
      <div className="bg-[#152F30] w-full max-w-[464px] sm:w-[464px] h-[408px] p-4 absolute top-8 left-1/2 -translate-x-1/2 z-50 rounded-lg">
        <div className="mb-[60px]">
          <i
            className="ml-auto block w-fit cursor-pointer"
            onClick={closeModal}
          >
            <AiOutlineClose />
          </i>
        </div>
        <img
          src={Swapdone}
          alt="swapdone"
          className="w-[92.22px] h-[91.67px] mx-auto mb-9"
        />
        <p className="text-center mb-4">Transaction Submitted</p>
        <p className="text-center">
          Swapping {swapInputs.from.value + ' '} {swapInputs.from.symbol + ' '}
          for {swapInputs.to.value + ' '} {swapInputs.to.symbol + ' '}
        </p>
        <a
          href={`https://goerli.arbiscan.io/tx/${txHash}`}
          target="_blank"
          rel="noreferrer"
        >
          <button className="bg-[#1B595B] text-[#69CED1] w-[95%] block mx-auto h-[48px] rounded-[100px] mt-12">
            View on Etherscon
          </button>
        </a>
      </div>
    </div>
  );
}

export default TransactionSumbmitted;
