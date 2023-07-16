import { ethers } from 'ethers';
import { UniV2Router, erc20ABI, pairABI } from '../contracts';
import { toast } from 'react-toastify';

async function getPairAddress({ factoryContract, TokenA, TokenB }) {
  try {
    // Call the getPair function with the token addresses
    const pairAddress = await factoryContract.getPair(
      TokenA.address,
      TokenB.address
    );

    // If the pair doesn't exist, the function will return the zero address

    return pairAddress;
  } catch (error) {
    console.error(`Failed to get pair address: ${error}`);
  }
}
const calculatePriceImpact = async ({
  amountIn,
  TokenA,
  pairAddress,
  signer,
}) => {
  amountIn = ethers.utils.parseUnits(amountIn, TokenA.decimals);
  const pairContract = new ethers.Contract(pairAddress, pairABI, signer);
  // Fetch the reserves and tokens from the pair contract
  const reserves = await pairContract.getReserves();
  const token0 = await pairContract.token0();
  const token1 = await pairContract.token1();

  // Check if the token being swapped from is token0 or token1
  let reserveIn, reserveOut;
  if (token0.toLowerCase() === TokenA.address.toLowerCase()) {
    reserveIn = reserves[0];
    reserveOut = reserves[1];
  } else if (token1.toLowerCase() === TokenA.address.toLowerCase()) {
    reserveIn = reserves[1];
    reserveOut = reserves[0];
  } else {
    throw new Error("The input token isn't part of the pair.");
  }
  console.log({
    token0,
    token1,
    reserveIn: reserveIn.toString(),
    reserveOut: reserveOut.toString(),
  });
  // Now you have the correct reserves for the token you're swapping from (reserveIn)
  // and the token you're swapping to (reserveOut)
  const slippageTolerance = 50; // 50 bips, or 0.50%
  // We calculate the price impact
  const amountInWithSlippage = amountIn
    .mul(10000)
    .div(10000 - slippageTolerance); // This accounts for slippage
  const numerator = reserveOut.mul(amountInWithSlippage);
  const denominator = reserveIn.add(amountInWithSlippage);
  const amountOut = numerator.div(denominator);

  const idealOutcome = reserveOut.mul(amountIn).div(reserveIn);
  const slippage = idealOutcome.sub(amountOut);
  const priceImpact = slippage.div(amountIn).mul(100); // Gives the price impact in percentage

  return priceImpact.toString(); // Returns the price impact in percentage
};

