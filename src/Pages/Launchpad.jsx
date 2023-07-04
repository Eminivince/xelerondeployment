import React, { useState, useEffect } from 'react';
import Logo from '../images/xeleronlogo.png';
import icon2 from '../images/icon2.jpg';
import icon3 from '../images/icon3.jpg';
import icon4 from '../images/icon4.jpg';
import TwitterIcon from '../images/icons8-twitter.svg';
import TelegramIcon from '../images/icons8-telegram-app.svg';
import DiscordIcon from '../images/icons8-discord-144.svg';
import AltNav from '../components/AltNav';
import ethIcon from '../images/icons8-ethereum.svg';
import { FaArrowDown } from 'react-icons/fa';
import Countdown from './Countdown';

const Launchpad = () => {
  const idoArray = [
    {
      name: 'Xeleron',
      date: 'May 22, 2023',
      fundraisingAmount: 100000,
      image: icon2,
    },
    {
      name: 'XYZ Token',
      date: 'July 10, 2023',
      fundraisingAmount: 50000,
      image: icon3,
    },
    {
      name: 'ABC Coin',
      date: 'August 5, 2023',
      fundraisingAmount: 75000,
      image: icon4,
    },
  ];

  const [idoData, setIdoData] = useState(idoArray);

  console.log(idoData);

  const mappedArray = idoData.map((idoData) => (
    <div className="border-2 p-3 rounded-xl">
      <div className="flex justify-between pb-3">
        <div>{idoData.date}</div>
        <div>Hardcap: {idoData.fundraisingAmount}</div>
      </div>
      <img src={idoData.image} alt="nft" className="w-80 mb-3 rounded-xl" />
      <div className="md:flex  justify-between items-center">
        <div className="socialls flex w-6 space-x-2">
          <img src={TwitterIcon} alt="twitter" />
          <img src={TelegramIcon} alt="telegram" />
          <img src={DiscordIcon} alt="discord" />
        </div>
        <div>
          <p>Coming Soon</p>
        </div>
      </div>
    </div>
  ));

  const current = 'launchpad'
  return (
    <div className="text-white">
      {/* <Navbar /> */}
      <AltNav current={current}/>
      <div className="launchpad--container md:px-20 flex flex-col justify-center items-center md:pt-[40px] pt-[15px]">
        <h1 className="font-bold md:text-7xl text-3xl mb-4">
          <span className="text-[#69CED1]">Xeleron</span> Launchpad
        </h1>
        <p className="mb-8 w-[90%] md:text-lg text-center">
          Ignite your investments with trail blazing projects backed by top
          industry experts and enthusiasts. Explore cutting-edge technologies
          and be at the forefront of decentralized finance. Join us and unleash
          the future of finance today
        </p>
        <div className="card--container flex md:space-x-5 space-x-2 mx-8 mb-8 justify-center">
          {mappedArray}
        </div>

        <div className="Ido--detailcard flex flex-col items-center md:p-6 p-4 md:ring-4 ring-2 ring-[#69CED1] h-content md:w-full w-[90%] rounded-md border mb-8">
          <div className="flex w-[100%] justify-between mb-4">
            <div className="hardcap bg-[#69CED1] text-black font-bold p-2 rounded-lg">
              ${750000}
            </div>
            <div className="date bg-[#69CED1] text-black font-bold p-2 rounded-lg">
              4th April
            </div>
          </div>
          <div className="flex flex-col items-center">
            <img src={Logo} className="md:w-24 md:h-24 w-12 h-12 mb-4" alt="xeleron" />
            <h1 className="font-bold md:text-8xl text-4xl mb-4">Xeleron</h1>
            <p className="md:text-lg text-center mb-4 md:w-[75%]">
              At Xeleron, we curate a handpicked selection of the most promising
              projects, meticulously vetted for their potential to disrupt and
              transform the DeFi landscape. Our rigorous evaluation process
              ensures that only the most exceptional ventures make it to our
              platform. We believe in quality over quantity, providing you with
              a curated ecosystem of high-potential opportunities
            </p>
            <div className="flex space-x-4 mb-4">
              <img className="w-6 md:w-10" src={TwitterIcon} alt="twitter" />
              <img className="w-6 md:w-10" src={TelegramIcon} alt="telegram" />
              <img className="w-6 md:w-10" src={DiscordIcon} alt="discord" />
            </div>
          </div>
        </div>

        <div className="presale mb-8">
          <div>
            <Countdown />

            <hr className="mb-10" />
          </div>

          {/* Presale Container */}

          <div className="presale--proper bg-[#16393b] md:p-10 p-4 rounded-lg flex flex-col  justify-center items-center">
            <div className="flex flex-col md:flex-row w-full space-x-6">
              <div className='basis-1/2 flex flex-col justify-center items-center'>
                <div>
                  <h1 className="mb-2 font-bold md:text-4xl text-2xl text-white">
                    XELERON
                  </h1>
                  <hr className="md:mb-10 mb-5" />
                </div>

                <div className="md:mb-6 mb-3">
                  <div className="mb-10">
                    <div>
                      <h1 className="font-semibold mb-1 text-white md:text-xl">
                        Contribute
                      </h1>
                    </div>
                    <div className="flex space-x-28 items-center relative">
                      <input
                        className="p-3 rounded-md border-gray-950 border-2 text-black font-semibold"
                        type="text"
                        id="amountIn"
                        placeholder="Value"
                      />
                      <img
                        src={ethIcon}
                        className="w-6 absolute left-16"
                        alt="tokenicon"
                      />
                    </div>
                  </div>

                  <FaArrowDown className="md:mb-6 mb-3" />
                  <div>
                    <div>
                      <h1 className="font-semibold mb-1 text-white md:text-xl">
                        Receive
                      </h1>
                    </div>
                    <div className="flex space-x-28 items-center relative mb-3">
                      <input
                        className="p-3 rounded-md border-gray-950 border-2 text-black font-semibold"
                        type="text"
                        id="amountIn"
                        placeholder="Value"
                      />
                      <img
                        src={Logo}
                        className="w-6 absolute left-16"
                        alt="tokenicon"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="bg-[#69CED1] md:p-3 p-2  rounded-lg font-semibold text-xl hover:border hover:text-white text-black hover:bg-[#16393b] mb-4"
                >
                  CONTRIBUTE
                </button>
              </div>

              <div className="basis-1/2 info--container text-lg">
                <h1 className="mb-2 font-bold md:text-4xl text-2xl text-white text-center">OFFERING DETAILS</h1>
                <hr className='mb-10'/>
                <div className='mb-4'>
                    <h1 className='font-bold text-xl mb-2'>START TIME</h1>
                    <h1><span className='text-[#69CED1] font-semibold'>Date: </span>30th December, 2023</h1>
                    <h1><span className='text-[#69CED1] font-semibold'>Time: </span>6:00pm</h1>
                </div>
                <div>
                    <h1 className='font-bold text-xl mb-2'>END TIME</h1>
                    <h1><span className='text-[#69CED1] font-semibold'>Date: </span>31st December, 2023</h1>
                    <h1><span className='text-[#69CED1] font-semibold'>Time: </span>6:00pm</h1>
                </div>

                <div>
                    <h1><span className='text-[#69CED1] font-semibold'>Token CA: </span></h1>
                    <h1><span className='text-[#69CED1] font-semibold'>Offering CA: </span> </h1>
                    <h1> <span className='text-[#69CED1] font-semibold'>Total Token Offered:</span>  {4000}XLR</h1>
                    <h1><span className='text-[#69CED1] font-semibold'>Price: </span>1 ETH = 1000XLR</h1>
                </div>
                
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default Launchpad;
