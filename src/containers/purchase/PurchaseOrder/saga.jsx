import { all, call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";

import { apiFetch } from "../../../utilities/FetchService";
import {
  loadingInterceptor,
  getLoadingState,
} from "../../../utilities/LoadingInterceptor";

import { ActionTypes } from "./constants";
import { ActionTypes as RootActionTypes } from "../../../root/constants";

import { MSG_UNIVERSAL_ERROR } from "../../../utilities/CommonConstants";
import { FetchApi } from "../../../utilities/FetchService";
import reducer from "../../LoadingSpinner/reducer";
import { ActionTypes1 } from "../../LoadingSpinner/constants";
import {changeLoadingStatus} from "../../LoadingSpinner/actions";
import '../../../App.css'

// import {loadingInterceptor} from "../../LoadingSpinner";

export function* apiforList({ payload }) {
  let data = {
    url: `/api/productController/getProductListWithoutPagination`,
    payload: null,
  };
  const response = yield call(FetchApi, data);

  if (response.code == 200) {
    yield put({
      type: ActionTypes.PRODUCT_LIST_RESPONSE,
      payload: {
        data: response.responseObj || [],
      },
    });
  } else {
    toast.error(MSG_UNIVERSAL_ERROR);
  }
}

export function* apiforgetAllCompanyNameList({ payload }) {
  let data = {
    url: `/api/companyController/getAllCompanyName/${payload.companyType}`,
    payload: null,
    method: "GET",
  };
  const response = yield call(FetchApi, data);

  if (response.code == 200) {
    yield put({
      type: ActionTypes.COMPANY_NAME_LIST_RESPONSE,
      payload: {
        data: response.responseObj || [],
      },
    });
  } else {
    toast.error(MSG_UNIVERSAL_ERROR);
  }
}

export function* apiforSubmitSalesOrderRequest({ payload }) {
  let data = {
    url: `/api/salesOrderController/savePurchaseOrder`,
    payload: JSON.stringify(payload.data),
    method: "POST",
  };
  const response = yield call(FetchApi, data);
  if (response.code == 200 || response.code == 204) {
    toast.success(response.responseObj);
    yield put({
      type: ActionTypes.PURCHASE_ORDER_RESPONSE,
      payload: {
        data: false,
      },
    });
  } else {
    toast.error(MSG_UNIVERSAL_ERROR);
  }
}

export function* apiforSalesOrderList({ payload }) {
  try {
    // Start loading state
    // yield* loadingInterceptor(true);
    // reducer(undefined, { // Pass undefined as the initial state
    //   type: ActionTypes1.LOADING_STATUS,
    //   payload: true, // Set loading status to true
    // });
    // yield put(changeLoadingStatus(true));

    // document.getElementById('loading-overlay').style.display = 'flex';
    // document.addEventListener("DOMContentLoaded", function() {
    //   let loadingIndicator = document.getElementById('loading-overlay');
    //   if (loadingIndicator) {
    //     loadingIndicator.style.display = 'block';
    //   }
    // });

    let page = payload.data.page || 0;
    let size = payload.data.size || 20;
    var companyType = payload.data.companyType || "Vendor";
    let data = {
      url: `/api/salesOrderController/getSalesOrderList/${companyType}?page=${page}&size=${size}`,
      payload: null,
    };
    const response = yield call(FetchApi, data);

    if (response === null) {
      yield put({
        type: ActionTypes.SALES_ORDER_LIST_RESPONSE,
        payload: {
          data: [],
        },
      });
    } else if (response.code == 200) {
      yield put({
        type: ActionTypes.SALES_ORDER_LIST_RESPONSE,
        payload: {
          data: response.responseObj || [],
        },
      });
    } else {
      toast.error(commonConstants.MSG_UNIVERSAL_ERROR);
    }
  } catch (error) {
    toast.error(commonConstants.MSG_UNIVERSAL_ERROR);
  } finally {
    console.log("call final block..");
    // yield put(changeLoadingStatus(false));
    // reducer(undefined, { // Pass undefined as the initial state
    //   type: ActionTypes1.LOADING_STATUS,
    //   payload: false, // Set loading status to false
    // document.getElementById('loading-overlay').style.display = 'none';
    // document.addEventListener("DOMContentLoaded", function() {
    //   console.log("DOMContentLoaded");
    //   let loadingIndicator = document.getElementById('loading-overlay');
    //   if (loadingIndicator) {
    //     console.log("iscalled");
    //     loadingIndicator.style.display = 'none';
    //   } else {
    //     console.log("Loading indicator not found");
    //   }
    // });
    
    // });
  }
}

export function* apiforgetEditRowData({ payload }) {
  let data = {
    url: `/api/salesOrderController/getProductDetailsByCompany/${payload.data.id}`,
    method: "POST",
    payload: null,
  };
  const response = yield call(FetchApi, data);

  if (response.code == 200) {
    yield put({
      type: ActionTypes.SALES_ORDER_PRODUCT_UPDATE_RESPONSE,
      payload: {
        productList: response.responseObj || [],
        compnayOrderDetails: payload.data.editRowData || [],
      },
    });
  } else {
    toast.error(commonConstants.MSG_UNIVERSAL_ERROR);
  }
}

export function* apiforpaymenthistory({ payload }) {
  let data = {
    url: `/api/paymentController/getpaymentHistory/${payload.data}`,
    payload: null,
    method: "GET",
  };
  const response = yield call(FetchApi, data);

  if (response.code == 200) {
    yield put({
      type: ActionTypes.PAYMENT_HISTORY_RESPONSE,
      payload: {
        data: response.responseObj || [],
      },
    });
  } else {
    toast.error(MSG_UNIVERSAL_ERROR);
  }
}

export function* apiforViewPdf({ payload }) {
  let data = {
    url: `/api/salesOrderController/viewPdf`,
    payload: JSON.stringify(payload.data),
    method: "POST",
  };
  const response = yield call(FetchApi, data);
  if (response.code == 200 || response.code == 204) {
    yield put({
      type: ActionTypes.VIEW_PDF_RESPONSE,
      payload: {
        data: response.responseObj || [],
      },
    });
  } else {
    toast.error(MSG_UNIVERSAL_ERROR);
  }
}

export function* apiforSendMail({ payload }) {
  try {
    document.getElementById('loading-overlay').style.display = 'flex';
    let data = {
      url: `/api/salesOrderController/sendMail`,
      payload: JSON.stringify(payload.data),
      method: "POST",
    };
    const response = yield call(FetchApi, data);
    if (response.code == 200) {
      toast.success(response.responseObj);
      // yield put({
      //   type: ActionTypes.SEND_MAIL_RESPONSE,
      //   payload: {
      //     data: response.responseObj || [],
      //   },
      // });
    } else {
      toast.error(MSG_UNIVERSAL_ERROR);
    }
    
  } catch (error) {
    toast.error(MSG_UNIVERSAL_ERROR);
  }finally {
    console.log("call final block..");
    document.getElementById('loading-overlay').style.display = 'none';
  }
  
}

export function* apiforsubmitPaymentRequest({ payload }) {
  let data = {
    url: "/api/paymentController/savevendorpayment",
    payload: JSON.stringify(payload),
    method: "POST",
  };
  const response = yield call(FetchApi, data);
  if (response.code == 200) {
    toast.success(response.responseObj);
    yield put({
      type: ActionTypes.PAYMENT_RESPONSE,
      payload: {
        data: false,
      },
    });
  } else {
    toast.error(commonConstants.MSG_UNIVERSAL_ERROR);
  }
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.PRODUCT_LIST_REQUEST, apiforList),
    takeLatest(
      ActionTypes.COMPANY_NAME_LIST_REQUEST,
      apiforgetAllCompanyNameList
    ),
    takeLatest(
      ActionTypes.PURCHASE_ORDER_REQUEST,
      apiforSubmitSalesOrderRequest
    ),
    takeLatest(ActionTypes.PURCHASE_ORDER_RESPONSE, apiforSalesOrderList),
    takeLatest(ActionTypes.SALES_ORDER_LIST_REQUEST, apiforSalesOrderList),
    takeLatest(
      ActionTypes.SALES_ORDER_PRODUCT_UPDATE_REQUEST,
      apiforgetEditRowData
    ),
    takeLatest(ActionTypes.PAYMENT_HISTORY_REQUEST, apiforpaymenthistory),
    takeLatest(ActionTypes.VIEW_PDF_REQUEST, apiforViewPdf),
    takeLatest(ActionTypes.SEND_MAIL_REQUEST, apiforSendMail),
    takeLatest(ActionTypes.PAYMENT_REQUEST, apiforsubmitPaymentRequest),
    takeLatest(ActionTypes.PAYMENT_RESPONSE, apiforSalesOrderList),
  ]);
}
