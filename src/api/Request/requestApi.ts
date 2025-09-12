import axios from "axios"

export const confirmAccount = async(accountRequestId: number) => {
    return await axios({
        url: `${import.meta.env.API_URL}/user/confirmation/confirm/${accountRequestId}`,
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
        }
    })
}

export const rejectAccount = async(accountRequestId: number) => {
    return await axios({
        url: `${import.meta.env.API_URL}/user/confirmation/reject/${accountRequestId}`,
        method: 'DELETE',
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
        }
    })
}