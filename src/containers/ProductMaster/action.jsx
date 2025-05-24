import {ActionTypes} from "./constant";

export function registration(data) {
    return {
        type: ActionTypes.REGISTRATION_FORM,
        data,
    };
}

export function submitProductRquestForm(data) {
    return {
        type: ActionTypes.PRODUCT_REQUEST,
        payload: {
            data,
        },
    };
}

export const updateClassDTO = (payload) => {
    return {
        type: ActionTypes.CLASS_DTO,
        payload,
    };
};

export const isModelOpen = (payload) => {
    return {
        type: ActionTypes.MODEL_OPEN_REQUEST,
        payload,
    };
};
