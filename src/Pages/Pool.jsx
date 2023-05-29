import React from 'react'
import { useSelector } from 'react-redux'
import AltNav from '../components/AltNav'
import SettingsModal from '../components/Modal/SettingsModal'
import CreateAPair from '../components/Pool/CreateAPair'
import Liquidity from '../components/Pool/Liquidity'
import PoolTokenModal from '../components/Pool/PoolTokenModal'

function Pool() {
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
    </main>
  )
}

export default Pool