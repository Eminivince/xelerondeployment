import { createSlice } from '@reduxjs/toolkit';
import { TokenList } from '../Temporary/TokenList';

const initialState = {
  Token_List: TokenList,
  currentImport: {},
  currentImportSwapFrom: {},
  defaultTokenSwapFrom: {},
  defaultTokenSwapTo: {},
  displayImportToken: false,
  displayImportTokenSwapFrom: false,
  currentlyImportingForSwapFrom: false,
  currentlyImportingForSwapTo: false,
};

const tokenSlice = createSlice({
  name: 'token_slice',
  initialState,
  reducers: {
    importToken: (state, { payload }) => {
      state.currentImport = state.Token_List.find(
        (token) => token.id === payload
      );
      state.displayImportToken = true;
    },
    ValidateImport: (state) => {
      state.defaultTokenSwapTo = state.currentImport;
    },
    ValidateImportSwapFrom: (state) => {
      state.defaultTokenSwapFrom = state.currentImportSwapFrom;
    },
    hideImportToken: (state) => {
      state.displayImportToken = false;
    },
    importTokenSwapFrom: (state, { payload }) => {
      state.currentImportSwapFrom = state.Token_List.find(
        (token) => token.id === payload
      );
      state.displayImportTokenSwapFrom = true;
    },
    hideImportTokenSwapFrom: (state) => {
      state.displayImportTokenSwapFrom = false;
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
  importToken,
  importTokenForSwapFromAndSwapTo,
  hideImportToken,
  importTokenSwapFrom,
  hideImportTokenSwapFrom,
  selectDefaultSwapFrom,
  selectDefaultSwapTo,
  ValidateImportSwapFrom,
  ValidateImport,
  switchDefaultSwap,
} = tokenSlice.actions;

export default tokenSlice.reducer;
