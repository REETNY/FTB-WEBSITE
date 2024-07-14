import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


export interface DataState {
    country: string
}

const initialState: DataState = {
    country: "NG"
}

export const UserSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        chooseCountry: (state, action: PayloadAction<string>) => {
            state.country = action.payload;
            localStorage.setItem("FMD_Country", action.payload)
        }
    }
})


export const { 
    chooseCountry
} = UserSlice.actions

export default UserSlice.reducer