import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    displayConfirmConnect: false,
    displayCustomizeGas: false
}

const ELLAssetSlice = createSlice({
    name: 'ELLAsset',
    initialState,
    reducers: {
        showConfirmConnect: (state) => {
            state.displayConfirmConnect = true
        },
        removeConfirmConnect: (state) => {
            state.displayConfirmConnect = false
        },
        showCustomizeGas: (state) => {
            state.displayCustomizeGas = true
        },
        removeCustomizeGas: (state) => {
            state.displayCustomizeGas = false
        },
    }
})

export const {
    showConfirmConnect,
    removeConfirmConnect,
    showCustomizeGas,
    removeCustomizeGas
} = ELLAssetSlice.actions

export default ELLAssetSlice.reducer