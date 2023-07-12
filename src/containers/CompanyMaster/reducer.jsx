import _ from "lodash";
import { ActionTypes } from "./constants";
import { toast } from "react-toastify";

const defaultClassDTO = {};

const defaultResponseDTO = {};

const defaultState = {
  classDTO: JSON.parse(JSON.stringify(defaultClassDTO)),
  open: false,
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

    case ActionTypes.COMPANY_LIST_RESPONSE: {
      let data = action.payload.data || [];
      let newData = [];
      data.map((x, i) => {
        newData.push({
          No: i + 1,
          id:x.id,
          companyName: x.companyName,
          address: x.address,
          phoneNo: x.phoneNo,
          stateName: x.stateName,
          totalcount: x.totalcount
        });
      });
      
      const lastObject=newData[newData.length-1];
      const {No}=lastObject;

      state.companylist = newData;
      state.currentPage = 0;
      state.currentPageSize = No || 20;
      return JSON.parse(JSON.stringify(state));
    }

    case ActionTypes.ADD_COMPANY_RESPONSE: {
      state.open = action.payload.data || false;
      toast.success("dsfdf");
      state.classDTO={};
      // window.location.reload();
      return JSON.parse(JSON.stringify(state));
    }

    case ActionTypes.OPEN_EDIT_MODEL: {
      state.classDTO=action.payload.data || {};
      console.log("action.payload.data : ",action.payload.data);
      state.open=true;
      return JSON.parse(JSON.stringify(state));
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
