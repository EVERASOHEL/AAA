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
