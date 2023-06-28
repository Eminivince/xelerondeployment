import { ethers } from 'ethers';
import { UniV2Router, erc20ABI } from '../contracts';

async function getPairAddress({ factoryContract, TokenA, TokenB }) {
  try {
    // Call the getPair function with the token addresses
    const pairAddress = await factoryContract.getPair(
      TokenA.address,
      TokenB.address
    );

    // If the pair doesn't exist, the function will return the zero address
    // if (pairAddress === '0x0000000000000000000000000000000000000000') {
    //   console.log('Pair does not exist');
    // } else {
    //   console.log(`Pair address: ${pairAddress}`);
    // }
    return pairAddress;
  } catch (error) {
    console.error(`Failed to get pair address: ${error}`);
  }
}
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
    const tokenBContract = new ethers.Contract(
      TokenB.address,
      erc20ABI,
      signer
    );
    const amountADesired = ethers.utils.parseUnits(
      `${amountA}`,
      TokenA.decimals
    ); // Replace with desired amounts
    const amountBDesired = ethers.utils.parseUnits(
      `${amountB}`,
      TokenB.decimals
    ); // Replace with desired amounts
    const tokenABalanceBigNumber = ethers.utils.parseUnits(
      `${TokenA.balance}`,
      TokenA.decimals
    );
    const tokenBBalanceBigNumber = ethers.utils.parseUnits(
      `${TokenB.balance}`,
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
const getEstimatedTokensOut = async ({
  routerContract,
  amountIn,
  TokenIn,
  TokenOut,
}) => {
  console.log('getting...');

  // parse the input amount to BigNumber
  const amountInParsed = ethers.utils.parseUnits(
    amountIn.toString(),
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
export { getPairAddress, createPair, approveTokens, getEstimatedTokensOut };
