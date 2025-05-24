import _ from "lodash";
import { ActionTypes } from "./constants";
import moment from "moment";
import isNullOrIsEmptyOrIsUndefined from "../../../utilities/CommonValidator";
import * as commonFunction from "../../../utilities/CommonFunction";

const convertedDateTime = moment(new Date()).format(
  "ddd MMM D YYYY HH:mm:ss [GMT]ZZ (India Standard Time)"
);

const defaultClassDTO = { gstType: "IGST18[18%]", orderDate: new Date() };
// "date":new Date()
const defaultSalesClassDTO = [];

let list = [];

const defaultResponseDTO = {};

const defaultState = {
  classDTO: JSON.parse(JSON.stringify(defaultClassDTO)),
  salesClassListDTO: JSON.parse(JSON.stringify(defaultSalesClassDTO)),
  salesClassDTO: JSON.parse(JSON.stringify(defaultClassDTO)),
  isPaymentModelOpen: false,
  open: false,
  saveSuccess:false,
  // responseDTO: _.cloneDeep(defaultResponseDTO),
};

const initialState = defaultState;

const reducer = (stateDTO = initialState, action) => {
  let state = _.cloneDeep(stateDTO);

  switch (action.type) {
    case ActionTypes.CLASS_DTO: {
      state.classDTO = action.payload || {};
      return { ...state };
    }

    case ActionTypes.SALES_CLASS_LIST_DTO: {
      let object = action.payload || [];
      let flag = action.flag || "";
      let newSalesClassListDTO = [...state.salesClassListDTO]; // Copy the existing list

      if (flag === "update") {
        // Replace the list entirely with the new object
        newSalesClassListDTO = Object.values(object);
      } else if (flag === "new") {
        // Append the new object to the existing list
        newSalesClassListDTO = [...newSalesClassListDTO, object];
      } else {
        // Replace the list with the object (default case)
        newSalesClassListDTO = object;
      }

      // Calculate total GST Amount
      const totalGSTAmountValue = newSalesClassListDTO.reduce(
        (acc, obj) => acc + (obj.total || 0), // Safely handle if 'total' is undefined
        0
      );

      // Calculate GST and update classDTO immutably
      let updatedClassDTO = {
        ...state.classDTO,
        totalAmount: totalGSTAmountValue,
      };

      if (!isNullOrIsEmptyOrIsUndefined(state.classDTO.gstType)) {
        const GstAmount = commonFunction.calculateGSTAmount(
          totalGSTAmountValue,
          state.classDTO.gstType
        );
        updatedClassDTO = {
          ...updatedClassDTO,
          totalTaxAmount: GstAmount,
          totalTaxableAmount: totalGSTAmountValue + GstAmount,
        };
      }

      return {
        ...state,
        salesClassListDTO: newSalesClassListDTO, // Update immutably
        classDTO: updatedClassDTO, // Update immutably
        salesClassDTO: {}, // Reset salesClassDTO to an empty object
      };
    }

    case ActionTypes.SALES_CLASS_DTO: {
      state.salesClassDTO = action.payload || {};
      // return { ...state };
      return JSON.parse(JSON.stringify(state));
    }

    case ActionTypes.MODEL_OPEN_REQUEST: {
      state.open = action.payload || false;
      list = [];
      if (action.payload == false) {
        state.classDTO = defaultClassDTO;
        state.salesClassDTO = {};
        state.salesClassListDTO = defaultSalesClassDTO;
      }
      return { ...state };
      // return JSON.parse(JSON.stringify(state));
    }

    case ActionTypes.PRODUCT_LIST_RESPONSE: {
      let data = action.payload.data || [];
      let newData = [];
      data.map((x, i) => {
        newData.push({
          id: x.id,
          productName: x.productName,
          sellingPrice: x.sellingPrice,
          costPrice: x.costPrice,
          productHsn: x.productHsn,
          gstPercentage: x.gstPercentage,
          productType: x.productType,
          totalStock: x.totalStock,
        });
      });
      state.productlist = newData;
      return JSON.parse(JSON.stringify(state));
    }

    case ActionTypes.RESET_DATA: {
      list = state.productList;
      state.classDTO = state.compnayOrderDetails;
      state.salesClassDTO = {};
      state.salesClassListDTO = list;
      return JSON.parse(JSON.stringify(state));
    }

    case ActionTypes.COMPANY_NAME_LIST_RESPONSE: {
      let data = action.payload.data || [];
      state.companyNameList = data;
      return JSON.parse(JSON.stringify(state));
    }

    case ActionTypes.SALES_ORDER_RESPONSE: {
      state.open = action.payload || false;
      list = [];
      state.classDTO = {};
      state.salesClassDTO = {};
      state.salesClassListDTO = defaultSalesClassDTO;
      state.saveSuccess = true;
      return JSON.parse(JSON.stringify(state));
    }

    case ActionTypes.SALES_ORDER_LIST_RESPONSE: {
      let data = action.payload.data || [];

      const newSalesOrderList = (data) => {
        return data.map((obj, index) => ({
          ...obj,
          No: index + 1,
        }));
      };

      state.salesOrderList = newSalesOrderList(data);
      state.currentPage = 0;
      const lastObject = data[data.length - 1];
      const { No } = lastObject || 0;

      state.currentPageSize = data.length || 20;
      state.saveRequest = false;
      return JSON.parse(JSON.stringify(state));
    }

    case ActionTypes.STORE_EDIT_ROW_DATA_TEMPORARY: {
      const companyOrderDetails = action.payload.data || [];
      state.companyOrderDetailsRowData = companyOrderDetails;
      return JSON.parse(JSON.stringify(state));
    }

    case ActionTypes.SALES_ORDER_PRODUCT_UPDATE_RESPONSE: {
      const { orderDateString, ...updatedata } =
        action.payload.compnayOrderDetails || [];

      const parsedDate = moment(orderDateString, "DD-MM-YYYY HH:mm");
      // const iso8601Date = parsedDate.format(
      //   "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)"
      // );

      updatedata.orderDate = parsedDate;
      const productList = action.payload.productList;
      const compnayOrderDetails = updatedata;
      state.open = true;
      list = productList;
      state.classDTO = compnayOrderDetails;
      state.salesClassDTO = {};
      state.salesClassListDTO = list;
      state.companyOrderDetailsRowData = {};
      return JSON.parse(JSON.stringify(state));
    }

    case ActionTypes.PAYMENT_HISTORY_RESPONSE: {
      state.paymentHistoryData = action.payload.data || [];
      return JSON.parse(JSON.stringify(state));
    }

    case ActionTypes.VIEW_PDF_RESPONSE: {
      state.pdfData = action.payload.data || [];
      state.isOpenPdf = true;
      return JSON.parse(JSON.stringify(state));
    }

    case ActionTypes.IS_OPEN_PDF_MODEL: {
      state.isOpenPdf = action.payload.data || [];
      return JSON.parse(JSON.stringify(state));
    }

    case ActionTypes.PAYMENT_MODEL_IS_OPEN: {
      state.isPaymentModelOpen = action.payload.data || false;
      return JSON.parse(JSON.stringify(state));
    }

    case ActionTypes.PAYMENT_RESPONSE: {
      state.isPaymentModelOpen = action.payload.data || false;
      return JSON.parse(JSON.stringify(state));
    }

    case ActionTypes.COMPANY_NAME_LIST_RESPONSE_FOR_FILTER: {
      let data = action.payload.data || [];

      const transformedData = data.map((item) => ({
        value: item.title,
        display: item.title,
      }));

      state.allTypeCompanyNameList = transformedData;
      return JSON.parse(JSON.stringify(state));
    }

    case ActionTypes.STATE_NAME_RESPONSE: {
      let stateName = action.payload.data || false;
    
      // Create a copy of classDTO to update immutably
      let updatedClassDTO = { ...state.classDTO };
    
      if (!isNullOrIsEmptyOrIsUndefined(stateName) && stateName === "Gujarat") {
        updatedClassDTO.gstType = "LGST18[18%]";
      } else if (
        !isNullOrIsEmptyOrIsUndefined(stateName) &&
        stateName !== "Gujarat"
      ) {
        updatedClassDTO.gstType = "IGST18[18%]";
      }
    
      // Return the updated state
      return {
        ...state,
        classDTO: updatedClassDTO, // Update classDTO immutably
      };
    }

    case ActionTypes.RESET_SAVE_SUCCESS_FLAG: {
      state.saveSuccess = false;
      return JSON.parse(JSON.stringify(state));
    }

    // case ActionTypes.produ

    default:
      return state;
  }
};

export default reducer;
