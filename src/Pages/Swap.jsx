import React, { useEffect, useState } from 'react';
import {
  AiOutlineClose,
  AiOutlineDown,
  AiOutlineSetting,
  AiOutlineQuestionCircle,
  AiOutlineLeft,
} from 'react-icons/ai';
import { BsArrowDownUp } from 'react-icons/bs';
import AltNav from '../components/AltNav';

import blackDiamond from '../images/blackdiamond.png';
import { useDispatch, useSelector } from 'react-redux';
import SettingsModal from '../components/Modal/SettingsModal';
import {
  displaySwapETHforToken,
  displayTokenModal,
  showTransactionSettingsModal,
} from '../components/Features/ModalSlice';
import TokenModal from '../components/Modal/TokenModal';
import ImportTokenModal from '../components/Modal/ImportTokenModal';
import ManageModal from '../components/Modal/ManageModal';
import SwapETHforToken from '../components/Modal/SwapETHforToken';
import dash from '../images/dash.png';
import cex from '../images/cex.png';
import { ethers } from 'ethers';
import {
  Factory,
  TokenA,
  TokenD,
  UniV2Router,
  erc20ABI,
  factoryABI,
  routerABI,
} from '../contracts';
import Web3Modal from 'web3modal';
import { useAccount } from 'wagmi';
import {
  approveTokens,
  createPair,
  getEstimatedTokensOut,
} from '../utils/helpers';

