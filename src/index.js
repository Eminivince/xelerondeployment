import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './store';
import { WagmiConfig } from 'wagmi';
import { chains, wagmiConfig } from './utils/rainbowkit';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { ToastContainer } from 'react-toastify';
import merge from 'lodash.merge';

const root = ReactDOM.createRoot(document.getElementById('root'));

const myTheme = merge(darkTheme(), {
  colors: {
    accentColor: '#1B595B'
  }
});
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains} theme={myTheme}>
          <ToastContainer />
          <App />
        </RainbowKitProvider>
      </WagmiConfig>
    </Provider>
  </React.StrictMode>
);
