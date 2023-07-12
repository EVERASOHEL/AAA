import {ActionTypes} from "../constants";

export const updateIsUserAuthenticated = (isUserAuthenticated) => {
    return {
        type: ActionTypes.UPDATE_IS_AUTHENTICATED,
        payload: {
            isUserAuthenticated,
        },
    };
};

export const logout = () => {
    return {
        type: ActionTypes.USER_LOGOUT,
        payload: {},
    };
};

export const getBusinessException = (exception) => {
    return {
        type: ActionTypes.BUSINESS_EXCEPTION,
        payload: {
            exception,
        },
    };
};

export const updateSideBarShow = (data) => {
    return {
        type: ActionTypes.UPDATE_SIDE_BAR_SHOW,
        payload: {
            data,
        },
    };
};

export const updateDTO = (payload) => {
    return {
        type: ActionTypes.UPDATE_DTO,
        payload,
    };
};
