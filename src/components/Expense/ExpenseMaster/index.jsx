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
    const { classDTO, handleClassDTO, open, isModelOpen } = this.props;
    return (
      <Dialog open={open}>
        <DialogTitle>
          {" "}
          <div className="dialogheaderstyle">
            <Typography variant="h5">Add Company</Typography>
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
              <Grid item xs={4} style={{ marginTop: "10px" }}>
                <div
                  className="TextFieldcontainer col-md-6"
                  style={{ width: "100%" }}
                >
                  <TextFieldOutlined
                    name={"expenseName"}
                    label={
                      <span>
                        Expense Name<span style={{ color: "red" }}>*</span>
                      </span>
                    }
                    variant={"outlined"}
                    handleChange={(event, value) => {
                      handleClassDTO("expenseName", event.target.value);
                    }}
                    value={classDTO.expenseName}
                  />
                  <label className="error">{classDTO.expenseNameError}</label>
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
                  <label className="error">{classDTO.expenseAmountError}</label>
                </div>
              </Grid>
              <Grid item xs={4} style={{ marginTop: "10px" }}>
                <div
                  className="TextFieldcontainer col-md-6"
                  style={{ width: "100%", height: "90px" }}
                >
                  <CalenderWeb
                    handleChange={(value) => {
                      handleClassDTO("expenseDate", value);
                    }}
                    value={classDTO.expenseDate}
                  />
                  <label className="error">{classDTO.expenseDateError}</label>
                </div>
              </Grid>
              <Grid item xs={4} style={{ marginTop: "10px" }}>
                <div
                  className="TextFieldcontainer col-md-6"
                  style={{ width: "100%" }}
                >
                  <TextFieldOutlined
                    name={"paymentMethod"}
                    label={
                      <span>
                        Vocher No<span style={{ color: "red" }}>*</span>
                      </span>
                    }
                    variant={"outlined"}
                    handleChange={(event, value) => {
                      handleClassDTO("paymentMethod", event.target.value);
                    }}
                    value={classDTO.paymentMethod}
                  />
                  <label className="error">{classDTO.paymentMethodError}</label>
                </div>
              </Grid>
              <Grid item xs={4} style={{ marginTop: "10px" }}>
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
            onClick={() => this.props.handleChangeSave("all")}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      // <div>
      //   <Box display="flex" justifyContent="center">
      //     <Modal
      //       style={{textAlign: "-webkit-center"}}
      //       open={open}
      //       // onClose={handleClose}
      //       aria-labelledby="modal-modal-title"
      //       aria-describedby="modal-modal-description"
      //     >
      //       <Card sx={{ maxWidth: 500 }}>
      //         <CardContent>
      //           <div className="modalPaper">
      //             <div className="row" style={{ marginTop: "5px" }}>
      //               <Grid container spacing={2}>
      //                 <Grid
      //                   item
      //                   xs={10}
      //                   className="productname"
      //                   style={{ marginTop: "inherit", textAlign: "initial" }}
      //                 >
      //                   <h3 style={{ fontFamily: "Merriweather" }}>
      //                     Add Company
      //                   </h3>
      //                 </Grid>
      //                 <Grid
      //                   item
      //                   xs={2}
      //                   className="p-0"
      //                   style={{ padding: "0px" }}
      //                 >
      //                   <div
      //                     className="col-md-2 closebuttton"
      //                     style={{ textAlign: "end" }}
      //                   >
      //                     <CloseButton
      //                       className="closemodelhoverstyle"
      //                       onClick={() => {
      //                         isModelOpen(false);
      //                       }}
      //                     />
      //                   </div>
      //                 </Grid>
      //               </Grid>
      //               {/* <div className="container-fluid">
      //                 <div className="col-md-12">
      //                     <div className="col-md-6">
      //                       Company
      //                     </div>
      //                     <div className="col-md-6">

      //                     </div>
      //                     <div className="col-md-6">

      //                     </div>
      //                     <div className="col-md-6">

      //                     </div>
      //                 </div> */}
      //               <Grid container spacing={2} style={{ marginTop: "10px" }}>
      //                 <Grid item xs={4}>
      //                   <Typography variant="h5" className="label">
      //                     Company Name
      //                   </Typography>
      //                 </Grid>
      //                 <Grid item xs={8}>
      //                   <div className="TextFieldcontainer">
      //                     <TextFieldOutlined
      //                       name={"passengerFirstName"}
      //                       id={"passengerFirstName"}
      //                       placeholder={"Enter Company Name"}
      //                       variant={"outlined"}
      //                       handleChange={(event, value) => {
      //                         handleClassDTO("companyName", event.target.value);
      //                       }}
      //                       value={classDTO.companyName}
      //                     />
      //                     <label className="error" style={{height:"auto"}}>
      //                       {classDTO.companyNameError}
      //                     </label>
      //                   </div>
      //                 </Grid>
      //                 <Grid item xs={12}>
      //                   <div className="TextFieldcontainer">
      //                     <textarea
      //                       name="description"
      //                       placeholder="Address"
      //                       variant="outlined"
      //                       id="exampleFormControlTextarea1"
      //                       maxLength={1000}
      //                       rows="3"
      //                       style={{ height: "61px", width: "100%",padding:"10px" }}
      //                       onChange={(event) => {
      //                         handleClassDTO(
      //                           "address",
      //                           event.target.value
      //                         );
      //                       }}
      //                       value={classDTO.address || ""}
      //                     ></textarea>
      //                     <label className="error">
      //                       {classDTO.addressError}
      //                     </label>
      //                   </div>
      //                 </Grid>
      //                 <Grid item xs={4}>
      //                   <Typography variant="h5" className="label">
      //                     Phone No
      //                   </Typography>
      //                 </Grid>
      //                 <Grid item xs={8}>
      //                   <div className="TextFieldcontainer">
      //                     <TextFieldOutlined
      //                       name={"passengerFirstName"}
      //                       id={"passengerFirstName"}
      //                       placeholder={"Enter Phone Number"}
      //                       variant={"outlined"}
      //                       handleChange={(event, value) => {
      //                         handleClassDTO("phoneNo", event.target.value);
      //                       }}
      //                       value={classDTO.phoneNo}
      //                     />
      //                     <label className="error">
      //                       {classDTO.phoneNoError}
      //                     </label>
      //                   </div>
      //                 </Grid>
      //                 <Grid item xs={4}>
      //                   <Typography variant="h5" className="label">
      //                     State Name
      //                   </Typography>
      //                 </Grid>
      //                 <Grid item xs={8}>
      //                   <div className="TextFieldcontainer">
      //                     <SingleSelect
      //                       name={"passengerFirstName"}
      //                       id={"passengerFirstName"}
      //                       placeholder={"Enter State Name "}
      //                       option={stateNameList}
      //                       variant={"outlined"}
      //                       handleChange={(event, value) => {
      //                         handleClassDTO("stateName",value);
      //                       }}
      //                       value={classDTO.stateName}
      //                     />
      //                     <label className="error">
      //                       {classDTO.stateNameError}
      //                     </label>
      //                   </div>
      //                 </Grid>
      //               </Grid>
      //               <div className="col-md-12">
      //                 <Typography
      //                   sx={{ fontSize: 14 }}
      //                   color="text.secondary"
      //                   gutterBottom
      //                   marginTop={2}
      //                 >
      //                   <Box marginBottom={2} textAlign="center">
      //                     <Button
      //                       variant="contained"
      //                       style={{
      //                         backgroundColor: "#DC143C",
      //                         marginRight: "10px",
      //                       }}
      //                       size="small"
      //                       // onClick={() =>
      //                       //   this.handleChangeProduct(
      //                       //     "resetdata",
      //                       //     this.state.productList,
      //                       //     this.state.editProductFlag
      //                       //   )
      //                       // }
      //                     >
      //                       Reset
      //                     </Button>

      //                     <Button
      //                       variant="contained"
      //                       style={{ backgroundColor: "#9fa8da" }}
      //                       size="small"
      //                       // onClick={() =>
      //                       //   this.handleChangeProduct(
      //                       //     "all",
      //                       //     this.state.productList,
      //                       //     this.state.editProductFlag
      //                       //   )
      //                       // }
      //                     >
      //                       Save
      //                     </Button>
      //                   </Box>
      //                 </Typography>
      //               </div>
      //             </div>
      //           </div>
      //         </CardContent>
      //       </Card>
      //     </Modal>
      //   </Box>
      // </div>
    );
  }
}
