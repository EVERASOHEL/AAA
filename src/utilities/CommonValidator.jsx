import moment from "moment";

export const IsUndefinedOrNull = (object) => {
    if (object === undefined || object === null) {
        return true;
    } else {
        return false;
    }
};

export const isUndefinedNullOrBlank = (object) => {
    if (object === undefined || object === null || object === "") {
        return true;
    } else {
        return false;
    }
};

export const isUndefinedNullOrTrimBlank = (object) => {
    if (object === undefined || object === null) {
        return true;
    }

    return object.toString().trim().length === 0;
};

export const isValidNumber = (value, mustBeInt, minValue, maxValue) => {
    if (value && value.toString().includes(" ")) {
        return false;
    }
    minValue = minValue !== 0 ? minValue : 0;
    return !(
        (mustBeInt === 1 && value && value.toString().includes(".")) ||
        (value !== "" && (isNaN(value) || value < minValue)) ||
        (maxValue && maxValue < value)
    );
};

export const isValidDate = (date) => {
    return moment(date).isValid();
};

export const isValidHttpUrl = (string) => {
    let url;

    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
};

export const isJSON = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};

const isNullOrIsEmptyOrIsUndefined = (value) => {
    if (null === value || undefined === value || "" === value) {
        return true;
    } else {
        return false;
    }
};
export default isNullOrIsEmptyOrIsUndefined;

export const isNotEmptyAndValidNumber = (string) => {
    return (
        !isNullOrIsEmptyOrIsUndefined(string) &&
        !isNaN(string) &&
        parseInt(string) > 0
    );
};