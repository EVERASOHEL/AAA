import { all, put, takeLatest, call } from "redux-saga/effects";

import { FetchApi } from "../../utilities/FetchService";

import { ActionTypes } from "./constants";
import * as commonConstants from "../../utilities/Constants";
import { ToastContainer, toast } from "react-toastify";
import { loadingInterceptor } from "../../utilities/loading-interceptor";
import * as list from "../purchase/PurchaseOrder/saga";

export function* apiforsubmitPaymentRequest({ payload }) {
  let data = {
    url: "/api/paymentController/getTotalPayableAmountAndReceivableAmount",
    // payload: JSON.stringify(),
    method: "GET",
  };
  const response = yield call(FetchApi, data);
  if (response.code == 200) {
    toast.success(response.responseObj);
    yield put({
      type: ActionTypes.TOTAL_RECEIVABLE_AND_PAYBLE_AMOUNT_RESPONSE,
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
    takeLatest(ActionTypes.TOTAL_RECEIVABLE_AND_PAYBLE_AMOUNT_REQUEST,apiforsubmitPaymentRequest),
  ]);
}
