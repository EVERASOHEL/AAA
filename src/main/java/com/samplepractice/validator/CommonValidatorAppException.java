package com.samplepractice.validator;
import com.google.common.base.Strings;
import org.apache.commons.lang3.math.NumberUtils;

import java.util.Objects;

public class CommonValidatorAppException {

    private static final String NUMERIC = "numeric";

    public static void throwRequiredException(String key) throws Exception {
        throw new AppException(key + " required");
    }

    public static void stringsIsNullOrEmpty(String key, String value) throws Exception {
        if (Strings.isNullOrEmpty(value) || Strings.isNullOrEmpty(value.trim())) {
            throwRequiredException(key);
        }
    }

    public static void isNumeric(String key, String value) throws Exception {
        if (!NumberUtils.isParsable(value)) {
            throw new AppException(key + " must be numeric");
        }
    }

    public static void isDigitWithEmptyStringAllowed(String key, String value) throws Exception {
        if (!Strings.isNullOrEmpty(value)) {
            if (!NumberUtils.isDigits(value)) {
                throw new AppException(key + " must be " + NUMERIC);
            }
        }else{
            throwRequiredException(key);
        }
    }

    public static void isDigit(String key, String value) throws Exception {
        if (!NumberUtils.isDigits(value)) {
            throw new AppException(key + " must be " + NUMERIC);
        }
    }

    public static void objectsIsNullAndIsDigit(String key, Object value) throws Exception {
        if (Objects.isNull(value)) {
            throwRequiredException(key);
        }
//        isDigit(key, value.toString());
    }
}
