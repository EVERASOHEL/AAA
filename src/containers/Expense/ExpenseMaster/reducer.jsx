import _ from "lodash";
import { ActionTypes } from "./constants";
import { toast } from "react-toastify";

const defaultClassDTO = { ExpenseType: "Expense" };

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
      if (state.open == false) {
        let currentSelectedOption = state.classDTO.ExpenseType;
        state.classDTO = defaultClassDTO;
        state.classDTO.ExpenseType = currentSelectedOption;
      }
      return { ...state };
      // return JSON.parse(JSON.stringify(state));
    }

    case ActionTypes.EXPENSE_LIST_RESPONSE: {
      let data = action.payload.data || [];
      let newData = [];
      data.map((x, i) => {
        newData.push({
          No: i + 1,
          id: x.id,
          expenseName: x.expenseName,
          expenseDateString: x.expenseDateString,
          expenseAmount: x.expenseAmount,
          paymentMethod: x.paymentMethod,
        });
      });

      const lastObject = newData[newData.length - 1];
      const { No } = lastObject || 0;

      console.log("newData : ",newData);
      state.expenselist = newData;
      state.currentPage = 0;
      state.currentPageSize = No || 20;
      return JSON.parse(JSON.stringify(state));
    }

    case ActionTypes.EXPENSE_CATEGORY_LIST_RESPONSE: {
      let data = action.payload.data || [];
      let newData = [];
      data.map((x, i) => {
        newData.push({
          No: i + 1,
          id: x.id,
          companyName: x.companyName,
          categoryName: x.categoryName,
          description: x.description,
        });
      });

      const lastObject = newData[newData.length - 1];
      const { No } = lastObject || 0;

      state.expensecategorylist = newData;
      state.currentPage = 0;
      state.currentPageSize = No || 20;
      return JSON.parse(JSON.stringify(state));
    }

    case ActionTypes.OPEN_EDIT_MODEL: {
      state.classDTO = action.payload.data || {};
      state.open = true;
      return JSON.parse(JSON.stringify(state));
    }

    case ActionTypes.ADD_EXPENSE_CATEGORY_RESPONSE: {
      state.classDTO = defaultClassDTO;
      state.classDTO.ExpenseType = "ExpenseCategory";
      state.open = action.payload.data || false;
      return JSON.parse(JSON.stringify(state));
    }

    case ActionTypes.ADD_EXPENSE_RESPONSE: {
      state.classDTO = defaultClassDTO;
      state.classDTO.ExpenseType = "Expense";
      state.open = action.payload.data || false;
      return JSON.parse(JSON.stringify(state));
    }

    case ActionTypes.COMPANY_NAME_LIST_RESPONSE: {
      let data = action.payload.data || [];
      state.companyNameList = data;
      return JSON.parse(JSON.stringify(state));
    }

    case ActionTypes.EXPENSE_CATEGORY_NAME_LIST_RESPONSE: {
      let data = action.payload.data || [];
      state.expenseCategoryNameList = data;
      return JSON.parse(JSON.stringify(state));
    }

    default:
      return state;
  }
};

export default reducer;
