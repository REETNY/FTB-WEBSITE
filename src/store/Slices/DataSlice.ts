import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface DataState {
    movies: {
        hearted: {id: number}[],
        watched: {id:number}[],
        list: {id:number}[],
        rating: {id:number, rated: number}[]
    },
    series: {
        hearted: {id: number}[],
        watched: {id:number}[],
        list: {id:number}[],
        rating: {id:number, rated: number}[]
    },
    anime: {
        hearted: {id: number}[],
        watched: {id:number}[],
        list: {id:number}[],
        rating: {id:number, rated: number}[]
    },
    manga: {
        hearted: {id: number}[],
        watched: {id:number}[],
        list: {id:number}[],
        rating: {id:number, rated: number}[]
    }
}

const initialState: DataState = {
    movies: {
        hearted: [],
        watched: [],
        list: [],
        rating: []
    },
    series: {
        hearted: [],
        watched: [],
        list: [],
        rating: []
    },
    anime: {
        hearted: [],
        watched: [],
        list: [],
        rating: []
    },
    manga: {
        hearted: [],
        watched: [],
        list: [],
        rating: []
    }
}


export const DataSlice = createSlice({
    name: "dataSlice",
    initialState,
    reducers: {
        addRating: (state, action: PayloadAction<{rate: number, type: string, id: number}>) => {
            let { type, rate, id} = action.payload;
            
            if(type == "movies"){
                const itExist = state.movies.rating.find((item) => (item.id == id));
                if(itExist){
                    state.movies.rating = state.movies.rating.map((item) => item.id == id ? {id, rated: rate} : item)
                }else{
                    state.movies.rating = [...state.movies.rating, {id, rated: rate}];
                }
            }else if(type == "series"){
                const itExist = state.series.rating.find((item) => (item.id == id));
                if(itExist){
                    state.series.rating = state.series.rating.map((item) => item.id == id ? {id, rated: rate} : item)
                }else{
                    state.series.rating = [...state.series.rating, {id, rated: rate}];
                }
            }else if(type == "anime"){
                const itExist = state.anime.rating.find((item) => (item.id == id));
                if(itExist){
                    state.anime.rating = state.anime.rating.map((item) => item.id == id ? {id, rated: rate} : item)
                }else{
                    state.anime.rating = [...state.anime.rating, {id, rated: rate}];
                }
            }else if(type == "manga"){
                const itExist = state.manga.rating.find((item) => (item.id == id));
                if(itExist){
                    state.manga.rating = state.manga.rating.map((item) => item.id == id ? {id, rated: rate} : item)
                }else{
                    state.manga.rating = [...state.manga.rating, {id, rated: rate}];
                }
            }
        },
        clearRating: (state, action) => {
            let { type, id} = action.payload;
            if(type == "movies"){
                state.movies.rating = state.movies.rating.filter((item) => item.id == id ? false : item);
            }else if(type == "series"){
                state.series.rating = state.series.rating.filter((item) => item.id == id ? false : item);
            }else if(type == "anime"){
                state.anime.rating = state.anime.rating.filter((item) => item.id == id ? false : item);
            }else if(type == "manga"){
                state.manga.rating = state.manga.rating.filter((item) => item.id == id ? false : item);
            }
        },
        addListed: (state, action) => {
            let { type, id} = action.payload;
            if(type == "movies"){
                const itExist = state.movies.list.find((item) => item.id == id);
                if(itExist){
                    state.movies.list = state.movies.list.filter((item) => item.id == id ? false : item)
                }else{
                    state.movies.list = [...state.movies.list, {id}]
                }
            }else if(type == "series"){
                const itExist = state.series.list.find((item) => item.id == id);
                if(itExist){
                    state.series.list = state.series.list.filter((item) => item.id == id ? false : item)
                }else{
                    state.series.list = [...state.series.list, {id}]
                }
            }else if(type == "anime"){
                const itExist = state.anime.list.find((item) => item.id == id);
                if(itExist){
                    state.anime.list = state.anime.list.filter((item) => item.id == id ? false : item)
                }else{
                    state.anime.list = [...state.anime.list, {id}]
                }
            }else if(type == "manga"){
                const itExist = state.manga.list.find((item) => item.id == id);
                if(itExist){
                    state.manga.list = state.manga.list.filter((item) => item.id == id ? false : item)
                }else{
                    state.manga.list = [...state.manga.list, {id}]
                }
            }
        },
        addHeared: (state, action) => {
            let { type, id} = action.payload;
            if(type == "movies"){
                const itExist = state.movies.hearted.find((item) => item.id == id);
                if(itExist){
                    state.movies.hearted = state.movies.hearted.filter((item) => item.id == id ? false : item)
                }else{
                    state.movies.hearted = [...state.movies.hearted, {id}]
                }
            }else if(type == "series"){
                const itExist = state.series.hearted.find((item) => item.id == id);
                if(itExist){
                    state.series.hearted = state.series.hearted.filter((item) => item.id == id ? false : item)
                }else{
                    state.series.hearted = [...state.series.hearted, {id}]
                }
            }else if(type == "anime"){
                const itExist = state.anime.hearted.find((item) => item.id == id);
                if(itExist){
                    state.anime.hearted = state.anime.hearted.filter((item) => item.id == id ? false : item)
                }else{
                    state.anime.hearted = [...state.anime.hearted, {id}]
                }
            }else if(type == "manga"){
                const itExist = state.manga.hearted.find((item) => item.id == id);
                if(itExist){
                    state.manga.hearted = state.manga.hearted.filter((item) => item.id == id ? false : item)
                }else{
                    state.manga.hearted = [...state.manga.hearted, {id}]
                }
            }
        },
        addWatched_Read: (state, action) => {
            let { type, id} = action.payload;
            if(type == "movies"){
                const itExist = state.movies.watched.find((item) => item.id == id);
                if(itExist){
                    state.movies.watched = state.movies.watched.filter((item) => item.id == id ? false : item)
                }else{
                    state.movies.watched = [...state.movies.watched, {id}]
                }
            }else if(type == "series"){
                const itExist = state.series.watched.find((item) => item.id == id);
                if(itExist){
                    state.series.watched = state.series.watched.filter((item) => item.id == id ? false : item)
                }else{
                    state.series.watched = [...state.series.watched, {id}]
                }
            }else if(type == "anime"){
                const itExist = state.anime.watched.find((item) => item.id == id);
                if(itExist){
                    state.anime.watched = state.anime.watched.filter((item) => item.id == id ? false : item)
                }else{
                    state.anime.watched = [...state.anime.watched, {id}]
                }
            }else if(type == "manga"){
                const itExist = state.manga.watched.find((item) => item.id == id);
                if(itExist){
                    state.manga.watched = state.manga.watched.filter((item) => item.id == id ? false : item)
                }else{
                    state.manga.watched = [...state.manga.watched, {id}]
                }
            }
        }
    }
})


export const { 
    addRating,
    addHeared,
    clearRating,
    addListed,
    addWatched_Read
} = DataSlice.actions

export default DataSlice.reducer