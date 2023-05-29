import React from 'react';
import { useSelector } from 'react-redux';
import AltNav from '../components/AltNav';
import SettingsModal from '../components/Modal/SettingsModal';
import CreateAPair from '../components/Pool/CreateAPair';
import Liquidity from '../components/Pool/Liquidity';
import PoolTokenModal from '../components/Pool/PoolTokenModal';

function Pool() {
<<<<<<< HEAD
  const {transactionSettingsModal} = useSelector((store) => store.modal);
  const { displayPoolTokenModal, displayCreateAPair } = useSelector((store) => store.poolFunc)
  const current = 'pool'

  return (
    <main className='text-white relative min-h-[100vh]'>
        <AltNav current={current}/>
        {displayPoolTokenModal &&<PoolTokenModal />}
        {transactionSettingsModal && <SettingsModal />}
        { !displayCreateAPair ? <Liquidity /> :
        <CreateAPair /> }
=======
  const { transactionSettingsModal } = useSelector((store) => store.modal);
  const { displayPoolTokenModal, displayCreateAPair } = useSelector(
    (store) => store.poolFunc
  );
  return (
    <main className="text-white relative min-h-[100vh]">
      <AltNav />
      {displayPoolTokenModal && <PoolTokenModal />}
      {transactionSettingsModal && <SettingsModal />}
      {!displayCreateAPair ? <Liquidity /> : <CreateAPair />}
>>>>>>> 49d22b81863569929a5cd84d090d31a7fe4220a1
    </main>
  );
}

export default Pool;
