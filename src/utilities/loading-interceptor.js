import {
  getFetchRequestedAction,
  getFetchCompletedAction,
  getUnauthenticatedRequestAction,
} from "./loading";
import { all, call, put, takeLatest } from "redux-saga/effects";

export function* loadingInterceptor(actualSaga, action) {
  yield put(getFetchRequestedAction());
  yield actualSaga(action);
  yield put(getFetchCompletedAction());
}
