import { all, call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";
import { FetchApi, FetchApiForAdvancedDataTable } from "../../utilities/FetchService";

import { apiFetch } from "../../utilities/FetchService";
import { loadingInterceptor } from "../../utilities/LoadingInterceptor";

import { ActionTypes } from "./constants";
import { AdvacedTableActionTypes } from "./constants";

export function* apiforList({ payload }) {

  let page = payload.data.page || 0;
  let size = payload.data.size || 20;
  const url = payload.data.url || "";
  const filters = payload.data.filters || {};

  const hasQueryParams = url.includes('?');
  const finalUrl = `${url}${hasQueryParams ? '&' : '?'}page=${page}&size=${size}`;

  let data = {
    url: finalUrl,
    payload: filters,
    method: "POST",
  };

  const response = yield call(FetchApiForAdvancedDataTable, data);

  if (response === null) {
    yield put({
      type: ActionTypes.LIST_RESPONSE,
      payload: {
        data: [],
      },
    });
  } else if (response.code == 200) {
    yield put({
      type: ActionTypes.LIST_RESPONSE,
      payload: {
        data: response.responseObj || [],
      },
    });
  } else {
    toast.error(commonConstants.MSG_UNIVERSAL_ERROR);
  }
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.LIST_REQUEST, apiforList),
  ]);
}
