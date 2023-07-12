import React, {Component} from "react";
import "./styles.scss";

import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";

export class DatePicker extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const {
            className,
            label,
            format,
            value,
            onChange,
            readOnly,
            minDate,
            maxDate,
        } = this.props;
        return (
            <>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        size="small"
                        className={className}
                        inputVariant="outlined"
                        // margin="normal"
                        id="date-picker-dialog"
                        label={label}
                        format={format} //"yyyy-MM-dd"
                        value={value}
                        // inputValue={null}
                        onChange={onChange}
                        fullWidth={true}
                        KeyboardButtonProps={{
                            "aria-label": "change date",
                        }}
                        clearable={true}
                        invalidDateMessage=""
                        readOnly={readOnly || false}
                        minDate={minDate}
                        maxDate={maxDate}
                    />
                </MuiPickersUtilsProvider>
            </>
        );
    }
}
