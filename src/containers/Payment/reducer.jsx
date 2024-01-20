import _ from "lodash";
import { ActionTypes } from "./constants";
import { toast } from "react-toastify";

const defaultClassDTO = {companyType:"Customer"};

const defaultResponseDTO = {};

const defaultState = {
  classDTO: JSON.parse(JSON.stringify(defaultClassDTO)),
  open: true,
  modelmessage:"",
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
      if (state.open == false) {
        state.classDTO = defaultClassDTO;
      }
      return { ...state };
      // return JSON.parse(JSON.stringify(state));
    }

    case ActionTypes.PAYMENT_RESPONSE: {
      state.open = action.payload.data || false;
      // state.modelmessage = action.payload.data;
      state.classDTO = {};
      // window.location.reload();
      return JSON.parse(JSON.stringify(state));
    }

    case ActionTypes.MODEL_MESSAGE_REQUEST: {
      state.open = action.payload.data || false;
      // state.modelmessage = action.payload;
      state.classDTO = {};
      // window.location.reload();
      return JSON.parse(JSON.stringify(state));
    }


    default:
      return state;
  }
};

export default reducer;
