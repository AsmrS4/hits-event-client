import type { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { setEvents } from "./eventReducer";

export const fetchEvents = () => async (dispatch: Dispatch) =>  {
    try {
        const response = axios({
                url: `${import.meta.env.API_URL}/event`,
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("ACCESS_TOKEN")
                },
            })
            console.log(response)
        dispatch(setEvents((await response).data));
    } catch (error) {
        throw error
    }
}