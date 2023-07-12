import {all, put, takeLatest} from "redux-saga/effects";
import {apiFetch} from "../utilities/FetchService";
import {loadingInterceptor} from "../utilities/LoadingInterceptor";

import {ActionTypes} from "./constants";

import {toast} from "react-toastify";

export function* performLogout({payload}) {
    yield put({
        type: ActionTypes.UPDATE_IS_AUTHENTICATED,
        payload: {
            isUserAuthenticated: false,
        },
    });

    // const response = yield apiFetch(`account/signout`, {
    //   method: "POST",
    // }).then((res) => res);

    // if (response.status === 200) {
    //   yield put({
    //     type: ActionTypes.UPDATE_IS_AUTHENTICATED,
    //     payload: {
    //       isUserAuthenticated: false,
    //     },
    //   });
    //   clearAll();
    // } else {
    //   toast.configure();
    //   toast.error("User is not logout. Please try again.");
    // }
}

export default function* root() {
    yield all([
        takeLatest(ActionTypes.USER_LOGOUT, loadingInterceptor, performLogout),
    ]);
}
