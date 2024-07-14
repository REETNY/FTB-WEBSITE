import { createSlice } from "@reduxjs/toolkit";

interface Pallettes {
    pallette: {[key: string]: string}
}


const initialState: Pallettes = {
    pallette: {
        
    }
}

export const PallettesSlice = createSlice({
    name: "pallettes",
    initialState,
    reducers: {
        setCurrentPallette: (state, action) => {
            state.pallette = {...action.payload}
        }
    }
})

export default PallettesSlice.reducer

export const {
    setCurrentPallette
} = PallettesSlice.actions