import React from 'react';
import { useSelector } from 'react-redux';
import AltNav from '../components/AltNav';
import SettingsModal from '../components/Modal/SettingsModal';
import CreateAPair from '../components/Pool/CreateAPair';
import ImportTokenModal from '../components/Pool/ImportTokenModal';
import Liquidity from '../components/Pool/Liquidity';
import PoolTokenModal from '../components/Pool/PoolTokenModal';
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
function Pool() {

  const { address, isConnected } = useAccount();
  const { transactionSettingsModal } = useSelector((store) => store.modal);
  const { displayPoolTokenModal, displayCreateAPair, displayImportTokenFirstInput } = useSelector(
    (store) => store.poolFunc
  );
  const current = 'pool'

  return (
    <main className='text-white relative min-h-[100vh]'>
        <AltNav current={current}/>
        {displayPoolTokenModal &&<PoolTokenModal />}
        {displayImportTokenFirstInput && <ImportTokenModal />}
        {transactionSettingsModal && <SettingsModal />}
        { !displayCreateAPair ? <Liquidity /> :
        <CreateAPair /> }
    </main>
  );
}

export default Pool;
