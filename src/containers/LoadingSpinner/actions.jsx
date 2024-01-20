import {ActionTypes1} from "./constants";

export const updateClassDTO = (payload) => {
    return {
        type: ActionTypes1.CLASS_DTO,
        payload,
    };
};

export const changeLoadingStatus = (payload) => {
    console.log("111");
    return {
        type: ActionTypes1.LOADING_STATUS,
        payload,
    };
};
