import _ from "lodash";
import { ActionTypes1 } from "./constants";
import { toast } from "react-toastify";

const defaultClassDTO = {companyType:"Customer"};

const defaultResponseDTO = {};

const defaultState = {
  classDTO: JSON.parse(JSON.stringify(defaultClassDTO)),
  loadingStatus: false,
};

const initialState = defaultState;

const reducer = (stateDTO = initialState, action) => {
  let state = _.cloneDeep(stateDTO);

  switch (action.type) {

    case ActionTypes1.CLASS_DTO: {
      state.classDTO = action.payload || {};
      return { ...state };
      // return JSON.parse(JSON.stringify(state));
    }

    case ActionTypes1.LOADING_STATUS: {
      state.loadingStatus = action.payload || {};
      // return { ...state };
      return JSON.parse(JSON.stringify(state));
    }

    case ActionTypes1.SHOW_LOADING: {
      state.classDTO = true
      return { ...state };
    }

    case ActionTypes1.HIDE_LOADING: {
      state.classDTO = false
      return { ...state };
    }

    default:
      return state;
  }
};

export default reducer;
