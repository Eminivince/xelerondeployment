import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import Xeleronlogo from '../images/whiteXeleronLogo.png';

function Connect() {

    const [password, setPassword] = useState({
        user: ''
    })
    function trackPassword(e){
        const {name, value} = e.target
        setPassword({
         [name]: value
        })
    }
    console.log(password)
  return (
    <main className='border-2 w-[100%] min-h-[100vh] p-3 flex flex-col items-center text-white pt-[40px]'>
        <h3 className='mb-[50px] flex items-center'><img src={Xeleronlogo} alt='logo' className='mr-3'/>Xeleron</h3>

        <h2 className='text-[24px] mb-2'>Welcome to Xeleron</h2>
        <p className='text-[#DCDCDC] mb-12'>The decentralized web awaits</p>

        <input
            type='password'
            name="user"
            id=""
            value={password.user}
            onChange={trackPassword}
            placeholder='Enter Your Password'
            className='w-full max-w-[384px] sm:w-[384px] h-[56px] bg-[#152F30] rounded-lg p-4 outline-none mb-7'
        />
        <button
            className={`w-full max-w-[384px] sm:w-[384px] h-[56px] rounded-[100px] mb-12 ${password.user.length < 5 ? 'bg-[#1C3738] text-[#1B595B] cursor-none' : 'bg-[#69CED1]'}`}
            disabled={password.user.length < 5 ? true : false}
            onClick={() => alert('hello')}>Unlock
        </button>
        <Link className='text-[#69CED1] mb-12'>Restore Account?</Link>
        <Link className='text-[#69CED1]'>Import Using Account Seedphrase</Link>
    </main>
  )
}

export default Connect