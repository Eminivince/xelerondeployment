import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: false,
  account: '',
};

const ConnectAccountSlice = createSlice({
  name: 'connectionStatus',
  initialState,
  reducers: {
    connectUserAccount: (state, action) => {
      state.status = true;
      state.account = action.payload;
    },

    disconnectUserAccount: (state) => {
      state = initialState;
    },
  },
});

export const connectUserAccount =
  ConnectAccountSlice.actions.connectUserAccount;
export const disconnectUserAccount =
  ConnectAccountSlice.actions.disconnectUserAccount;

export default ConnectAccountSlice.reducer;
