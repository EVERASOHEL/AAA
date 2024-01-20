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

export const isModelOpen = (payload) => {
    return {
        type: ActionTypes.MODEL_OPEN_REQUEST,
        payload,
    };
};

export const getTotalAmountReceivableAndPaybleRequest = () => {
    return {
        type: ActionTypes.TOTAL_RECEIVABLE_AND_PAYBLE_AMOUNT_REQUEST,
    };
};

