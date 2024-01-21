import {all, put, takeLatest} from "redux-saga/effects";
// import { apiFetch } from "../../../../utility/fetch-utils";

import {ActionTypes} from "./constant";
// import { CustomToast as toast } from "../../../../Constant/Toast";
// import * as commonConstants from "../../../../Constant/Constants";
// import * as commonFunction from "../../../../Constant/Functions/commonFunction";

export function* apiProductRequest({payload}) {
    // const response = apiFetch(
    // `api/travelRequestController/saveTravelRequestForm`,
    //   {
    //     method: "POST",
    //     body: JSON.stringify(payload.data),
    //   }
    // ).then((res) => res);

    // toast.configure();

    // toast.configure();

    // if (response.status === 200) {
    //   const responseJSON = yield response.json() || {};

    //   if (responseJSON.code === 200) {
    //     const responseObj = responseJSON.responseObj || "";
    //     console.log("response obj : ",responseObj);
    //     commonFunction.gotoSpecificPage("list");
    //     if(responseObj==="Travel Request Updated Successfully"){
    //       toast.success(responseObj.message || "Travel request successfully updated.");
    //     }else{
    //       toast.success(responseObj.message || "Travel request successfully created.");
    //     }
    //     yield put({
    //       type: ActionTypes.TRAVEL_REQUEST_RESPONSE,
    //       payload: {
    //         data: responseObj || "success",
    //       },
    //     });
    //     return;
    //   } else if (responseJSON.code === 204) {
    //     toast.error(responseJSON.message || commonConstants.MSG_UNIVERSAL_ERROR);
    //   } else {
    //     toast.error(responseJSON.message || commonConstants.MSG_UNIVERSAL_ERROR);
    //   }
    // } else if (response.status === 204) {
    //   toast.error(commonConstants.MSG_UNIVERSAL_ERROR);
    // } else {
    //   toast.error(commonConstants.MSG_UNIVERSAL_ERROR);
    // }
}

export default function* root() {
    yield all([
        takeLatest(
            ActionTypes.PRODUCT_REQUEST,
            apiProductRequest
        ),
    ]);
}
