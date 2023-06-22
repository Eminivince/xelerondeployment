import React, { useState } from 'react';
import { AiOutlineDown, AiOutlineSetting, AiOutlineLeft } from 'react-icons/ai';
import { BsArrowDownUp } from 'react-icons/bs';
import { MdLoop } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { showTransactionSettingsModal } from '../Features/ModalSlice';
import blackDiamond from '../../images/blackdiamond.png';
import {
  removeCreateAPair,
  showPoolTokenModal,
  showConfirmSupplyModal,
} from '../Features/PoolSlice';
import ConfirmSupplyModal from './ConfirmSupplyModal';

function CreateAPair() {
  const { displayConfirmSupplyModal, firstInputToken } = useSelector(
    (store) => store.poolFunc
  );
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    input1: '',
    input2: '',
  });

  function updateInputs(e) {
    const { name, value } = e.target;
    setInputs((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  return (
    <div>
      {displayConfirmSupplyModal && <ConfirmSupplyModal />}
      <section
        className={`w-full max-w-[464px] sm:w-[464px] ${
          inputs.input1 * 1 && inputs.input2 * 1 && !inputs.input1.includes(' ')
            ? 'h-[520px]'
            : 'h-[432px]'
        } px-3 sm:px-[24px] pt-[24px] pb-[32px] bg-[#152F30] rounded-[8px] m-auto`}
      >
        <header className="flex items-center mb-2 justify-between">
          <i
            className="cursor-pointer"
            onClick={() => dispatch(removeCreateAPair())}
          >
            <AiOutlineLeft />
          </i>
          <h3 className="">Create a pair</h3>
          <div
            className="cursor-pointer"
            onClick={() => dispatch(showTransactionSettingsModal())}
          >
            <AiOutlineSetting />
          </div>
        </header>

        <div>
          <div>
            <h3 className="">Input</h3>
            <div className="flex justify-between">
              <input
                type="text"
                name="input1"
                value={inputs.input1}
                onChange={updateInputs}
                placeholder="0"
                className="w-[50%] sm:w-[230px] pr-[8%] sm:pr-[25px] bg-[#152F30] outline-none text-[20px] sm:text-[34px]"
              />

              <div
                className="flex items-center cursor-pointer"
                onClick={() => dispatch(showPoolTokenModal())}
              >
                <img
                  src={
                    firstInputToken.logo ? firstInputToken.logo : blackDiamond
                  }
                  alt="black-diamond"
                  className="w-[40px] h-[40px]"
                />
                <span className="text-[18px] ml-2">
                  {firstInputToken.symbol ? firstInputToken.symbol : 'ETH'}
                </span>
                <i className="ml-2">
                  <AiOutlineDown />
                </i>
              </div>
            </div>
            <p>Balance: 70.42</p>
          </div>

          <div className="bg-white h-[2px] my-7 flex items-center justify-end">
            <button className="bg-[#1B595B] w-[40px] h-[40px] rounded-full flex items-center justify-center cursor-pointer">
              <BsArrowDownUp />
            </button>
          </div>

          <div>
            <h3>Input</h3>
            <div className="flex justify-between">
              <input
                type="text"
                name="input2"
                value={inputs.input2}
                onChange={updateInputs}
                id=""
                placeholder="0"
                className="w-[50%] sm:w-[230px] pr-2 bg-[#152F30] outline-none text-[20px] sm:text-[34px]"
              />

              {inputs.input1 * 1 &&
              inputs.input2 * 1 &&
              !inputs.input1.includes(' ') ? (
                <div className="flex items-center cursor-pointer">
                  <img
                    src={blackDiamond}
                    alt="black-diamond"
                    className="w-[40px] h-[40px]"
                  />
                  <span className="text-[18px] ml-2">AWC</span>
                  <i className="ml-2">
                    <AiOutlineDown />
                  </i>
                </div>
              ) : (
                <button
                  className="flex items-center text-[#011718] bg-[#69CED1] w-[170px] h-[48px] justify-center rounded-[100px] hover:opacity-70 cursor-pointer"
                  onClick={() => dispatch(showPoolTokenModal())}
                >
                  Select a Token{' '}
                  <i className="ml-2 text-white">
                    <AiOutlineDown />
                  </i>
                </button>
              )}
            </div>
            <p>Balance: -</p>
          </div>
        </div>

        {inputs.input1 * 1 &&
        inputs.input2 * 1 &&
        !inputs.input1.includes(' ') ? (
          <div className="my-8 text-[#DCDCDC]">
            <p className="flex justify-between items-center mb-5">
              <span>Share of Pool</span>
              <span>0.14%</span>
            </p>
            <p className="flex justify-between items-center">
              <span>Price</span>
              <span className="flex items-center">
                0.0021672 ETH per 1INCH{' '}
                <i className="ml-2 rotate-[300deg]">
                  <MdLoop />
                </i>
              </span>
            </p>
          </div>
        ) : (
          ''
        )}

        {inputs.input1 * 1 &&
        inputs.input2 * 1 &&
        !inputs.input1.includes(' ') ? (
          <button
            className="text-[#011718] h-[48px] w-full max-w-[384px] sm:w-[384px] bg-[#69CED1] block m-auto mt-7 rounded-[100px]"
            onClick={() => dispatch(showConfirmSupplyModal())}
          >
            Supply
          </button>
        ) : (
          <button className="text-[#1B595B] h-[48px] w-full max-w-[384px] sm:w-[384px] bg-[#1C3738] block m-auto mt-7 rounded-[100px] cursor-not-allowed">
            Invalid Pair
          </button>
        )}
      </section>

      {inputs.input1 * 1 &&
      inputs.input2 * 1 &&
      !inputs.input1.includes(' ') ? (
        <p className="w-full max-w-[464px] sm:w-[464px] m-auto px-5 py-5">
          By adding liquidity earn 0.3% of all trades on this pair proportional
          to your share of the pool. Fees are added to the pool, accrue in real
          time and can be claimed by withdrawing your liquidity
        </p>
      ) : (
        ''
      )}
    </div>
  );
}

export default CreateAPair;
