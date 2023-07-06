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
import { useDispatch, useSelector } from 'react-redux';

import Web3Modal from 'web3modal';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import { setSigner } from '../components/Features/web3Slice';
import { ICOAddress, ICO_ABI, ICO_Price } from '../contracts/lunchpad';
import { toast } from 'react-toastify';
import LaunchpadModal from '../components/Modal/LaunchpadModal';
import TransactionSumbmitted from '../components/Modal/TransactionSumbmitted';

import { useConnectModal } from '@rainbow-me/rainbowkit';
import { addTokenToWallet } from '../utils/helpers';
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
  const { signer, staticSigner } = useSelector((state) => state.web3);
  const dispatch = useDispatch();
  const { isConnected } = useAccount();
  const [ICO_Contract, setICO_Contract] = useState(null);
  const [price, setPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [showMinPrice, setShowMinPrice] = useState(false);
  const { openConnectModal } = useConnectModal();
  function checkIsConnected() {
    if (!isConnected) {
      openConnectModal();
    }
  }
  useEffect(() => {
    (async () => {
      const readICO_Contract = new ethers.Contract(
        ICOAddress,
        ICO_ABI,
        staticSigner
      );

      const price = await readICO_Contract.price();
      const minPrice = await readICO_Contract.MinPrivateSaleSinglePayInAmount();

      const priceInETH = ethers.utils.formatEther(price);
      const minPriceInETH = ethers.utils.formatEther(minPrice);
      setPrice(priceInETH);
      setMinPrice(minPriceInETH);
    })();
  }, []);

  useEffect(() => {
    if (!isConnected) {
      return;
    }
    const web3Modal = new Web3Modal();
    web3Modal.connect().then(async (provider) => {
      const web3Provider = new ethers.providers.Web3Provider(provider);
      const signer = web3Provider.getSigner();

      dispatch(setSigner(signer));

      if (!isConnected) return toast.error('Wallet not connected');
      else if (!signer) return toast.error('Please Reconnect Wallet');
      const ICO_Contract = new ethers.Contract(ICOAddress, ICO_ABI, signer);
      setICO_Contract(ICO_Contract);
    });
  }, [dispatch, isConnected]);

  const [value, setValue] = useState({
    amountIn: '',
    amountOut: '',
  });
  const current = 'launchpad';
  function handleValueChange(e) {
    let { value, name } = e.target;
    const oppositeName = name.includes('amountIn') ? 'amountOut' : 'amountIn';
    const valueInNumber = Number(value);
    if (valueInNumber <= 0)
      return setValue({ [name]: value, [oppositeName]: '' });
    const conversionRate = 1 / price;

    if (name === 'amountIn') {
      const v2 = Number(conversionRate * valueInNumber).toFixed(8);
      setValue({ amountIn: valueInNumber, amountOut: v2 });
    } else if (name === 'amountOut') {
      const v2 = valueInNumber * price;
      setValue({ amountIn: v2, amountOut: valueInNumber });
    }
  }

  async function handleContribution() {
    if (!ICO_Contract) return toast.error('Please Connect Wallet');
    if (value.amountIn < minPrice) {
      setShowMinPrice(true);
      return toast.error(`Minimum Contribution is ${minPrice} ETH`);
    }

    const tx = await ICO_Contract.buy({
      value: ethers.utils.parseEther(value.amountIn.toString()),
      gasLimit: 250000,
    });
    await tx.wait();
    displayLauchpadModal();
  }

  const [modal, setModal] = useState(false);
  function displayLauchpadModal() {
    setModal(true);
  }

  return (
    <div className="text-white">
      {/* <Navbar /> */}
      <AltNav current={current} />
      <div className="pt-[100px]">
        <div className="launchpad--container md:px-20 flex flex-col justify-center items-center md:pt-[40px] pt-[15px]">
          <h1 className="font-bold md:text-7xl text-3xl mb-4">
            <span className="text-[#69CED1]">Xeleron</span> Launchpad
          </h1>
          <p className="mb-8 w-[90%] md:text-lg text-center">
            Ignite your investments with trail blazing projects backed by top
            industry experts and enthusiasts. Explore cutting-edge technologies
            and be at the forefront of decentralized finance. Join us and
            unleash the future of finance today
          </p>

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
              <img
                src={Logo}
                className="md:w-24 md:h-24 w-12 h-12 mb-4"
                alt="xeleron"
              />
              <h1 className="font-bold md:text-8xl text-4xl mb-4">Xeleron</h1>
              <p className="md:text-lg text-center mb-4 md:w-[75%]">
                At Xeleron, we curate a handpicked selection of the most
                promising projects, meticulously vetted for their potential to
                disrupt and transform the DeFi landscape. Our rigorous
                evaluation process ensures that only the most exceptional
                ventures make it to our platform. We believe in quality over
                quantity, providing you with a curated ecosystem of
                high-potential opportunities
              </p>
              <div className="flex space-x-4 mb-4">
                <img className="w-6 md:w-10" src={TwitterIcon} alt="twitter" />
                <img
                  className="w-6 md:w-10"
                  src={TelegramIcon}
                  alt="telegram"
                />
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

            <div className="presale--proper bg-[#16393b] md:p-10 p-4 rounded-lg flex flex-col  justify-center items-center relative">
              {modal && (
                <LaunchpadModal
                  setModal={setModal}
                  value={value}
                  setValue={setValue}
                />
              )}
              <div className="flex flex-col md:flex-row w-full space-x-6">
                <div className="basis-1/2 flex flex-col justify-center items-center">
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
                          type="number"
                          id="amountIn"
                          placeholder="Value"
                          name="amountIn"
                          onChange={handleValueChange}
                          value={value.amountIn}
                        />
                        <img
                          src={ethIcon}
                          className="w-6 absolute left-16"
                          alt="tokenicon "
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
                          type="number"
                          id="amountIn"
                          placeholder="Value"
                          name="amountOut"
                          onChange={handleValueChange}
                          value={value.amountOut}
                        />
                        <img
                          src={Logo}
                          className="w-6 absolute left-16"
                          alt="tokenicon"
                        />
                      </div>
                    </div>
                    {showMinPrice && (
                      <p className="text-red-400"> Min Price is {minPrice}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    className="bg-[#69CED1] md:p-3 p-2  rounded-lg font-semibold text-xl hover:border hover:text-white text-black hover:bg-[#16393b] mb-4"
                    onClick={

                      displayLauchpadModal()
                      // isConnected ? handleContribution : checkIsConnected
                    }
                    disabled={!value.amountIn || !value.amountOut}
                  >
                    {isConnected ? 'CONTRIBUTE' : 'CONNECT WALLET'}
                  </button>
                </div>

                <div className="basis-1/2 info--container text-lg">
                  <h1 className="mb-2 font-bold md:text-4xl text-2xl text-white text-center">
                    OFFERING DETAILS
                  </h1>
                  <hr className="mb-10" />
                  <div className="mb-4">
                    <h1 className="font-bold text-xl mb-2">START TIME</h1>
                    <h1>
                      <span className="text-[#69CED1] font-semibold">
                        Date:{' '}
                      </span>
                      30th December, 2023
                    </h1>
                    <h1>
                      <span className="text-[#69CED1] font-semibold">
                        Time:{' '}
                      </span>
                      6:00pm
                    </h1>
                  </div>
                  <div>
                    <h1 className="font-bold text-xl mb-2">END TIME</h1>
                    <h1>
                      <span className="text-[#69CED1] font-semibold">
                        Date:{' '}
                      </span>
                      31st December, 2023
                    </h1>
                    <h1>
                      <span className="text-[#69CED1] font-semibold">
                        Time:{' '}
                      </span>
                      6:00pm
                    </h1>
                  </div>

                  <div>
                    <h1>
                      <span className="text-[#69CED1] font-semibold">
                        Token CA:{' '}
                      </span>
                    </h1>
                    <h1>
                      <span className="text-[#69CED1] font-semibold">
                        Offering CA:{' '}
                      </span>{' '}
                    </h1>
                    <h1>
                      {' '}
                      <span className="text-[#69CED1] font-semibold">
                        Total Token Offered:
                      </span>{' '}
                      {600000}XLR
                    </h1>
                    <h1>
                      <span className="text-[#69CED1] font-semibold">
                        Price:{' '}
                      </span>
                      1 ETH = {Math.floor(1 / price)}XLR
                    </h1>
                    <h1>
                      <span className="text-[#69CED1] font-semibold">
                        Price:{' '}
                      </span>
                      1 XLR = {price}ETH
                    </h1>
                  </div>
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
