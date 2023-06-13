import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineSearch, AiOutlineQuestionCircle } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi'
import { TokenList } from '../Temporary/TokenList';
import { useDispatch } from 'react-redux';
// import { displayManageModal, hideTokenModal } from '../Features/ModalSlice';
import { removePoolTokenModal, selectTokenForFirstInput, showPoolImportTokenModal } from '../Features/PoolSlice'


function PoolTokenModal() {
  const Token_List = TokenList
  const [searchToken, setSearchToken] = useState({
    filteredToken: ''
  })

  function filterThroughToken(e){
    const {name, value} = e.target
    setSearchToken({[name]: value})
  }

  const [displayInfo, setDisplayInfo] = useState(false)
  

  function changeDisplay(){
    setDisplayInfo(prevValue => !prevValue)
  }

  const dispatch = useDispatch()

  function selectToken(id){
    dispatch(selectTokenForFirstInput(id));
    dispatch(removePoolTokenModal());
  }
  return (
    <div className=''>
      <div className="bg-[#061111B8] fixed w-full h-[100vh] min-h-[100vh] top-0 left-0 backdrop-blur-[4px] z-50"></div>
        <div className='bg-[#152F30] w-full max-w-[464px] sm:w-[464px] h-[772px] p-4 absolute top-8 mb-4 left-1/2 -translate-x-1/2 z-50 rounded-lg flex flex-col'>
            <header className='flex items-center mb-5'>
                <h3 className='ml-auto'>Select a Token</h3>
                <div className='ml-auto cursor-pointer' onClick={() => dispatch(removePoolTokenModal())}><AiOutlineClose /></div>
            </header>

            <div className='relative mb-7'>
              <input
                type="text"
                name="filteredToken"
                placeholder='search name or paste address'
                id=""
                value={searchToken.filteredToken}
                onChange={filterThroughToken}
                className='bg-[#1B595B] w-full h-[56px] rounded-lg pl-3 pr-9 outline-none'/>
                <i className='absolute right-2 top-1/2 -translate-y-1/2 text-[24px]'><AiOutlineSearch /></i>
            </div>
            <h3 className='mb-8 relative flex items-center'>
              <span className='mr-2'>Common Bases</span> <i onClick={changeDisplay}><AiOutlineQuestionCircle /></i>
              { displayInfo && <span className='absolute w-[205px] h-[80px]  sm:w-[261px] sm:h-[84px] rounded-lg p-4 bg-[#1C3738] -top-[350%] sm:-top-[280%] text-[12px] left-[20%] sm:left-1/3'>These tokens are commonly paired with other tokens</span>}
            </h3>

            <div className='flex gap-3 flex-wrap mb-10'>
              <div className='flex items-center justify-center w-[27%] bg-[#1B595B] rounded-lg'> <div className='w-5 h-5 bg-[#1C3738] mr-2'></div> ETH</div>
              <div className='flex items-center justify-center w-[27%] bg-[#1B595B] rounded-lg'> <div className='w-5 h-5 bg-[#1C3738] mr-2'></div> ETH</div>
              <div className='flex items-center justify-center w-[27%] bg-[#1B595B] rounded-lg'> <div className='w-5 h-5 bg-[#1C3738] mr-2'></div> ETH</div>
              <div className='flex items-center justify-center w-[27%] bg-[#1B595B] rounded-lg'> <div className='w-5 h-5 bg-[#1C3738] mr-2'></div> ETH</div>
              <div className='flex items-center justify-center w-[27%] bg-[#1B595B] rounded-lg'> <div className='w-5 h-5 bg-[#1C3738] mr-2'></div> ETH</div>
              <div className='flex items-center justify-center w-[27%] bg-[#1B595B] rounded-lg'> <div className='w-5 h-5 bg-[#1C3738] mr-2'></div> ETH</div>
            </div>

            <div id='hide-scroll' className='mb-3 h-full overflow-y-scroll'>
              {
              Token_List.filter(x => x.tokenName.toLocaleLowerCase().includes(searchToken.filteredToken.toLocaleLowerCase())).map((token, index) => {
                return <button disabled={searchToken.filteredToken ? true : false} key={index} className='flex items-center w-full h-[72px] bg-[#1B595B] border border-[#69CED1] px-2 mb-3 rounded-lg text-[12px] sm:text-[16px]' onClick={() => selectToken(token.id)}>
                  <img src={token.logo} alt="logo" className='w-[40px] mr-4' />
                  <div>
                    <p>{token.tokenName}</p>
                    <p>{token.desc}</p>
                  </div>
                  <p className='ml-auto'>{searchToken.filteredToken.length > 0 ? <button className='bg-[#69CED1] w-[75px] h-[32px] rounded-[100px] hover:opacity-70' onClick={() => dispatch(showPoolImportTokenModal(token.id))}>Import</button> : token.unit}</p>
                </button>
              })
              }
            </div>

        </div>
    </div>
  )
}

export default PoolTokenModal