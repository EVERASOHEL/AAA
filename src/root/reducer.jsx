import {ActionTypes} from "./constants";
import {clearAll, isLoggedIn} from "../utilities/SessionService";
import _ from "lodash";
// import { IsUndefinedOrNull } from "../utilities/commonValidator";

const defaultState = {
    businessException: "",

    sidebarShow: "responsive",

    rootDialogDTO: {
        show: false,
        timer: false,
        type: null,
        message: null,
    },

    //-----------------------------------------------

    fetchInitiated: false,
    fetchCompleted: true,

    isUserAuthenticated: isLoggedIn(),
};

const IsUndefinedOrNull = (object) => {
    if (object === undefined || object === null) {
        return true;
    } else {
        return false;
    }
};

const initialState = defaultState;

const reducer = (stateDTO = initialState, action) => {
    let state = _.cloneDeep(stateDTO);
    const payload = action.payload || {};

    switch (action.type) {
        case ActionTypes.UPDATE_IS_AUTHENTICATED: {
            const isUserAuthenticated = payload.isUserAuthenticated;
            if (isUserAuthenticated === false) {
                clearAll();
            }
            state.isUserAuthenticated = isUserAuthenticated;
            return state;
        }
        case ActionTypes.BUSINESS_EXCEPTION: {
            state.businessException = payload.exception;
            return state;
        }
        case ActionTypes.UPDATE_SIDE_BAR_SHOW: {
            state.sidebarShow = payload.data || "";
            return state;
        }
        case ActionTypes.UPDATE_DTO: {
            if (!IsUndefinedOrNull(payload.rootDialogDTO)) {
                state.rootDialogDTO = payload.rootDialogDTO;
            }

            if (!IsUndefinedOrNull(payload.isUserAuthenticated)) {
                state.isUserAuthenticated = payload.isUserAuthenticated;
                if (state.isUserAuthenticated === false) {
                    clearAll();
                }
            }
            return state;
        }

        // -----------------------------------------------------------

        case ActionTypes.FETCH_INITIATED: {
            state.fetchInitiated = true;
            state.fetchCompleted = false;
            return state;
        }
        case ActionTypes.FETCH_COMPLETED: {
            state.fetchInitiated = false;
            state.fetchCompleted = true;
            return state;
        }
        case ActionTypes.UNAUTHENTICATED_REQUEST: {
            clearAll();
            state.isUserAuthenticated = false;
            return state;
        }

        default:
            return state;
    }
};

export default reducer;
