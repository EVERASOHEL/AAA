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
import TextFieldOutlined from "../../web/TextField/TextFieldOutlined";
import "react-toastify/dist/ReactToastify.css";
import SingleSelect from "../../web/AutocompleteTextField";
import { stateNameList } from "../../containers/CompanyMaster/constants";
import { ToastContainer, toast } from "react-toastify";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export default class AddCompanyModel extends React.Component {
  
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("hello");
  }

  render() {
    const { classDTO, handleClassDTO, open, isModelOpen } = this.props;
    return (
      <Dialog open={open}>
        <DialogTitle>
          {" "}
          <div className="dialogheaderstyle">
            <Typography variant="h5">Add Company</Typography>
            <CloseButton
              className="closemodelhoverstyle"
              onClick={() => {
                isModelOpen(false);
              }}
            />
          </div>
        </DialogTitle>
        <DialogContent>
          {/* <div style={{ display: "flex" }}> */}
          <table>
            <tr>
              <td>Company Name</td>
              <td>
                <TextFieldOutlined
                  name={"passengerFirstName"}
                  id={"passengerFirstName"}
                  placeholder={"Enter Company Name"}
                  variant={"outlined"}
                  handleChange={(event, value) => {
                    handleClassDTO("companyName", event.target.value);
                  }}
                  value={classDTO.companyName}
                />
                {classDTO.companyNameError ? (
                  <label className="error" style={{ height: "auto" }}>
                    {classDTO.companyNameError}
                  </label>
                ) : null}
              </td>
            </tr>
            <tr>
              <td colSpan={2} style={{ paddingTop: "15px" }}>
                <textarea
                  name="description"
                  placeholder="Address"
                  variant="outlined"
                  id="exampleFormControlTextarea1"
                  maxLength={1000}
                  rows="3"
                  style={{ height: "61px", width: "100%", padding: "10px" }}
                  onChange={(event) => {
                    handleClassDTO("address", event.target.value);
                  }}
                  value={classDTO.address || ""}
                ></textarea>
                <label className="error">{classDTO.addressError}</label>
              </td>
            </tr>
            <tr>
              <td style={{ paddingTop: "15px" }}>State Name</td>
              <td style={{ paddingTop: "15px" }}>
                <SingleSelect
                  name={""}
                  id={""}
                  placeholder={"Enter State Name "}
                  option={stateNameList || []}
                  variant={"outlined"}
                  label={"State"}
                  onChange={(event, value) => {
                    handleClassDTO("stateName", value);
                  }}
                  value={classDTO.stateName}
                />
                {classDTO.stateNameError ? (
                  <label className="error">{classDTO.stateNameError}</label>
                ) : null}
              </td>
            </tr>
            <tr>
              <td style={{ paddingTop: "15px" }}>Phone No</td>
              <td style={{ paddingTop: "15px" }}>
                <TextFieldOutlined
                  name={""}
                  id={""}
                  placeholder={"Enter Phone Number"}
                  variant={"outlined"}
                  handleChange={(event, value) => {
                    handleClassDTO("phoneNo", event.target.value);
                  }}
                  value={classDTO.phoneNo}
                />
                {classDTO.phoneNoError ? (
                  <label className="error">{classDTO.phoneNoError}</label>
                ) : null}
              </td>
            </tr>
          </table>
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
