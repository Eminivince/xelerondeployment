import { createSlice } from "@reduxjs/toolkit";
import { TokenList } from "../Temporary/TokenList";


const initialState = {
    Token_List: TokenList,
    currentImport: {},
    displayImportToken: false
}

const tokenSlice = createSlice({
    name: 'token_slice',
    initialState,
    reducers: {
        importToken: ((state, {payload}) => {
            state.currentImport = state.Token_List.find(token => token.id === payload)
            state.displayImportToken = true
        }),
        hideImportToken: (state) => {
            state.displayImportToken = false
        }
    }
})

export const { importToken, hideImportToken } = tokenSlice.actions

export default tokenSlice.reducer