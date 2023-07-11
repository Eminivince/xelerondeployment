import React, { useEffect, useState } from 'react';
import {
  AiOutlineClose,
  AiOutlineSearch,
  AiOutlineQuestionCircle,
} from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
// import { displayManageModal, hideTokenModal } from '../Features/ModalSlice';
import {
  removePoolTokenModal,
  selectTokenForFirstInput,
  selectTokenForSecondInput,
} from '../Features/PoolSlice';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import { erc20ABI } from '../../contracts';
import { isValidAddress } from '../../utils/helpers';
import triangle from '../../images/tri.png';
import { toast } from 'react-toastify';
import { Item } from '../Modal/TokenModal';

function PoolTokenModal() {
  const { Token_List } = useSelector((store) => store.token);
  const { signer } = useSelector((store) => store.web3);
  const { PoolTokenType, firstInputToken, secondInputToken } = useSelector(
    (store) => store.poolFunc
  );

  const [searchToken, setSearchToken] = useState({
    filteredToken: '',
  });
  const oppositeToken = PoolTokenType.includes('first')
    ? secondInputToken
    : PoolTokenType.includes('second')
    ? firstInputToken
    : {};
  const [tokenList, setTokenList] = useState(
    Token_List.filter((token) => oppositeToken?.address !== token.address)
  );
  const [importToken, setImportToken] = useState({});

  async function filterThroughToken(e) {
    const { name, value } = e.target;
    setSearchToken({ [name]: value });
    if (value === '') {
      return setTokenList(
        Token_List.filter((token) => oppositeToken?.address !== token.address)
      );
    }
    const t = Token_List.filter(
      (token) => oppositeToken?.address !== token.address
    ).filter(
      (token) =>
        token.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
        token.address.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );

    if (isValidAddress(value) && !t.length) {
      try {
        const token = new ethers.Contract(value, erc20ABI, signer);
        const name = await token.name();
        const symbol = await token.symbol();
        const decimals = await token.decimals();
        setImportToken({
          name,
          symbol,
          decimals,
          address: value,
          logo: triangle,
        });
      } catch (error) {
        toast.error('Invalid Token Address');
      }
    }
    setTokenList(t);
  }
  const [displayInfo, setDisplayInfo] = useState(false);

  function changeDisplay() {
    setDisplayInfo((prevValue) => !prevValue);
  }

  const dispatch = useDispatch();

  function selectToken(token) {
    if (PoolTokenType === 'first') dispatch(selectTokenForFirstInput(token));
    else if (PoolTokenType === 'second')
      dispatch(selectTokenForSecondInput(token));
    dispatch(removePoolTokenModal());
  }

  return (
    <div className="">
      <div className="bg-[#061111B8] fixed w-full h-[100vh] min-h-[100vh] top-0 left-0 backdrop-blur-[4px] z-50"></div>
      <div className="bg-[#152F30] w-full max-w-[464px] sm:w-[464px] h-[772px] p-4 absolute top-8 mb-4 left-1/2 -translate-x-1/2 z-50 rounded-lg flex flex-col">
        <header className="flex items-center mb-5">
          <h3 className="ml-auto">Select a Token</h3>
          <div
            className="ml-auto cursor-pointer"
            onClick={() => dispatch(removePoolTokenModal())}
          >
            <AiOutlineClose />
          </div>
        </header>

        <div className="relative mb-7">
          <input
            type="text"
            name="filteredToken"
            placeholder="search name or paste address"
            id=""
            value={searchToken.filteredToken}
            onChange={filterThroughToken}
            className="bg-[#1B595B] w-full h-[56px] rounded-lg pl-3 pr-9 outline-none"
          />
          <i className="absolute right-2 top-1/2 -translate-y-1/2 text-[24px]">
            <AiOutlineSearch />
          </i>
        </div>
        <h3 className="mb-8 relative flex items-center">
          <span className="mr-2">Common Bases</span>{' '}
          <i onClick={changeDisplay}>
            <AiOutlineQuestionCircle />
          </i>
          {displayInfo && (
            <span className="absolute w-[205px] h-[80px]  sm:w-[261px] sm:h-[84px] rounded-lg p-4 bg-[#1C3738] -top-[350%] sm:-top-[280%] text-[12px] left-[20%] sm:left-1/3">
              These tokens are commonly paired with other tokens
            </span>
          )}
        </h3>

        <div className="flex gap-3 flex-wrap mb-10">
          <div className="flex items-center justify-center w-[27%] bg-[#1B595B] rounded-lg">
            {' '}
            <div className="w-5 h-5 bg-[#1C3738] mr-2"></div> ETH
          </div>
          <div className="flex items-center justify-center w-[27%] bg-[#1B595B] rounded-lg">
            {' '}
            <div className="w-5 h-5 bg-[#1C3738] mr-2"></div> ETH
          </div>
          <div className="flex items-center justify-center w-[27%] bg-[#1B595B] rounded-lg">
            {' '}
            <div className="w-5 h-5 bg-[#1C3738] mr-2"></div> ETH
          </div>
          <div className="flex items-center justify-center w-[27%] bg-[#1B595B] rounded-lg">
            {' '}
            <div className="w-5 h-5 bg-[#1C3738] mr-2"></div> ETH
          </div>
          <div className="flex items-center justify-center w-[27%] bg-[#1B595B] rounded-lg">
            {' '}
            <div className="w-5 h-5 bg-[#1C3738] mr-2"></div> ETH
          </div>
          <div className="flex items-center justify-center w-[27%] bg-[#1B595B] rounded-lg">
            {' '}
            <div className="w-5 h-5 bg-[#1C3738] mr-2"></div> ETH
          </div>
        </div>

        <div id="hide-scroll" className="mb-3 h-full overflow-y-scroll">
          {tokenList.map((token, index) => (
            <Item
              {...{
                token,
                index,
                signer,
                searchToken,
                dispatch,
                selectToken,
                type: 'pool',
              }}
              key={index}
            />
          ))}
          {importToken.address && (
            <Item
              {...{
                token: importToken,
                index: 99999999,
                signer,
                searchToken,
                dispatch,
                selectToken,
                type: 'pool',
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default PoolTokenModal;
