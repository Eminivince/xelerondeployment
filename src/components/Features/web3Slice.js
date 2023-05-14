import { createSlice } from "@reduxjs/toolkit";
import Web3Modal from "web3modal";

const initialState = {
  web3Modal: new Web3Modal({
    network: "zkSync Era Mainnet",
    providerOptions: {},
    disableInjectedProvider: false,
    cacheProvider: true,
  }),
};

const web3Slice = createSlice({
  name: "web3",
  initialState,
  reducers: {},
});

export default web3Slice.reducer;
