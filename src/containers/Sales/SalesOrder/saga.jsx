import { all, call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";

import { apiFetch, FetchApiForSendMail } from "../../../utilities/FetchService";
import { loadingInterceptor } from "../../../utilities/LoadingInterceptor";

import { ActionTypes } from "./constants";
import { ActionTypes as RootActionTypes } from "../../../root/constants";

import { ActionTypes1 } from "../../LoadingSpinner/constants";

import OpenSpinner from "../../LoadingSpinner/index";
// import

import { MSG_UNIVERSAL_ERROR } from "../../../utilities/CommonConstants";
import { FetchApi } from "../../../utilities/FetchService";
import { changeLoadingStatus, hideLoading, showLoading } from "../../LoadingSpinner/actions";

import '../../../App.css'

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
    url: `/api/salesOrderController/saveSalesOrder`,
    payload: JSON.stringify(payload.data),
    method: "POST",
  };
  const response = yield call(FetchApi, data);
  if (response.code == 200 || response.code == 204) {
    toast.success(response.responseObj);
    yield put({
      type: ActionTypes.SALES_ORDER_RESPONSE,
      payload: {
        data: false,
      },
    });
  } else {
    toast.error(MSG_UNIVERSAL_ERROR);
  }
}

export function* apiforSalesOrderList({ payload }) {
  // yield put({
  //   type: ActionTypes.LOADING_STATUS,
  //   payload: {
  //     data: true,
  //   },
  // });

  // yield put(changeLoadingStatus(true));

  // yield put.resolve({
  //   type: ActionTypes1.LOADING_STATUS,
  //   payload: {
  //     status: false,
  //   },
  // });

  let page = payload.data.page || 0;
  let size = payload.data.size || 50;
  var companyType = payload.data.companyType || null;
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
 
  try {
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
  } catch (error) {
    toast.error(MSG_UNIVERSAL_ERROR);
  } 
}

export function* apiforSendMail({ payload }) {
  try {
    // mailSpinnerInstance.show();
    document.dispatchEvent(new Event("SHOW_MAIL_SPINNER"));
    let data = {
      url: `/api/salesOrderController/sendMail`,
      payload: JSON.stringify(payload.data),
      method: "POST",
    };
    const response = yield call(FetchApiForSendMail, data);
    if (response.code == 200) {
      toast.success(response.responseObj);
    } else {
      toast.error(MSG_UNIVERSAL_ERROR);
    }
  } catch (error) {
    toast.error(MSG_UNIVERSAL_ERROR);
  } finally {
    // mailSpinnerInstance.hide(); // Stop spinner
    document.dispatchEvent(new Event("HIDE_MAIL_SPINNER"));
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

export const mailSpinnerInstance = {
  show: () => document.dispatchEvent(new CustomEvent("SHOW_MAIL_SPINNER")),
  hide: () => document.dispatchEvent(new CustomEvent("HIDE_MAIL_SPINNER")),
};

export function* apiforGetAllCompanyNameListforFilter({payload}) {
  let data = {
    url: `/api/companyController/getAllCompanyNameByCompanyType/${payload.companyType}`,
    payload: null,
  };
  const response = yield call(FetchApi, data);
  if (response.code == 200) {
    yield put({
      type: ActionTypes.COMPANY_NAME_LIST_RESPONSE_FOR_FILTER,
      payload: {
        data: response.responseObj || [],
      },
    });
  } else {
    toast.error(MSG_UNIVERSAL_ERROR);
  }
}

export function* apiforGetStateName({payload}) {
  let data = {
    url: `/api/companyController/getCompanyState/${payload.companyName}`,
    payload: null,
    method: "GET",
  };
  const response = yield call(FetchApi, data);
  if (response.code == 200) {
    yield put({
      type: ActionTypes.STATE_NAME_RESPONSE,
      payload: {
        data: response.responseObj || [],
      },
    });
  } else {
    toast.error(MSG_UNIVERSAL_ERROR);
  }
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.PRODUCT_LIST_REQUEST, apiforList),
    takeLatest(
      ActionTypes.COMPANY_NAME_LIST_REQUEST,
      apiforgetAllCompanyNameList
    ),
    takeLatest(ActionTypes.SALES_ORDER_REQUEST, apiforSubmitSalesOrderRequest),
    // takeLatest(ActionTypes.SALES_ORDER_RESPONSE, apiforSalesOrderList),
    takeLatest(
      ActionTypes.SALES_ORDER_LIST_REQUEST,
      loadingInterceptor,
      apiforSalesOrderList
    ),
    takeLatest(
      ActionTypes.SALES_ORDER_PRODUCT_UPDATE_REQUEST,
      apiforgetEditRowData
    ),
    takeLatest(ActionTypes.PAYMENT_HISTORY_REQUEST, apiforpaymenthistory),
    takeLatest(ActionTypes.VIEW_PDF_REQUEST, apiforViewPdf),
    takeLatest(ActionTypes.SEND_MAIL_REQUEST, apiforSendMail),
    takeLatest(ActionTypes.PAYMENT_REQUEST, apiforsubmitPaymentRequest),
    takeLatest(ActionTypes.PAYMENT_RESPONSE, apiforSalesOrderList),
    takeLatest(
          ActionTypes.COMPANY_NAME_LIST_REQUEST_FOR_FILTER,
          apiforGetAllCompanyNameListforFilter
        ),
    takeLatest(ActionTypes.STATE_NAME_REQUEST, apiforGetStateName),
  ]);
}
