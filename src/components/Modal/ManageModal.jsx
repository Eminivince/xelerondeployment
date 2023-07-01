import React, { useState } from 'react';
import {
  AiOutlineClose,
  AiOutlineSearch,
  AiOutlineLeft,
  AiOutlineEllipsis,
} from 'react-icons/ai';
import { ManageList } from '../Temporary/ManageList';
import { ManageToken } from '../Temporary/ManageToken';
import ManageImg from '../../images/manageImg.png';
import ToggleOn from '../../images/toggleOn.png';
import ToggleOff from '../../images/toggleOff.png';
import ArrowCircleRight from '../../images/arrowCircleRight.png';
import { useDispatch } from 'react-redux';
import { hideManageModal } from '../Features/ModalSlice';
import { BsTrash } from 'react-icons/bs';

function ManageModal() {
  const dispatch = useDispatch();

  const [filterManage, setFilterManage] = useState({
    list: '',
    token: '',
  });

  const [manageDisplay, setManageDisplay] = useState({
    lists: true,
    token: false,
  });

  function displayManageLists() {
    setManageDisplay((prevValue) => {
      return { ...prevValue, lists: true, token: false };
    });
  }

  function displayManagetoken() {
    setManageDisplay((prevValue) => {
      return { ...prevValue, lists: false, token: true };
    });
  }

  const [Manage_List, setManage_List] = useState(ManageList);

  const [Manage_Token, setManage_Token] = useState(ManageToken);

  function toggleTokenStatus(id) {
    setManage_List((prevValue) =>
      prevValue.map((value) =>
        value.id === id ? { ...value, status: !value.status } : value
      )
    );
  }

  function remove(id) {
    setManage_Token((prevValue) =>
      prevValue.filter((value) => value.id !== id)
    );
  }

  function clearAll() {
    setManage_Token([]);
  }

  function filterList(e) {
    const { value, name } = e.target;

    setFilterManage((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  }

  return (
    <div>
      <div className="bg-[#061111B8] fixed w-full h-fit min-h-[100vh] top-0 left-0 backdrop-blur-[4px] z-50"></div>
      <div className="bg-[#152F30] w-full max-w-[464px] sm:w-[464px] h-[772px] p-4 absolute top-8 left-1/2 -translate-x-1/2 z-50 rounded-lg">
        <header className="flex items-center justify-between mb-5">
          <div
            className=" cursor-pointer"
            onClick={() => dispatch(hideManageModal())}
          >
            <AiOutlineLeft />
          </div>
          <h3 className="">Manage</h3>
          <div
            className="cursor-pointer"
            onClick={() => dispatch(hideManageModal())}
          >
            <AiOutlineClose />
          </div>
        </header>

        <div className="flex justify-center h-[40px] border-b-[1px] border-[#1B595B] mb-5">
          <div
            className="cursor-pointer relative h-full"
            onClick={displayManageLists}
          >
            Lists{' '}
            <div
              className={`${
                manageDisplay.lists ? 'w-full' : ''
              } h-[2px] bg-white absolute bottom-0`}
            ></div>
          </div>
          <div
            className="cursor-pointer relative h-full ml-5"
            onClick={displayManagetoken}
          >
            Token{' '}
            <div
              className={`${
                manageDisplay.token ? 'w-full' : ''
              } h-[2px] bg-white absolute bottom-0`}
            ></div>
          </div>
        </div>

        {manageDisplay.lists ? (
          <div className="flex flex-col h-[635px]">
            <div className="relative mb-4 h-fit">
              <input
                type="text"
                name="list"
                placeholder="search name or paste address"
                id=""
                value={filterManage.list}
                onChange={filterList}
                className="bg-[#1B595B] w-full h-[56px] rounded-lg pl-3 pr-9 outline-none"
              />
              <i className="absolute right-2 top-1/2 -translate-y-1/2 text-[24px]">
                <AiOutlineSearch />
              </i>
            </div>

            <div id="hide-scroll" className="mt-3 overflow-y-scroll h-full">
              {Manage_List.filter((x) =>
                x.name.toLowerCase().includes(filterManage.list.toLowerCase())
              ).map((token) => {
                return (
                  <div
                    key={token.id}
                    className="flex h-[72px] bg-[#1B595B] rounded-lg mb-3 items-center px-3"
                  >
                    <img
                      src={ManageImg}
                      alt="icon"
                      className="w-[40px] h-[40px] mr-4"
                    />
                    <div>
                      <p>{token.name}</p>
                      <p className="text-[12px] flex items-center">
                        {token.number} Tokens{' '}
                        <i className="ml-3">
                          <AiOutlineEllipsis />
                        </i>
                      </p>
                    </div>
                    <img
                      src={token.status ? ToggleOn : ToggleOff}
                      alt="toggle"
                      className="ml-auto w-[52px] h-[32px] cursor-pointer"
                      onClick={() => toggleTokenStatus(token.id)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-[645px]">
            <div className="relative mb-4 h-fit">
              <input
                type="text"
                name="token"
                placeholder="0*000"
                id=""
                value={filterManage.token}
                onChange={filterList}
                className="bg-[#1B595B] w-full h-[56px] rounded-lg pl-3 pr-9 outline-none"
              />
              <i className="absolute right-2 top-1/2 -translate-y-1/2 text-[24px]">
                <AiOutlineSearch />
              </i>
            </div>

            <div className="mt-5 flex justify-between items-center">
              <span>{Manage_Token.length} custom Token</span>
              <span
                className="text-[#69CED1] text-[14px] cursor-pointer"
                onClick={clearAll}
              >
                Clear All
              </span>
            </div>

            <div id="hide-scroll" className="mt-3 overflow-y-scroll h-[65%]">
              {Manage_Token.filter((x) =>
                x.name.toLowerCase().includes(filterManage.token.toLowerCase())
              ).map((token) => {
                return (
                  <div
                    key={token.id}
                    className="flex h-[72px] bg-[#1B595B] rounded-lg mb-3 items-center justify-between px-3"
                  >
                    <div className="flex items-center">
                      <img
                        src={token.img}
                        alt="icon"
                        className="w-[40px] h-[40px] mr-4"
                      />
                      <p>{token.name}</p>
                    </div>
                    <div className="flex items-center">
                      <i
                        className="text-white mr-3 cursor-pointer"
                        onClick={() => remove(token.id)}
                      >
                        <BsTrash />
                      </i>
                      <img
                        src={ArrowCircleRight}
                        alt="arrow"
                        className="w-[18px] h-[18px] cursor-pointer"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="text-center px-7 mt-auto">
              Tip: Custom tokens are stored locally in your browser
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageModal;
