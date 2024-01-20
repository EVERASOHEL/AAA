import React, { useEffect, useState } from "react";
import "./styles.scss";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import CloseButton from "@mui/icons-material/Close";
import CalenderWeb from "../../../web/CalendarWeb";
import TextFieldOutlined from "../../../web/TextField/TextFieldOutlined";
import SingleSelect from "../../../web/AutocompleteTextField";
import "./styles.scss";
import AddIcon from "@mui/icons-material/Add";
import AddImage from "../../images/add.gif";
import Edit from "../../images/edit.gif";
import Delete from "../../images/delete.gif";
import Close from "../../images/cross.gif";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { GST_TYPE } from "../../../utilities/CommonConstants";
import * as Buttons from "../../../web/Buttons";

const useStyles = makeStyles((theme) => ({
  button: {
    position: "relative",
    overflow: "hidden",
    borderRadius: "8px",
    padding: "8px 16px",
    background: "linear-gradient(to right, #FF8A65, #FF7043)",
    color: "#FFF",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  buttonText: {
    fontWeight: "bold",
  },
  buttonAnimation: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "150%",
    height: "150%",
    background:
      "linear-gradient(to bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.4))",
    opacity: 0,
    borderRadius: "50%",
    animation: "$rippleEffect 1.5s linear infinite",
  },
  "@keyframes rippleEffect": {
    "0%": {
      transform: "scale(0.8)",
      opacity: 0.8,
    },
    "100%": {
      transform: "scale(2)",
      opacity: 0,
    },
  },

  // card
  card: {
    boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
    borderRadius: "4px",
    transition: "box-shadow 0.3s ease",
    "&:hover": {
      boxShadow: "0px 8px 10px rgba(0, 0, 0, 0.3)",
    },
  },
  content: {
    padding: "4px",
  },
}));

