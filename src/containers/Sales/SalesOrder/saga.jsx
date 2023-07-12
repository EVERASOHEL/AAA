import {all, put, takeLatest} from "redux-saga/effects";
import {toast} from "react-toastify";

import {apiFetch} from "../../../utilities/FetchService";
import {loadingInterceptor} from "../../../utilities/LoadingInterceptor";

import {ActionTypes} from "./constants";
import {ActionTypes as RootActionTypes} from "../../../root/constants";

import {MSG_UNIVERSAL_ERROR} from "../../../utilities/CommonConstants";
// import {ROOT_DIALOG_TYPE} from "../../components/Shared/RootDialog/constants";

// export function* api({ payload, onResponse }) {
//   const response = yield apiFetch(`path`, {
//     method: "GET",
//     // body: JSON.stringify(data),
//   }).then((res) => res);

//   if (response.status === 200) {
//     const responseJSON = yield response.json() || {};

//     if (responseJSON.code === 200) {
//       // const responseObj = responseJSON.responseObj || [];

//       return onResponse && onResponse({ success: true });
//     } else {
//       const rootDialogDTO = {
//         show: true,
//         timer: false,
//         type: ROOT_DIALOG_TYPE.WARNING,
//         message: responseJSON.message || MSG_UNIVERSAL_ERROR,
//       };

//       yield put({
//         type: RootActionTypes.UPDATE_DTO,
//         payload: {
//           rootDialogDTO,
//         },
//       });
//     }
//   } else {
//     const rootDialogDTO = {
//       show: true,
//       timer: false,
//       type: ROOT_DIALOG_TYPE.WARNING,
//       message: MSG_UNIVERSAL_ERROR,
//     };

//     yield put({
//       type: RootActionTypes.UPDATE_DTO,
//       payload: {
//         rootDialogDTO,
//       },
//     });
//   }

//   return onResponse && onResponse({ success: false });
// }

export default function* root() {
    yield all([
        // takeLatest(ActionTypes.GET, loadingInterceptor, apiGet)
    ]);
}
