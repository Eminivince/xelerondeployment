import triangle from '../../images/tri.png';
import BNB from '../../images/bnb.png';
import cex from '../../images/cex.png';
import { TokenA, TokenC, TokenD } from '../../contracts';

export const TokenList = [
  {
    logo: triangle,
    name: TokenA.name,
    address: TokenA.address,
    symbol: TokenA.symbol,
  },
  {
    logo: triangle,
    name: TokenC.name,
    address: TokenC.address,
    symbol: TokenC.symbol,
  },
  {
    logo: cex,
    name: TokenD.name,
    address: TokenD.address,
    symbol: TokenD.symbol,
  },
];
