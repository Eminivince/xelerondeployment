import routerABI from './router.abi.json';
import factoryABI from './factory.abi.json';
import erc20ABI from './erc20.abi.json';
const ERC20 = '0x952eC2137def102C2a98a57F449F4A8a7Da1a50C';
const Factory = '0x3d8FCc7D07b9dd7dC2b30410DAa5cE40Cd0ab0d7';
const Pair = '0x672A6F9146e5a72Cf9036569e624FcA5D80B068e';
const UniV2Router = '0x5099cA14e256bd7693154940E8D7357eCc717c26';

const TokenA = {
  name: 'WETH',
  symbol: 'WETH',
  address: '0x1757f2E7BEE5abE1A79532000d05e32D90dD79fF',
  decimals: 18,
};
const TokenC = {
  name: 'Xeleron',
  decimals: 18,
  symbol: 'XLR',
  address: '0x7dB2E8a5E976051909e4ad722294610cC054f989',
};
const TokenD = {
  name: 'NewTokenB',
  decimals: 18,
  symbol: 'NTB',
  address: '0x768021cC61b7741E18D14D9372a3B9CbAf64Da54',
};

export {
  routerABI,
  factoryABI,
  erc20ABI,
  ERC20,
  Factory,
  Pair,
  TokenA,
  TokenC,
  TokenD,
  UniV2Router,
};
