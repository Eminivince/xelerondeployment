import React, { useEffect } from 'react';
import { AiOutlineEllipsis } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Xeleron from '../images/xeleronlogo.png';
import { displayWalletModal } from './Features/ModalSlice';
import { ethers } from 'ethers';
import {
  connectUserAccount,
  disconnectUserAccount,
} from './Features/ConnectAccountSlice';
function AltNav() {
  const dispatch = useDispatch();
  const { status: connectStatus, account } = useSelector(
    (state) => state.connectionStatus
  );
  const { web3Modal } = useSelector((state) => state.web3);

  useEffect(() => {
    if (!connectStatus) {
      (async () => {
        if (web3Modal.cachedProvider) {
          const provider = await web3Modal.connect();

          const web3Provider = new ethers.providers.Web3Provider(provider);
          const signer = web3Provider.getSigner();
          const address = await signer.getAddress();
          console.log('address', address);
          dispatch(connectUserAccount(address));
          const network = await web3Provider.getNetwork();
          if (network.chainId !== 324) {
            alert('Please switch back to zkSync Era Mainnet');
          }

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
            // Refresh the provider instance with the new network
            // const chainId = parseInt(chainIdInHex, 16);
            const web3Provider = new ethers.providers.Web3Provider(provider);
            // Update the network information
            const network = await web3Provider.getNetwork();

            // console.log('Network changed:', network);
            if (network.chainId !== 324) {
              alert('Please switch back to zkSync Era Mainnet');
            }
          });
        }
      })();
    }
  }, [connectStatus, dispatch, web3Modal]);
  return (
    <nav className="flex items-center justify-between px-4 h-[80px]">
      <div className="flex items-center justify-between w-[500px]">
        <div>
          <Link className="text-[30px] text-[#69CED1] flex items-center">
            <img
              src={Xeleron}
              alt=""
              className="mr-3 w-[37.01px] h-[36.78px]"
            />{' '}
            Xeleron
          </Link>
        </div>
        <ul className="flex items-center w-[60%]">
          <li className="w-3/12 text-center relative">
            <div className="h-[2px] w-full absolute left-0 -bottom-2 bg-white"></div>
            <Link>Swap</Link>
          </li>
          <li className="w-3/12 text-center">
            <Link>Farm</Link>
          </li>
          <li className="w-6/12 text-center">
            <Link>About Xeleron</Link>
          </li>
        </ul>
      </div>

      <div className="flex items-center">
        {!connectStatus && !account ? (
          <button
            className="w-[144px] h-[40px] rounded-[100px] bg-[#1B595B] text-[14px] text-[#69CED1]"
            onClick={() => dispatch(displayWalletModal())}
          >
            Connect to Wallet
          </button>
        ) : (
          <button className="w-[144px] h-[40px] rounded-[100px] bg-[#1B595B] text-[14px] text-[#69CED1]">
            {account.slice(0, 6) +
              '...' +
              account.slice(account.length - 4, account.length)}
          </button>
        )}
        <button className="w-[56px] h-[40px] rounded-[100px] bg-[#1B595B] ml-[8px] flex items-center justify-center text-[25px]">
          <AiOutlineEllipsis />
        </button>
      </div>
    </nav>
  );
}

export default AltNav;
