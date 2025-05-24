import { TextField } from "@mui/material";
import { Autocomplete } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Component } from "react";
import "./style.css";
import { createFilterOptions } from "@mui/material/Autocomplete";

// const useStyles = makeStyles((theme) => ({
//   autocomplete: {
//     "& .MuiOutlinedInput-root": {
//       height: "40px", // Adjust the height value as needed
//     },
//     "& .MuiOutlinedInput-input": {
//       padding: "8px 12px", // Adjust the padding value as needed
//     },
//     "& .MuiInputLabel-root": {
//       fontSize: "14px", // Adjust the font size value as needed
//     },
//     '& .MuiAutocomplete-option[data-focus="true"]': {
//       justifyContent: "center",
//     },
//     "& .MuiInputBase-input": {
//       height: "10px",
//     },
//   },
// }));

// class SingleSelect extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {};
//   }

//   render() {
//     const {
//       className,
//       disableClearable,
//       disabled,
//       readOnly,
//       label,
//       id,
//       loading,
//       onBlur,
//       onChange,
//       onFocus,
//       onInputChange,
//       open,
//       options,
//       disabledOptions,
//       style,
//       placeholder,
//       size,
//       value,
//       variant,

//       keyOfData,
//       keyOfValue,
//     } = this.props;

//     const filterOptions = createFilterOptions({
//       // matchFrom: "start",
//       limit: 25,
//       trim: true,
//     });

//     return (
//       <>
//         <Autocomplete
//           blurOnSelect={true}
//           className={className}
//           id={id}
//           disableClearable={disableClearable ? true : false}
//           disabled={disabled ? true : false}
//           // readOnly={readOnly ? true : false}
//           style={style}
//           // filterOptions={
//           //   options.length > 200 ? filterOptions : createFilterOptions()
//           // }
//           filterSelectedOptions
//           getOptionLabel={(option) => {
//             if (keyOfData && option[keyOfData]) {
//               return option[keyOfData] === null
//                 ? ""
//                 : option[keyOfData].toString();
//             } else {
//               return option === null ? "" : option.toString();
//             }
//           }}
//           getOptionDisabled={(option) => {
//             return (disabledOptions || []).some((element) => {
//               if (keyOfData && option[keyOfData]) {
//                 return element[keyOfData] === option[keyOfData];
//               } else {
//                 return element === option;
//               }
//             });
//           }}
//           getOptionSelected={(option, value) => {
//             return (
//               (keyOfData ? option[keyOfData] : option) ===
//               (keyOfValue ? value[keyOfValue] : value)
//             );
//           }}
//           loading={loading || false}
//           onBlur={onBlur}
//           onChange={onChange}
//           onFocus={onFocus}
//           onInputChange={onInputChange}
//           open={open}
//           options={options}
//           renderInput={(params) => (
//             <TextField
//               {...params}
//               // className={className}
//               label={label || ""}
//               placeholder={placeholder || ""}
//               variant={variant || "outlined"}
//               disabled={disabled ? true : false}
//               InputProps={{
//                 ...params.InputProps,
//                 endAdornment: (
//                   <React.Fragment>
//                     {loading ? (
//                       <CircularProgress color="inherit" size={20} />
//                     ) : null}
//                     {params.InputProps.endAdornment}
//                   </React.Fragment>
//                 ),
//               }}
//             />
//           )}
//           size={size || "small"}
//           value={value || null}
//         />
//       </>
//     );
//   }
// }

// export default SingleSelect;

const AutocompleteTextField = (props) => {
  const {
    className,
    disableClearable,
    disabled,
    readOnly,
    label,
    id,
    loading,
    onBlur,
    onChange,
    onFocus,
    onInputChange,
    open,
    options,
    disabledOptions,
    style,
    placeholder,
    size,
    value,
    variant,

    keyOfData,
    keyOfValue,
  } = props;

  // const classes = useStyles();
  return (
    <React.Fragment>
      <Autocomplete
        blurOnSelect={true}
        className={className}
        id={id}
        disableClearable={disableClearable ? true : false}
        disabled={disabled ? true : false}
        // readOnly={readOnly ? true : false}
        style={style}
        // filterOptions={
        //   options.length > 200 ? filterOptions : createFilterOptions()
        // }
        filterSelectedOptions
        getOptionLabel={(option) => {
          if (typeof option === "object" && option !== null) {
            return option.display || ""; // Use the `display` property for the label
          }
          return option || ""; // Fallback for non-object options
        }}
        getOptionDisabled={(option) => {
          return (disabledOptions || []).some((element) => {
            if (keyOfData && option[keyOfData]) {
              return element[keyOfData] === option[keyOfData];
            } else {
              return element === option;
            }
          });
        }}
        getOptionSelected={(option, value) => {
          return (
            (keyOfData ? option[keyOfData] : option) ===
            (keyOfValue ? value[keyOfValue] : value)
          );
        }}
        loading={loading || false}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        onInputChange={onInputChange}
        open={open}
        options={options}
        renderInput={(params) => (
          <TextField
            {...params}
            // className={className}
            label={label || ""}
            placeholder={placeholder || ""}
            variant={variant || "outlined"}
            disabled={disabled ? true : false}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
        size={size || "small"}
        value={value || null}
      />
    </React.Fragment>
  );
};
export default AutocompleteTextField;
