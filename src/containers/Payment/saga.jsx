import { all, put, takeLatest, call } from "redux-saga/effects";

import { FetchApi } from "../../utilities/FetchService";

import { ActionTypes } from "./constants";
import * as commonConstants from "../../utilities/Constants";
import { ToastContainer, toast } from "react-toastify";
import { loadingInterceptor } from "../../utilities/loading-interceptor";
import * as list from "../purchase/PurchaseOrder/saga";

export function* apiforsubmitPaymentRequest({ payload }) {
  console.log("payload : ",payload);
  let data = {
    url: "/api/paymentController/savevendorpayment",
    payload: JSON.stringify(payload),
    method: "POST",
  };
  const response = yield call(FetchApi, data);
  if (response.code == 200) {
    toast.success(response.responseObj);
    yield put({
      type: ActionTypes.PAYMENT_RESPONSE,
      payload: {
        data: false,
      },
    });
  } else {
    toast.error(commonConstants.MSG_UNIVERSAL_ERROR);
  }
}

export default function* root() {
  console.log("new");
  yield all([
    takeLatest(ActionTypes.PAYMENT_REQUEST,loadingInterceptor,apiforsubmitPaymentRequest),
    takeLatest(ActionTypes.PAYMENT_RESPONSE,loadingInterceptor,list.apiforSalesOrderList),
  ]);
}
