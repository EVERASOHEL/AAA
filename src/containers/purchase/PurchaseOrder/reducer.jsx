import _ from "lodash";
import { ActionTypes } from "./constants";
import moment from "moment";
import isNullOrIsEmptyOrIsUndefined from "../../../utilities/CommonValidator";
import * as commonFunction from "../../../utilities/CommonFunction";

const convertedDateTime = moment(new Date()).format(
  "ddd MMM D YYYY HH:mm:ss [GMT]ZZ (India Standard Time)"
);

// const defaultClassDTO = { gstType: "IGST18[18%]",PurchaseGST:"Purchase 100% GST" };
const defaultClassDTO = { gstType: "IGST18[18%]"};
// "date":new Date()
const defaultSalesClassDTO = [];

let list = [];

const defaultResponseDTO = {};

const defaultState = {
  classDTO: JSON.parse(JSON.stringify(defaultClassDTO)),
  salesClassListDTO: JSON.parse(JSON.stringify(defaultSalesClassDTO)),
  salesClassDTO: JSON.parse(JSON.stringify(defaultClassDTO)),
  open: false,
  isOpenPdf:false,
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
      if (flag == "update") {
        list = [];
        list = Object.values(object);
        state.salesClassListDTO = defaultSalesClassDTO;
        state.salesClassListDTO = list;
      } else if (flag == "new") {
        list.push(object);
        state.salesClassListDTO = list;
      } else {
        list = object;
        state.salesClassListDTO = list;
      }
      var salesClassListDTO1 = state.salesClassListDTO;

      // below line is give suggestion for total Amount calculation based on total column
      var totalGSTAmountValue = salesClassListDTO1.reduce(
        (acc, obj) => acc + obj["total"],
        0
      );
      state.classDTO["totalAmount"] = totalGSTAmountValue;
      if (!isNullOrIsEmptyOrIsUndefined(state.classDTO.gstType)) {
        var GstAmount = commonFunction.calculateGSTAmount(
          totalGSTAmountValue,
          state.classDTO.gstType
        );
        state.classDTO["totalTaxAmount"] = GstAmount;
        state.classDTO["totalTaxableAmount"] =
          state.classDTO.totalAmount + GstAmount;
      }
      state.salesClassDTO = {};
      return { ...state };
      // return JSON.parse(JSON.stringify(state));
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
          payAmount: x.payAmount
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

    case ActionTypes.PURCHASE_ORDER_RESPONSE: {
      state.open = action.payload || false;
      list = [];
      state.classDTO = {};
      state.salesClassDTO = {};
      state.salesClassListDTO = defaultSalesClassDTO;
      return JSON.parse(JSON.stringify(state));
    }

    case ActionTypes.SALES_ORDER_LIST_RESPONSE: {
      let data = action.payload.data || [];
      
      const newSalesOrderList=(data)=>{
        return data.map((obj,index)=>({
          ...obj,
          No:index+1
        }));
      };

      state.salesOrderList=newSalesOrderList(data);
      state.currentPage = 0;
      const lastObject = data[data.length - 1];
      // const {No} = lastObject || 0;
      state.currentPageSize = data.length || 20;
      // console.log("state.currentPageSize : ",state.currentPageSize);
      return JSON.parse(JSON.stringify(state));
    }

    case ActionTypes.STORE_EDIT_ROW_DATA_TEMPORARY:{
      const companyOrderDetails=action.payload.data || [];
      state.companyOrderDetailsRowData=companyOrderDetails
      return JSON.parse(JSON.stringify(state));
    }

    case ActionTypes.SALES_ORDER_PRODUCT_UPDATE_RESPONSE:{

      const {orderDateString, ...updatedata } = (action.payload.compnayOrderDetails || []);

      const parsedDate = moment(orderDateString, 'DD-MM-YYYY HH:mm');
      const iso8601Date = parsedDate.format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)');

      updatedata.orderDate=iso8601Date;
      const productList=action.payload.productList;
      const compnayOrderDetails=updatedata;
      state.open = true
      list = productList;
      state.classDTO = compnayOrderDetails;
      state.salesClassDTO = {};
      state.salesClassListDTO = list;
      state.companyOrderDetailsRowData={};
      return JSON.parse(JSON.stringify(state));
    }

    case ActionTypes.PAYMENT_HISTORY_RESPONSE: {
      state.paymentHistoryData = action.payload.data || [];
      // return { ...state };
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

    // case ActionTypes.produ

    default:
      return state;
  }
};

export default reducer;
