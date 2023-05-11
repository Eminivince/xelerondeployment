import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    status: false,
}

const ConnectAccountSlice = createSlice({
    name: 'connectionStatus',
    initialState,
    reducers: {
        connectUserAccount: (state) => {
            state.status = true
        },
        disconnectUserAccount: (state) => {
            state.status = false
        }
    }
})

export const connectUserAccount = ConnectAccountSlice.actions.connectUserAccount
export const disconnectUserAccount = ConnectAccountSlice.actions.disconnectUserAccount

export default ConnectAccountSlice.reducer