import keyMirrorRecursive from "fbjs/lib/keyMirrorRecursive";

export const pageName = "AdvancedDataTable111";

export const ActionTypes = keyMirrorRecursive(
    {
        CLASS_DTO: undefined,
        VALIDATION_ERROR_DTO: undefined,
        LIST_REQUEST:undefined,
        LIST_RESPONSE:undefined,
        UPDATE_SELECTED_FILTERS:undefined,
        UPDATE_TABLE_DATA: undefined,
    },
    pageName
);