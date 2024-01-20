import { all, call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";

import { apiFetch } from "../../../utilities/FetchService";
import { loadingInterceptor } from "../../../utilities/LoadingInterceptor";

import { ActionTypes } from "./constants";
import { ActionTypes as RootActionTypes } from "../../../root/constants";

import { ActionTypes1 } from "../../LoadingSpinner/constants";

import OpenSpinner from "../../LoadingSpinner/index";
// import

import { MSG_UNIVERSAL_ERROR } from "../../../utilities/CommonConstants";
import { FetchApi } from "../../../utilities/FetchService";
import { changeLoadingStatus } from "../../LoadingSpinner/actions";

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
  let size = payload.data.size || 20;
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

export function* apiforViewPdf({ payload }) {
  // yield put({
  //   type: ActionTypes.LOADING_STATUS,
  //   payload: {
  //     data: true,
  //   },
  // });

  console.log("payload : ", payload.data);
  try {
    let data = {
      url: `/api/salesOrderController/viewPdf`,
      payload: JSON.stringify(payload.data),
      method: "POST",
    };
    const response = yield call(FetchApi, data);
    console.log("response : ", response);
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
    console.log("error : ",error);
    toast.error(MSG_UNIVERSAL_ERROR);
  }
}

export function* apiforSendMail({ payload }) {
  // yield put({
  //   type: ActionTypes.LOADING_STATUS,
  //   payload: {
  //     data: true,
  //   },
  // });

  let data = {
    url: `/api/salesOrderController/sendMail`,
    payload: JSON.stringify(payload.data),
    method: "POST",
  };
  const response = yield call(FetchApi, data);
  if (response.code == 200) {
    toast.success(response.responseObj);
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
    takeLatest(ActionTypes.VIEW_PDF_REQUEST, apiforViewPdf),
    takeLatest(ActionTypes.SEND_MAIL_REQUEST, apiforSendMail),
  ]);
}
