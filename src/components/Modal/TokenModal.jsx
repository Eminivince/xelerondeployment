import React, { useEffect, useState } from 'react';
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { TokenList } from '../Temporary/TokenList';
import { useDispatch, useSelector } from 'react-redux';
import groupWallet from '../../images/groupwallet.png';
import { displayManageModal, hideTokenModal } from '../Features/ModalSlice';
import {
  importToken,
  importTokenForSwapFromAndSwapTo,
  selectDefaultSwapTo,
} from '../Features/TokenSlice';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import { erc20ABI } from '../../contracts';

function TokenModal() {
  const Token_List = TokenList;
  const [searchToken, setSearchToken] = useState({
    filteredToken: '',
  });
  const { defaultTokenSwapFrom } = useSelector((state) => state.token);
  const { signer } = useSelector((state) => state.web3);
  const filteredList = TokenList.filter(
    (token) => defaultTokenSwapFrom.token !== token.token
  );
  const [tokenList, setTokenList] = useState(filteredList);
  function filterThroughToken(e) {
    const { name, value } = e.target;
    setSearchToken({ [name]: value });
    const t = filteredList.filter((x) =>
      x.tokenName.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );
    setTokenList(t);
  }

  const dispatch = useDispatch();

  function selectThisDefaultToken(token) {
    dispatch(selectDefaultSwapTo(token));
    dispatch(hideTokenModal());
  }

  function importForSwapTo(id) {
    dispatch(importToken(id));
  }

  return (
    <div className="">
      <div className="bg-[#061111B8] fixed w-full h-fit min-h-[100vh] top-0 left-0 backdrop-blur-[4px] z-50"></div>
      <div className="bg-[#152F30] w-full max-w-[464px] sm:w-[464px] h-[564px] p-4 absolute top-8 left-1/2 -translate-x-1/2 z-50 rounded-lg flex flex-col">
        <header className="flex items-center mb-5">
          <h3 className="ml-auto">Select a Token</h3>
          <div
            className="ml-auto cursor-pointer"
            onClick={() => dispatch(hideTokenModal())}
          >
            <AiOutlineClose />
          </div>
        </header>

        <div className="relative mb-4">
          <input
            type="text"
            name="filteredToken"
            placeholder="search name or paste address heyy"
            id=""
            value={searchToken.filteredToken}
            onChange={filterThroughToken}
            className="bg-[#1B595B] w-full h-[56px] rounded-lg pl-3 pr-9 outline-none"
          />
          <i className="absolute right-2 top-1/2 -translate-y-1/2 text-[24px]">
            <AiOutlineSearch />
          </i>
        </div>

        <div id="hide-scroll" className="mb-3 h-full overflow-y-scroll">
          {tokenList.map((token, index) => (
            <Item
              {...{
                token,
                signer,
                searchToken,
                index,
                selectThisDefaultToken,
                importForSwapTo,
              }}
              key={index}
            />
          ))}
        </div>

        {searchToken.filteredToken && (
          <button
            className="h-[48px] w-full max-w-[384px] sm:w-[384px] m-auto bg-[#1B595B] rounded-[100px] flex items-center justify-center"
            onClick={() => dispatch(displayManageModal())}
          >
            <i>
              <BiEdit />
            </i>
            <span>Manager</span>
          </button>
        )}
      </div>
    </div>
  );
}

const Item = ({
  token,
  signer,
  searchToken,

  selectThisDefaultToken,
  importForSwapTo,
}) => {
  const [balance, setBalance] = useState(0.0);
  const { address } = useAccount();
  const [decimals, setDecimals] = useState(18);
  useEffect(() => {
    if (token.id <= 3) {
      (async function () {
        const tokenContract = new ethers.Contract(
          token.token,
          erc20ABI,
          signer
        );

        const res = await tokenContract.balanceOf(address);
        const decimals = await tokenContract.decimals();
        const b = ethers.utils.formatUnits(res, decimals);
        setDecimals(decimals);
        setBalance(Number(b));
      })();
    }
  }, []);

  return (
    <button
      disabled={searchToken.filteredToken ? true : false}
      className="flex items-center w-full h-[72px] bg-[#1B595B] border border-[#69CED1] px-2 mb-3 rounded-lg cursor-pointer"
      onClick={() => selectThisDefaultToken({ ...token, balance, decimals })}
    >
      <img src={token.logo} alt="logo" className="w-[40px] mr-4" />
      <div>
        <p>{token.tokenName}</p>
      </div>
      <p className="ml-auto">
        {searchToken.filteredToken.length > 0 ? (
          <button
            className="bg-[#69CED1] w-[75px] h-[32px] rounded-[100px] hover:opacity-70"
            onClick={() => importForSwapTo(token.id)}
          >
            Import
          </button>
        ) : (
          `${
            Number.isInteger(balance)
              ? balance.toPrecision(6)
              : balance.toFixed(4)
          } ${token.tokenName}`
        )}
      </p>
    </button>
  );
};
export default TokenModal;
