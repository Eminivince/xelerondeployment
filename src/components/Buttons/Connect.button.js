import React from 'react';
import { RainbowButton } from '@rainbow-me/rainbow-button';
import { ethers } from 'ethers';

const ConnectWalletButton = () => {
  return (
    <RainbowButton
      chainId={421613}
      connectorOptions={{
        bridge: 'https://bridge.walletconnect.org',
        rpc: {
          421613:
            'https://arb-goerli.g.alchemy.com/v2/gazFk7quWo-s9vwaZf63ZbE-3nOE9QNq',
        },
      }}
      onConnectorInitialized={(connector) => {
        // Initialize ethers with this connector
        const provider = new ethers.providers.Web3Provider(connector);
        // Do something with provider
      }}
      onChainChanged={(chainId) => console.log(`Chain changed to ${chainId}`)}
      onAccountChanged={(account) =>
        console.log(`Account changed to ${account}`)
      }
      onError={(error) => console.error(error)}
    />
  );
};

export default ConnectWalletButton;
