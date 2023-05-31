import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ConfirmRemove from './LiquidityBox/ConfirmRemove';
import LiquidityMain from './LiquidityBox/LiquidityMain';
import RemoveLiquidity from './LiquidityBox/RemoveLiquidity';
import { ethers } from 'ethers';
import { useAccount, useWalletClient } from 'wagmi';
import {
  TokenA,
  TokenB,
  UniV2Router,
  routerABI,
  erc20ABI,
  Factory,
  factoryABI,
} from '../../contracts';
import Web3Modal from 'web3modal';
// import {
//   useAccount,
//   useContractRead,
//   useContractWrite,
//   usePrepareContractWrite,
//   useWaitForTransaction,
// } from 'wagmi';
function Liquidity() {
  const { displayRemoveLiquidity, displayConfirmRemove } = useSelector(
    (store) => store.poolFunc
  );
  const [signer, setSigner] = useState(null);

  const { address, isConnected } = useAccount();
  const { data } = useWalletClient();
  const [approve, setApprove] = useState(false);
  const [factoryContract, setFactoryContract] = useState(null);
  const [routerContract, setRouterContract] = useState(null);
  const [tokenBalances, setTokenBalances] = useState({
    tokenA: 0,
    tokenB: 0,
  });
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
      setFactoryContract(fContract);
      setRouterContract(rContract);
      const tokenAContract = new ethers.Contract(
        TokenA.address,
        erc20ABI,
        signer
      );
      const tokenBContract = new ethers.Contract(
        TokenB.address,
        erc20ABI,
        signer
      );

      const balanceAToken = await tokenAContract.balanceOf(address);
      const balanceBToken = await tokenBContract.balanceOf(address);
      const tokenABalance = ethers.utils.formatUnits(
        balanceAToken,
        TokenA.decimals
      );

      const tokenBBalance = ethers.utils.formatUnits(
        balanceBToken,
        TokenB.decimals
      );

      console.log(`Balance of Token A: ${tokenABalance}`);
      console.log(`Balance of Token B: ${tokenBBalance}`);
      setTokenBalances({
        tokenA: tokenABalance,
        tokenB: tokenBBalance,
      });
    });
  }, [address, isConnected]);
  const approveTokens = async () => {
    if (!isConnected) {
      alert('Please connect your wallet');
      return;
    }
    if (signer) {
      const tokenAContract = new ethers.Contract(
        TokenA.address,
        erc20ABI,
        signer
      );
      const tokenBContract = new ethers.Contract(
        TokenB.address,
        erc20ABI,
        signer
      );
      const amountA = '0.01';
      const amountB = '1';
      const amountADesired = ethers.utils.parseUnits(amountA, TokenA.decimals); // Replace with desired amounts
      const amountBDesired = ethers.utils.parseUnits(amountB, TokenB.decimals); // Replace with desired amounts
      const tokenABalanceBigNumber = ethers.utils.parseUnits(
        tokenBalances.tokenA,
        TokenA.decimals
      );
      const tokenBBalanceBigNumber = ethers.utils.parseUnits(
        tokenBalances.tokenB,
        TokenB.decimals
      );

      // Check if the token balances are sufficient for approval
      if (tokenABalanceBigNumber.lt(amountADesired)) {
        console.log(`Insufficient ${TokenA.name} balance for approval`);
        throw new Error(`Insufficient ${TokenA.name} balance for approval`);
      }
      if (tokenBBalanceBigNumber.lt(amountBDesired)) {
        console.log(`Insufficient ${TokenB.name} balance for approval`);
        throw new Error(`Insufficient ${TokenB.name} balance for approval`);
      }

      // Approve tokenA
      const txA = await tokenAContract.approve(UniV2Router, amountADesired);
      await txA.wait();

      // Approve tokenB
      const txB = await tokenBContract.approve(UniV2Router, amountBDesired);
      await txB.wait();

      console.log('Tokens approved');
    } else {
      console.log('Insufficient token balance for approval');
    }
  };

  async function getPairAddress() {
    try {
      // Call the getPair function with the token addresses
      const pairAddress = await factoryContract.getPair(
        TokenA.address,
        TokenB.address
      );
      console.log(pairAddress);
      // If the pair doesn't exist, the function will return the zero address
      if (pairAddress === '0x0000000000000000000000000000000000000000') {
        console.log('Pair does not exist');
      } else {
        console.log(`Pair address: ${pairAddress}`);
      }
    } catch (error) {
      console.error(`Failed to get pair address: ${error}`);
    }
  }
  async function createPair() {
    try {
      // Call the createPair function with the token addresses
      const tx = await factoryContract.createPair(
        TokenA.address,
        TokenB.address
      );
      const receipt = await tx.wait();
      console.log(
        `Transaction mined! Pair created with hash: ${receipt.transactionHash}`
      );

      // The PairCreated event is emitted, containing the address of the new pair
      const pairAddress = receipt.events.filter(
        (e) => e.event === 'PairCreated'
      )[0].args.pair;
      console.log(`The new pair's address is: ${pairAddress}`);
      // 0x7dB2E8a5E976051909e4ad722294610cC054f989
    } catch (error) {
      console.error(`Failed to create pair: ${error}`);
    }
  }
  const addLiquidity = async () => {
    if (!isConnected) {
      alert('Please connect your wallet');
      return;
    }

    await approveTokens();

    const amountADesired = ethers.utils.parseUnits('0.001', TokenA.decimals); // Replace with desired amounts
    const amountBDesired = ethers.utils.parseUnits('1', TokenB.decimals); // Replace with desired amounts
    const amountAMin = ethers.utils.parseUnits('0.009', TokenA.decimals); // Replace with min amounts
    const amountBMin = ethers.utils.parseUnits('1', TokenB.decimals); // Replace with min amounts
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from the current Unix time

    try {
      const tx = await routerContract.addLiquidity(
        TokenA.address,
        TokenB.address,
        amountADesired,
        amountBDesired,
        amountAMin,
        amountBMin,
        address,
        deadline,
        { gasLimit: 250000 } // added a gas limit here as a safeguard
      );

      console.log(`Transaction hash: ${tx.hash}`);
      const receipt = await tx.wait();
      console.log(`Transaction was mined in block ${receipt.blockNumber}`);
    } catch (err) {
      console.error('Error adding liquidity', err);
    }
  };

  if (displayConfirmRemove) {
    return <ConfirmRemove />;
  } else if (displayRemoveLiquidity) {
    return <RemoveLiquidity />;
  } else {
    return <LiquidityMain addLiquidity={addLiquidity} />;
  }
}

export default Liquidity;
