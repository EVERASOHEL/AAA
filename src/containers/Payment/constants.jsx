import keyMirrorRecursive from "fbjs/lib/keyMirrorRecursive";

export const pageName = "PaymentPage";

export const ActionTypes = keyMirrorRecursive(
    {
        PAYMENT_REQUEST:undefined,
        PAYMENT_RESPONSE:undefined,
        CLASS_DTO: undefined,
        RESET_DATA: undefined,
        RESPONSE_DTO: undefined,
        MODEL_OPEN_REQUEST:undefined,
        OPEN_EDIT_MODEL:undefined,
        MODEL_MESSAGE_REQUEST:undefined,
    },
    pageName
);
