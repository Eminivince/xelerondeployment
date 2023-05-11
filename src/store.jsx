import { configureStore } from "@reduxjs/toolkit";
import modalReducer from './components/Features/ModalSlice';
import transactionReducer from './components/Features/TransactionSettingsSlice';
import tokenReducer from "./components/Features/TokenSlice";
import connectionReducer from "./components/Features/ConnectAccountSlice";
import swapFuncReducer from "./components/Features/SwapFuncSlice";


export const store = configureStore({
    reducer: {
        modal: modalReducer,
        transaction: transactionReducer,
        token: tokenReducer,
        connectionStatus: connectionReducer,
        swapFunc: swapFuncReducer
    }
})