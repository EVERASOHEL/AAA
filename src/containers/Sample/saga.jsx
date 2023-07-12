import {all, put, takeLatest} from "redux-saga/effects";
import {toast} from "react-toastify";

import {apiFetch} from "../../utilities/FetchService";
import {loadingInterceptor} from "../../utilities/LoadingInterceptor";

import {ActionTypes} from "./constants";

// export function* apiGet({ payload }) {
//   const response = yield apiFetch(`get?id=${payload.leadId}`, {
//     method: "GET",
//   }).then((res) => res);

//   if (response.status === 200) {
//     const responseJSON = yield response.json();

//     yield put({
//       type: ActionTypes.GET_RESPONSE,
//       payload: {
//         data: responseJSON.responseObj,
//       },
//     });
//   } else {
//     // toast.configure();
//     // toast.error("Something went wrong.");
//   }
// }

export default function* root() {
    yield all([
        // takeLatest(ActionTypes.GET, apiGet)
    ]);
}
