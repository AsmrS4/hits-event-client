import axios, { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import type { LoginProps } from "@models/Auth";
import { clearSession, setErrorMessage, setSession } from "./authReducer";
import type { Dispatch } from "@reduxjs/toolkit";


export const authorizeUser = (payload: LoginProps) => async (dispatch: Dispatch) => {
    try {
            const response = await axios({
                url: `${import.meta.env.API_URL}/auth/sign-in`,
                method: 'POST',
                data: {
                    ...payload,
                },
            });
            const JWT = response.data.accessToken;
            const { role } = jwtDecode(JWT);
            const {sub} = jwtDecode(JWT);
            
            dispatch(setSession({
                isAuth: true,
                login: sub || "",
                role: role[0],
                token: JWT
            }))
            
        } catch (error: AxiosError) {
            switch(error.status) {
                case 500:
                    dispatch(setErrorMessage("Не удалось обработать запрос"))
                case 404:
                    dispatch(setErrorMessage("Неверный логин или пароль"))
                case 401:
                    dispatch(setErrorMessage("Аккаунт не подтвержден"))
                default:
                    dispatch(setErrorMessage("Что-то пошло не так"))
            }
            
        }
}

export const logoutUser = () => async(dispatch: Dispatch) => {
    try {
        await axios({
            url:`${import.meta.env.API_URL}/auth/logout`,
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
            }
        })
        localStorage.clear();
        dispatch(await clearSession());
    } catch(error) {
        console.log(error)
        localStorage.clear();
        dispatch(await clearSession());
    } 
}