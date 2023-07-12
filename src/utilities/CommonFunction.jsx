import {toast} from "react-toastify";

import * as configConstants from "../configuration/constant/configConstants";
import {
    isNullOrIsUndefined,
    isUndefinedNullOrTrimBlank,
} from "./commonValidator";

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

    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
};

export const convertDateToLocalDate = (dateTime) => {
    if (isNullOrIsUndefined(dateTime) == false) {
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

export const getFileDownloadUrl = (url) => {
    if (url.includes("http")) {
        return url;
    } else {
        return `${configConstants.SERVER_ADDR}download/${url}`;
    }
};

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
