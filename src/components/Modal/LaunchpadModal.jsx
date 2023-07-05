import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Swapdone from '../../images/swapDone.png';
import { TokenA } from '../../contracts';


function LaunchpadModal({setModal}) {

  function closeLaunchpadModal(){
    setModal(false)
  }
  
  return (
    <div>
      <div className="bg-[#061111B8] fixed w-full h-[100vh] min-h-[100vh] top-0 left-0 backdrop-blur-[4px] z-50"></div>
      <div className="bg-[#152F30] w-[80%] max-w-[464px] sm:w-[464px] h-[408px] p-4 fixed top-[20%] left-1/2 -translate-x-1/2 z-50 rounded-lg">
        <div className="mb-[60px]">
          <i
            className="ml-auto block w-fit cursor-pointer"
            onClick={closeLaunchpadModal}
            
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
          Contributing {1} {'ETH '}
          for {12000} {'XLR'}
        </p>
        <button className="bg-[#1B595B] text-[#69CED1] w-[95%] block mx-auto h-[48px] rounded-[100px] mt-12">
          Add {'Token'} to Wallet
        </button>
      </div>
    </div>
  );
}

export default LaunchpadModal;
