import fetchDefaults from "fetch-defaults";

import FetchInterceptor from "../configuration/fetch-interceptor";
import store from "../configuration/store";
import {
  getUnauthenticatedRequestAction,
  getFetchCompletedAction,
} from "../root/actions/loading";
import { getBusinessException } from "../root/actions";
import { getToken } from "./SessionService";
import { SERVER_ADDR } from "../configuration/constants";
import { getMachineID } from "./MachineIdentifier";
import { toast } from "react-toastify";
import { spinnerInstance } from "./Spinner";

export const asResponse = (response) =>
  Promise.resolve({
    status: response.status,
    ok: response.ok,
    json: response.json(),
  });

const fetchInProgress = [];
// Register interceptor hooks
const interceptor = FetchInterceptor.register({
  onBeforeRequest(request, controller) {
    fetchInProgress.push(1);
  },
  onRequestSuccess(response, request, controller) {
    hideProgressBar();
  },
  onRequestFailure(response, request, controller) {
    hideProgressBar();

    const responseStatus = (response && response.status) || 0;
    if (responseStatus === 401 || responseStatus === 403) {
      store.dispatch(getUnauthenticatedRequestAction());
    } else if (responseStatus === 400) {
      dispatchException(response, getBusinessException, true);
    } else if (responseStatus === 500) {
      store.dispatch(
        getBusinessException({ recoverable: false, errorCode: 9999 })
      );
    }
  },
  onConnectionRefused(error, controller) {
    hideProgressBar();

    store.dispatch(
      getBusinessException({ recoverable: false, errorCode: 10000 })
    );
  },
  retryRequest(request) {
    return apiFetch(request);
  },
});

const dispatchException = (response, errorAction, recoverable) => {
  try {
    const result = response.json();
    response.json = () => {
      return result;
    };
    result.then((item) => {
      item.recoverable = recoverable;
      store.dispatch(errorAction(item));
    });
  } catch (e) {
    console.log(e);
  }
};

const hideProgressBar = () => {
  fetchInProgress.pop();
  const progressCount = fetchInProgress.length;
  // console.log(
  //   `onRequestSuccess${fetchInProgress.length}, progressCount ${progressCount}`
  // );
  setTimeout(() => {
    // console.log(
    //   `onTimeout${fetchInProgress.length}, progressCount ${progressCount}`
    // );
    if (progressCount === fetchInProgress.length)
      store.dispatch(getFetchCompletedAction());
  }, 600);
};

//----------------------- START: API Fetch ------------------------------------

export const apiFetch = (url, data) => {
  return fetchDefaults(window.fetch, SERVER_ADDR, {
    headers: getAuthHeader(),
  })(url, data);
};

const getAuthHeader = () => {
  // const token = getToken();

  var header = {
    "Content-type": "application/json",
    terminal_id: getMachineID(),
  };

  // if (token != null || token != undefined) {
  //     header.Authorization = "Bearer " + token;
  // }

  return header;
};

//----------------------- END: API Fetch ------------------------------------

//----------------------- START: API Fetch With Multipart------------------------------------

export const apiFetchWithMultipart = (url, data) => {
  return fetchDefaults(window.fetch, SERVER_ADDR, {
    headers: getAuthWithMultipartHeader(),
  })(url, data);
};

const getAuthWithMultipartHeader = () => {
  const token = getToken();

  var header = {};

  if (token != null || token !== undefined) {
    header.Authorization = "Bearer " + token;
  }

  return header;
};

//----------------------- END: API Fetch With Multipart------------------------------------

// ---------------------------start 05-07-2023--------------------------

const BASE_URL = "http://localhost:8888";

export const FetchApi = async (data) => {
  try {
    spinnerInstance.show(); // Show spinner before the request starts

    const response = await fetch(BASE_URL + data.url, {
      method: data.method,
      body: data.payload,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    if (response.status === 204) {
      return null; // Return null or any other appropriate value
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  } finally {
    spinnerInstance.hide(); // Hide spinner after the request completes (success or error)
  }
};

export const FetchApiForSendMail = async (data) => {
  try {
    
    const response = await fetch(BASE_URL + data.url, {
      method: data.method,
      body: data.payload,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    if (response.status === 204) {
      return null; // Return null or any other appropriate value
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  } 
};

export const FetchApiForAdvancedDataTable = async (data) => {
  try {
    spinnerInstance.show(); // Show spinner before the request starts

    const response = await fetch(BASE_URL + data.url, {
      method: data.method,
      body: data.payload ? JSON.stringify(data.payload) : null,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    if (response.status === 204) {
      return null; // Return null or any other appropriate value
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  } finally {
    spinnerInstance.hide(); // Hide spinner after the request completes (success or error)
  }
};

// export const FetchApi = (data) => {
//   return fetch(BASE_URL + data.url, {
//     method: data.method,
//     body: data.payload,
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//   }).then((response) => {
//     return response.json();
//   });
// };

//-----------------------START: API SAVE-------------------------
function getResponse(data) {
  return fetch("http://localhost:8888" + data.url, {
    method: "post",
    body: data.payload,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
}
// -------------------END: API SAVE--------------------

// ---------------------START: API LIST--------------------------
function getList(data) {
  return fetch("http://localhost:8888" + data.url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
}
// -----------------------END: API LIST-----------------------------

// ----------------------START: API DELETE-----------------------
function deleteCompany(data) {
  // console.log("method : ", data.url);
  return fetch("http://localhost:8888" + data.url, {
    method: data.method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
}
// ----------------------END: API DELETE---------------------
