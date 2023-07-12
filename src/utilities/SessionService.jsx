// import Cookies from "js-cookie";
// import jwt_decode from "jwt-decode";

const TOKEN = "a2zposToken";
const USER_DETAIL = "a2zposUserDetail";

// ------------------------------------ Set in Cookies and localstorage ------------------------------------

export const setToken = (token) => {
    // Cookies.set(TOKEN, token);
    localStorage.setItem(TOKEN, token);
};

export const setUserDetail = (userDetail) => {
    // Cookies.set(USER_DETAIL, userDetail);
    localStorage.setItem(USER_DETAIL, JSON.stringify(userDetail));
};

// ------------------------------------ Get in Cookies and localstorage ------------------------------------

export const getToken = () => {
    const token = localStorage.getItem(TOKEN);
    // const token = Cookies.get(TOKEN);
    if (token === undefined || token === null) {
        return null;
    } else {
        return token;
    }
};

export const getUserDetail = () => {
    const userDetail = localStorage.getItem(USER_DETAIL);
    // const userDetail = Cookies.get(USER_DETAIL);

    if (userDetail === undefined || userDetail === null) {
        return null;
    } else {
        return JSON.parse(userDetail);
    }
};

// ------------------------------------ Remove in Cookies and localstorage ------------------------------------

export const clearAll = () => {
    // Cookies.remove(TOKEN);
    // Cookies.remove(USER_DETAIL);

    // remove
    // localStorage.removeItem('myData');
    // remove all
    localStorage.clear();
};

// ------------------------------------ Cookies and localstorage utility methods ------------------------------------

export const isLoggedIn = () => {
    const token = localStorage.getItem(TOKEN);

    // const token = Cookies.get(TOKEN);
    if (token === undefined || token === null) {
        return false;
    } else {
        return true;
    }
};

// -------------------------------------------------------------------------------------------------
