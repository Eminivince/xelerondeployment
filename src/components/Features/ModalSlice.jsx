import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  walletModal: false,
  transactionSettingsModal: false,
  tokenModal: false,
  manageModal: false,
  swapETHModal: false,
  transactionSubmitModal: false
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    displayWalletModal: (state) => {
      state.walletModal = true;
    },
    hideWalletModal: (state) => {
      state.walletModal = false;
    },
    showTransactionSettingsModal: (state) => {
      state.transactionSettingsModal = true;
    },
    hideTransactionSettingsModal: (state) => {
      state.transactionSettingsModal = false;
    },
    displayTokenModal: (state) => {
      state.tokenModal = true;
    },
    hideTokenModal: (state) => {
      state.tokenModal = false;
    },
    displayManageModal: (state) => {
      state.manageModal = true;
    },
    hideManageModal: (state) => {
      state.manageModal = false;
    },
    displaySwapETHforToken: (state) => {
      state.swapETHModal = true;
    },
    hideSwapETHforToken: (state) => {
      state.swapETHModal = false;
    },
    displayTransactionSubmitted: (state) => {
      state.transactionSubmitModal = true;
    },
    hideTransactionSubmitted: (state) => {
      state.transactionSubmitModal = false;
    },
  },
});

export const {
  displayWalletModal,
  hideWalletModal,
  showTransactionSettingsModal,
  hideTransactionSettingsModal,
  displayTokenModal,
  hideTokenModal,
  displayManageModal,
  hideManageModal,
  displaySwapETHforToken,
  hideSwapETHforToken,
  hideTransactionSubmitted,
  displayTransactionSubmitted
} = modalSlice.actions;

export default modalSlice.reducer;
