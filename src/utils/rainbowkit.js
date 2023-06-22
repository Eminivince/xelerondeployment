import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { arbitrum, arbitrumGoerli } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { configureChains, createConfig } from 'wagmi';

const { chains, publicClient } = configureChains(
  [arbitrumGoerli, arbitrum], // include your custom network configuration here
  [
    alchemyProvider({ apiKey: 'gazFk7quWo-s9vwaZf63ZbE-3nOE9QNq' }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Xeleron',
  chains,
  projectId: '64d6d7fac93b61c9c5b14a5c1354c397',
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export { wagmiConfig, chains };
