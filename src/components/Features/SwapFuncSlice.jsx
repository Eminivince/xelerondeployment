import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    swapInputs: {
        from: '',
        to: ''
    }
}

const SwapFuncSlice = createSlice({
    name: 'swapFunctions',
    initialState,
    reducers: {
        fillSwapInputs: (state, {payload}) =>{
            // const {name, value} = e.target
            // setSwapInputs(prevValue => {
            //     return {
            //         ...prevValue,
            //         [name]: value
            //     }
            // })
            console.log(payload)
        }
    }
})

export const {fillSwapInputs} = SwapFuncSlice.actions

export default SwapFuncSlice.reducer