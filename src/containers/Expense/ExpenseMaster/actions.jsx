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

export const submitCompnayRequestForm = (payload) => {
    return {
        type: ActionTypes.ADD_COMPANY_REQUEST,
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
        type: ActionTypes.COMPANY_LIST_REQUEST,
        payload:{
            data,
        }
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

export const deleteCompany = (data) => {
    return {
        type: ActionTypes.DELETE_COMPANY,
        payload:{
            data,
        }
    };
};

export const companyNameList = () => {
    return {
        type: ActionTypes.COMPANY_NAME_LIST_REQUEST,
        payload:{
            companyType:null
        }
    };
};