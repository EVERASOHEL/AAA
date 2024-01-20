import keyMirrorRecursive from "fbjs/lib/keyMirrorRecursive";

export const pageName = "PaymentPage";

export const ActionTypes = keyMirrorRecursive(
    {
        CLASS_DTO: undefined,
        RESET_DATA: undefined,
        MODEL_OPEN_REQUEST:undefined,
        TOTAL_RECEIVABLE_AND_PAYBLE_AMOUNT_REQUEST:undefined,
        TOTAL_RECEIVABLE_AND_PAYBLE_AMOUNT_RESPONSE:undefined,
    },
    pageName
);
