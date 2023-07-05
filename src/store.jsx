import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './components/Features/ModalSlice';
import transactionReducer from './components/Features/TransactionSettingsSlice';
import tokenReducer from './components/Features/TokenSlice';
import connectionReducer from './components/Features/ConnectAccountSlice';
import swapFuncReducer from './components/Features/SwapFuncSlice';
import web3Reducer from './components/Features/web3Slice';
import PoolReducer from './components/Features/PoolSlice';
import ELLAssetReducer from './components/Features/ELLAssetSlice';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    transaction: transactionReducer,
    token: tokenReducer,
    connectionStatus: connectionReducer,
    swapFunc: swapFuncReducer,
    web3: web3Reducer,
    poolFunc: PoolReducer,
    ellAssetFunc: ELLAssetReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: [
          'web3.signer',
          'web3.factory',
          'web3.router',
          'web3.staticSigner',
        ],
        ignoredActions: [
          'web3/setSigner',
          'web3/setRouter',
          'web3/setFactory',
          'web3/connectAccount',
          'token_slice/getAllToken',
        ],
      },
    }),
});
