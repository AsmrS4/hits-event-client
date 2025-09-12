import type { Dispatch } from "redux";
import { clearSession } from "../Auth/authReducer";
import axios from "axios";
import { setRequests } from "./requestReducer";

export const fetchRequests = () => async(dispatch: Dispatch) => {
    try {
        const response = await axios({
            url: `${import.meta.env.API_URL}/user/confirmation/list`,
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
            },
        });
        dispatch(setRequests(await response.data));        
    } catch (error) {
        if (error.status === 401) {
            dispatch(clearSession());
        } else {
            throw error;
        }
    }
}