import {ActionTypes} from "./constants";

export const updateClassDTO = (payload) => {
    return {
        type: ActionTypes.CLASS_DTO,
        payload,
    };
};

export const resetData = () => {
    return {
        type: ActionTypes.RESET_DATA,
    };
};

export const updateResponseDTO = (payload) => {
    console.log("hello");
    return {
        type: ActionTypes.RESPONSE_DTO,
        payload,
    };
};

export const isModelOpen = (payload) => {
    return {
        type: ActionTypes.MODEL_OPEN_REQUEST,
        payload,
    };
};
