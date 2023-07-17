import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AltNav from '../components/AltNav';
import SettingsModal from '../components/Modal/SettingsModal';
import CreateAPair from '../components/Pool/CreateAPair';
import ImportTokenModal from '../components/Pool/ImportTokenModal';
import Liquidity from '../components/Pool/Liquidity';
import PoolTokenModal from '../components/Pool/PoolTokenModal';
import { ethers } from 'ethers';
import { useAccount } from 'wagmi';
import { UniV2Router, routerABI, Factory, factoryABI } from '../contracts';
import Web3Modal from 'web3modal';
import { approveTokens, createPair } from '../utils/helpers';
import {
  setFactory,
  setRouter,
  setSigner,
} from '../components/Features/web3Slice';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { setAllToken } from '../components/Features/TokenSlice';
import {
  removeConfirmSupplyModal,
  removeCreateAPair,
} from '../components/Features/PoolSlice';
import { toast } from 'react-toastify';

function Pool() {
  const { transactionSettingsModal } = useSelector((store) => store.modal);
  const {
    displayPoolTokenModal,
    displayCreateAPair,
    displayImportTokenFirstInput,
  } = useSelector((store) => store.poolFunc);

  const { signer, router, factory } = useSelector((state) => state.web3);
  const { address, isConnected } = useAccount();

  const dispatch = useDispatch();
  useEffect(() => {
    if (!isConnected) {
      return;
    }
    const web3Modal = new Web3Modal();
    web3Modal.connect().then(async (provider) => {
      console.log('isConnected');
      const web3Provider = new ethers.providers.Web3Provider(provider);
      const signer = web3Provider.getSigner();
      dispatch(setSigner(signer));
      const fContract = new ethers.Contract(Factory, factoryABI, signer);
      const rContract = new ethers.Contract(UniV2Router, routerABI, signer);

      dispatch(setFactory(fContract));
      dispatch(setRouter(rContract));
    });
  }, [address, dispatch, isConnected]);

  const addLiquidity = async (TokenA, TokenB) => {
    if (!isConnected) {
      return;
    }
    
    const err = await approveTokens({
      signer,
      amountA: TokenA.value,
      amountB: TokenB.value,
      TokenA,
      TokenB,
    });
    if (err) {
      return toast.error(err.message);
    }
    await createPair({
      factoryContract: factory,
      TokenA,
      TokenB,
    });
    const amountADesired = ethers.utils.parseUnits(
      Number(TokenA.value).toFixed(TokenA.decimals),
      TokenA.decimals
    ); // Replace with desired amounts
    const amountBDesired = ethers.utils.parseUnits(
      Number(TokenB.value).toFixed(TokenB.decimals),
      TokenB.decimals
    ); // Replace with desired amounts
    const amountAMin = ethers.utils.parseUnits(
      (Number(TokenA.value) * 0.9).toFixed(TokenA.decimals),
      TokenA.decimals
    ); // Replace with min amounts
    const amountBMin = ethers.utils.parseUnits(
      (Number(TokenB.value) * 0.9).toFixed(TokenB.decimals),
      TokenB.decimals
    ); // Replace with min amounts
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from the current Unix time

    try {
      const tx = await router.addLiquidity(
        TokenA.address,
        TokenB.address,
        amountADesired,
        amountBDesired,
        amountAMin,
        amountBMin,
        address,
        deadline,
        { gasLimit: 2500000 } // added a gas limit here as a safeguard
      );

      console.log(`Transaction hash: ${tx.hash}`);
      const receipt = await tx.wait();
      console.log(`Transaction was mined in block ${receipt.blockNumber}`);
      // Hide all Modals
      dispatch(removeCreateAPair());
      dispatch(removeConfirmSupplyModal());
      toast.success('Liquidity added successfully');
    } catch (err) {
      console.error('Error adding liquidity', err);
    }
  };

  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, 'tokens'));
      const temp = await Promise.all(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
      dispatch(setAllToken(temp));
    })();
  }, [dispatch]);

  const current = 'pool';
  return (
    <main className="text-white relative min-h-[100vh]">
      <AltNav current={current} />
      <div className="pt-[100px]">
        {displayPoolTokenModal && <PoolTokenModal />}
        {displayImportTokenFirstInput && <ImportTokenModal />}
        {transactionSettingsModal && <SettingsModal />}
        {!displayCreateAPair ? (
          <Liquidity />
        ) : (
          <CreateAPair addLiquidity={addLiquidity} />
        )}
      </div>
    </main>
  );
}

export default Pool;
