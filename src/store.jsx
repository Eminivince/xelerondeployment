import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './components/Features/ModalSlice';
import transactionReducer from './components/Features/TransactionSettingsSlice';
import tokenReducer from './components/Features/TokenSlice';
import connectionReducer from './components/Features/ConnectAccountSlice';
import swapFuncReducer from './components/Features/SwapFuncSlice';
import web3Reducer from './components/Features/web3Slice';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    transaction: transactionReducer,
    token: tokenReducer,
    connectionStatus: connectionReducer,
    swapFunc: swapFuncReducer,
    web3: web3Reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['web3.web3Modal'],
      },
    }),
});
