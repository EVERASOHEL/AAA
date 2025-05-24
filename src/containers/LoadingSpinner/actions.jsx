import {ActionTypes1} from "./constants";

export const updateClassDTO = (payload) => {
    return {
        type: ActionTypes1.CLASS_DTO,
        payload,
    };
};

export const changeLoadingStatus = (payload) => {
    return {
        type: ActionTypes1.LOADING_STATUS,
        payload,
    };
};

export const showLoading = () => {
    return {
        type: ActionTypes1.SHOW_LOADING
    };
};

export const hideLoading = () => {
    return {
        type: ActionTypes1.HIDE_LOADING
    };
};