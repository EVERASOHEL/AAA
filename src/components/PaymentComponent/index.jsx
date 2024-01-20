import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./style.css";
import "react-toastify/dist/ReactToastify.css";
import TextFieldOutlined from "../../web/TextField/TextFieldOutlined";
import "react-toastify/dist/ReactToastify.css";
import SingleSelect from "../../web/AutocompleteTextField";
import Close from "../../components/images/cross.gif";
import CalenderWeb from "../../web/newCalendarWeb";
import { ToastContainer, toast } from "react-toastify";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Alert,
  AlertTitle,
  Chip,
  Tooltip,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import SwitchWithMultipleOption from "../../web/switchWithMultipleOption";
import { PAYMENT_MODE } from "../../utilities/CommonConstants";
import * as Buttons from "../../web/Buttons";

const index = (props) => {
  const updateStateValue = (value) => {
    updateState((prevState) => ({
      ...prevState,
      ...value,
    }));
  };

  useEffect(() => {
    // Anything in here is fired on component mount.
    return () => {
      // Anything in here is fired on component unmount.
    };
  }, []);

  const { classDTO, handleClassDTO, open, isModelOpen, handleChangeSave } =
    props;

  const labelvalue = () => {
    return `Pay full Amount. ${classDTO.amountDueBackup}`;
  };

  const returntypeBox = () => {
    var labelval = "";
    if (parseFloat(classDTO.amountDue) == 0 && classDTO.payingamount > 0) {
      labelval = "success";
    } else if (
      classDTO.amountDue > 0 &&
      classDTO.amountDue < classDTO.billAmount
    ) {
      labelval = "warning";
    } else {
      labelval = "error";
    }
    return labelval;
  };

  const hashid = () => {
    return `#${classDTO.id}`;
  };

  return (
    <Dialog open={open}>
      <DialogTitle>
        {" "}
        <div className="dialogheaderstyle">
          <Typography variant="h5">{props.PaymentTypeNameHeader}</Typography>
          <Buttons.CloseButton
              onClick={() => {
                isModelOpen(false);
              }}
            />
        </div>
      </DialogTitle>
      <DialogContent>
        <div className="container-fluid">
          <Grid container spacing={2} style={{ alignItems: "center" }}>
            <Grid item xs={3} style={{ marginTop: "15px" }}>
              <Tooltip title="Purchase Order Id">
                <Chip
                  label={hashid()}
                  size="small"
                  style={{ backgroundColor: "lightsteelblue" }}
                />
                &nbsp;
              </Tooltip>
              <Tooltip title="Company Name">
                <Chip
                  label={classDTO.companyName}
                  size="small"
                  style={{ backgroundColor: "lightsteelblue" }}
                />
              </Tooltip>
            </Grid>
            <Grid item xs={4}>
              <span>Amount</span>
              <span style={{ color: "red" }}>*</span>
              <TextFieldOutlined
                name=""
                label=""z
                variant="outlined"
                istrue={classDTO.payfullAmount}
                maxLength={30}
                // handleBlur={(value) => {
                //   handleClassDTO("calculateAmount", null);
                // }}
                handleChange={(event, value) => {
                  handleClassDTO("payingamount", event.target.value);
                }}
                value={classDTO.payingamount}
              />
              {classDTO.payingAmountError ? (
                <label className="error" style={{ height: "auto" }}>
                  {classDTO.payingAmountError}
                </label>
              ) : null}
            </Grid>
            <Grid item xs={1} style={{ marginTop: "25px" }}>
              <Buttons.Process
                onClick={() => {
                  handleClassDTO("calculateAmount", null);
                }}
              />
            </Grid>
            <Grid item xs={4} style={{ marginTop: "15px" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(event, value) => {
                      handleClassDTO("payfullAmount", value);
                    }}
                  />
                }
                style={{ color: "inherit" }}
                label={labelvalue()}
              />
            </Grid>
            <Grid item xs={4}>
              <span>Payment Date</span>
              <span style={{ color: "red" }}>*</span>
              <CalenderWeb
                // className="widthsetcalenderanddate"
                handleChange={(value) => {
                  handleClassDTO("paymentDate", value);
                }}
                value={classDTO.paymentDate}
              />
            </Grid>
            <Grid item xs={4}>
              <span>Payment Mode</span>
              <SingleSelect
                // label={"Payment Mode"}
                // className="widthsetcalenderanddate"
                // disableClearable={true}
                keyOfData={"display"}
                value={PAYMENT_MODE.find(
                  (element) => element.value == (classDTO.paymentMode || "")
                )}
                options={PAYMENT_MODE}
                onChange={(event, value) => {
                  handleClassDTO("paymentMode", (value && value.value) || "");
                }}
              />
            </Grid>
          </Grid>
        </div>
        <Box style={{ marginTop: "15px" }}>
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity={returntypeBox()}>
              <AlertTitle>Payment Calculation</AlertTitle>
              <div className="container-fluid">
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography>Bill Amount</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography>Amount Due</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography>Payment</Typography>
                  </Grid>
                </Grid>
                <hr />
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography>{classDTO.billAmount || "0.00"}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography>{classDTO.amountDue || "0.00"}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography>
                      {classDTO.payingamountError
                        ? "0.00"
                        : classDTO.payingamount || "0.00"}
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            </Alert>
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          sx={{ bgcolor: "GrayText" }}
          size="small"
          // onClick={() => this.props.updateClassDTO({})}
        >
          Reset
        </Button>
        <Button
          variant="contained"
          size="small"
          color="success"
          onClick={() => handleChangeSave()}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default index;
