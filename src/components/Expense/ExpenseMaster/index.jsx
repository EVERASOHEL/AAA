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
import React, { Component } from "react";
import CloseButton from "@mui/icons-material/Close";
import "./style.css";
import "react-toastify/dist/ReactToastify.css";
import TextFieldOutlined from "../../../web/TextField/TextFieldOutlined";
import "react-toastify/dist/ReactToastify.css";
import SingleSelect from "../../../web/AutocompleteTextField";
import { stateNameList } from "../../../containers/CompanyMaster/constants";
import Star from "../../../components/Shared/Start";
import Close from "../../../components/images/cross.gif";
import { PAYMENT_MODE } from "../../../utilities/CommonConstants";
import { ToastContainer, toast } from "react-toastify";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import SwitchWithMultipleOption from "../../../web/switchWithMultipleOption";
import * as Buttons from "../../../web/Buttons";
import CalenderWeb from "../../../web/CalendarWeb";

export default class AddCompanyModel extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const {
      classDTO,
      handleClassDTO,
      open,
      isModelOpen,
      expenseCategoryNameList,
    } = this.props;
    return (
      <Dialog open={open} maxWidth="md">
        <DialogTitle>
          {" "}
          <div className="dialogheaderstyle">
            <div class="text-lg font-semibold text-gray-800">Add Expense</div>
            <Buttons.CloseButton
              onClick={() => {
                isModelOpen(false);
              }}
            />
          </div>
        </DialogTitle>
        <DialogContent style={{ maxHeight: "300px" }}>
          <div className="container-fluid">
            <Grid container spacing={2} style={{ alignItems: "center" }}>
            <Grid item xs={4} style={{ marginTop: "10px" }}>
                <div
                  className="TextFieldcontainer col-md-6"
                  style={{ width: "100%" }}
                >
                  <SingleSelect
                    placeholder="Expense Name"
                    label={
                      <span>
                        Select Expense Name<span style={{ color: "red" }}>*</span>
                      </span>
                    }
                    keyOfData="title"
                    value={
                      (
                        (expenseCategoryNameList || []).find(
                          (element) =>
                            element.value === (classDTO.expenseCategoryId || "")
                        ) || {}
                      ).title || ""
                    }
                    options={(expenseCategoryNameList || []).map(
                      (element) => element.title
                    )}
                    onChange={(event, value) => {
                      const selectedexpenseCategoryId =
                        (
                          expenseCategoryNameList.find(
                            (element) => element.title == value
                          ) || {}
                        ).value || "";
                      handleClassDTO("expenseCategoryId", selectedexpenseCategoryId);
                    }}
                  />
                  {classDTO.expenseCategoryIdError && (
                    <label className="error">{classDTO.expenseCategoryIdError}</label>
                  )}
                </div>
              </Grid>
              <Grid item xs={4} style={{ marginTop: "10px" }}>
                <div
                  className="TextFieldcontainer col-md-6"
                  style={{ width: "100%" }}
                >
                  <TextFieldOutlined
                    name={"expenseAmount"}
                    label={
                      <span>
                        Expense Amount<span style={{ color: "red" }}>*</span>
                      </span>
                    }
                    variant={"outlined"}
                    handleChange={(event, value) => {
                      handleClassDTO("expenseAmount", event.target.value);
                    }}
                    value={classDTO.expenseAmount}
                  />
                  {classDTO.expenseAmountError && (
                    <label className="error">{classDTO.expenseAmountError}</label>
                  )}
                </div>
              </Grid>
              <Grid item xs={4} style={{ marginTop: "10px" }}>
                <div
                  className="TextFieldcontainer col-md-6"
                  style={{ width: "100%" }}
                >
                  <SingleSelect
                    label={
                      <span>
                        Select Payment<span style={{ color: "red" }}>*</span>
                      </span>
                    }
                    // disableClearable={true}
                    keyOfData={"display"}
                    value={PAYMENT_MODE.find(
                      (element) =>
                        element.display == (classDTO.paymentMethod || "")
                    )}
                    options={PAYMENT_MODE}
                    onChange={(event, value) => {
                      handleClassDTO(
                        "paymentMethod",
                        (value && value.value) || ""
                      );
                    }}
                  />
                  {classDTO.paymentMethodError && (
                    <label className="error">{classDTO.paymentMethodError}</label>
                  )}
                </div>
              </Grid>
              <Grid item xs={4} style={{ marginTop: "10px" }}>
                <div
                  className="TextFieldcontainer col-md-6"
                  style={{ width: "100%", height: "90px" }}
                >
                  <Typography variant="body1" className="mb-2">
                    Select expense date
                  </Typography>
                  <CalenderWeb
                    handleChange={(value) => {
                      handleClassDTO("expenseDate", value);
                    }}
                    value={classDTO.expenseDate}
                  />
                   {classDTO.expenseDateError && (
                    <label className="error">{classDTO.expenseDateError}</label>
                  )}
                </div>
              </Grid>
              <Grid item xs={8} style={{}}>
                <textarea
                  name="description"
                  placeholder="Enter expense description"
                  variant="outlined"
                  id="exampleFormControlTextarea1"
                  maxLength={1000}
                  rows="3"
                  style={{ width: "100%", padding: "10px", marginTop: "5px" }}
                  onChange={(event) => {
                    handleClassDTO("description", event.target.value);
                  }}
                  value={classDTO.description || ""}
                ></textarea>
                {classDTO.descriptionError && (
                  <label className="error" style={{ marginTop: "5px" }}>
                    {classDTO.descriptionError}
                  </label>
                )}
              </Grid>
            </Grid>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            sx={{ bgcolor: "GrayText" }}
            size="small"
            onClick={() => this.props.updateClassDTO({})}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            size="small"
            color="success"
            onClick={() => this.props.handleChangeSave("all", "Expense")}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