const index = (props) => {
  const [state, updateState] = useState({});

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

  const items = [];
  const newlist = (props.productList || []).map((x) =>
    items.push(x.productName)
  );

  const {
    isModelOpen,
    open,
    classDTO,
    handleclassDTO,
    productList,
    handleClassSalesDTO,
    salesClassDTO,
    salesClassListDTO,
    resetData,
    saveSalesOrderRequest,
    getCompnayNameList,
  } = props;

  const classes = useStyles();

  // var data = (GST_TYPE.find((element) => element.value == (classDTO.gstType ? classDTO.gstType.display : classDTO.gstType)) || {}).display || ""

  return (
    <Dialog open={open} maxWidth="md">
      <DialogTitle>
        {" "}
        <div className="dialogheaderstyle">
          <Typography variant="h5">Sales Order</Typography>
          <Buttons.CloseButton
            onClick={() => {
              isModelOpen(false);
            }}
          />
        </div>
      </DialogTitle>
      <DialogContent style={{ maxHeight: "600px" }}>
        <div className="container-fluid">
          <Grid container spacing={2} style={{ alignItems: "center" }}>
            <Grid item xs={4} style={{ marginTop: "10px" }}>
            <div
                className="TextFieldcontainer col-md-6"
                style={{ width: "100%", height: "90px" }}
              >
                <CalenderWeb
                  handleChange={(value) => {
                    handleclassDTO("orderDate", value);
                  }}
                  value={classDTO.orderDate}
                />
                <label className="error">{classDTO.dateError}</label>
              </div>
            </Grid>
            <Grid item xs={2} style={{ marginTop: "10px" }}>
              <div
                className="TextFieldcontainer col-md-6"
                style={{ width: "100%" }}
              >
                <TextFieldOutlined
                  name={"voucherNo"}
                  label={
                    <span>
                      Vocher No<span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  variant={"outlined"}
                  handleChange={(event, value) => {
                    handleclassDTO("voucherNo", event.target.value);
                  }}
                  value={classDTO.voucherNo}
                />
                <label className="error">{classDTO.vNoError}</label>
              </div>
            </Grid>
            <Grid item xs={6} style={{ marginTop: "10px" }}>
              <div
                className="col-md-6 TextFieldcontainer"
                style={{ width: "100%" }}
              >
                {/* (
                          GST_TYPE.find(
                            (element) => element.value == classDTO.gstType
                          ) || {}
                        ).display || "" */}
                <SingleSelect
                  placeholder={"Select Company Name"}
                  // disableClearable={true}
                  keyOfData={"title"}
                  value={classDTO.companyName}
                  label={
                    <span>
                      Select Company Name<span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  // options={
                  //   (
                  //     getCompnayNameList.find(
                  //       (element) => element.value == classDTO.companyName
                  //     ) || {}
                  //   ).title || ""
                  // }
                  options={(getCompnayNameList || []).map(
                    (element) => element.title
                  )}
                  onChange={(event, value) => {
                    handleclassDTO("companyName", value);
                  }}
                />
                <label className="error">{classDTO.companyNameError}</label>
              </div>
            </Grid>
            <Grid item xs={5}>
              <div
                className="col-md-6 TextFieldcontainer"
                style={{ width: "100%",marginTop: "10px" }}
              >
                <SingleSelect
                  placeholder={"Select Item"}
                  label={
                    <span>
                      Select Item<span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  // disableClearable={true}
                  keyOfData={"title"}
                  value={
                    items.find(
                      (element) => element == (salesClassDTO.productName || "")
                    ) || ""
                  }
                  // value={(items.find((element) => element.value == (classDTO.productName && classDTO.productName.title)) || {}).title || ""}
                  options={items}
                  onChange={(event, value) => {
                    handleClassSalesDTO("productName", value);
                  }}
                />
                <label className="error">
                  {salesClassDTO.productNameError}
                </label>
              </div>
            </Grid>
            <Grid item xs={1}>
              {salesClassDTO.productType ? (
                <label htmlFor="" className="productTypelabel">
                  {salesClassDTO.productType}
                </label>
              ) : null}
            </Grid>
            <Grid item xs={1}>
              <div
                className="TextFieldcontainer col-md-6 mt-3"
                style={{ width: "100%" }}
              >
                <TextFieldOutlined
                  name={"Item"}
                  // label={
                  //   <span>
                  //     Qty<span style={{ color: "red" }}>*</span>
                  //   </span>
                  // }
                  placeholder={"Qty."}
                  variant={"outlined"}
                  handleBlur={() => {
                    handleClassSalesDTO("priceAndQun", null);
                  }}
                  handleChange={(event, value) => {
                    handleClassSalesDTO("quantity", event.target.value);
                  }}
                  value={salesClassDTO.quantity}
                />
                <label className="error">{salesClassDTO.quantityError}</label>
              </div>
            </Grid>
            <Grid item xs={2}>
              <div
                className="TextFieldcontainer col-md-6 mt-3"
                style={{ width: "100%" }}
              >
                <TextFieldOutlined
                  name={"Item"}
                  // label={
                  //   <span>
                  //     Price<span style={{ color: "red" }}>*</span>
                  //   </span>
                  // }
                  placeholder={"Enter price"}
                  variant={"outlined"}
                  handleBlur={() => {
                    handleClassSalesDTO("priceAndQun", null);
                  }}
                  handleChange={(event, value) => {
                    handleClassSalesDTO("price", event.target.value);
                  }}
                  value={salesClassDTO.price}
                />
                <label className="error">{salesClassDTO.PriceError}</label>
              </div>
            </Grid>
            <Grid item xs={2}>
              <div
                className="TextFieldcontainer col-md-6 mt-3"
                style={{ width: "100%" }}
              >
                <TextFieldOutlined
                  name={"total"}
                  placeholder={"total"}
                  variant={"outlined"}
                  istrue={true}
                  // handleChange={(event, value) => {
                  //   handleClassSalesDTO("total", event.target.value);
                  // }}
                  value={salesClassDTO.total}
                />
                <label className="error">
                  {/* {this.state.productList.isProductNameError} */}
                </label>
              </div>
            </Grid>
            <Grid item xs={1}>
              <Tooltip title="Add Sales Product Details">
                <img
                  onClick={() => {
                    props.handleSalesClassListDTO();
                  }}
                  src={salesClassDTO.No ? Edit : AddImage}
                  style={{ width: "40px", cursor: "pointer" }}
                  alt="No"
                  srcset=""
                />
              </Tooltip>
            </Grid>
            <hr />
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: 700 }}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">No</TableCell>
                      <TableCell align="left">Product Name</TableCell>
                      <TableCell align="left">Product Type</TableCell>
                      <TableCell align="left">quantity</TableCell>
                      <TableCell align="left">Price</TableCell>
                      <TableCell align="left">Total</TableCell>
                      <TableCell align="left">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {salesClassListDTO
                      ? (salesClassListDTO || []).map((row, i) => (
                          <TableRow>
                            <TableCell component="th" scope="row" align="left">
                              {i + 1}
                            </TableCell>
                            <TableCell scope="row" align="left">
                              {row.productName}
                            </TableCell>
                            <TableCell scope="row" align="left">
                              {row.productType}
                            </TableCell>
                            <TableCell scope="row" align="left">
                              {row.quantity}
                            </TableCell>
                            <TableCell scope="row" align="left">
                              {row.price}
                            </TableCell>
                            <TableCell scope="row" align="left">
                              {row.total}
                            </TableCell>
                            <TableCell scope="row" align="left">
                              <Tooltip title="Edit Product Details">
                                <img
                                  src={Edit}
                                  alt=""
                                  style={{ width: "25px", cursor: "pointer" }}
                                  srcset=""
                                  onClick={() => {
                                    var Row = {
                                      No: i,
                                      productName: row.productName,
                                      productType: row.productType,
                                      quantity: row.quantity,
                                      price: row.price,
                                      total: row.total,
                                    };
                                    props.editSalesClassDTOforInputValue(Row);
                                  }}
                                />
                              </Tooltip>
                              <Tooltip title="Delete Prod uct Details">
                                <img
                                  src={Delete}
                                  alt=""
                                  style={{ width: "25px", cursor: "pointer" }}
                                  srcset=""
                                  onClick={() => {
                                    props.deleteSalesClassDTO(i);
                                  }}
                                />
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        ))
                      : null}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </div>
        <div className="container-fluid" style={{ marginTop: "10px" }}>
          <Card className={classes.card}>
            <CardContent className={classes.content}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary">
                    Sub total
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <div
                    className="col-md-6 TextFieldcontainer"
                    style={{ width: "100%" }}
                  >
                    <SingleSelect
                      label={
                        <span>
                          GST Type<span style={{ color: "red" }}>*</span>
                        </span>
                      }
                      // disableClearable={true}
                      keyOfData={"display"}
                      value={
                        GST_TYPE.find(
                          (element) =>
                            element.display == (classDTO.gstType || "")
                        )
                        // ((GST_TYPE.find((element)=>element.value==(classDTO.gstType || "")) || {}).display || "")
                      }
                      options={GST_TYPE}
                      onChange={(event, value) => {
                        handleclassDTO("gstType", (value && value.value) || "");
                      }}
                    />
                    <label className="error">{classDTO.gstTypeError}</label>
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary">
                    total
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2} style={{ marginTop: "5px" }}>
                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary">
                    {classDTO.totalAmount}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary">
                    {classDTO.totalTaxAmount}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary">
                    {classDTO.totalTaxableAmount}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="contained" onClick={resetData}>
          Reset
        </Button>
        <Button
          variant="contained"
          className={classes.button}
          onClick={saveSalesOrderRequest}
        >
          <span className={classes.buttonText}>save</span>
          <span className={classes.buttonAnimation} />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default index;
