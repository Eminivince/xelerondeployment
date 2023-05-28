import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import groupWallet from '../../images/groupwallet.png';
import metamask from '../../images/metamask.svg';
import { hideWalletModal } from '../Features/ModalSlice';
import { ethers } from 'ethers';
import {
  connectUserAccount,
  disconnectUserAccount,
} from '../Features/ConnectAccountSlice';
import { currentNetwork } from '../../contracts';

function WalletModal() {
  const dispatch = useDispatch();

  const web3Modal = useSelector((state) => state.web3.web3Modal);
  const wallets = [
    { name: 'MetaMask', imgSrc: metamask, id: 0 },
    { name: 'XLRAsset', imgSrc: groupWallet, id: 1 },
    { name: 'WalletConnect', imgSrc: groupWallet, id: 2 },
    { name: 'Coinbase Wallet', imgSrc: groupWallet, id: 3 },
    { name: 'Fortmatic', imgSrc: groupWallet, id: 4 },
    { name: 'Portis', imgSrc: groupWallet, id: 5 },
  ];
  const handleWallectConnect = (id) => {
    if (id === 0) {
      console.log('MetaMask');
      // use web3modal connect to zksync network
      connectWallet();
    }
  };
  async function connectWallet() {
    try {
      const provider = await web3Modal.connect();
      const web3Provider = new ethers.providers.Web3Provider(provider);
      const network = await web3Provider.getNetwork();
      const signer = web3Provider.getSigner();
      const address = await signer.getAddress();
      console.log('Wallet address:', address);

      provider.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
          console.log('User disconnected their wallet');
          web3Modal.clearCachedProvider();
          dispatch(disconnectUserAccount());
          // Perform any necessary cleanup or UI updates here
        } else {
          console.log('User switched accounts:', accounts);
        }
      });
      // Listen for network change
      provider.on('chainChanged', async (_chainIdInHex) => {
        // const chainId = parseInt(chainIdInHex, 16);
        // Refresh the provider instance with the new network
        // const web3Provider = new ethers.providers.Web3Provider(provider);
        // Update the network information

        if (network.chainId !== currentNetwork.chainId) {
          alert(`Please switch back to ${currentNetwork.name}`);
        }
      });

      // Check if the connected network matches the desired one (e.g., "zksync mainnet")
      if (network.chainId !== currentNetwork.chainId) {
        try {
          // Request to switch the network to ${currentNetwork.name}
          await provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: currentNetwork.chainIdHex }], // 0x140 is the chainId for ${currentNetwork.name}
          });
          console.log('Switched to the ' + currentNetwork.name);
        } catch (switchError) {
          console.error(
            'Failed to switch to the ' + currentNetwork.name + ':',
            switchError
          );

          // If the wallet_switchEthereumChain request fails, try to add the ${currentNetwork.name}
          try {
            await provider.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: currentNetwork.chainIdHex, // chainId for ${currentNetwork.name} (320 in hexadecimal)
                  chainName: currentNetwork.name,
                  nativeCurrency: {
                    name: `${currentNetwork.name}`,
                    symbol: `${currentNetwork.symbol}`,
                    decimals: 18,
                  },
                  rpcUrls: [`${currentNetwork.rpcUrl}`], // Replace with the actual RPC URL
                  blockExplorerUrls: [`${currentNetwork.blockExplorer}`], // Replace with the actual block explorer URL
                },
              ],
            });
            console.log(`Added the ${currentNetwork.name}`);
          } catch (addError) {
            console.error(
              `Failed to add the ${currentNetwork.name}:`,
              addError
            );
            alert(`Please switch to the ${currentNetwork.name} manually`);
          }
        }
      } else {
        // Continue with your logic, e.g., creating a contract instance or reading data
        console.log('Connected to the ${currentNetwork.name}');
      }
      dispatch(hideWalletModal());
      dispatch(connectUserAccount(address));
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  }
  return (
    <div className="">
      <div className="bg-[#061111B8] fixed w-full h-fit min-h-[100vh] top-0 left-0 backdrop-blur-[4px] z-50"></div>
      <div className="bg-[#152F30] w-full max-w-[464px] sm:w-[464px] h-[564px] p-4 absolute top-8 left-1/2 -translate-x-1/2 z-50 rounded-lg">
        <header className="flex items-center mb-6">
          <h3 className="ml-auto">Connect to a wallet</h3>
          <div
            className="ml-auto cursor-pointer"
            onClick={() => dispatch(hideWalletModal())}
          >
            <AiOutlineClose />
          </div>
        </header>

        <div id="hide-scroll" className="h-[455px] mb-2 overflow-y-scroll">
          {wallets.map((wallet) => {
            return (
              <Link
                key={wallet.id}
                className="block h-[72px] w-full px-3 bg-[#1B595B] border-[1px] border-[#69CED1] rounded-[8px] mb-4"
              >
                <button
                  className="flex justify-between items-center w-full h-full"
                  onClick={() => handleWallectConnect(wallet.id)}
                >
                  <span>{wallet.name}</span>
                  <img src={wallet.imgSrc} alt="wallet-icon" />
                </button>
              </Link>
            );
          })}
        </div>
        <p>
          New to Ethereum?{' '}
          <a
            href="https://example.com"
            className="text-[#69CED1] underline decoration-[#69CED1]"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more about wallets
          </a>
          Learn more about wallets
        </p>
      </div>
    </div>
  );
}

export default WalletModal;
