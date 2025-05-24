import React, { Component } from "react";
import "./style.css";

import Autocomplete from '@mui/material/Autocomplete';
import { TextField, Tooltip } from "@mui/material";
import CircularProgress from "@material-ui/core/CircularProgress";

// import { createFilterOptions } from "@mui/material";
import isNullOrIsEmptyOrIsUndefined from "../../utilities/CommonValidator";


export class MultipleSelect extends Component {
    constructor(props) {
      super(props);
  
      this.state = { inputValue: "" };
    }
  
    render() {
      const { inputValue } = this.state;
      const {
        className,
        disableClearable,
        disabled,
        freeSolo,
        label,
        limitTags,
        loading,
        onBlur,
        onChange,
        onFocus,
        style,
        onInputChange,
        options,
        placeholder,
        size,
        value,
        variant,
      } = this.props;
  
      // const filterOptions = createFilterOptions({
      //   // matchFrom: "start",
      //   limit: 30,
      //   trim: true,
      // });
  
      return (
        <Autocomplete
          inputValue={inputValue || ""}
          style={style}
          className={className}
          disableClearable={disableClearable ? true : false}
          disabled={disabled ? true : false}
          // filterOptions={
          //   (options || []).length > 200 ? filterOptions : createFilterOptions()
          // }
          filterSelectedOptions
          freeSolo={freeSolo ? true : false}
          getOptionLabel={(option) => {
            return option;
          }}
          getOptionSelected={(option, value) => {
            return option === value;
          }}
          limitTags={limitTags || 1}
          loading={loading || false}
          multiple={true}
          onBlur={(event) => {
            if (isNullOrIsEmptyOrIsUndefined(inputValue)) {
              onBlur && onBlur(event);
            } else {
              this.setState({ inputValue: "" }, () => {
                onInputChange && onInputChange(event, "", "input");
                onBlur && onBlur(event);
              });
            }
          }}
          onChange={(event, value, reason) => {
            if (isNullOrIsEmptyOrIsUndefined(inputValue)) {
              onChange && onChange(event, value, reason);
            } else {
              this.setState({ inputValue: "" }, () => {
                onInputChange && onInputChange(event, "", "input");
                onChange && onChange(event, value, reason);
              });
            }
          }}
          onFocus={onFocus}
          onInputChange={(event, value, reason) => {
            if (reason === "input") {
              this.setState(
                { inputValue: value },
                onInputChange && onInputChange(event, value, reason)
              );
            } else {
              onInputChange && onInputChange(event, value, reason);
            }
          }}
          options={options || []}
          renderInput={(params) => {
            const { InputProps, ...restParams } = params;
            const { startAdornment, ...restInputProps } = InputProps;
  
            return (
              <TextField
                {...params}
                label={label || ""}
                placeholder={placeholder || ""}
                variant={variant || "outlined"}
                InputProps={{
                  ...restInputProps,
                  startAdornment: (
                    <div
                      style={{
                        maxHeight: "200px",
                        overflowY: "auto",
                      }}
                    >
                      {startAdornment}
                    </div>
                  ),
                }}
              />
            );
          }}
          size={size || "small"}
          value={value || []}
        />
      );
    }
  }