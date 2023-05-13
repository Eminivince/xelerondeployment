import React from 'react';
import { AiOutlineDown } from 'react-icons/ai';
import diamond from '../../images/ashdiamond.png';
import green from '../../images/greenpool.png';
import path from '../../images/pathIcon.png';


function Liquidity() {
    const pools = [
        {name: 'ETH/APY', id: 1, img: diamond},
        {name: 'ETH/AAVE', id: 2, img: diamond}
    ]
  return (
    <section className='w-full max-w-[586px] sm:w-[586px] mx-auto px-3 sm:px-0'>
        <h5 className='mb-5'>Liquidity provider rewards</h5>
        <p className='text-[#DCDCDC] mb-6'>Liquidity providers earn a 0.3% fee on all trades proportional to their share of the pool. Fees are added to the pool, accrue in real time and can be claimed by withdrawing your liquidity.</p>
        <a href="#" className='text-[#69CED1] underline decoration-[#69CED1]'>Read more about providing liquidity</a>

        <div className='flex items-center justify-between mt-9'>
            <p className='text-[12px] sm:text-[16px]'>Your Liquidity</p>
            <div className='flex items-center text-[12px] sm:text-[16px]'>
                <button className='text-[#69CED1] sm:w-[127px] h-[36px] sm:h-[48px] bg-[#1B595B] px-2 rounded-[20px] sm:rounded-[100px]'>Create a Pair</button>
                <button className='text-[#011718] bg-[#69CED1] sm:w-[127px] h-[36px] sm:h-[48px] px-2 rounded-[20px] sm:rounded-[100px] ml-2'>Add Liquidity</button>
            </div>
        </div>

        <p className='text-[#69CED1] ml-3 my-6 flex items-center'>Account analysis and accrued fees <img src={path} alt="path" className='ml-2'/></p>

        <div>
            {
                pools.map(pool => {
                    return <div key={pool.id} className="w-full bg-[#152F30] h-[80px] mb-4 rounded-lg flex items-center justify-between px-5">
                        <div className='flex items-center'>
                            <img className='mr-3' src={diamond} alt="diamond" />
                            <img className='mr-3' src={green} alt="green" />
                            <p>{pool.name}</p>
                        </div>
                        <i className='cursor-pointer'><AiOutlineDown /></i>
                    </div>
                })
            }
        </div>

        <p className='text-center'>Don't see a pool joined? <span className='text-[#69CED1] text-[14px] ml-3'>import it</span></p>
    </section>
  )
}

export default Liquidity