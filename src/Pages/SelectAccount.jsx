import React, { useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Xeleronlogo from '../images/whiteXeleronLogo.png';

function SelectAccount() {
    const accounts = [
        {
            name: 'Miles14',
            token: '0x1E3...530d',
            selected: false
        },
        {
            name: 'Floyd Miles',
            token: '0xBBB...e96e',
            selected: true
        },
        {
            name: 'FMingato',
            token: '0xdw1...e311',
            selected: true
        }
    ]

    const [userAccounts, setUserAccounts] = useState(accounts)

    function toggleSelected(id){
        setUserAccounts(prevValue => prevValue.map((x, index) => index === id ? {...x, selected: !x.selected} : {...x}))
        console.log(userAccounts)
    }

    const [approval, setApproval] = useState({
        allow: false
    })

    function toggleApproval(){
        setApproval({allow: !approval.allow})
    }

  return (
    <main className='w-[100%] min-h-[100vh] p-3 flex flex-col items-center text-white pt-[40px]'>
        <h3 className='mb-[50px] flex items-center text-[34px]'><img src={Xeleronlogo} alt='logo' className='mr-3 h-[41.42px]'/>Xeleron</h3>

        <h2 className='text-[24px] mb-2'>Connect to Xeleron</h2>
        <p className='text-[#DCDCDC] mb-12'>Select the account(s)</p>

        <section className='mb-10 w-fit'>
            <div className='bg-[#152F30] w-full max-w-[464px] sm:w-[464px] h-[376px] p-6 rounded-lg'>
                <p className='ml-auto text-[#69CED1] cursor-pointer w-fit text-[14px] mb-4'>Create a New Account</p>

                {
                    userAccounts.map((x, index) => {
                        return <div key={index} className='bg-[#1B595B] w-full h-[80px] mb-5 rounded-lg flex px-2 sm:px-5 items-center' onClick={() => toggleSelected(index)}>
                            <div className='w-[48px] h-[48px] bg-[#1C3738] rounded-full mr-3'></div>
                            <div>
                                <p>{x.name}</p>
                                <p>{x.token}</p>
                            </div>
                            <div className='text-[#6CDA9C] ml-auto text-[20px]'>{x.selected && <AiOutlineCheck />}</div>
                        </div>
                    })
                }
            </div>

            <div className='w-full max-w-[464px] sm:w-[464px] px-2 mt-3 flex'>
                <input type="checkbox" name="" id="authorize" checked={approval.allow} onChange={toggleApproval} className='hidden'/>
                <div className='h-[15px] w-[20px] bg-[#1B595B] mt-1 cursor-pointer' onClick={toggleApproval}><i className={`${approval.allow ? 'inline' : 'hidden'}`}><AiOutlineCheck /></i></div>
                <label htmlFor="authorize" className='text-center'>
                    <span>Allow this site view the addresses of your authorized accounts (required)</span>
                </label>
            </div>
        </section>

        <div className='flex justify-center w-full sm:w-fit'>
            <div className='w-[35%] max-w-[200px] sm:w-[200px] flex items-center justify-center text-[#69CED1]'>
                <p>Cancel</p>
            </div>
            <Link to={approval.allow ? '/swap' : '/account'} className={`w-[50%] max-w-[230px] sm:w-[230px] bg-[#69CED1] text-[#1C3738] rounded-[100px] h-[56px] flex items-center justify-center ${approval.allow ? 'cursor-pointer' : 'cursor-not-allowed'}`}>Connect</Link>
        </div>
    </main>
  )
}

export default SelectAccount