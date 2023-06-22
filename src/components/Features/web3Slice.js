import { createSlice } from '@reduxjs/toolkit';
import { arbitrumGoerli } from 'viem/chains';
import Web3Modal from 'web3modal';

const initialState = {
  signer: null,
};

const web3Slice = createSlice({
  name: 'web3',
  initialState,
  reducers: {
    setSigner: (state, { payload }) => {
      state.signer = payload;
    },
  },
});

export const { setSigner } = web3Slice.actions;
export default web3Slice.reducer;
