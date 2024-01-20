import { toast } from "react-toastify";
import isNullOrIsEmptyOrIsUndefined from "./CommonValidator";
import isUndefinedNullOrTrimBlank from "./CommonValidator";

// import * as configConstants from "../configuration/constant/configConstants";
// import isNullOrIsEmptyOrIsUndefined, {
//     isNullOrIsUndefined,
//     isUndefinedNullOrTrimBlank,
// } from "./CommonValidator";

// import * as commonValidator from './CommonValidator';

export const getOrDefault = (object, defaultValue) => {
  if (isUndefinedNullOrTrimBlank(object)) {
    return defaultValue;
  }

  return object;
};

export const b64toBlob = (b64Data, contentType) => {
  contentType = contentType || "";
  var sliceSize = 512;
  b64Data = b64Data.replace(/^[^,]+,/, "");
  b64Data = b64Data.replace(/\s/g, "");
  var byteCharacters = window.atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, { type: contentType });
  return blob;
};

export const convertDateToLocalDate = (dateTime) => {
  if (isNullOrIsEmptyOrIsUndefined(dateTime) == false) {
    if (dateTime.includes("+")) {
      var withoutGMT = dateTime.split("+");
      var withGMT = withoutGMT[0] + "+00:00";
      return new Date(withGMT).toLocaleString();
    } else if (dateTime.includes("Z")) {
      var withoutGMT = dateTime.split("Z");
      var withGMT = withoutGMT[0] + "+00:00";
      return new Date(withGMT).toLocaleString();
    }
  }
};

export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

// export const getFileDownloadUrl = (url) => {
//     if (url.includes("http")) {
//         return url;
//     } else {
//         return `${configConstants.SERVER_ADDR}download/${url}`;
//     }
// };

export const numberFormat = (value) => {
  return Intl.NumberFormat("en-IN", {
    style: "decimal",
    // currency: "INR",
  }).format(value);
};

export const copyToClipboard = (value) => {
  const el = document.createElement("textarea");
  el.value = value || "";
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);

  toast.configure();
  toast.success(
    "Share URL copied to Clipboard, now share with your liked ones."
  );
};

export const convertUTCDateToLocalDate = (date) => {
  var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
  return newDate;
};

export const calculateGSTAmount = (data, GstType) => {
  var GstAmount = 0;
  if (!isNullOrIsEmptyOrIsUndefined(data) && data !== 0) {
    if (GstType === "IGST18[18%]" || GstType == "LGST18[18%]") {
      GstAmount = (data * 18) / 100;
    } else if (GstType === "IGST12[12%]" || GstType === "LGST12[12%]") {
      GstAmount = (data * 18) / 100;
    }
  }
  return GstAmount;
};

// Function to calculate percentage and create data array
export const getDataArray = (label, value, totalAmount) => {
  const percentage = ((value / totalAmount) * 100).toFixed(2);
  return [
    ["Category", "Value"],
    [label, parseFloat(percentage)],
    ["Remaining Amount", parseFloat(100 - percentage)],
  ];
};

export const findPercentage=(totalbillAmount,GstBillAmount)=>{
  if(!isNullOrIsEmptyOrIsUndefined(totalbillAmount) && !isNullOrIsEmptyOrIsUndefined(GstBillAmount)){
    return (GstBillAmount*100)/totalbillAmount;
  }else{
    return 0;
  }
}
