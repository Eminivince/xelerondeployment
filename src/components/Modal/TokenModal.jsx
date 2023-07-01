import React, { useEffect, useState } from 'react';
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import triangle from '../../images/tri.png';

import { useDispatch, useSelector } from 'react-redux';
import { displayManageModal, hideTokenModal } from '../Features/ModalSlice';
import {
  importTokenSwap,
  selectDefaultSwapFrom,
  selectDefaultSwapTo,
} from '../Features/TokenSlice';
import { ethers } from 'ethers';
import { erc20ABI } from '../../contracts';
import { useAccount } from 'wagmi';
import { isValidAddress } from '../../utils/helpers';
import { toast } from 'react-toastify';
function TokenModalSwapFrom() {
  const { defaultTokenSwapTo, defaultTokenSwapFrom } = useSelector(
    (state) => state.token
  );
  const { Token_List } = useSelector((state) => state.token);
  const { tokenModalSwapType } = useSelector((store) => store.modal);
  const oppositeToken =
    tokenModalSwapType === 'from' ? defaultTokenSwapTo : defaultTokenSwapFrom;
  const [tokenList, setTokenList] = useState(
    Token_List.filter((token) => oppositeToken?.address !== token.address)
  );

  const [searchToken, setSearchToken] = useState({
    filteredToken: '',
  });
  const { signer } = useSelector((state) => state.web3);
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

  const dispatch = useDispatch();

  function selectToken(token) {
    if (tokenModalSwapType === 'from') dispatch(selectDefaultSwapFrom(token));
    else dispatch(selectDefaultSwapTo(token));

    dispatch(hideTokenModal());
  }

  function importForSwapFrom(token) {
    dispatch(importTokenSwap(token));
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

        <div id="hide-scroll" className="mb-3 h-full overflow-y-scroll">
          <>
            {tokenList.map((token, index) => (
              <Item
                {...{
                  token,
                  signer,

                  searchToken,
                  index,
                  selectToken,
                  importForSwapFrom,
                }}
                key={index}
              />
            ))}
          </>
          {importToken.address && (
            <Item
              {...{
                token: importToken,
                signer,
                searchToken,
                index: tokenList.length + 9999,
                selectToken,
                importForSwapFrom,
              }}
            />
          )}
        </div>

        {searchToken.filteredToken && (
          <div
            className="h-[48px] w-full max-w-[384px] sm:w-[384px] m-auto bg-[#1B595B] rounded-[100px] flex items-center justify-center"
            onClick={() => dispatch(displayManageModal())}
          >
            <i>
              <BiEdit />
            </i>
            <span>Manager</span>
          </div>
        )}
      </div>
    </div>
  );
}
export const Item = ({
  token,
  signer,
  searchToken,
  selectToken,
  importForSwapFrom,
}) => {
  const [balance, setBalance] = useState(0.0);
  const { address } = useAccount();
  const [decimals, setDecimals] = useState(18);

  useEffect(() => {
    (async function () {
      try {
        const tokenContract = new ethers.Contract(
          token.address,
          erc20ABI,
          signer
        );
        const res = await tokenContract.balanceOf(address);

        const b = Number(ethers.utils.formatUnits(res, 18));
        const decimals = await tokenContract.decimals();

        setDecimals(decimals);
        setBalance(b);
      } catch (e) {
        throw e;
      }
    })();
  }, [address, signer, token.address]);
  async function handleSelect() {
    const tokenContract = new ethers.Contract(token.address, erc20ABI, signer);
    const res = await tokenContract.balanceOf(address);
    const b = Number(ethers.utils.formatUnits(res, 18));
    const decimals = await tokenContract.decimals();
    selectToken({ ...token, balance: b, decimals });
  }
  return (
    <button
      disabled={
        searchToken.filteredToken.length && balance === 0.0 ? true : false
      }
      className="flex items-center w-full h-[72px] bg-[#1B595B] border border-[#69CED1] px-2 mb-3 rounded-lg cursor-pointer"
      onClick={handleSelect}
    >
      <img src={token.logo} alt="logo" className="w-[40px] mr-4" />
      <div>
        <p>{token.name}</p>
      </div>
      <div className="ml-auto">
        {searchToken.filteredToken.length > 0 && balance === 0.0 ? (
          <div
            className="bg-[#69CED1] w-[75px] h-[32px] rounded-[100px] hover:opacity-70"
            onClick={() => importForSwapFrom(token)}
          >
            Import
          </div>
        ) : (
          `${
            Number.isInteger(balance)
              ? balance.toPrecision(6)
              : balance.toFixed(4)
          } ${token.name}`
        )}
      </div>
    </button>
  );
};

export default TokenModalSwapFrom;
