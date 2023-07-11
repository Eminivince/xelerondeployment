import React, { useEffect, useState } from 'react';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import diamond from '../../../images/ashdiamond.png';
import green from '../../../images/greenpool.png';
import path from '../../../images/pathIcon.png';
import { useDispatch, useSelector } from 'react-redux';
import { showCreateAPair, showRemoveLiquidity } from '../../Features/PoolSlice';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import Logo from '../../../images/xeleronlogo.png'

function LiquidityMain() {
  const dispatch = useDispatch();

  const [pools, setPools] = useState([
    { name: 'ETH/XLR', id: 1, img: diamond, liquidity: false },
    { name: 'USDT/XLR', id: 2, img: diamond, liquidity: false },
  ]);

  function toggleDisplayFullPool(id) {
    setPools((prevValue) =>
      prevValue.map((pool) =>
        pool.id === id ? { ...pool, liquidity: !pool.liquidity } : pool
      )
    );
  }

  const { signer } = useSelector((state) => state.web3);

  const { openConnectModal } = useConnectModal();
  const { isConnected } = useAccount();

  function checkIsConnected() {
    if (!isConnected) {
      openConnectModal();
    }
  }
  return (
    <section className="w-full max-w-[586px] sm:w-[586px] mx-auto px-3 sm:px-0">
      <h5 className="mb-5">Liquidity provider rewards</h5>
      <p className="text-[#DCDCDC] mb-6">
        Liquidity providers earn a 0.3% fee on all trades proportional to their
        share of the pool. Fees are added to the pool, accrue in real time and
        can be claimed by withdrawing your liquidity.
      </p>
      <a href="#" className="text-[#69CED1] underline decoration-[#69CED1]">
        Read more about providing liquidity
      </a>

      <div className="flex items-center justify-between mt-9">
        <p className="text-[12px] sm:text-[16px]">Your Liquidity</p>
        <div className="flex items-center text-[12px] sm:text-[16px]">
          <button
            onClick={() => {
              if (!signer) checkIsConnected();
              else dispatch(showCreateAPair());
            }}
            className="text-[#011718] bg-[#69CED1] sm:w-[127px] h-[36px] sm:h-[48px] px-2 rounded-[20px] sm:rounded-[100px] ml-2 hover:brightness-75"
          >
            Add Liquidity
          </button>
        </div>
      </div>

      <p className="text-[#69CED1] ml-3 my-6 flex items-center">
        Account analysis and accrued fees{' '}
        <img src={path} alt="path" className="ml-2" />
      </p>

      <div>
        {pools.map((pool) => {
          return (
            <div
              key={pool.id}
              className={`w-full overflow-hidden ${
                !pool.liquidity ? 'h-[80px]' : 'h-[376px]'
              } mb-4 bg-[#152F30] rounded-lg px-2 sm:px-5`}
            >
              <div className="w-full bg-[#152F30] h-[80px] flex items-center justify-between">
                <div className="flex items-center">
                  <img className="mr-3" src={diamond} alt="diamond" />
                  <img className="mr-3 w-[15%]" src={Logo} alt="green" />
                  <p>{pool.name}</p>
                </div>
                <i
                  className="cursor-pointer"
                  onClick={() => toggleDisplayFullPool(pool.id)}
                >
                  {!pool.liquidity ? <AiOutlineDown /> : <AiOutlineUp />}
                </i>
              </div>

              <div className="mt-6 mb-7 text-[#DCDCDC]">
                <div className="flex items-center justify-between mb-2">
                  <p>Your total pool tokens</p>
                  <p>0.000000000</p>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <p>Pooled ETH</p>
                  <p>0.000000000 ETH</p>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <p>Pooled XLR</p>
                  <p>0.000000000 XLR</p>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <p>Your pool share</p>
                  <p>0.00%</p>
                </div>

                <div>
                  <h6 className="text-center text-[#69CED1] mb-5">Text</h6>

                  <div className="flex justify-between">
                    <button
                      className="bg-[#1B595B] text-[#69CED1] h-[48px] rounded-[100px] w-[48%] hover:bg-[#174849] duration-300"
                      onClick={() => dispatch(showRemoveLiquidity())}
                    >
                      Remove
                    </button>
                    <button className="bg-[#1B595B] text-[#69CED1] h-[48px] rounded-[100px] w-[48%] hover:bg-[#174849] duration-300">
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-center">
        Don't see a pool joined?{' '}
        <span className="text-[#69CED1] text-[14px] ml-3">import it</span>
      </p>
    </section>
  );
}

export default LiquidityMain;
