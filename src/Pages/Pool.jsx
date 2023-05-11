import React from 'react'
import AltNav from '../components/AltNav'
import Liquidity from '../components/Pool/Liquidity'

function Pool() {
  return (
    <main className='text-white'>
        <AltNav />
        {<Liquidity />}
    </main>
  )
}

export default Pool