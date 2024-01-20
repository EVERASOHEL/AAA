import keyMirrorRecursive from "fbjs/lib/keyMirrorRecursive";

export const pageName = "SalesOrdernnn";

export const ActionTypes = keyMirrorRecursive(
    {
        CLASS_DTO: undefined,
        SALES_CLASS_DTO:undefined,
        SALES_CLASS_LIST_DTO:undefined,
        RESET_DATA: undefined,
        RESPONSE_DTO: undefined,
        MODEL_OPEN_REQUEST:undefined,
        PRODUCT_LIST_REQUEST:undefined,
        PRODUCT_LIST_RESPONSE:undefined,
        SALES_ORDER_REQUEST:undefined,
        SALES_ORDER_RESPONSE:undefined,
        COMPANY_NAME_LIST_REQUEST:undefined,
        COMPANY_NAME_LIST_RESPONSE:undefined,
        SALES_ORDER_LIST_REQUEST:undefined,
        SALES_ORDER_LIST_RESPONSE:undefined,
        SALES_ORDER_PRODUCT_UPDATE_REQUEST:undefined,
        SALES_ORDER_PRODUCT_UPDATE_RESPONSE:undefined,
        STORE_EDIT_ROW_DATA_TEMPORARY:undefined,
        VIEW_PDF_REQUEST:undefined,
        VIEW_PDF_RESPONSE:undefined,
        IS_OPEN_PDF_MODEL:undefined,
        SEND_MAIL_REQUEST:undefined,
        SEND_MAIL_RESPONSE:undefined
    },
    pageName
);
