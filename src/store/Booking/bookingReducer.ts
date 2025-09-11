import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { BookingProps } from "../../models/Booking";

interface BookingState {
    booking: Array<BookingProps>
}
const initialState: BookingState = {
    booking: []
}

const bookingSlice = createSlice( {
    name: 'booking',
    initialState,
    reducers: {
        setBookings: (state, action: PayloadAction<Array<BookingProps>>) => {
            state.booking = action.payload
        },
        removeBooking: (state, action: PayloadAction<number>) => {
            let temp = state.booking;
            state.booking = temp.filter(item => item.id != action.payload);
        }
    }
})

export const {setBookings, removeBooking} = bookingSlice.actions;
export default bookingSlice.reducer;