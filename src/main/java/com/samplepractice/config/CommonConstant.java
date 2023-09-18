package com.samplepractice.config;

import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;

public class CommonConstant {

    public static final SimpleDateFormat SIMPLE_DATE_FORMAT_DD_MM_YYYY_HH_MM = new SimpleDateFormat("dd-MM-yyyy HH:mm");

    public static String convertToFormattedString(String input, int decimalPlaces) {
        // Remove any extra decimal points and leading/trailing whitespace
        input = input.replaceAll("\\s+", "");
        input = input.replaceAll("\\.+", ".");

        try {
            // Parse the string as a floating-point number
            double number = Double.parseDouble(input);

            // Round the number to the specified decimal places
            double roundedNumber = Math.round(number * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);

            // Format the rounded number as a string with the specified decimal places
            String result = String.format("%." + decimalPlaces + "f", roundedNumber);

            return result;
        } catch (NumberFormatException e) {
            return "Invalid input format";
        }
    }

    public static String findRoundOfValue(float value) {
        double roundedValue = Math.ceil(value);
        DecimalFormat df = new DecimalFormat("#");
        return df.format(roundedValue);
    }

    public static String extractDecimalPart(float value) {
        String stringValue = Float.toString(value);
        if (stringValue.contains(".")) {
            String decimalPart = stringValue.split("\\.")[1];
            return "0." + decimalPart;
        }
        return "0.00";
    }

}
