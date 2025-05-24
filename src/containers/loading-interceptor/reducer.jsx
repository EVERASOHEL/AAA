import _ from "lodash";
import {ActionTypes} from "./constants";

const initialState = {
    classDTO: {},
    validationErrorDTO: {},
};

const reducer = (stateDTO = initialState, action) => {
    let state = _.cloneDeep(stateDTO);

    switch (action.type) {
        case ActionTypes.CLASS_DTO: {
            state.classDTO = action.payload.data || {};
            return state;
        }
        case ActionTypes.VALIDATION_ERROR_DTO: {
            state.validationErrorDTO = action.payload.data || {};
            return state;
        }
        default: {
            return state;
        }
    }
};

export default reducer;
