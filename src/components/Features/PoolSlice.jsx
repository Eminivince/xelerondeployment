import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    displayCreateAPair: false,
    displayPoolTokenModal: false,
    displayConfirmSupplyModal: false,
    displayRemoveLiquidity: false,
    displayConfirmRemove: false,
    temporaryApproval: false
}


const PoolSlice = createSlice({
    name: 'pool',
    initialState,
    reducers: {
        showCreateAPair: (state) => {
            state.displayCreateAPair = true
        },
        removeCreateAPair: (state) => {
            state.displayCreateAPair = false
        },
        showPoolTokenModal: (state) => {
            state.displayPoolTokenModal = true
        },
        removePoolTokenModal: (state) => {
            state.displayPoolTokenModal = false
        },
        showConfirmSupplyModal: (state) => {
            state.displayConfirmSupplyModal = true
        },
        removeConfirmSupplyModal: (state) => {
            state.displayConfirmSupplyModal = false
        },
        showRemoveLiquidity: (state) => {
            state.displayRemoveLiquidity = true
        },
        removeRemoveLiquidity: (state) => {
            state.displayRemoveLiquidity = false
        },
        showConfirmRemove: (state) => {
            state.displayConfirmRemove = true
        },
        removeConfirmRemove: (state) => {
            state.displayConfirmRemove = false
        },
        setTemporaryApproval: (state) => {
            state.temporaryApproval = true
        },
    }
})

export const {
    showCreateAPair,
    removeCreateAPair,
    showPoolTokenModal,
    removePoolTokenModal,
    showConfirmSupplyModal,
    removeConfirmSupplyModal,
    showRemoveLiquidity,
    removeRemoveLiquidity,
    setTemporaryApproval,
    showConfirmRemove,
    removeConfirmRemove
} = PoolSlice.actions;

export default PoolSlice.reducer;