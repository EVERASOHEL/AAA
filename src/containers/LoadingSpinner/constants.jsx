import keyMirrorRecursive from "fbjs/lib/keyMirrorRecursive";

export const pageName = "LoadingSpinner";

export const ActionTypes1 = keyMirrorRecursive(
    {
        CLASS_DTO: undefined,
        LOADING_STATUS:undefined,
        SHOW_LOADING:undefined,
        HIDE_LOADING:undefined
    },
    pageName
);
