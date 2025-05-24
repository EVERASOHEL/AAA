import { all, put, takeLatest, call } from "redux-saga/effects";

import { FetchApi } from "../../../utilities/FetchService";

import { ActionTypes } from "./constants";
import * as commonConstants from "../../../utilities/Constants";
import { ToastContainer, toast } from "react-toastify";
import http from "../../../utilities/CommonConfigConstant";
import axios from "axios";
import isNullOrIsEmptyOrIsUndefined from "../../../utilities/CommonValidator";

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

export function* apiListforExpense({ payload }) {

  try {
    let page = payload.data.page || 0;
    let size = payload.data.size || 20;
    let data = {
      url: `/api/expenseController/getExpenseList?page=${page}&size=${size}`,
      payload: null,
      method: "POST",
    };
    const response = yield call(FetchApi, data);

    if (isNullOrIsEmptyOrIsUndefined(response.responseObj)) {
      yield put({
        type: ActionTypes.EXPENSE_LIST_RESPONSE,
        payload: {
          data: [],
        },
      });
    } else if (response.code == 200) {  
      yield put({
        type: ActionTypes.EXPENSE_LIST_RESPONSE,
        payload: {
          data: response.responseObj || [],
        },
      });
    } else {
      toast.error(commonConstants.MSG_UNIVERSAL_ERROR);
    }
  } catch (error) {
    toast.error(MSG_UNIVERSAL_ERROR);
  }
}

export function* apiListforExpenseCategory({ payload }) {
  try {
    let page = payload.data.page || 0;
    let size = payload.data.size || 20;
    let data = {
      url: `/api/expenseCategoryController/getExpenseCategorylist?page=${page}&size=${size}`,
      payload: null,
      method: "POST",
    };
    const response = yield call(FetchApi, data);

    if (response) {
      yield put({
        type: ActionTypes.EXPENSE_CATEGORY_LIST_RESPONSE,
        payload: {
          data: [],
        },
      });
    } else if (response.code == 200) {
      yield put({
        type: ActionTypes.EXPENSE_CATEGORY_LIST_RESPONSE,
        payload: {
          data: response.responseObj || [],
        },
      });
    } else {
      toast.error(commonConstants.MSG_UNIVERSAL_ERROR);
    }
  } catch (error) {
    toast.error(MSG_UNIVERSAL_ERROR);
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

export function* apiGetAllExpenseCompanyNameList({ payload }) {
  let data = {
    url: `/api/companyController/getAllCompanyNameByCompanyType/${payload.companyType}`,
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

export function* apiforSubmitAddExpenseCategoryRequest({ payload }) {
  try {
    let data = {
      url: "/api/expenseCategoryController/saveExpenseCategory",
      payload: JSON.stringify(payload),
      method: "POST",
    };
    const response = yield call(FetchApi, data);
    if (response.code == 200 || response.code == 204) {
      
      toast.success(response.responseObj);
      yield put({
        type: ActionTypes.ADD_EXPENSE_CATEGORY_RESPONSE,
        payload: {
          data: false,
        },
      });
    } else {
      toast.error(commonConstants.MSG_UNIVERSAL_ERROR);
    }
  } catch (error) {
    toast.error(MSG_UNIVERSAL_ERROR);
  }
}

export function* apiforgetAllCategoryNameList() {
  try {
    let data = {
      url: "/api/expenseCategoryController/findAllExpenseCategoryName",
      payload: null,
      method: "GET",
    };
    const response = yield call(FetchApi, data);
    if (response.code == 200 || response.code == 204) {
      yield put({
        type: ActionTypes.EXPENSE_CATEGORY_NAME_LIST_RESPONSE,
        payload: {
          data: response.responseObj || [],
        },
      });
    } else {
      toast.error(commonConstants.MSG_UNIVERSAL_ERROR);
    }
  } catch (error) {
    toast.error(MSG_UNIVERSAL_ERROR);
  }
}

export function* apiforsubmitExpenseRequest({ payload }) {
  try {
    let data = {
      url: "/api/expenseController/saveExpense",
      payload: JSON.stringify(payload),
      method: "POST",
    };
    const response = yield call(FetchApi, data);
    if (response.code == 200) {
      toast.success(response.responseObj);
      yield put({
        type: ActionTypes.ADD_EXPENSE_RESPONSE,
        payload: {
          data: false,
        },
      });
    } else if (response.code == 204) {
      toast.error(response.responseObj);
      yield put({
        type: ActionTypes.ADD_EXPENSE_RESPONSE,
        payload: {
          data: false,
        },
      });
    } else {
      toast.error(commonConstants.MSG_UNIVERSAL_ERROR);
    }
  } catch (error) {
    toast.error(MSG_UNIVERSAL_ERROR);
  }
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.ADD_COMPANY_REQUEST, apiforSubmitAddCompnayRequest),
    takeLatest(
      ActionTypes.ADD_EXPENSE_CATEGORY_REQUEST,
      apiforSubmitAddExpenseCategoryRequest
    ),
    takeLatest(
      ActionTypes.ADD_EXPENSE_CATEGORY_RESPONSE,
      apiListforExpenseCategory
    ),
    takeLatest(ActionTypes.ADD_COMPANY_RESPONSE, apiforList),
    takeLatest(ActionTypes.COMPANY_LIST_REQUEST, apiforList),
    takeLatest(ActionTypes.EXPENSE_LIST_REQUEST, apiListforExpense),
    takeLatest(
      ActionTypes.EXPENSE_CATEGORY_LIST_REQUEST,
      apiListforExpenseCategory
    ),
    takeLatest(ActionTypes.DELETE_COMPANY, apiforDeleteCompany),
    takeLatest(
      ActionTypes.COMPANY_NAME_LIST_REQUEST,
      apiGetAllExpenseCompanyNameList
    ),
    takeLatest(
      ActionTypes.EXPENSE_CATEGORY_NAME_LIST_REQUEST,
      apiforgetAllCategoryNameList
    ),
    takeLatest(ActionTypes.ADD_EXPENSE_REQUEST, apiforsubmitExpenseRequest),
    takeLatest(ActionTypes.ADD_EXPENSE_RESPONSE, apiListforExpense),
  ]);
}
