import { createSlice } from "@reduxjs/toolkit";

interface QuerySlice{
    params: {
        sort?: string | undefined | null,
        with_genres?: string[] | number[],
        user_score?: {
            min?: number,
            max?: number
        },
        user_votes?: number,
        runtime?: {
          min: number,
          max: number
        },
        available?: string[] | number[],
        provider?: string[] | number[],
        release_date?: {
          from?: string,
          to?: string
        },
        air_date?: {
            from?: string,
            to?: string
        },
        first_air_date?: {
            from?: string,
            to?: string
        },
        release_types?: string[] | number[],
        certification?: string,
        keyword?: string,
        show_me?: string,
        type?: string,
        sfw?: string | boolean,
        rating?: string,
        limit?: number,
        status?: string,
        letter?:string
    },
    isBtnActive: boolean,
    isInView: boolean,
    tv_date: string
}

const initialState: QuerySlice = {
    params: {},
    isBtnActive: false,
    isInView: false,
    tv_date: "air_date"
}

export const QuerySlice = createSlice({
    name: "querySlice",
    initialState,
    reducers: {
        setQueriesParams: (state, action) => {
            state.params = action.payload
        },
        queryBtn: (state, action) => {
            state.isBtnActive = action.payload
        },
        isBtnInView: (state, action) => {
            state.isInView = action.payload
        },
        setRelease: (state, action) => {
            state.tv_date = action.payload;
        }
    }
})

export default QuerySlice.reducer

export const {
    setQueriesParams,
    queryBtn,
    isBtnInView,
    setRelease
} = QuerySlice.actions