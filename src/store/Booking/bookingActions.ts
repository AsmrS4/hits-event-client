import axios from "axios";
import type { Dispatch } from "redux";
import { setBookings } from "./bookingReducer";

export const fetchBookings = () => async(dispatch: Dispatch) => {
    try {
        const response = await axios({
            url: `${import.meta.env.API_URL}/event/booking/my`,
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("ACCESS_TOKEN")
            }
        })
        dispatch(setBookings(await response.data));
    } catch (error) {
        throw error;
    }
}