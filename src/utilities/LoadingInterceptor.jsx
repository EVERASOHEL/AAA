import {put} from "redux-saga/effects";

import {
    getFetchRequestedAction,
    getFetchCompletedAction,
} from "../root/actions/loading";

export function* loadingInterceptor(actualSaga, action) {
    yield put(getFetchRequestedAction());
    yield actualSaga(action);
    yield put(getFetchCompletedAction());
}
