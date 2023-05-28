import routerABI from './router.abi.json';
const ERC20 = '0x5bE9b60502c117b72503F99F67ad50f7756813cD';
const WETH9 = '0xAb3CA752Bf63E908bc43EdF19CB9De010B908995';
const FACTORY = '0x3078dD13Fe75607FBF7131D429EC95fC5FFeeCD5';
const PAIR = '0x28c8C75E216f2E2a7ED7719072454e53ab6e3aE8';

const ROUTER = '0x808b11Ec473b61860c97c7019edaaFAe0Adf06d5';

const TOKENA = '0x450D1611aD93Acee8356d4ef403CE0A365654aC3';
const TOKENB = '0x716B9e4a358A57902fC555F0dD5bfF4Ad41972bd';
const networks = {
  testnet: {
    name: 'Arbitrum Testnet',
    chainId: 421613,
    chainIdHex: '0x66eed',
    rpcUrl:
      'https://arb-goerli.g.alchemy.com/v2/gazFk7quWo-s9vwaZf63ZbE-3nOE9QNq',
    symbol: 'AGOR',
    blockExplorer: 'https://goerli.arbiscan.io',
  },
};
const currentNetwork = networks.testnet;
export {
  ERC20,
  WETH9,
  FACTORY,
  PAIR,
  ROUTER,
  TOKENA,
  TOKENB,
  routerABI,
  currentNetwork,
};
