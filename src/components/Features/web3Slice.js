import { createSlice } from '@reduxjs/toolkit';
import { arbitrumGoerli } from 'viem/chains';
import Web3Modal from 'web3modal';

const initialState = {
  web3Modal: new Web3Modal({
    network: arbitrumGoerli.name,
    providerOptions: {},
    disableInjectedProvider: false,
    cacheProvider: true,
  }),
};

const web3Slice = createSlice({
  name: 'web3',
  initialState,
  reducers: {},
});

export default web3Slice.reducer;
