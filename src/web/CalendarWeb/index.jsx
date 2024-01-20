import React, { Fragment } from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
// import MomentUtils from "@date-io/moment";
import moment from "moment";
import * as convertUTCDateToLocalDate  from "../../utilities/CommonFunction";
import DateFnsUtils from "@date-io/date-fns";
import { Clear } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import "./styles.scss";

export default function CalendarMobile(props) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        views={props.views}
        style={{
          background: props.style !== undefined ? props.style : "white",
          paddingLeft: "0px",
        }}
        className={
          props.className ? `${props.className} CalenderWeb` : "CalenderWeb"
        }
        inputVariant="outlined"
        margin="normal"
        id={props.id ? props.id : "date-picker-dialog"}
        label={props.label}
        format={props.format || "dd/MM/yyyy"}
        value={
          props.utcValue
            ? props.value &&
              convertUTCDateToLocalDate.convertUTCDateToLocalDate(moment.utc(props.value).toDate())
            : props.value
        }
        onChange={props.handleChange}
        fullWidth={true}
        disabled={props.readOnlyValue}
        helperText={props.helperText}
        error={props.error}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
        maxDate={props.maxDate}
        minDate={props.minDate}
        InputLabelProps={{
          shrink: props.shrink,
        }}
        InputProps={{
          readOnly: props.readOnly || false,
          startAdornment:
            props.clearable == true ? (
              <IconButton
                onClick={(event) => {
                  event.stopPropagation();
                  props.onClear && props.onClear();
                }}
                style={{ order: 1 }}
              >
                <Clear />
              </IconButton>
            ) : null,
        }}
        InputAdornmentProps={
          props.clearable == true
            ? {
                position: "end",
                style: { order: 2 },
              }
            : {}
        }
      />
    </MuiPickersUtilsProvider>
  );
}
