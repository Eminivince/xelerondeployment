import React, { useEffect, useState } from 'react';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import {
  Token,
  Route,
  Trade,
  TokenAmount,
  TradeType,
  Fetcher,
} from '@uniswap/sdk';
import diamond from '../../../images/ashdiamond.png';
import green from '../../../images/greenpool.png';
import path from '../../../images/pathIcon.png';
import { useDispatch } from 'react-redux';
import { showCreateAPair, showRemoveLiquidity } from '../../Features/PoolSlice';
import { TOKENA, TOKENB, currentNetwork, routerABI } from '../../../contracts';
// Uniswap Router contract ABI

const ROUTER_ADDRESS = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'; // Uniswap Router address

function LiquidityMain() {
  const dispatch = useDispatch();

  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    (async function () {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(ROUTER_ADDRESS, routerABI, signer);
      setProvider(provider);
      setContract(contract);
      setAccount(await signer.getAddress());
    })();
  }, []);

  // ...rest of your component

  const [pools, setPools] = useState([
    { name: 'ETH/APY', id: 1, img: diamond, liquidity: false },
    { name: 'ETH/AAVE', id: 2, img: diamond, liquidity: false },
  ]);

  function toggleDisplayFullPool(id) {
    setPools((prevValue) =>
      prevValue.map((pool) =>
        pool.id === id ? { ...pool, liquidity: !pool.liquidity } : pool
      )
    );
  }

  const addLiquidity = async () => {
    if (!provider || !contract) {
      return;
    }

    const tokenA = new Token(
      currentNetwork.chainId,
      TOKENA,
      18,
      'TOKEN1',
      'Token One'
    );
    const tokenB = new Token(
      currentNetwork.chainId,
      TOKENB,
      18,
      'TOKEN2',
      'Token Two'
    );
    const amountADesired = ethers.utils.parseUnits('0.01', tokenA.decimals); //0.01 ETH // replace with actual amount
    const amountBDesired = ethers.utils.parseUnits('100', tokenB.decimals); //100 TOKEN B // replace with actual amount
    const amountAMin = ethers.utils.parseUnits('0.009', tokenA.decimals); // replace with actual amount
    const amountBMin = ethers.utils.parseUnits('99', tokenB.decimals); // replace with actual amount
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from the current Unix time

    try {
      const tx = await contract.addLiquidity(
        tokenA.address,
        tokenB.address,
        amountADesired,
        amountBDesired,
        amountAMin,
        amountBMin,
        account,
        deadline
      );
      await tx.wait();
    } catch (error) {
      console.error('Failed to add liquidity', error);
    }
  };

  return (
    // ...your component JSX
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
            className="text-[#69CED1] sm:w-[127px] h-[36px] sm:h-[48px] bg-[#1B595B] px-2 rounded-[20px] sm:rounded-[100px] hover:brightness-125"
            onClick={() => dispatch(showCreateAPair())}
          >
            Create a Pair
          </button>
          <button
            onClick={addLiquidity}
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
                  <img className="mr-3" src={green} alt="green" />
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
                  <p>0.00092210891</p>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <p>Pooled ETH</p>
                  <p>0.000226482 ETH</p>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <p>Pooled AWC</p>
                  <p>0.00069562691 AWC</p>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <p>Your pool share</p>
                  <p>0.14%</p>
                </div>

                <div>
                  <h6 className="text-center text-[#69CED1] mb-5">Text</h6>

                  <div className="flex justify-between">
                    <button
                      className="bg-[#1B595B] text-[#69CED1] h-[48px] rounded-[100px] w-[48%]"
                      onClick={() => dispatch(showRemoveLiquidity())}
                    >
                      Remove
                    </button>
                    <button className="bg-[#1B595B] text-[#69CED1] h-[48px] rounded-[100px] w-[48%]">
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
