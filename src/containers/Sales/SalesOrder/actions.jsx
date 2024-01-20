import {ActionTypes} from "./constants";

export const updateClassDTO = (payload) => {
    return {
        type: ActionTypes.CLASS_DTO,
        payload,
    };
};

export const resetData = () => {
    return {
        type: ActionTypes.RESET_DATA,
    };
};

export const updateResponseDTO = (payload) => {
    return {
        type: ActionTypes.RESPONSE_DTO,
        payload,
    };
};

export const isModelOpen = (payload) => {
    return {
        type: ActionTypes.MODEL_OPEN_REQUEST,
        payload,
    };
};

export const productListRequest = () => {
    return {
        type: ActionTypes.PRODUCT_LIST_REQUEST,
    };
};

export const updateSalesClassDTO = (payload) => {
    return {
        type: ActionTypes.SALES_CLASS_DTO,
        payload,
    };
};

export const updateSalesClassListDTO = (payload,flag) => {
    return {
        type: ActionTypes.SALES_CLASS_LIST_DTO,
        payload,
        flag,
    };
};

export const submitSalesOrderRequest = (data) => {
    return {
        type: ActionTypes.SALES_ORDER_REQUEST,
        payload:{
            data,
        }
    };
};

export const companyNameList = (companyType) => {
    return {
        type: ActionTypes.COMPANY_NAME_LIST_REQUEST,
        payload:{
            companyType,
        }
    };
};

export const apiforsalesorderlist = (data) => {
    return {
        type: ActionTypes.SALES_ORDER_LIST_REQUEST,
        payload:{
            data,
        }
    };
};

export const apiforupdateorder = (data) => {
    return {
        type: ActionTypes.SALES_ORDER_PRODUCT_UPDATE_REQUEST,
        payload:{
            data,
        }
    };
};

export const salesOrderCompanyRowData = (data) => {
    return {
        type: ActionTypes.STORE_EDIT_ROW_DATA_TEMPORARY,
        payload:{
            data,
        }
    };
};

export const apiforViewPdf = (data) => {
    return {
        type: ActionTypes.VIEW_PDF_REQUEST,
        payload:{
            data,
        }
    };
};

export const isOpenPdfModel = (data) => {
    return {
        type: ActionTypes.IS_OPEN_PDF_MODEL,
        payload:{
            data,
        }
    };
};

export const apiforSendMail = (data) => {
    return {
        type: ActionTypes.SEND_MAIL_REQUEST,
        payload:{
            data,
        }
    };
};