async function createPair({ factoryContract, TokenA, TokenB }) {
  try {
    const Pair = await getPairAddress({
      factoryContract,
      TokenA,
      TokenB,
    });
    if (Pair !== '0x0000000000000000000000000000000000000000') {
      return Pair;
    }
    // Call the createPair function with the token addresses
    const tx = await factoryContract.createPair(TokenA.address, TokenB.address);
    const receipt = await tx.wait();
    console.log(
      `Transaction mined! Pair created with hash: ${receipt.transactionHash}`
    );

    // The PairCreated event is emitted, containing the address of the new pair
    const pairAddress = receipt.events.filter(
      (e) => e.event === 'PairCreated'
    )[0].args.pair;
    // console.log(`The new pair's address is: ${pairAddress}`);

    return pairAddress;
  } catch (error) {
    console.error(`Failed to create pair: ${error}`);
  }
}
const approveTokens = async ({ signer, TokenA, TokenB, amountA, amountB }) => {
  if (signer) {
    const tokenAContract = new ethers.Contract(
      TokenA.address,
      erc20ABI,
      signer
    );
    console.log({ TokenA, TokenB, amountA, amountB });
    const amountADesired = ethers.utils.parseUnits(
      `${Number(amountA).toFixed(TokenA.decimals)}`,
      TokenA.decimals
    );
    const tokenABalanceBigNumber = ethers.utils.parseUnits(
      `${TokenA.balance}`,
      TokenA.decimals
    );

    // Replace with desired amounts
    if (tokenABalanceBigNumber.lt(amountADesired)) {
      console.log(`Insufficient ${TokenA.name} balance for approval`);
      return Error(`Insufficient ${TokenA.name} balance `);
    }
    if (TokenB) {
      const tokenBContract = new ethers.Contract(
        TokenB.address,
        erc20ABI,
        signer
      );
      const amountBDesired = ethers.utils.parseUnits(
        `${Number(amountB).toFixed(TokenB.decimals)}`,
        TokenB.decimals
      ); // Replace with desired amounts
      const tokenBBalanceBigNumber = ethers.utils.parseUnits(
        `${TokenB.balance}`,
        TokenB.decimals
      );

      // Check if the token balances are sufficient for approval
      if (tokenBBalanceBigNumber.lt(amountBDesired)) {
        console.log(`Insufficient ${TokenB.name} balance for approval`);
        return Error(`Insufficient ${TokenB.name} balance `);
      }

      // Approve tokenB
      const txB = await tokenBContract.approve(UniV2Router, amountBDesired);
      await txB.wait();
    }

    // Approve tokenA
    const txA = await tokenAContract.approve(UniV2Router, amountADesired);
    await txA.wait();

    console.log('Tokens approved');
  } else {
    console.log('Insufficient token balance for approval');
  }
};
export const getPriceImpact = async ({
  inputAmount,
  inputToken,
  outputToken,
  pairAddress,
  signer,
}) => {
  const pairContract = new ethers.Contract(pairAddress, pairABI, signer);

  // Get reserves for both tokens
  const [reserveA, reserveB] = await pairContract.getReserves();
  const t0 = await pairContract.token0();
  const token0 = inputToken.address === t0 ? t0 : outputToken.address;

  const decimals0 =
    inputToken.address === t0 ? inputToken.decimals : outputToken.decimals;
  const decimals1 = token0 === t0 ? outputToken.decimals : inputToken.decimals;
  // Convert input amount to BigNumber and format it
  const amountIn = ethers.utils.parseUnits(
    inputAmount.toString(),
    inputToken.decimals
  );
  // Define the scaler
  const scaler = ethers.BigNumber.from(10).pow(18);

  // Define reserves based on input and output tokens
  // Define reserves based on input and output tokens
  let reserveIn, reserveOut;
  if (token0 === inputToken.address) {
    reserveIn = ethers.utils.parseUnits(reserveA.toString(), decimals0);
    reserveOut = ethers.utils.parseUnits(reserveB.toString(), decimals1);
  } else {
    reserveIn = ethers.utils.parseUnits(reserveB.toString(), decimals0);
    reserveOut = ethers.utils.parseUnits(reserveA.toString(), decimals1);
  }

  // Calculate new reserves after swap
  const newReserveIn = reserveIn.add(amountIn);
  const newReserveOut = reserveIn
    .mul(reserveOut)
    .mul(ethers.constants.WeiPerEther)
    .div(newReserveIn);

  // Calculate tokens received
  const tokensReceived = reserveOut
    .mul(ethers.constants.WeiPerEther)
    .sub(newReserveOut);
  const tokeReceiveString = ethers.utils.formatUnits(tokensReceived, decimals1);
  const tokensReceivedBig = ethers.utils.parseUnits(
    tokeReceiveString,
    decimals1
  );
  // Calculate price per token
  const pricePerToken = amountIn
    .mul(ethers.constants.WeiPerEther)
    .div(tokensReceivedBig);

  // Calculate price impact
  const marketPrice = reserveIn
    .mul(ethers.constants.WeiPerEther)
    .div(reserveOut);
  const priceImpact = pricePerToken.sub(marketPrice).div(marketPrice);

  // Convert price impact to percent and return
  return ethers.utils.formatUnits(priceImpact.mul(100), decimals0);
};

const getEstimatedTokensOut = async ({
  routerContract,
  amountIn,
  TokenIn,
  TokenOut,
}) => {
  console.log('getting...');

  // parse the input amount to BigNumber
  const amountInParsed = ethers.utils.parseUnits(
    Number(amountIn).toFixed(TokenIn.decimals),
    TokenIn.decimals
  );

  try {
    const amountsOut = await routerContract.getAmountsOut(amountInParsed, [
      TokenIn.address,
      TokenOut.address,
    ]);
    // amountOut is a BigNumber, convert it to a normal number for display
    // This is safe because amountOut will be much less than MAX_SAFE_INTEGER
    const amountOut = ethers.utils.formatUnits(amountsOut[1], 18);
    // console.log(`Estimated amount out: ${amountOut}`);
    console.log(
      `${amountIn} of ${TokenIn.symbol} will be swapped for ${amountOut} of ${TokenOut.symbol}`
    );
    return amountOut;
  } catch (error) {
    console.error('An error occurred', error);
  }
};
function isValidAddress(address) {
  const addressRegex = /^(0x)?[0-9a-fA-F]{40}$/;
  return addressRegex.test(address);
}

export async function addTokenToWallet(
  tokenAddress,
  tokenSymbol,
  tokenDecimals
) {
  // Check if the MetaMask extension is installed
  if (!window.ethereum) {
    console.log('Please install MetaMask first.');
    return;
  }

  // Check if the MetaMask extension is connected to a wallet
  if (!window.ethereum.isConnected()) {
    console.log('Please connect MetaMask to a wallet first.');
    return;
  }

  // Suggest the user to add the token to their wallet
  try {
    const wasAdded = await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: tokenAddress,
          symbol: tokenSymbol,
          decimals: tokenDecimals,
        },
      },
    });

    if (wasAdded) {
      console.log('Thanks for your interest!');
    } else {
      console.log('Your loss!');
    }
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

export {
  getPairAddress,
  createPair,
  approveTokens,
  getEstimatedTokensOut,
  calculatePriceImpact,
  isValidAddress,
};
