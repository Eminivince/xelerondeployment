import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ConfirmRemove from './LiquidityBox/ConfirmRemove';
import LiquidityMain from './LiquidityBox/LiquidityMain';
import RemoveLiquidity from './LiquidityBox/RemoveLiquidity';

function Liquidity() {
  const { displayRemoveLiquidity, displayConfirmRemove } = useSelector(
    (store) => store.poolFunc
  );

  if (displayConfirmRemove) {
    return <ConfirmRemove />;
  } else if (displayRemoveLiquidity) {
    return <RemoveLiquidity />;
  } else {
    return <LiquidityMain />;
  }
}

export default Liquidity;
