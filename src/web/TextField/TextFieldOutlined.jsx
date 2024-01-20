import { TextField, Tooltip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { Component } from "react";
// import "./style.css";

// export default class TextFieldMobile extends Component {
//   useStyles = makeStyles((theme) => ({
//     container: {
//       display: "flex",
//       flexWrap: "wrap",
//     },
//   }));

//   MultilineTextFields = (props) => {
//     return (
//       <React.Fragment>
//         <TextField
//           id={this.props.id ? this.props.id : "outlined-textarea"}
//           label={this.props.label}
//           rowsMax={props.rowsLength}
//           fullWidth={true}
//           required={this.props.required}
//           multiline={true}
//           value={this.props.value}
//           variant={this.props.variant || "standard"}
//           type={this.props.type ? this.props.type : "text"}
//           onChange={this.props.handleChange}
//           placeholder={this.props.placeholder}
//           name={this.props.name}
//           onBlur={this.props.handleBlur}
//           InputProps={{
//             readOnly: this.props.istrue,
//           }}
//           inputProps={{
//             maxLength: this.props.maxLength,
//           }}
//           disabled={this.props.disabled}
//           InputLabelProps={{
//             shrink: this.props.shrink,
//           }}
//         />
//       </React.Fragment>
//     );
//   };

//   render() {
//     return (
//       <this.MultilineTextFields
//         rowsLength={this.props.rowsLength}
//       ></this.MultilineTextFields>
//     );
//   }
// }

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      background: "white",
      width: `100%`,
    },
  },
  width: {
    "& > *": {
      width: `100%`,
    },
  },
}));

const TextFieldOutlined = (props) => {
  const classes = useStyles();
  return (
    <>
      <form className={classes.root} noValidate autoComplete="off">
        {/* <form className={{width:"100%",backgroundColor:"white"}} noValidate autoComplete="off"> */}
        <Tooltip
          backgroundColor="white"
          title={props.tooltipAvailable ? props.tooltipAvailable : ""}
          placement="top"
        >
          <div className="TextFieldcontainer">
            <TextField
              type={props.type ? props.type : "text"}
              variant={props.variant ? props.variant : "outlined"}
              id={props.id ? props.id : "outlined-basic"}
              label={props.label}
              onKeyPress={
                props.onKeyPress ? props.onKeyPress : props.handleChange
              }
              value={
                props.value === "null" ||
                props.value === undefined ||
                props.value === "" ||
                props.value == null
                  ? ""
                  : props.value
              }
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              placeholder={props.placeholder}
              disabled={props.istrue ? props.istrue : false}
              className={props.className ? props.className : ""}
              InputProps={props.inputProps ? props.inputProps : null}
              inputProps={{
                maxLength: props.maxLength,
              }}
            />
          </div>
        </Tooltip>
      </form>
    </>
  );
};
export default TextFieldOutlined;
