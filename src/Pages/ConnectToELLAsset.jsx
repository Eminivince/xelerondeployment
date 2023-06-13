import React from 'react'
import { useSelector } from 'react-redux'
import ApproveConnect from '../components/ConnectToELLAsset/ApproveConnect'
import ConfirmConnect from '../components/ConnectToELLAsset/ConfirmConnect'
import CustomizeGas from '../components/ConnectToELLAsset/CustomizeGas'

function ConnectToELLAsset() {

  const {displayConfirmConnect, displayCustomizeGas} = useSelector(store => store.ellAssetFunc)

  if(displayConfirmConnect){
    return <div className='flex text-[#DCDCDC] justify-center min-h-screen px-5 py-10'>
          <ConfirmConnect />
      </div>
  }
  else if(displayCustomizeGas){
    return <div className='flex text-[#DCDCDC] justify-center min-h-screen px-5 py-10'>
       <CustomizeGas />
    </div>
  }

  else{
    return <div className='flex text-[#DCDCDC] justify-center min-h-screen px-5 py-10'>
       <ApproveConnect />
    </div>
  }
}

export default ConnectToELLAsset

