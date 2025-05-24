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
import Star from "../../Shared/Start";
import Close from "../../../components/images/cross.gif";
import { ToastContainer, toast } from "react-toastify";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import SwitchWithMultipleOption from "../../../web/switchWithMultipleOption";
import * as Buttons from "../../../web/Buttons";

export default class AddExpenseCategoryModel extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const { classDTO, handleClassDTO, open, isModelOpen, expenseCompnayNameList } =
      this.props;
      
    return (
      <Dialog open={open} maxWidth="md">
        <DialogTitle>
          {" "}
          <div className="dialogheaderstyle">
            <Typography variant="h5">Add Expense Category</Typography>
            <Buttons.CloseButton
              onClick={() => {
                isModelOpen(false);
              }}
            />
          </div>
        </DialogTitle>
        <DialogContent style={{ maxHeight: "600px" }}>
          <div className="container-fluid">
            <Card style={{ padding: "20px", width: "500px" }}>
              <div style={{ display: "flex", }}>
                <div style={{width:"-webkit-fill-available",justifyContent:"space-between"}}>
                  <SingleSelect
                    placeholder="Select Company"
                    label={
                      <span>
                        Select Company<span style={{ color: "red" }}>*</span>
                      </span>
                    }
                    keyOfData="title"
                    value={
                      (
                        (expenseCompnayNameList || []).find(
                          (element) =>
                            element.value === (classDTO.companyId || "")
                        ) || {}
                      ).title || ""
                    }
                    options={(expenseCompnayNameList || []).map(
                      (element) => element.title
                    )}
                    onChange={(event, value) => {
                      const selectedCompanyId =
                        (
                          expenseCompnayNameList.find(
                            (element) => element.title == value
                          ) || {}
                        ).value || "";
                      handleClassDTO("companyId", selectedCompanyId);
                    }}
                  />
                  {classDTO.compayNameError && (
                    <label className="error">{classDTO.compayNameError}</label>
                  )}
                </div>

                <div style={{width:"-webkit-fill-available",marginLeft:"20px"}}>
                  <TextFieldOutlined
                    name="expenseName"
                    id="expenseName"
                    label={"Expense Name"}
                    placeholder="Enter Expense Name"
                    variant={"outlined"}
                    handleChange={(event) => {
                      handleClassDTO("categoryName", event.target.value);
                    }}
                    value={classDTO.categoryName}
                  />
                  {classDTO.categoryNameError && (
                    <label className="error" style={{ height: "auto" }}>
                      {classDTO.categoryNameError}
                    </label>
                  )}
                </div>
              </div>

              <div style={{ marginBottom: "20px",marginTop:"5px" }}>
                <label style={{color:"black",fontSize:"14px"}}>Expense Description</label>
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
              </div>
            </Card>
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
            onClick={() => this.props.handleChangeSave("all","ExpenseCategory")}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
