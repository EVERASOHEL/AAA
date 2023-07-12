import _ from "lodash";
import { ActionTypes } from "./constants";

const defaultClassDTO = {};

const defaultResponseDTO = {};

const defaultState = {
  classDTO: JSON.parse(JSON.stringify(defaultClassDTO)),

  // responseDTO: _.cloneDeep(defaultResponseDTO),
};

const initialState = defaultState;

const reducer = (stateDTO = initialState, action) => {
  let state = _.cloneDeep(stateDTO);

  switch (action.type) {
    case ActionTypes.CLASS_DTO: {
      state.classDTO = action.payload || {};
      console.log("action.payload : ", action.payload);
      return { ...state };
      // return JSON.parse(JSON.stringify(state));
    }

    case ActionTypes.MODEL_OPEN_REQUEST: {
      state.open = action.payload || false;
      return { ...state };
      // return JSON.parse(JSON.stringify(state));
    }

    default:
      return state;
  }
};

export default reducer;
