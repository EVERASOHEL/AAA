import { all, call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";

import { apiFetch } from "../../utilities/FetchService";

import { ActionTypes } from "./constants";
import { ActionTypes as RootActionTypes } from "../../root/constants";

import { MSG_UNIVERSAL_ERROR } from "../../utilities/CommonConstants";
import { ROOT_DIALOG_TYPE } from "../../components/Shared/RootDialog/constants";

import { FetchApi } from "../../utilities/FetchService";
import { loadingInterceptor } from "../../utilities/loading-interceptor";

export function* apiforSubmitAddProductRequest({ payload }) {
  let data = {
    url: "/api/productController/saveNewProduct",
    payload: JSON.stringify(payload.data),
    method: "POST",
  };
  const response = yield call(FetchApi, data);
  if (response.code == 200 || response.code == 204) {
    toast.success(response.responseObj);
    yield put({
      type: ActionTypes.PRODUCT_RESPONSE,
      payload: {
        data: false,
      },
    });
  } else {
    toast.error(commonConstants.MSG_UNIVERSAL_ERROR);
  }
}

export function* apiforList({ payload }) {
  let page = payload.data.page || 0;
  let size = payload.data.size || 20;
  let data = {
    url: `/api/productController/getProductList?page=${page}&size=${size}`,
    payload: null,
  };
  const response = yield call(FetchApi, data);
  if (response === null) {
    yield put({
      type: ActionTypes.PRODUCT_LIST_RESPONSE,
      payload: {
        data: [],
      },
    });
  } else if (response.code == 200) {
    yield put({
      type: ActionTypes.PRODUCT_LIST_RESPONSE,
      payload: {
        data: response.responseObj || [],
      },
    });
  } else {
    toast.error(commonConstants.MSG_UNIVERSAL_ERROR);
  }
}

export function* apiforDeleteProduct({ payload }) {
  let data = {
    url: `/api/productController/deleteProduct/${payload.data}`,
    method: "DELETE",
    payload: null,
  };
  const response = yield call(FetchApi, data);

  if (response.code == 200) {
    toast.success(response.responseObj);
    // window.location.reload();
  } else {
    toast.error(commonConstants.MSG_UNIVERSAL_ERROR);
  }
}

export function* apiforgetAllProductNameList({ payload }) {
  let data = {
    url: `/api/productController/getProductNameList`,
    payload: null,
  };
  const response = yield call(FetchApi, data);

  if (response === null) {
    yield put({
      type: ActionTypes.PRODUCT_NAME_LIST_RESPONSE,
      payload: {
        data: [],
      },
    });
  } else if (response.code == 200) {
    yield put({
      type: ActionTypes.PRODUCT_NAME_LIST_RESPONSE,
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
    takeLatest(ActionTypes.PRODUCT_REQUEST, apiforSubmitAddProductRequest),
    takeLatest(ActionTypes.PRODUCT_RESPONSE, apiforList),
    takeLatest(ActionTypes.PRODUCT_LIST_REQUEST, apiforList),
    takeLatest(ActionTypes.DELETE_PRODUCT, apiforDeleteProduct),
    // takeLatest(ActionTypes.DELETE_PRODUCT, apiforDeleteProduct),
    takeLatest(
      ActionTypes.PRODUCT_NAME_LIST_REQUEST,
      apiforgetAllProductNameList
    ),
  ]);
}
