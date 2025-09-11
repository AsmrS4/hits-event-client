import axios from "axios";
import type { Dispatch } from "redux";
import { setCompanies } from "./companyReducer";
import { clearSession } from "../Auth/authReducer";

export const fetchCompanies = () => async(dispatch: Dispatch) => {
    try {
        const response = await axios({
            url: `${import.meta.env.API_URL}/company`,
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
            },
        });
        dispatch(setCompanies((await response).data));
    } catch (error) {
        if(error.status === 401) {
            dispatch(clearSession());
            return
        }
        throw error
    }
}