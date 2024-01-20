import * as React from "react";
import TextField from "@mui/material/TextField";
import moment from 'moment';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import './styles.scss'

export default function MaterialUIPickers(props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        // label="Date"
        format={props.format ? props.format : "dd/MM/yyyy"}
        // value={props.value ? props.value : new Date()}
        value={moment(props.value).toDate}
        onChange={props.handleChange}
        renderInput={(params) => <TextField {...params} />}
        autoFocus={true} // <===========
      />
    </LocalizationProvider>
  );
}

