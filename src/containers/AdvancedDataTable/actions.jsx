import {ActionTypes} from "./constants";

export const updateClassDTO = (data) => {
    return {
        type: ActionTypes.CLASS_DTO,
        payload: {
            data,
        },
    };
};

export const listRequest = (data) => {
    return {
        type: ActionTypes.LIST_REQUEST,
        payload:{
            data,
        }
    };
};

export const handleAdvancedFilterChangeData = (data) => {
    return {
        type: ActionTypes.UPDATE_TABLE_DATA,
        payload:{
            data,
        }
    };
};

export const updateSelectedFilters = (payload) => {
    return {
      type: ActionTypes.UPDATE_SELECTED_FILTERS,
      payload, // Only the updated filter value
    };
};