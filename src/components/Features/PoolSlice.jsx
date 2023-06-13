import { createSlice } from '@reduxjs/toolkit';
import { TokenList } from "../Temporary/TokenList";

const initialState = {
    displayCreateAPair: false,
    displayPoolTokenModal: false,
    displayConfirmSupplyModal: false,
    displayRemoveLiquidity: false,
    displayConfirmRemove: false,
    temporaryApproval: false,
    Token_List: TokenList,
    firstInputToken: {},
    displayImportTokenFirstInput: false,
    firstInputTokenImport: {}
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

        // The functions below are for selecting and importing token for both inputs
        selectTokenForFirstInput: ((state, {payload}) => {
            state.firstInputToken = state.Token_List.find(token => token.id === payload)
        }),
        showPoolImportTokenModal: (state, {payload}) => {
            state.firstInputTokenImport = state.Token_List.find(token => token.id === payload)
            state.displayImportTokenFirstInput = true
        },
        hidePoolImportTokenModal: (state) => {
            state.displayImportTokenFirstInput = false
        },
        validateFirstInputImport: (state) => {
            state.firstInputToken = state.firstInputTokenImport
        }

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
    removeConfirmRemove,
    selectTokenForFirstInput,
    showPoolImportTokenModal,
    hidePoolImportTokenModal,
    validateFirstInputImport
} = PoolSlice.actions;

export default PoolSlice.reducer;