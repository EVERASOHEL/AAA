import { all, call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";

import { apiFetch } from "../../utilities/FetchService";
import { loadingInterceptor } from "../../utilities/LoadingInterceptor";

import { ActionTypes } from "./constants";
import { ActionTypes as RootActionTypes } from "../../root/constants";

import { MSG_UNIVERSAL_ERROR } from "../../utilities/CommonConstants";
import { ROOT_DIALOG_TYPE } from "../../components/Shared/RootDialog/constants";

import { FetchApi } from "../../utilities/FetchService";

export function* apiforSubmitAddProductRequest({ payload }) {
  console.log("payload : ", payload.data);
  let data = {
    url: "/api/productController/saveNewProduct",
    payload: JSON.stringify(payload.data),
    method: "POST",
  };
  console.log("data : ", data);
  const response = yield call(FetchApi, data);
  console.log("response : ", response);
  console.log("code : ", response.code);
  if (response.code == 200) {
    console.log("response.responseObj : ", response.responseObj);
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

  if (response.code == 200) {
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

export default function* root() {
  yield all([
    takeLatest(ActionTypes.PRODUCT_REQUEST, apiforSubmitAddProductRequest),
    takeLatest(ActionTypes.PRODUCT_LIST_REQUEST, apiforList),
    takeLatest(ActionTypes.DELETE_PRODUCT, apiforDeleteProduct),
  ]);
}
