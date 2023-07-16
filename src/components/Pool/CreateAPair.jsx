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
  setPoolTokenType,
} from '../Features/PoolSlice';
import ConfirmSupplyModal from './ConfirmSupplyModal';
import { getEstimatedTokensOut, getPairAddress } from '../../utils/helpers';
import { erc20ABI, pairABI } from '../../contracts';
import { ethers } from 'ethers';
import { formatNumber } from '../../utils/utils';
import { toast } from 'react-toastify';

function CreateAPair({ addLiquidity }) {
  const { displayConfirmSupplyModal, firstInputToken, secondInputToken } =
    useSelector((store) => store.poolFunc);

  const dispatch = useDispatch();
  const { router, factory, signer } = useSelector((s) => s.web3);

  const [inputs, setInputs] = useState({
    token1: '',
    token2: '',
  });
  const [tokensPerUnit, setTokensPerUnit] = useState({
    token1: '',
    token2: '',
  });
  const [liquidityPoolRatio, setLiquidityPoolRatio] = useState(0.0);

  async function updateInputs(e) {
    const { name, value } = e.target;
    if (!firstInputToken.address || !secondInputToken.address) {
      return toast.error('Select tokens');
    }
    setInputs((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
    const oppositeInput = name === 'token1' ? 'token2' : 'token1';

    const pairAddress = await getPairAddress({
      factoryContract: factory,
      TokenA: firstInputToken,
      TokenB: secondInputToken,
    });
    if (pairAddress === '0x0000000000000000000000000000000000000000') {
      setInputs((prevValue) => {
        return {
          ...prevValue,
          [name]: value,
        };
      });
      if (name === 'token1') {
        setTokensPerUnit({
          token1: Number(value) / Number(inputs.token2),
          token2: Number(value) * Number(inputs.token2),
        });
      } else {
        setTokensPerUnit({
          token1: Number(inputs.token1) / Number(value),
          token2: Number(inputs.token1) * Number(value),
        });
      }
      return;
    }
    const pairContract = new ethers.Contract(pairAddress, pairABI, signer);
    const reserve = await pairContract.getReserves();
    const reserve1 = reserve[0].toString();
    const reserve2 = reserve[1].toString();
    const t0 = await pairContract.token0();
    const token0 =
      firstInputToken.address === t0 ? t0 : secondInputToken.address;

    const decimals0 =
      firstInputToken.address === t0
        ? firstInputToken.decimals
        : secondInputToken.decimals;
    const decimals1 =
      token0 === t0 ? secondInputToken.decimals : firstInputToken.decimals;
    let reserve1Big, reserve2Big;
    if (token0 === firstInputToken.address) {
      reserve1Big = ethers.utils.parseUnits(reserve1, decimals0);
      reserve2Big = ethers.utils.parseUnits(reserve2, decimals1);
    } else {
      reserve1Big = ethers.utils.parseUnits(reserve2, decimals0);
      reserve2Big = ethers.utils.parseUnits(reserve1, decimals1);
    }
    let reserveRatio = reserve1Big
      .mul(ethers.constants.WeiPerEther)
      .div(reserve2Big);

    // Format back to a decimal string
    const reserveRatioString = ethers.utils.formatUnits(
      reserveRatio,
      decimals0
    );

    setLiquidityPoolRatio(reserveRatioString);

    const input =
      name === 'token1'
        ? (Number(value) / Number(reserveRatioString)).toString()
        : (Number(reserveRatioString) * Number(value)).toString();
    console.log({
      value,
      reserve1: reserve1Big.toString(),
      reserve2: reserve2Big.toString(),
      reserveRatioString,
      input,
      token0,
      firstInputTokenAddress: firstInputToken.address,
      firstInputTokenName: firstInputToken.name,
    });

    setInputs((prevValue) => {
      return {
        ...prevValue,
        [oppositeInput]: input,
      };
    });

    const amountPerTokenOut = await getEstimatedTokensOut({
      routerContract: router,
      amountIn: '1',
      TokenIn: secondInputToken,
      TokenOut: firstInputToken,
    });
    const amountPerTokenIn = await getEstimatedTokensOut({
      routerContract: router,
      amountIn: '1',
      TokenIn: firstInputToken,
      TokenOut: secondInputToken,
    });
    setTokensPerUnit({
      token1: amountPerTokenOut,
      token2: amountPerTokenIn,
    });
  }
  return (
    <div>
      {displayConfirmSupplyModal && (
        <ConfirmSupplyModal
          {...{
            inputs,
            tokensPerUnit,
            firstInputToken,
            secondInputToken,
            addLiquidity,
            liquidityPoolRatio,
          }}
        />
      )}
      <section
        className={`w-full max-w-[464px] sm:w-[464px] ${
          inputs.token1 * 1 &&
          inputs.token2 * 1 &&
          !inputs.token1?.includes(' ')
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
          <h3 className="">Add Liquidity</h3>
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
                name="token1"
                value={inputs.token1}
                onChange={updateInputs}
                placeholder="0"
                className="w-[50%] sm:w-[230px] pr-[8%] sm:pr-[25px] bg-[#152F30] outline-none text-[20px] sm:text-[34px]"
              />

              <div
                className="flex items-center cursor-pointer"
                onClick={() => {
                  dispatch(showPoolTokenModal());
                  dispatch(setPoolTokenType('first'));
                }}
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
            <p>Balance: {firstInputToken?.balance || 0.0}</p>
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
                name="token2"
                value={inputs.token2}
                onChange={updateInputs}
                id=""
                placeholder="0"
                className="w-[50%] sm:w-[230px] pr-2 bg-[#152F30] outline-none text-[20px] sm:text-[34px]"
              />

              {secondInputToken.address ? (
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => {
                    dispatch(showPoolTokenModal());
                    dispatch(setPoolTokenType('second'));
                  }}
                >
                  <img
                    src={secondInputToken.logo ? secondInputToken.logo : null}
                    alt="black-diamond"
                    className="w-[40px] h-[40px]"
                  />
                  <span className="text-[18px] ml-2">
                    {secondInputToken.symbol}
                  </span>
                  <i className="ml-2">
                    <AiOutlineDown />
                  </i>
                </div>
              ) : (
                <button
                  className="flex items-center text-[#011718] bg-[#69CED1] w-[170px] h-[48px] justify-center rounded-[100px] hover:opacity-70 cursor-pointer"
                  onClick={() => {
                    dispatch(showPoolTokenModal());
                    dispatch(setPoolTokenType('second'));
                  }}
                >
                  Select a Token{' '}
                  <i className="ml-2 text-white">
                    <AiOutlineDown />
                  </i>
                </button>
              )}
            </div>
            <p>
              Balance:{' '}
              {secondInputToken.address ? secondInputToken.balance : 0.0}
            </p>
          </div>
        </div>

        {inputs.token1 * 1 &&
        inputs.token2 * 1 &&
        !inputs.token1.includes(' ') ? (
          <div className="my-8 text-[#DCDCDC]">
            <p className="flex justify-between items-center mb-5">
              <span>Liquidity Pool Ratio</span>
              <span>
                {Number(liquidityPoolRatio) > 1
                  ? Number(liquidityPoolRatio).toExponential(7)
                  : Number(liquidityPoolRatio).toFixed(7)}
                %
              </span>
            </p>
            <p className="flex justify-between items-center">
              <span>Price</span>
              <span className="flex items-center">
                {formatNumber(tokensPerUnit.token1)}
                {`${firstInputToken.symbol}`} per 1{secondInputToken.symbol}
                <i className="ml-2 rotate-[300deg]">
                  <MdLoop />
                </i>
              </span>
            </p>
          </div>
        ) : (
          ''
        )}

        {inputs.token1 * 1 &&
        inputs.token2 * 1 &&
        !inputs.token1.includes(' ') ? (
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

      {inputs.token1 * 1 &&
      inputs.token2 * 1 &&
      !inputs.token1.includes(' ') ? (
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
