import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface DataState {
    datas : {
        adult: false,
        backdrop_path: string,
        genre_ids: number[],
        id: number,
        original_language: string,
        original_title: string,
        overview: string,
        popularity: number,
        poster_path: string,
        release_date: string,
        title: string,
        video: boolean,
        vote_average: number,
        vote_count: number
    }[]
}

interface movie{
    adult: false,
    backdrop_path: string,
    genre_ids: number[],
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
}

const initialState: DataState = {
    datas: []
}

export const InitSlice = createSlice({
    name: "initSlice",
    initialState,
    reducers: {
        clearDatas: (state) => {
            state.datas = []
        },
        addDatas: (state, action: PayloadAction<movie[]>) => {
            state.datas = [...state.datas, ...action.payload];
        }
    }
})

export const {
    clearDatas,
    addDatas
} = InitSlice.actions

export default InitSlice.reducer