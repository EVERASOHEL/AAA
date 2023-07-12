import React, {Component} from "react";
import "./styles.scss";

import {Autocomplete} from "@material-ui/lab";
import TextField from "@material-ui/core/TextField";
import {createFilterOptions} from "@material-ui/lab/Autocomplete";

export class SingleSelect extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const {
            className,
            disableClearable,
            disabled,
            label,
            onBlur,
            onChange,
            onFocus,
            onInputChange,
            options,
            placeholder,
            size,
            value,
            variant,
        } = this.props;

        const filterOptions = createFilterOptions({
            // matchFrom: "start",
            limit: 25,
            trim: true,
        });

        return (
            <>
                <Autocomplete
                    className={`dropdown-autocomplete ${className}`}
                    disableClearable={disableClearable ? true : false}
                    disabled={disabled ? true : false}
                    // filterOptions={
                    //   options.length > 200 ? filterOptions : createFilterOptions()
                    // }
                    filterSelectedOptions
                    getOptionLabel={(option) => option}
                    getOptionSelected={(option, value) => {
                        return option === value;
                    }}
                    onBlur={onBlur}
                    onChange={onChange}
                    onFocus={onFocus}
                    onInputChange={onInputChange}
                    options={options}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            // className={className}
                            label={label || ""}
                            placeholder={placeholder || ""}
                            variant={variant || "outlined"}
                        />
                    )}
                    size={size || "small"}
                    value={value}
                />
            </>
        );
    }
}

export class MultipleSelect extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const {
            className,
            disableClearable,
            disabled,
            getOptionDisabled,
            freeSolo,
            label,
            onBlur,
            renderTags,
            onChange,
            onFocus,
            onInputChange,
            options,
            placeholder,
            size,
            value,
            variant,
        } = this.props;

        const filterOptions = createFilterOptions({
            // matchFrom: "start",
            limit: 25,
            trim: true,
        });

        return (
            <div>
                <Autocomplete
                    className={className}
                    disableClearable={disableClearable ? true : false}
                    disabled={disabled ? true : false}
                    // filterOptions={
                    //   options.length > 200 ? filterOptions : createFilterOptions()
                    // }
                    filterSelectedOptions
                    freeSolo={freeSolo ? true : false}
                    // getOptionLabel={(option) => option[Object.keys(option)[1]]}
                    getOptionLabel={(option) => option}
                    getOptionSelected={(option, value) => {
                        return (
                            option === value
                            // option[Object.keys(option)[1]] === value[Object.keys(value)[1]]
                        );
                    }}
                    multiple={true}
                    onBlur={onBlur}
                    renderTags={renderTags}
                    onChange={onChange}
                    onFocus={onFocus}
                    getOptionDisabled={getOptionDisabled}
                    onInputChange={onInputChange}
                    options={options}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={label || ""}
                            placeholder={placeholder || ""}
                            variant={variant || "outlined"}
                        />
                    )}
                    size={size || "small"}
                    value={value}
                />
            </div>
        );
    }
}

export class MultipleObjectSelect extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const {
            className,
            disableClearable,
            disabled,
            freeSolo,
            label,
            onBlur,
            onChange,
            onFocus,
            onInputChange,
            options,
            placeholder,
            size,
            value,
            variant,
        } = this.props;

        const filterOptions = createFilterOptions({
            // matchFrom: "start",
            limit: 25,
            trim: true,
        });

        return (
            <>
                <Autocomplete
                    className={className}
                    disableClearable={disableClearable ? true : false}
                    disabled={disabled ? true : false}
                    // filterOptions={
                    //   options.length > 200 ? filterOptions : createFilterOptions()
                    // }
                    filterSelectedOptions
                    freeSolo={freeSolo ? true : false}
                    getOptionLabel={(option) => option[Object.keys(option)[1]]}
                    // getOptionLabel={(option) => option}
                    getOptionSelected={(option, value) => {
                        return (
                            // option === value
                            option[Object.keys(option)[1]] === value[Object.keys(value)[1]]
                        );
                    }}
                    multiple={true}
                    onBlur={onBlur}
                    onChange={onChange}
                    onFocus={onFocus}
                    onInputChange={onInputChange}
                    options={options || []}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={label || ""}
                            placeholder={placeholder || ""}
                            variant={variant || "outlined"}
                        />
                    )}
                    size={size || "small"}
                    value={value || []}
                />
            </>
        );
    }
}
