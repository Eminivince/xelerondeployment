import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineLeft, AiOutlineCheck } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import Caution from '../../images/caution.png';
import { hideTokenModal } from '../Features/ModalSlice';
import {
  hideImportToken,
  selectDefaultSwapFrom,
  selectDefaultSwapTo,
  setAllToken,
} from '../Features/TokenSlice';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { toast } from 'react-toastify';

function ImportTokenModal() {
  const { currentImport } = useSelector((store) => store.token);
  const dispatch = useDispatch();

  async function completeTokenImport() {
    await addToFireStore();
    dispatch(hideImportToken());
    dispatch(hideTokenModal());
  }

  function closeTokenModals() {
    dispatch(hideImportToken());
    dispatch(hideTokenModal());
  }

  const [proceed, setProceed] = useState(false);

  function updateApproval(e) {
    setProceed(e.target.checked);
  }
  const { tokenModalSwapType } = useSelector((store) => store.modal);

  async function addToFireStore() {
    try {
      console.log('adding to firestore');

      await addDoc(collection(db, 'tokens'), currentImport);
      dispatch(
        tokenModalSwapType === 'from'
          ? selectDefaultSwapFrom(currentImport)
          : selectDefaultSwapTo(currentImport)
      );
      toast.success('Token added successfully');

      const querySnapshot = await getDocs(collection(db, 'tokens'));
      const temp = await Promise.all(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
      dispatch(setAllToken(temp));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="">
      <div className="bg-[#061111B8] fixed w-full h-fit min-h-[100vh] top-0 left-0 backdrop-blur-[4px] z-50"></div>
      <div className="bg-[#152F30] w-full max-w-[464px] sm:w-[464px] h-[564px] p-4 absolute top-8 left-1/2 -translate-x-1/2 z-50 rounded-lg flex flex-col">
        <header className="flex items-center mb-5 justify-between">
          <div
            className=" cursor-pointer"
            onClick={() => dispatch(hideImportToken())}
          >
            <AiOutlineLeft />
          </div>
          <h3 className="">Import Token heyy</h3>
          <div className=" cursor-pointer" onClick={closeTokenModals}>
            <AiOutlineClose />
          </div>
        </header>

        {currentImport ? (
          <div className="w-full h-[88px] rounded-lg bg-[#1B595B] flex items-center text-[12px] px-3">
            <img src={currentImport.logo} alt="" className="mr-3" />
            <div>
              <p>{currentImport.name}</p>
              <p>{currentImport.address}</p>
              <p>{currentImport.symbol}</p>
            </div>
          </div>
        ) : (
          ''
        )}

        <div className="h-full mt-8">
          <img src={Caution} alt={Caution} className="m-auto" />
          <h5 className="mt-5 text-center mb-3">Trade at your own risk</h5>
          <div className="text-[#DCDCDC] px-3 mb-4">
            <p className="text-center">
              Anyone can create a token, including creating fake versions of
              existing tokens that claim to represent projects.
            </p>
            <p className="text-center">If you purchase this token,</p>
            <p className="text-center">you may not be able to sell it back</p>
          </div>

          <label
            htmlFor="accept"
            className="flex items-center w-fit mx-auto mb-4"
          >
            <input
              type="checkbox"
              id="accept"
              name="proceed"
              value={proceed}
              onChange={updateApproval}
              className="hidden"
            />
            <div className="bg-[#1B595B] h-4 w-4 flex items-center justify-center text-sm ">
              <span className={`${proceed ? 'block' : 'hidden'}`}>
                <AiOutlineCheck />
              </span>
            </div>
            <div className="ml-2">I understand</div>
          </label>

          <button
            className={`bg-[#69CED1] rounded-[100px] w-full max-w-[384px] block m-auto sm:w-[384px] h-[48px] ${
              proceed ? '' : 'cursor-not-allowed'
            }`}
            onClick={completeTokenImport}
          >
            Import
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImportTokenModal;
