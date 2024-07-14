import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface ChangeKeyPayload{
    current_key: string
}

interface HamState{
    properties: {
        isHam: boolean,
        key: string
    },
}

const initialState: HamState = {
    properties : {
        isHam: false,
        key: ""
    },
}

export const HamSlice = createSlice({
    name: "hamSlice",
    initialState,
    reducers: {
        updateHamState: (state) => {
            state.properties.isHam = !state.properties.isHam
        },
        updateHamByBool: (state, action) => {
            state.properties.isHam = action.payload
        },
        changeKey: (state, action: PayloadAction<ChangeKeyPayload>) => {
            if(action.payload.current_key == state.properties.key){
                state.properties.key = ""
            }else{
                state.properties.key = action.payload.current_key
            }
        },

    }
})

export default HamSlice.reducer

export const {
    updateHamState,
    changeKey,
    updateHamByBool
} = HamSlice.actions