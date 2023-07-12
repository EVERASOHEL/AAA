import _ from "lodash";
import { ActionTypes } from "./constants";

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

    case ActionTypes.PRODUCT_RESPONSE: {
      state.open = action.payload.data || false;
      return { ...state };
      // return JSON.parse(JSON.stringify(state));
    }

    case ActionTypes.PRODUCT_LIST_RESPONSE: {
      let data = action.payload.data || [];
      let newData = [];
      data.map((x, i) => {
        newData.push({
          No: i + 1,
          id: x.id,
          productName: x.productName,
          sellingPrice: x.sellingPrice,
          costPrice: x.costPrice,
          productHsn: x.productHsn,
          gstPercentage: x.gstPercentage,
          productType: x.productType,
        });
      });

      const lastObject = newData[newData.length - 1];
      const { No } = lastObject;
      state.productlist = newData;
      state.currentPage = 0;
      state.currentPageSize = No || 20;
      return JSON.parse(JSON.stringify(state));
    }
    default:
      return state;
  }
};

export default reducer;
