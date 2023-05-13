import React from 'react'
import { useSelector } from 'react-redux'
import AltNav from '../components/AltNav'
import SettingsModal from '../components/Modal/SettingsModal'
import CreateAPair from '../components/Pool/CreateAPair'
import Liquidity from '../components/Pool/Liquidity'

function Pool() {
  const {transactionSettingsModal} = useSelector((store) => store.modal)
  return (
    <main className='text-white'>
        <AltNav />
        {transactionSettingsModal && <SettingsModal />}
        {/* {<Liquidity />} */}
        <CreateAPair />
    </main>
  )
}

export default Pool