import { createSlice } from '@reduxjs/toolkit';
import { TokenList } from '../Temporary/TokenList';

const initialState = {
  displayCreateAPair: false,
  displayPoolTokenModal: false,
  PoolTokenType: 'first',
  displayConfirmSupplyModal: false,
  displayRemoveLiquidity: false,
  displayConfirmRemove: false,
  temporaryApproval: false,
  Token_List: TokenList,
  firstInputToken: {},
  secondInputToken: {},
  displayImportTokenFirstInput: false,
  firstInputTokenImport: {},
};

const PoolSlice = createSlice({
  name: 'pool',
  initialState,
  reducers: {
    showCreateAPair: (state) => {
      state.displayCreateAPair = true;
    },
    removeCreateAPair: (state) => {
      state.displayCreateAPair = false;
    },
    showPoolTokenModal: (state) => {
      state.displayPoolTokenModal = true;
    },
    setPoolTokenType: (state, { payload }) => {
      state.PoolTokenType = payload;
    },
    removePoolTokenModal: (state) => {
      state.displayPoolTokenModal = false;
    },
    showConfirmSupplyModal: (state) => {
      state.displayConfirmSupplyModal = true;
    },
    removeConfirmSupplyModal: (state) => {
      state.displayConfirmSupplyModal = false;
    },
    showRemoveLiquidity: (state) => {
      state.displayRemoveLiquidity = true;
    },
    removeRemoveLiquidity: (state) => {
      state.displayRemoveLiquidity = false;
    },
    showConfirmRemove: (state) => {
      state.displayConfirmRemove = true;
    },
    removeConfirmRemove: (state) => {
      state.displayConfirmRemove = false;
    },
    setTemporaryApproval: (state) => {
      state.temporaryApproval = true;
    },

    // The functions below are for selecting and importing token for both inputs
    selectTokenForFirstInput: (state, { payload }) => {
      state.firstInputToken = payload;
    },
    selectTokenForSecondInput: (state, { payload }) => {
      state.secondInputToken = payload;
    },
    showPoolImportTokenModal: (state, { payload }) => {
      state.firstInputTokenImport = payload;
      state.displayImportTokenFirstInput = true;
    },
    hidePoolImportTokenModal: (state) => {
      state.displayImportTokenFirstInput = false;
    },
  },
});

export const {
  showCreateAPair,
  removeCreateAPair,
  showPoolTokenModal,
  removePoolTokenModal,
  showConfirmSupplyModal,
  removeConfirmSupplyModal,
  showRemoveLiquidity,
  removeRemoveLiquidity,
  setTemporaryApproval,
  showConfirmRemove,
  removeConfirmRemove,
  selectTokenForFirstInput,
  selectTokenForSecondInput,
  showPoolImportTokenModal,
  hidePoolImportTokenModal,

  setPoolTokenType,
} = PoolSlice.actions;

export default PoolSlice.reducer;
