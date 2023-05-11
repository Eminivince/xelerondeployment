import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    slippageTolerance: false,
    deadline: false,
    expertMode: false,
    multihops: false
}


const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        toggleToleranceInfo: (state) => {
            state.slippageTolerance = !state.slippageTolerance
            state.deadline = false
            state.expertMode = false
            state.multihops = false
        },
        toggleDeadlineInfo: (state) => {
            state.deadline = !state.deadline
            state.expertMode = false
            state.multihops = false
            state.slippageTolerance = false
        },
        toggleExpertModeInfo: (state) => {
            state.expertMode = !state.expertMode
            state.multihops = false
            state.slippageTolerance = false
            state.deadline = false
        },
        toggleMultihopsInfo: (state) => {
            state.multihops = !state.multihops
            state.slippageTolerance = false
            state.deadline = false
            state.expertMode = false
        },
    }
})

export const { toggleDeadlineInfo, toggleExpertModeInfo, toggleMultihopsInfo, toggleToleranceInfo } = transactionSlice.actions


export default transactionSlice.reducer;