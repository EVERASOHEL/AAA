import { all, put, takeLatest, call } from "redux-saga/effects";

import { apiFetch } from "../../utilities/FetchService";
import { FetchApi } from "../../utilities/FetchService";
// import {loadingInterceptor} from "../../utilities/LoadingInterceptor";

import { ActionTypes1 } from "./constants";
// import {ActionTypes1 as RootActionTypes} from "../../root/constants";

// import {MSG_UNIVERSAL_ERROR} from "../../utilities/CommonConstants";
// import {ROOT_DIALOG_TYPE} from "../../components/Shared/RootDialog/constants";
import * as commonConstants from "../../utilities/Constants";
import { ToastContainer, toast } from "react-toastify";
import http from "../../utilities/CommonConfigConstant";
import axios from "axios";

export default function* root() {
  
}
