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
    return {
        type: ActionTypes.RESPONSE_DTO,
        payload,
    };
};

export const submitPaymentRequest = (payload) => {
    return {
        type: ActionTypes.PAYMENT_REQUEST,
        payload,
    };
};

export const isModelOpen = (payload) => {
    return {
        type: ActionTypes.MODEL_OPEN_REQUEST,
        payload,
    };
};

export const openEditModel = (data) => {
    return {
        type: ActionTypes.OPEN_EDIT_MODEL,
        payload:{
            data,
        }
    };
};

export const modelMessageRequest = (payload) => {
    return {
        type: ActionTypes.MODEL_MESSAGE_REQUEST,
        payload,
    };
};
