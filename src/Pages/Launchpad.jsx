import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Logo from '../images/xeleronlogo.png'
import icon1 from '../images/icon1.jpg'
import icon2 from '../images/icon2.jpg'
import icon3 from '../images/icon3.jpg'
import icon4 from '../images/icon4.jpg'
import TwitterIcon from '../images/icons8-twitter.svg'
import TelegramIcon from '../images/icons8-telegram-app.svg'
import DiscordIcon from '../images/icons8-discord-144.svg'

const Launchpad = () => {

    const idoArray = [
        {
          name: "Xeleron",
          date: "May 22, 2023",
          fundraisingAmount: 100000,
          image: icon2,
        },
        {
          name: "XYZ Token",
          date: "July 10, 2023",
          fundraisingAmount: 50000,
          image: icon3
        },
        {
          name: "ABC Coin",
          date: "August 5, 2023",
          fundraisingAmount: 75000,
          image: icon4
        }
      ];
      

    const [idoData, setIdoData] = useState(idoArray)

    console.log(idoData)

    const mappedArray = idoData.map((idoData) => (
        <div className='border-2 p-3 rounded-xl'>
            <div className='flex justify-between pb-3'>
                <div>{idoData.date}</div>
                <div>Hardcap: {idoData.fundraisingAmount}</div>
            </div>
            <img src={idoData.image} alt='nft' className='w-80 mb-3 rounded-xl' />
            <div className='flex justify-between items-center'>
                <div className='socialls flex w-6 space-x-2'>
                    <img src={TwitterIcon} alt='twitter' />
                    <img src={TelegramIcon} alt='telegram' />
                    <img src={DiscordIcon} alt='discord' />
                </div>
                <div>
                    <p>Coming Soon</p>
                </div>
            </div>
        </div>
    ))

    console.log(mappedArray)
      

  return (
    <div className='text-white'>
        <Navbar />
        <div className='launchpad--container pt-6 px-8 flex flex-col justify-center items-center pt-[120px]'>
            <h1 className='font-bold text-7xl mb-4'> <span className='text-[#69CED1]'>Xeleron</span> Launchpad</h1>
            <p className='mb-8 w-[50%] text-lg text-center'>Ignite your investments with trail blazing projects backed by top industry experts and enthusiasts. Explore cutting-edge technologies and be at the forefront of decentralized finance. Join us and unleash the future of finance today</p>
            <div className='card--container flex space-x-5  w-full mb-8 justify-center'>
                {mappedArray}
            </div>

            <div className='Ido--detailcard flex flex-col items-center p-6 ring-4 ring-[#69CED1] h-content w-full rounded-md border mb-8'>
                <div className='flex w-[100%] justify-between mb-4'>
                    <div className='hardcap bg-black p-2 rounded-lg'>
                        ${750000}
                    </div>
                    <div className='date bg-black p-2 rounded-lg'>
                        4th April
                    </div>
                </div>
                <div className='flex flex-col items-center' >
                    <img src={Logo} className='w-24 h-24 mb-4' alt='xeleron' />
                    <h1 className='font-bold text-8xl mb-4'>Xeleron</h1>
                    <p className='text-lg text-center mb-4'>At DeFi Nexus, we curate a handpicked selection of the most promising projects, meticulously vetted for their potential to disrupt and transform the DeFi landscape. Our rigorous evaluation process ensures that only the most exceptional ventures make it to our platform. We believe in quality over quantity, providing you with a curated ecosystem of high-potential opportunities</p>
                    <div className='flex space-x-4'>
                        <img className='w-10' src={TwitterIcon} alt='twitter' />
                        <img className='w-10' src={TelegramIcon} alt='telegram' />
                        <img className='w-10' src={DiscordIcon} alt='discord' />
                    </div>
                </div>

            </div>
            
        </div>
        
        
        
    </div>
  )
}

export default Launchpad