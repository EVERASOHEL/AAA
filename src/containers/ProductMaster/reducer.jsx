import _ from "lodash";
import { ActionTypes } from "./constant";

const defaultClassDTO = {};

const defaultResponseDTO = {};

const defaultState = {
  classDTO: JSON.parse(JSON.stringify(defaultClassDTO)),
  open: false,
  // responseDTO: _.cloneDeep(defaultResponseDTO),
};

const initialState = defaultState;

const reducer = (stateDTO = initialState, action) => {
  let state = _.cloneDeep(stateDTO);

  switch (action.type) {
    case ActionTypes.CLASS_DTO: {
      state.classDTO = action.payload || {};
      return { ...state };
      // return JSON.parse(JSON.stringify(state));
    }

    case ActionTypes.MODEL_OPEN_REQUEST: {
      state.open = action.payload || false;
      return { ...state };
      // return JSON.parse(JSON.stringify(state));
    }

    // case ActionTypes.RESET_DATA: {
    //   return _.cloneDeep(defaultState);
    // }

    // case ActionTypes.RESPONSE_DTO: {
    //   if (payload.key == "reset") {
    //     state.responseDTO = _.cloneDeep(defaultResponseDTO);
    //   } else {
    //     state.responseDTO = { ...state.responseDTO, ...payload };
    //   }
    //   return state;
    // }

    default:
      return state;
  }
};

export default reducer;
