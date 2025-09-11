import axios from "axios"

export const registerOnEvent = async(eventId: number) => {
    return await axios({
        url: `${import.meta.env.API_URL}/event/booking/${eventId}`,
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("ACCESS_TOKEN")
        }
    });
}

export const cancellRegisterOnEvent = async(bookingId: number) => {
    return await axios({
        url: `${import.meta.env.API_URL}/event/booking/${bookingId}`,
        method: 'DELETE',
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("ACCESS_TOKEN")
        }
    })
}