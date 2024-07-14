import { configureStore, combineReducers } from '@reduxjs/toolkit'
import DataSlice from './Slices/DataSlice'
import UserSlice from './Slices/UserSlice'
import storage from './apiStorage'
import InitSlice from "./Slices/InfiniteQueries"
import { persistReducer, persistStore, FLUSH, PAUSE, REHYDRATE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import HamSlice from './Slices/HamSlice'
import QuerySlice from './Slices/QuerySlice'
import PalletteSlice from './Slices/PalletteSlice'

const persistConfig = {
    key: "root",
    storage: storage,
    whitelist: ["dataSlice", "userSlice"]
}

const rootReducer = combineReducers({
    dataSlice: DataSlice,
    userSlice: UserSlice,
    initSlice: InitSlice,
    hamSlice: HamSlice,
    querySlice: QuerySlice,
    pallettes: PalletteSlice
})

const persistedReducers = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducers,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck:{
            ignoredActions: [FLUSH, PAUSE, REGISTER, REHYDRATE, PURGE, PERSIST]
        }
    })
})

export default store

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch