import keyMirrorRecursive from "fbjs/lib/keyMirrorRecursive";

export const pageName = "ProductMasterPage";

export const ActionTypes = keyMirrorRecursive(
    {
        REGISTRATION_FORM: undefined,
        classDTO: undefined,
        PRODUCT_REQUEST: undefined,
        CLASS_DTO: undefined,
        RESET_DATA: undefined,
        RESPONSE_DTO: undefined,
        MODEL_OPEN_REQUEST:undefined,
    },
    pageName
);
