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

export const companyNameList = (payload) => {
    return {
        type: ActionTypes.COMPANY_NAME_LIST_REQUEST,
        payload,
      };
};

export const submitExpenseRequestForm = (payload) => {
    return {
        type: ActionTypes.ADD_EXPENSE_REQUEST,
        payload,
    };
};

export const submitExpenseCategoryRequestForm = (payload) => {
    return {
        type: ActionTypes.ADD_EXPENSE_CATEGORY_REQUEST,
        payload,
    };
};

export const listRequestForExpense = (data) => {
    return {
        type: ActionTypes.EXPENSE_LIST_REQUEST,
        payload:{
            data,
        }
    };
};

export const listRequestForExpenseCategory = (data) => {
    return {
        type: ActionTypes.EXPENSE_CATEGORY_LIST_REQUEST,
        payload:{
            data,
        }
    };
};