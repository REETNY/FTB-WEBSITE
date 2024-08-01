import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


export interface DataState {
    country: string,
    userDetails: {
        blob: string | null,
        name: string | null,
        username: string | null,
        password: string | null,
        email: string | null,
        isLoggedIn: boolean
    },
    userMsg: string
}

export interface Create {
    blob: string | null,
    name: string | null,
    username: string | null,
    password: string | null,
    email: string | null
}

export interface Signin {
    username: string,
    password: string,
}

const initialState: DataState = {
    country: "NG",
    userDetails: {
        blob: null,
        name: null,
        username: null,
        password: null,
        email: null,
        isLoggedIn: false
    },
    userMsg: ""
}

export const UserSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        chooseCountry: (state, action: PayloadAction<string>) => {
            state.country = action.payload;
            localStorage.setItem("FMD_Country", action.payload)
        },
        createUser: (state, action:PayloadAction<Create>) => {
            state.userDetails = {...action.payload, isLoggedIn: true};
        },
        loginUser: (state, action:PayloadAction<Signin>) => {
            let username = action.payload.username;
            let password = action.payload.password;

            if(state.userDetails.password == password && state.userDetails.username == username){
                state.userDetails = {
                    ...state.userDetails,
                    isLoggedIn: true
                }
                state.userMsg = ""
            }else if(state.userDetails.password != password || state.userDetails.username != username){
                state.userMsg = "User not found!"
            }else{
                state.userMsg = ""
            }
        },
        logout: (state) => {
            state.userDetails = {
                ...state.userDetails,
                isLoggedIn: false
            }
        }
    }
})


export const { 
    chooseCountry,
    createUser,
    logout,
    loginUser
} = UserSlice.actions

export default UserSlice.reducer