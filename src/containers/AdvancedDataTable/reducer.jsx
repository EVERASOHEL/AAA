import _ from "lodash";
import { ActionTypes } from "./constants";

const initialState = {
  classDTO: {},
  validationErrorDTO: {},
  selectedFilters: {},
};

const reducer = (stateDTO = initialState, action) => {
  let state = _.cloneDeep(stateDTO);

  switch (action.type) {
    case ActionTypes.CLASS_DTO: {
      state.classDTO = action.payload.data || {};
      return state;
    }

    case ActionTypes.LIST_RESPONSE: {
      const data = action.payload.data || [];
      const transformedData = data.map((item, index) => {
        const newItem = { No: index + 1 };
        for (const key in item) {
          if (item.hasOwnProperty(key)) {
            newItem[key] = item[key];
          }
        }
        return newItem;
      });

      const lastItem = transformedData[transformedData.length - 1];
      const { No } = lastItem || 0;

      state.list = transformedData;
      state.currentPage = 0;
      state.currentPageSize = No || 20;
      return JSON.parse(JSON.stringify(state));
    }

    case ActionTypes.UPDATE_SELECTED_FILTERS: {
      return {
        ...state,
        selectedFilters: action.payload || {},
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
