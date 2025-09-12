import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ConfirmationRequest } from "../../models/Request";

interface RequestState {
    requests: Array<ConfirmationRequest>
}
const initialState: RequestState = {
    requests: []
}

const requestSlice = createSlice( {
    name:'requests',
    initialState,
    reducers: {
        setRequests: (state: RequestState, action: PayloadAction<RequestState>) => {
            state.requests = action.payload;
        },
        removeRequest: (state: RequestState, action: PayloadAction<number>) => {
            state.requests = state.requests.filter((item: ConfirmationRequest) =>  {
                return item.id !== action.payload;
            })
        }
    }
})

export const {setRequests, removeRequest} = requestSlice.actions;
export default requestSlice.reducer;