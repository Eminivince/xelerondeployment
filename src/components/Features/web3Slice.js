import { createSlice } from '@reduxjs/toolkit';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { Factory, UniV2Router, factoryABI, routerABI } from '../../contracts';

const initialState = {
  signer: null,
  factory: null,
  router: null,
  staticSigner: new ethers.providers.JsonRpcProvider(
    'https://arb-goerli.g.alchemy.com/v2/gazFk7quWo-s9vwaZf63ZbE-3nOE9QNq'
  ),
};

const web3Slice = createSlice({
  name: 'web3',
  initialState,
  reducers: {
    setSigner: (state, { payload }) => {
      state.signer = payload;
    },

    setFactory: (state, { payload }) => {
      state.factory = payload;
    },
    setRouter: (state, { payload }) => {
      state.router = payload;
    },

    connectAccount: (state) => {
      const web3Modal = new Web3Modal();
      web3Modal.connect().then(async (provider) => {
        const web3Provider = new ethers.providers.Web3Provider(provider);
        const signer = web3Provider.getSigner();
        setSigner(signer);
        const fContract = new ethers.Contract(Factory, factoryABI, signer);
        const rContract = new ethers.Contract(UniV2Router, routerABI, signer);
        setFactory(fContract);
        setRouter(rContract);
      });
    },
  },
});

export const { setSigner, setFactory, setRouter, connectAccount } =
  web3Slice.actions;
export default web3Slice.reducer;
