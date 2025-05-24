import {ActionTypes} from "./constants";

export const updateClassDTO = (data) => {
    return {
        type: ActionTypes.CLASS_DTO,
        payload: {
            data,
        },
    };
};

export const updateValidationErrorDTO = (data) => {
    return {
        type: ActionTypes.VALIDATION_ERROR_DTO,
        payload: {
            data,
        },
    };
};