function Swap() {
  const { transactionSettingsModal, tokenModal, manageModal, swapETHModal } =
    useSelector((store) => store.modal);
  const { displayImportToken } = useSelector((store) => store.token);
  const dispatch = useDispatch();

  const [swapInputs, setSwapInputs] = useState({
    from: {
      value: '',
      address: TokenD.address,
      symbol: TokenD.symbol,
      decimals: TokenD.decimals,
      balance: 0,
    },
    to: {
      value: '',
      address: TokenA.address,
      symbol: TokenA.symbol,
      decimals: TokenA.decimals,
      balance: 0,
    },
  });

  async function fillSwapInputs(e) {
    const { name, value } = e.target;
    let oppositeInput = name === 'from' ? 'to' : 'from';

    setSwapInputs((prevValue) => {
      return {
        ...prevValue,
        [name]: { ...prevValue[name], value },
      };
    });

    if (name === 'from') {
      const amountOut = await getEstimatedTokensOut({
        routerContract,
        amountIn: value,
        TokenIn: swapInputs.from,
        TokenOut: swapInputs.to,
      });

      setSwapInputs((prevValue) => {
        return {
          ...prevValue,
          [oppositeInput]: { ...prevValue[oppositeInput], value: amountOut },
        };
      });
    }
  }

  function clearSwapInputFrom() {
    setSwapInputs((prevValue) => {
      return { ...prevValue, from: '' };
    });
  }

  const [confirmSwap, setConfirmSwap] = useState(false);
  function displayConfirmSwap() {
    setConfirmSwap(true);
  }
  function returnToSwap() {
    setConfirmSwap(false);
  }

  const [confirmSwapInfoBoxes, setConfirmSwapInfoBoxes] = useState({
    displayMinimumReceivedInfo: false,
    displayPriceImpactInfo: false,
    displayLiquidityInfo: false,
  });

  // function removeAllInfo(){
  //     setConfirmSwapInfoBoxes(prevValue => {
  //         return {
  //             displayMinimumReceivedInfo: false,
  //             displayPriceImpactInfo: false,
  //             displayLiquidityInfo: false
  //         }
  //     })
  // }

  function toggleMinimum() {
    setConfirmSwapInfoBoxes((prevValue) => {
      return {
        displayMinimumReceivedInfo: !prevValue.displayMinimumReceivedInfo,
        displayPriceImpactInfo: false,
        displayLiquidityInfo: false,
      };
    });
  }

  function togglePriceImpact() {
    setConfirmSwapInfoBoxes((prevValue) => {
      return {
        displayMinimumReceivedInfo: false,
        displayPriceImpactInfo: !prevValue.displayPriceImpactInfo,
        displayLiquidityInfo: false,
      };
    });
  }

  function toggleLiquidity() {
    setConfirmSwapInfoBoxes((prevValue) => {
      return {
        displayMinimumReceivedInfo: false,
        displayPriceImpactInfo: false,
        displayLiquidityInfo: !prevValue.displayLiquidityInfo,
      };
    });
  }
  const [signer, setSigner] = useState(null);

  const { address, isConnected } = useAccount();
  const [routerContract, setRouterContract] = useState(null);
  const [factoryContract, setFactoryContract] = useState(null);
  const [tokenAContract, setTokenAContract] = useState(null);
  const [tokenBContract, setTokenBContract] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [amountIn, setAmountIn] = useState(10);
  const [amountOut, setAmountOut] = useState(0);
  useEffect(() => {
    if (!isConnected) {
      alert('Please connect your wallet');
      return;
    }
    const web3Modal = new Web3Modal();
    web3Modal.connect().then(async (provider) => {
      const web3Provider = new ethers.providers.Web3Provider(provider);
      const signer = web3Provider.getSigner();
      setSigner(signer);
      const fContract = new ethers.Contract(Factory, factoryABI, signer);
      const rContract = new ethers.Contract(UniV2Router, routerABI, signer);

      setRouterContract(rContract);
      setFactoryContract(fContract);
      const tokenAContract = new ethers.Contract(
        swapInputs.from.address,
        erc20ABI,
        signer
      );
      const tokenBContract = new ethers.Contract(
        swapInputs.to.address,
        erc20ABI,
        signer
      );
      setTokenAContract(tokenAContract);
      setTokenBContract(tokenBContract);

      const balanceAToken = await tokenAContract.balanceOf(address);
      const balanceBToken = await tokenBContract.balanceOf(address);
      const tokenABalance = ethers.utils.formatUnits(
        balanceAToken,
        swapInputs.from.decimals
      );

      const tokenBBalance = ethers.utils.formatUnits(
        balanceBToken,
        swapInputs.to.decimals
      );

      setSwapInputs((prevValue) => {
        return {
          ...prevValue,
          from: { ...prevValue.from, balance: tokenABalance },
          to: { ...prevValue.to, balance: tokenBBalance },
        };
      });

      const PairAddress = await createPair({
        factoryContract: fContract,
        TokenA: TokenA,
        TokenB: TokenD,
      });
      // console.log(PairAddress);
      const amountOut = await getEstimatedTokensOut({
        routerContract: rContract,
        amountIn: `${amountIn}`,
        TokenIn: TokenD,
        TokenOut: TokenA,
      });
      setAmountOut(amountOut);
    });
  }, [address, amountIn, isConnected]);
  const swapExactTokensForTokens = async () => {
    try {
      setIsLoading(true);
      await approveTokens({
        signer,
        TokenA: swapInputs.from,
        TokenB: swapInputs.to,
        amountA: amountIn,
        amountB: amountOut,
      });
      const path = [TokenD.address, TokenA.address];
      const to = address;
      const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
      const amountOutMin = (Number(amountOut) * 0.9).toFixed(
        swapInputs.to.decimals
      );
      console.log(amountOutMin);

      const tx = await routerContract.swapExactTokensForTokens(
        ethers.utils.parseUnits(amountIn.toString(), swapInputs.from.decimals),
        ethers.utils.parseUnits(
          amountOutMin.toString(),
          swapInputs.to.decimals
        ),
        path,
        to,
        deadline,
        { gasLimit: 250000 }
      );

      await tx.wait();
      console.log(`Transaction hash: ${tx.hash}`);
      setIsLoading(false);

      const balanceAToken = await tokenAContract.balanceOf(address);
      const balanceBToken = await tokenBContract.balanceOf(address);
      const tokenABalance = ethers.utils.formatUnits(
        balanceAToken,
        swapInputs.from.decimals
      );

      const tokenBBalance = ethers.utils.formatUnits(
        balanceBToken,
        swapInputs.to.decimals
      );

      setSwapInputs((prevValue) => {
        return {
          ...prevValue,
          from: { ...prevValue.from, value: '', balance: tokenABalance },
          to: { ...prevValue.to, value: '', balance: tokenBBalance },
        };
      });
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  return (
    <div className="text-white bg-[#0E1E1F] min-h-screen relative px-3">
      <AltNav />

      {transactionSettingsModal && <SettingsModal />}
      {tokenModal && <TokenModal />}
      {displayImportToken && <ImportTokenModal />}
      {manageModal && <ManageModal />}
      {swapETHModal && <SwapETHforToken swapInputs={swapInputs.from} />}
      {/* {<TransactionSumbmitted />} */}

      {/* all of the modals for the swap page are contained above and below is the conditional rendering of the swap and confirm swap */}
      {!confirmSwap ? (
        <div>
          <section className="w-full max-w-[464px] sm:w-[464px] h-[432px] px-3 sm:px-[24px] pt-[24px] pb-[32px] bg-[#152F30] rounded-[8px] m-auto">
            <header className="flex items-center mb-2">
              <h3 className="ml-auto">Swap</h3>
              <div
                className="ml-auto cursor-pointer"
                onClick={() => dispatch(showTransactionSettingsModal())}
              >
                <AiOutlineSetting />
              </div>
            </header>

            <div>
              <div>
                <h3 className="text-[20px]">Swap from</h3>
                <div className="flex justify-between relative">
                  <input
                    type="text"
                    name="from"
                    value={swapInputs.from.value}
                    id=""
                    onChange={fillSwapInputs}
                    placeholder="0"
                    className="w-[50%] sm:w-[230px] pr-[8%] sm:pr-[25px] bg-[#152F30] outline-none text-[20px] sm:text-[34px]"
                  />
                  <i
                    className={`absolute left-[45%] sm:left-[210px] top-1/2 -translate-y-1/2 cursor-pointer border w-[20px] h-[20px] rounded-full ${
                      swapInputs.from
                        ? 'flex items-center justify-center'
                        : 'hidden'
                    }`}
                    onClick={clearSwapInputFrom}
                  >
                    <AiOutlineClose />
                  </i>
                  <div className="flex items-center cursor-pointer">
                    <img
                      src={blackDiamond}
                      alt="black-diamond"
                      className="w-[40px] h-[40px]"
                    />
                    <span className="text-[18px] ml-2">ETH</span>
                    <i className="ml-2">
                      <AiOutlineDown />
                    </i>
                  </div>
                </div>
                <p>Balance: {swapInputs.from.balance}</p>
              </div>

              <div className="bg-white h-[2px] my-7 flex items-center justify-end">
                <button className="bg-[#1B595B] w-[40px] h-[40px] rounded-full flex items-center justify-center cursor-pointer">
                  <BsArrowDownUp />
                </button>
              </div>

              <div>
                <h3>Swap to</h3>
                <div className="flex justify-between">
                  <input
                    type="text"
                    name="to"
                    value={swapInputs.to.value}
                    onChange={fillSwapInputs}
                    id=""
                    placeholder="0"
                    className="w-[50%] sm:w-[230px] pr-2 bg-[#152F30] outline-none text-[20px] sm:text-[34px]"
                  />
                  {swapInputs.to === '' ? (
                    <button
                      className="flex items-center text-[#011718] bg-[#69CED1] w-[170px] h-[48px] justify-center rounded-[100px] hover:opacity-70 cursor-pointer"
                      onClick={() => dispatch(displayTokenModal())}
                    >
                      Select a Token{' '}
                      <i className="ml-2 text-white">
                        <AiOutlineDown />
                      </i>
                    </button>
                  ) : (
                    <div className="flex items-center h-[48px] justify-center cursor-pointer">
                      <img src={dash} alt="dash" />
                      <span className="ml-2">Dash </span>
                      <i className="ml-2 text-white">
                        <AiOutlineDown />
                      </i>
                    </div>
                  )}
                </div>
                <p>Balance: {swapInputs.to.balance}</p>
              </div>
            </div>

            {swapInputs.to.value.length > 0 &&
            swapInputs.from.value.length > 0 ? (
              <button
                className={` h-[48px] w-full max-w-[384px] sm:w-[384px]  block m-auto mt-7 rounded-[100px] ${
                  isLoading
                    ? 'bg-[#1C3738] text-[#69CED1]'
                    : 'bg-[#69CED1] text-[#011718]'
                }`}
                // onClick={displayConfirmSwap}
                onClick={swapExactTokensForTokens}
                disabled={isLoading}
              >
                Swap
              </button>
            ) : (
              <button className="text-[#1B595B] h-[48px] w-full max-w-[384px] sm:w-[384px] bg-[#1C3738] block m-auto mt-7 rounded-[100px]">
                Enter an Amount
              </button>
            )}
          </section>
          {swapInputs.to.length > 0 && swapInputs.from.length > 0 ? (
            <div className="text-[#DCDCDC] w-full max-w-[464px] sm:w-[464px] px-3 sm:px-[24px] m-auto mt-5">
              <p className="flex items-center justify-between mb-3">
                <span className="flex items-center relative">
                  Minimum received{' '}
                  <i className="cursor-pointer ml-2" onClick={toggleMinimum}>
                    <AiOutlineQuestionCircle />
                  </i>
                  {confirmSwapInfoBoxes.displayMinimumReceivedInfo && (
                    <span className="absolute w-[205px] h-[80px]  sm:w-[261px] sm:h-[104px] rounded-lg p-4 bg-[#1C3738] -top-[350%] sm:-top-[450%] text-[12px] left-[20%] sm:left-1/2">
                      Your transation will revert if there is a large,
                      unfavorable price movement before it is confirmed
                    </span>
                  )}
                </span>
                <span>{swapInputs.to} 1INCH</span>
              </p>
              <p className="flex items-center justify-between mb-3">
                <span className="flex items-center relative">
                  Price Impact{' '}
                  <i
                    className="cursor-pointer ml-2"
                    onClick={togglePriceImpact}
                  >
                    <AiOutlineQuestionCircle />
                  </i>
                  {confirmSwapInfoBoxes.displayPriceImpactInfo && (
                    <span className="absolute w-[205px] h-[80px]  sm:w-[261px] sm:h-[104px] rounded-lg p-4 bg-[#1C3738] -top-[350%] sm:-top-[450%] text-[12px] left-[20%] sm:left-1/2">
                      The difference between the market price and estimated
                      price due to trade size
                    </span>
                  )}
                </span>
                <span>0.01%</span>
              </p>
              <p className="flex items-center justify-between mb-3">
                <span className="flex items-center relative">
                  Liquidity Provider Free{' '}
                  <i className="cursor-pointer ml-2" onClick={toggleLiquidity}>
                    <AiOutlineQuestionCircle />
                  </i>
                  {confirmSwapInfoBoxes.displayLiquidityInfo && (
                    <span className="absolute w-[205px] h-[80px]  sm:w-[261px] sm:h-[104px] rounded-lg p-4 bg-[#1C3738] -top-[350%] sm:-top-[450%] text-[12px] left-[20%] sm:left-1/2">
                      A portion of each trade (0.30%) goes to liquidity
                      providers as a protocol incentive
                    </span>
                  )}
                </span>
                <span>0.0000066ETH</span>
              </p>
              <a href="" className="text-[#69CED1] block my-5 m-auto w-fit">
                view pair analysis
              </a>
            </div>
          ) : (
            ''
          )}
        </div>
      ) : (
        // confirm swap below
        <section className="w-full max-w-[464px] sm:w-[464px] h-[568px] px-3 sm:px-[24px] pt-[24px] pb-[32px] bg-[#152F30] rounded-[8px] m-auto">
          <header className="flex items-center mb-5 justify-between">
            <i onClick={returnToSwap} className="cursor-pointer">
              <AiOutlineLeft />
            </i>
            <h3 className="">Confirm Swap</h3>
            <div
              className=" cursor-pointer"
              onClick={() => dispatch(showTransactionSettingsModal())}
            >
              <AiOutlineSetting />
            </div>
          </header>

          <div>
            <div className="mb-8">
              <h3 className="">Swap from</h3>
              <div className="flex justify-between relative">
                <p className="w-fit sm:w-[230px] bg-[#152F30] outline-none text-[20px] sm:text-[34px]">
                  {swapInputs.from}
                </p>
                <div className="flex items-center cursor-pointer">
                  <img
                    src={blackDiamond}
                    alt="black-diamond"
                    className="w-[40px] h-[40px]"
                  />
                  <span className="text-[18px] ml-2">ETH</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3>Swap to</h3>
            <div className="flex justify-between">
              <p className="w-[50%] sm:w-[230px] pr-2 bg-[#152F30] outline-none text-[20px] sm:text-[34px]">
                {swapInputs.to}
              </p>
              <div className="flex items-center h-[48px] justify-center cursor-pointer">
                <img src={cex} alt="dash" />
                <span className="ml-2">Cex</span>
                <i className="ml-2 text-white">
                  <AiOutlineDown />
                </i>
              </div>
            </div>
          </div>

          <p className="text-[#DCDCDC] my-5">
            Output is estimated. You will receive at least 938.5 AMPL or the
            transaction will revert.
          </p>

          <div className="text-[#DCDCDC]">
            <p className="flex items-center justify-between mb-3">
              <span className="flex items-center relative">Price</span>
              <span>0.0021672 ETH per 1INCH</span>
            </p>
            <p className="flex items-center justify-between mb-3">
              <span className="flex items-center relative">
                Minimum received{' '}
                <i className="cursor-pointer ml-2" onClick={toggleMinimum}>
                  <AiOutlineQuestionCircle />
                </i>
                {confirmSwapInfoBoxes.displayMinimumReceivedInfo && (
                  <span className="absolute w-[205px] h-[80px]  sm:w-[261px] sm:h-[104px] rounded-lg p-4 bg-[#1C3738] -top-[350%] sm:-top-[450%] text-[12px] left-[20%] sm:left-1/2">
                    Your transation will revert if there is a large, unfavorable
                    price movement before it is confirmed
                  </span>
                )}
              </span>
              <span>{swapInputs.to} 1INCH</span>
            </p>
            <p className="flex items-center justify-between mb-3">
              <span className="flex items-center relative">
                Price Impact{' '}
                <i className="cursor-pointer ml-2" onClick={togglePriceImpact}>
                  <AiOutlineQuestionCircle />
                </i>
                {confirmSwapInfoBoxes.displayPriceImpactInfo && (
                  <span className="absolute w-[205px] h-[80px]  sm:w-[261px] sm:h-[104px] rounded-lg p-4 bg-[#1C3738] -top-[350%] sm:-top-[450%] text-[12px] left-[20%] sm:left-1/2">
                    The difference between the market price and estimated price
                    due to trade size
                  </span>
                )}
              </span>
              <span>0.01%</span>
            </p>
            <p className="flex items-center justify-between mb-3">
              <span className="flex items-center relative">
                Liquidity Provider Free{' '}
                <i className="cursor-pointer ml-2" onClick={toggleLiquidity}>
                  <AiOutlineQuestionCircle />
                </i>
                {confirmSwapInfoBoxes.displayLiquidityInfo && (
                  <span className="absolute w-[205px] h-[80px]  sm:w-[261px] sm:h-[104px] rounded-lg p-4 bg-[#1C3738] -top-[350%] sm:-top-[450%] text-[12px] left-[20%] sm:left-1/2">
                    A portion of each trade (0.30%) goes to liquidity providers
                    as a protocol incentive
                  </span>
                )}
              </span>
              <span>0.0000066ETH</span>
            </p>
          </div>

          <button
            className="text-[#011718] h-[48px] w-full max-w-[384px] sm:w-[384px] bg-[#69CED1] block m-auto mt-7 rounded-[100px]"
            onClick={() => dispatch(displaySwapETHforToken())}
          >
            Confirm Swap
          </button>
        </section>
      )}
    </div>
  );
}

export default Swap;
