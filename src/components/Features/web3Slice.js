import { createSlice } from '@reduxjs/toolkit';
import Web3Modal from 'web3modal';
import { currentNetwork } from '../../contracts';

const initialState = {
  web3Modal: new Web3Modal({
    network: currentNetwork.name,
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
