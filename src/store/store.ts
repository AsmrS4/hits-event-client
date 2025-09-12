import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from './Auth/authReducer';
import eventSlice from './Events/eventReducer'
import companySlice from './Company/companyReducer';
import bookingSlice from './Booking/bookingReducer';
import requestSlice from './Requests/requestReducer';

const rootReducer = combineReducers({
    authReducer: authSlice,
    eventReducer: eventSlice,
    companyReducer: companySlice,
    bookingReducer: bookingSlice,
    requestReducer: requestSlice
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']