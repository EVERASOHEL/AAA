import {ActionTypes} from "../constants";

export const getFetchRequestedAction = () => {
    return {
        type: ActionTypes.FETCH_INITIATED,
        payload: {},
    };
};

export const getFetchCompletedAction = () => {
    return {
        type: ActionTypes.FETCH_COMPLETED,
        payload: {},
    };
};

export const getUnauthenticatedRequestAction = () => {
    return {
        type: ActionTypes.UNAUTHENTICATED_REQUEST,
        payload: {},
    };
};
