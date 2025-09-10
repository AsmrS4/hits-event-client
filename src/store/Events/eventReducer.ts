import { createSlice } from "@reduxjs/toolkit";
import type { EventProps } from "../../models/Event";

interface EventState {
    events: Array<EventProps>
    isLoaded: boolean
}

const initialState: EventState = {
    events: [],
    isLoaded: false
}

const eventSlice = createSlice({
    name:"events",
    initialState,
    reducers: {
        setEvents: (state, action) => {
            state.events = action.payload;
            state.isLoaded = true
        },
        clearEvents: (state) => {
            state.events = []
        }
    }
})

export const {setEvents, clearEvents} = eventSlice.actions;
export default eventSlice.reducer;