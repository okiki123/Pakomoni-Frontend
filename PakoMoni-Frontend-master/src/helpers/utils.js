import STATUS_CODES from "../constants/status-codes";

const setDate = (date) => {
    let day = date.getDate();
    day = day < 10 ? `0${day}` : day;
    let month = date.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}

const generateRandomString = (length = 6) => {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result
}

const handleError = (e) => {
    if (!e.response) {
        return 'Network Error';
    }

    if (e.response.status === STATUS_CODES.SERVICE_UNAVAILABLE) {
        return e.response.statusText;
    }

    return e.response.data.message;
}

const Utils = {
    setDate: setDate,
    generateRandomString: generateRandomString,
    handleError: handleError
}

export default Utils;
