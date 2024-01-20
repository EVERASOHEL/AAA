import {ActionTypes} from "./constants";

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

export const listRequest = (data) => {
    return {
        type: ActionTypes.PRODUCT_LIST_REQUEST,
        payload:{
            data,
        }
    };
};

export const deleteProduct = (data) => {
    return {
        type: ActionTypes.DELETE_PRODUCT,
        payload:{
            data,
        }
    };
};

export const getAllProductName = () => {
    return {
        type: ActionTypes.PRODUCT_NAME_LIST_REQUEST,
    };
};