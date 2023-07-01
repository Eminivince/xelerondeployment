import { createSlice } from '@reduxjs/toolkit';
import blackDiamond from '../../images/blackdiamond.png';

const initialState = {
  Token_List: [],
  currentImport: {},
  defaultTokenSwapFrom: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
    logo: blackDiamond,
    address: '0x0000000000000000000000000000000000000000',
  },
  defaultTokenSwapTo: {},
  displayImportToken: false,
};

const tokenSlice = createSlice({
  name: 'token_slice',
  initialState,
  reducers: {
    setAllToken: (state, { payload }) => {
      state.Token_List = payload;
    },

    hideImportToken: (state) => {
      state.displayImportToken = false;
    },
    importTokenSwap: (state, { payload }) => {
      state.currentImport = payload;
      state.displayImportToken = true;
    },
    hideImportTokenSwapFrom: (state) => {
      state.displayImportToken = false;
    },
    selectDefaultSwapFrom: (state, { payload }) => {
      state.defaultTokenSwapFrom = payload;
    },
    selectDefaultSwapTo: (state, { payload }) => {
      state.defaultTokenSwapTo = payload;
    },
    switchDefaultSwap: (state) => {
      const temp = state.defaultTokenSwapFrom;
      state.defaultTokenSwapFrom = state.defaultTokenSwapTo;
      state.defaultTokenSwapTo = temp;
    },
  },
});

export const {
  setAllToken,
  importTokenForSwapFromAndSwapTo,
  hideImportToken,
  importTokenSwap,
  hideImportTokenSwapFrom,
  selectDefaultSwapFrom,
  selectDefaultSwapTo,
  switchDefaultSwap,
} = tokenSlice.actions;

export default tokenSlice.reducer;
