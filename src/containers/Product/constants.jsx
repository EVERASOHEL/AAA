import keyMirrorRecursive from "fbjs/lib/keyMirrorRecursive";

export const pageName = "ProductPage";

export const ActionTypes = keyMirrorRecursive(
    {
        classDTO: undefined,
        PRODUCT_REQUEST: undefined,
        PRODUCT_RESPONSE:undefined,
        CLASS_DTO: undefined,
        RESET_DATA: undefined,
        RESPONSE_DTO: undefined,
        MODEL_OPEN_REQUEST:undefined,
        PRODUCT_LIST_REQUEST:undefined,
        PRODUCT_LIST_RESPONSE:undefined,
        DELETE_PRODUCT:undefined,
        PRODUCT_NAME_LIST_REQUEST:undefined,
        PRODUCT_NAME_LIST_RESPONSE:undefined,
    },
    pageName
);
