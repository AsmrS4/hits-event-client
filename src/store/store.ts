import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from './Auth/authReducer';
import eventSlice from './Events/eventReducer'

const rootReducer = combineReducers({
    authReducer: authSlice,
    eventReducer: eventSlice
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']