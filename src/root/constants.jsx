import keyMirrorRecursive from "fbjs/lib/keyMirrorRecursive";

export const pageName = "root";

export const ActionTypes = keyMirrorRecursive(
    {
        // Root index
        UPDATE_IS_AUTHENTICATED: undefined,
        USER_LOGOUT: undefined,
        BUSINESS_EXCEPTION: undefined,
        UPDATE_SIDE_BAR_SHOW: undefined,

        UPDATE_DTO: undefined,

        // Loading
        FETCH_INITIATED: undefined,
        FETCH_COMPLETED: undefined,
        UNAUTHENTICATED_REQUEST: undefined,
    },
    pageName
);
