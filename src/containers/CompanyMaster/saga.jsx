import { all, put, takeLatest, call } from "redux-saga/effects";

import { apiFetch } from "../../utilities/FetchService";
import { FetchApi } from "../../utilities/FetchService";
// import {loadingInterceptor} from "../../utilities/LoadingInterceptor";

import { ActionTypes } from "./constants";
import { AdvacedTableActionTypes } from "../../containers/AdvancedDataTable/constants";
// import {ActionTypes as RootActionTypes} from "../../root/constants";

// import {MSG_UNIVERSAL_ERROR} from "../../utilities/CommonConstants";
// import {ROOT_DIALOG_TYPE} from "../../components/Shared/RootDialog/constants";
import * as commonConstants from "../../utilities/Constants";
import { ToastContainer, toast } from "react-toastify";
import http from "../../utilities/CommonConfigConstant";
import axios from "axios";

export function* apiforSubmitAddCompnayRequest({ payload }) {
  let data = {
    url: "/api/companyController/saveNewCompany",
    payload: JSON.stringify(payload),
    method: "POST",
  };
  const response = yield call(FetchApi, data);
  if (response.code == 200) {
    toast.success(response.responseObj);
    yield put({
      type: ActionTypes.ADD_COMPANY_RESPONSE,
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
    url: `/api/companyController/getCompanylist?page=${page}&size=${size}`,
    payload: null,
    method: "GET",
  };
  const response = yield call(FetchApi, data);

  if (response === null) {
    yield put({
      type: ActionTypes.COMPANY_LIST_RESPONSE,
      payload: {
        data: [],
      },
    });
  } else if (response.code == 200) {
    yield put({
      type: ActionTypes.COMPANY_LIST_RESPONSE,
      payload: {
        data: response.responseObj || [],
      },
    });
  } else {
    toast.error(commonConstants.MSG_UNIVERSAL_ERROR);
  }
}

function deleteCompany(data) {
  return fetch("http://localhost:8888" + data.url, {
    method: data.method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
}

export function* apiforDeleteCompany({ payload }) {
  let data = {
    url: `/api/companyController/deleteCompany/${payload.data}`,
    method: "DELETE",
    payload: null,
  };
  const response = yield call(deleteCompany, data);

  if (response.code == 200) {
    toast.success(response.responseObj);
    window.location.reload();
  } else {
    toast.error(commonConstants.MSG_UNIVERSAL_ERROR);
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

export function* apiforGetAllCompanyNameListforFilter() {
  let data = {
    url: `/api/companyController/getAllTypeCompanyName`,
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

export default function* root() {
  yield all([
    takeLatest(ActionTypes.ADD_COMPANY_REQUEST, apiforSubmitAddCompnayRequest),
    // takeLatest(ActionTypes.ADD_COMPANY_RESPONSE, apiforList),
    takeLatest(ActionTypes.COMPANY_LIST_REQUEST, apiforList),
    takeLatest(ActionTypes.DELETE_COMPANY, apiforDeleteCompany),
    takeLatest(
      ActionTypes.COMPANY_NAME_LIST_REQUEST,
      apiforgetAllCompanyNameList
    ),
    takeLatest(
      ActionTypes.COMPANY_NAME_LIST_REQUEST_FOR_FILTER,
      apiforGetAllCompanyNameListforFilter
    ),
  ]);
}
