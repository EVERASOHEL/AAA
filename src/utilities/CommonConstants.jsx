// --------------- GLOBAL CONSTANTS ---------------

// --------------- START: Date Time Formats ---------------

export const dddd_DD_MMMM_YYYY = "dddd, DD MMMM YYYY";

export const DD_MMM_YYYY = "DD MMM YYYY";

export const DD_MMM_YYYY_HYPHEN = "DD-MMM-YYYY";

export const hh_mm_A = "hh : mm A";

export const MM_DD_YYYY_hh_mm_ss_A_SLASH = "MM/DD/YYYY hh:mm:ss A";

export const UTC_DATE_TIME = "YYYY-MM-DDTHH:MM:SSZ";

export const YYYY_MM_DD_HYPHEN = "YYYY-MM-DD";

// --------------- END: Date Time Formats ---------------

// --------------- START: Regex ---------------

export const EMAIL_MATCH = /^[A-Za-z_.0-9-]+@{1}[a-z]+([.]{1}[a-z]{2,4})+$/;

export const MOBILE_NO_MATCH = /^[+-]?(?:\d+\.?\d*|\d*\.?\d+)[\r\n]*$/;

export const PASSWORD_MATCH =
  /^(?=.*[A-Z])(?=.*[!@#$%^&*()'"])[A-Za-z\d!@#$%^&*()'"](?!\s).{5,19}$/;

// --------------- END : Regex ---------------

// --------------- START: Messages ---------------

export const MSG_UNIVERSAL_ERROR =
  "The task you are trying to perform is temporarily unavailable. Kindly contact administrator.";

// --------------- END: Messages ---------------

export const GST_TYPE = [
  { value: "IGST18[18%]", display: "IGST18[18%]" },
  { value: "IGST12[12%]", display: "IGST12[12%]" },
  { value: "IGST5[5%]", display: "IGST5[5%]" },
  { value: "LGST18[18%]", display: "LGST18[18%]" },
  { value: "LGST12[12%]", display: "LGST12[12%]" },
  { value: "LGST5[5%]", display: "LGST5[5%]" },
];

export const PRODUCT_TYPE = [
  { value: "DOZEN", display: "DOZEN" },
  { value: "GRAMS", display: "GRAMS" },
  { value: "PCS", display: "PCS" },
  { value: "BOX", display: "BOX" },
  { value: "METRES", display: "METRES" },
];

export const PAYMENT_MODE = [
  { value: "Cash", display: "Cash" },
  { value: "Bank", display: "Bank" },
];
