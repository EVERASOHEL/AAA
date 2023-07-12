import {TextField, Tooltip} from "@mui/material";
import {makeStyles} from "@mui/styles";
import React, {Component} from "react";
import "./style.css";

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
}
export default TextFieldOutlined;
