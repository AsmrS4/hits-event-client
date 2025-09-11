export const dateTimeConverter = (datetime: string) => {
    //2025-09-18T12:00:00
    if(datetime != null) {
        let array = datetime.split('T');
        let date = array[0].split('-').reverse().join('.');
        let time = array[1].substring(0,5);
        return date + ' ' + time;
    }
    return '';
}

export const isAfterDeadline = (deadline: string | null | undefined) => {
    if(deadline) {
        const today = new Date();
        return today.toISOString() >= deadline;
    }
    return false;
}