import { createSlice } from "@reduxjs/toolkit";
import type { EventProps } from "../../models/Event";

interface EventState {
    events: Array<EventProps>
}

const initialState: EventState = {
    events: []
}

const eventSlice = createSlice({
    name:"events",
    initialState,
    reducers: {
        setEvents: (state, action) => {
            state.events = action.payload;
        },
        clearEvents: (state) => {
            state.events = []
        }
    }
})

export const {setEvents, clearEvents} = eventSlice.actions;
export default eventSlice.reducer;