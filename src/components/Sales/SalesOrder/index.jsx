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
  CardHeader,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import CalendarWeb from "../../../web/CalendarWeb";
import TextFieldOutlined from "../../../web/TextField/TextFieldOutlined";
import SingleSelect from "../../../web/AutocompleteTextField";
import "./styles.scss";
import AddIcon from "@mui/icons-material/Add";
import AddImage from "../../images/purchasesalesactionimages/plus_148764.png";
import Edit from "../../images/purchasesalesactionimages/pencil_1300613.png";
import Delete from "../../images/purchasesalesactionimages/delete_6861358.png";
import line from "../../images/purchasesalesactionimages/horizontal_line.png";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { GST_TYPE } from "../../../utilities/CommonConstants";
import * as Buttons from "../../../web/Buttons";
import SwitchWithMultipleOption from "../../../web/switchWithMultipleOption";
import ProgressBar from "@ramonak/react-progress-bar";
import "../../../App.css";
import isNullOrIsEmptyOrIsUndefined from "../../../utilities/CommonValidator";
import Chip from "@mui/material/Chip";
import * as commonFunction from "../../../utilities/CommonValidator";


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
    // "&:hover": {
    //   boxShadow: "0px 8px 10px rgba(0, 0, 0, 0.3)",
    // },
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

  const [salesClassDTO, setSalesClassDTO] = useState({});

  const {
    isModelOpen,
    open,
    classDTO,
    handleclassDTO,
    productList,
    handleClassSalesDTO,
    // salesClassDTO,
    salesClassListDTO,
    resetData,
    saveSalesOrderRequest,
    getCompnayNameList,
  } = props;

  const classes = useStyles();

  const salesValidation = (key, salesClassDTO) => {
    salesClassDTO.isValidationSuccess = true;
    if (key == "all" || key == "quantity") {
      if (isNullOrIsEmptyOrIsUndefined(salesClassDTO.quantity)) {
        salesClassDTO.quantityError = "Please Enter Qty.";
        salesClassDTO.isValidationSuccess = false;
      } else {
        salesClassDTO.quantityError = "";
      }
      if (!commonFunction.isNotEmptyAndValidNumber(salesClassDTO.quantity)) {
        salesClassDTO.quantityError = "Please Enter valid number.";
        salesClassDTO.isValidationSuccess = false;
      } else {
        const object = props.productList.filter(
          (x) => x.productName == salesClassDTO.productName
        );
        const totalStock = object.map((x) => x.totalStock);
        if (totalStock[0] < salesClassDTO.quantity) {
          // toast.error("Please Enter less Qty because your Stock is not match.");
          salesClassDTO.total = "";
          salesClassDTO.isValidationSuccess = false;
        } else {
          salesClassDTO.quantityError = "";
        }
      }
    }
    if (key == "all" || key == "price") {
      if (isNullOrIsEmptyOrIsUndefined(salesClassDTO.price)) {
        salesClassDTO.PriceError = "Please Enter price.";
        salesClassDTO.isValidationSuccess = false;
      } else if (
        !commonFunction.isNotEmptyAndValidNumber(salesClassDTO.price)
      ) {
        salesClassDTO.PriceError = "Please Enter valid number.";
        salesClassDTO.isValidationSuccess = false;
      } else {
        salesClassDTO.PriceError = "";
      }
    }
    return salesClassDTO;
  };

  const handleClassSalesListDTO = (key, value) => {
    let updatedSalesClassDTO = { ...salesClassDTO };

    switch (key) {
      case "productName": {
        const object = productList.filter((x) => x.productName === value);
        const price = object.map((x) => x.sellingPrice);
        const totalStock = object.map((x) => x.totalStock);

        updatedSalesClassDTO[key] = value;
        if (isNullOrIsEmptyOrIsUndefined(value)) {
          updatedSalesClassDTO = {};
        } else {
          if (totalStock[0] > 0) {
            updatedSalesClassDTO["totalStock"] = totalStock[0];
            updatedSalesClassDTO["quantity"] = "";
            updatedSalesClassDTO["price"] = parseFloat(price);
            updatedSalesClassDTO["productType"] = object[0].productType;
            updatedSalesClassDTO["hsnCode"] = object[0].productHsn;
            updatedSalesClassDTO.productNameError = "";
            updatedSalesClassDTO.isValidationSuccess = true;
          } else {
            updatedSalesClassDTO.productNameError =
              value + " Stock is 0, please add new stock.";
            updatedSalesClassDTO.isValidationSuccess = false;
            updatedSalesClassDTO["totalStock"] = null;
          }
        }
        break;
      }

      case "priceAndQun": {
        if (
          !isNullOrIsEmptyOrIsUndefined(updatedSalesClassDTO.quantity) &&
          !isNullOrIsEmptyOrIsUndefined(updatedSalesClassDTO.price) &&
          updatedSalesClassDTO.isValidationSuccess === true
        ) {
          const total =
            parseFloat(updatedSalesClassDTO.quantity) *
            parseFloat(updatedSalesClassDTO.price);
          updatedSalesClassDTO["total"] = total;
        }
        if (
          isNullOrIsEmptyOrIsUndefined(updatedSalesClassDTO.quantity) ||
          isNullOrIsEmptyOrIsUndefined(updatedSalesClassDTO.price)
        ) {
          updatedSalesClassDTO["total"] = "";
        }
        break;
      }

      default:
        updatedSalesClassDTO[key] = value;
    }

    updatedSalesClassDTO = salesValidation(key, updatedSalesClassDTO);
    setSalesClassDTO(updatedSalesClassDTO);
  };

  const handleProductRowData = () => {
    if (salesClassDTO.isValidationSuccess === true) {
      const newSalesDTO = {
        productName: salesClassDTO.productName,
        productType: salesClassDTO.productType,
        quantity: salesClassDTO.quantity,
        hsnCode: salesClassDTO.hsnCode,
        price: salesClassDTO.price,
        total: salesClassDTO.total,
      };
  
      // let updatedSalesClassListDTO = [...salesClassListDTO]; // Copy the existing salesClassListDTO
  
      if (isNullOrIsEmptyOrIsUndefined(salesClassDTO.No)) {
        // For a new entry, add it to the array
        props.updateSalesClassListDTO(newSalesDTO, "new");
      } else {
        // For updating an existing entry, update the relevant index immutably
        let updatedSalesClassListDTO = [...salesClassListDTO]; // Copy the existing salesClassListDTO
        updatedSalesClassListDTO = updatedSalesClassListDTO.map((item, index) => 
          index === salesClassDTO.No ? newSalesDTO : item
        );
        props.updateSalesClassListDTO(updatedSalesClassListDTO, "update");
      }
  
      setSalesClassDTO(""); // Reset the salesClassDTO state
    } else {
      toast.error("Please Insert Correct Value!");
    }
  };

  console.log('getCompnayNameList :>> ', getCompnayNameList);
  
  return (
    <Dialog open={open} maxWidth="md">
      <DialogTitle>
        {" "}
        <div className="dialogheaderstyle">
          <div className="container-fluid">
            <Grid container spacing={2} style={{ alignItems: "center" }}>
              <Grid item xs={3}>
                <Typography variant="h5" className="model-header-font">
                  Sales Order
                </Typography>
              </Grid>
              {/* <Grid item xs={4}>
                <SwitchWithMultipleOption
                  component="PurchaseGST"
                  options={[
                    {
                      displayKey: "Purchase 100% GST",
                      value: "Purchase 100% GST",
                    },
                    { displayKey: "Not Dermine GST", value: "Not Dermine GST" },
                  ]}
                  displayKey={"displayKey"}
                  value={[
                    {
                      displayKey: "Purchase 100% GST",
                      value: "Purchase 100% GST",
                    },
                    { displayKey: "Not Dermine GST", value: "Not Dermine GST" },
                  ].find((element) => element.value === classDTO.PurchaseGST)}
                  onChange={(value) => {
                    handleclassDTO("PurchaseGST", value.value);
                  }}
                />
              </Grid> */}
            </Grid>
          </div>
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
            <Grid item xs={3}>
              <div
                className="TextFieldcontainer col-md-6"
                style={{ width: "100%", height: "90px" }}
              >
                <CalendarWeb
                  id=""
                  // label={"Order Date"}
                  handleChange={(event, value) => {
                    handleclassDTO("orderDate", event);
                  }}
                  value={classDTO.orderDate}
                />

                <label className="error">{classDTO.dateError}</label>
              </div>
            </Grid>
            <Grid item xs={2}>
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
            <Grid item xs={4}>
              <div
                className="col-md-6 TextFieldcontainer"
                style={{ width: "100%" }}
              >
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
            <Grid item xs={3}>
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
                  disableClearable={true}
                  keyOfData={"display"}
                  value={GST_TYPE.find(
                    (element) => element.display == (classDTO.gstType || "")
                  )}
                  options={GST_TYPE}
                  onChange={(event, value) => {
                    handleclassDTO("gstType", (value && value.value) || "");
                  }}
                />
                <label className="error">{classDTO.gstTypeError}</label>
              </div>
            </Grid>
          </Grid>

          {/* {classDTO.PurchaseGST === "Not Dermine GST" ? (
            <div class="card-container">
              <div class="card">
                <div class="card-title">GST Percentage</div>
                <div class="card-content">
                  <Grid container spacing={2} style={{ alignItems: "center" }}>
                    <Grid item xs={3}>
                      <div
                        className="TextFieldcontainer col-md-6"
                        style={{ width: "100%" }}
                      >
                        <TextFieldOutlined
                          handleBlur={(e) => {
                            handleclassDTO("calculatePercentageAmount", null);
                          }}
                          name={"Total Bill Amount"}
                          label={
                            <span>
                              Total Bill Amount
                              <span style={{ color: "red" }}>*</span>
                            </span>
                          }
                          variant={"outlined"}
                          handleChange={(event, value) => {
                            handleclassDTO(
                              "totalPurchaseBillAmount",
                              event.target.value
                            );
                          }}
                          value={classDTO.totalPurchaseBillAmount}
                        />
                        <label className="error">
                          {classDTO.totalPurchaseBillAmountError}
                        </label>
                      </div>
                    </Grid>
                    <Grid item xs={3}>
                      <div
                        className="TextFieldcontainer col-md-6"
                        style={{ width: "100%" }}
                      >
                        <TextFieldOutlined
                          handleBlur={(e) => {
                            handleclassDTO("calculatePercentageAmount", null);
                          }}
                          name={"Gst Bill Amount"}
                          label={
                            <span>
                              Gst Bill Amount
                              <span style={{ color: "red" }}>*</span>
                            </span>
                          }
                          variant={"outlined"}
                          handleChange={(event, value) => {
                            handleclassDTO("gstBillAmount", event.target.value);
                          }}
                          value={classDTO.gstBillAmount}
                        />

                        <label className="error">
                          {classDTO.gstBillAmountError}
                        </label>
                      </div>
                    </Grid>
                    <Grid item xs={3} style={{ display: "grid" }}>
                      <span>GST Bill Make</span>
                      <span>
                        Amount : {classDTO.gstBillAmountlabel || "0.00"}
                      </span>
                      <ProgressBar
                        completed={classDTO.gstBillAmountPercentage || 0}
                        bgColor="green"
                        animateOnRender={true}
                      />
                      <label htmlFor=""></label>
                    </Grid>
                    <Grid item xs={3} style={{ display: "grid" }}>
                      <span>Non-GST Bill Make</span>
                      <span>
                        Amount : {classDTO.withoutGSTBillAmountlabel || "0.00"}
                      </span>
                      <ProgressBar
                        completed={
                          classDTO.withoutGSTBillAmountlabelPercentage || 0
                        }
                        bgColor="red"
                        animateOnRender={true}
                      />
                      <label htmlFor=""></label>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </div>
          ) : null} */}

          {/* end */}

          <Grid
            container
            spacing={2}
            style={{ alignItems: "center", marginTop: "7px" }}
          >
            <Grid item xs={5}>
              <div
                className="col-md-6 TextFieldcontainer"
                style={{ width: "100%", marginTop: "10px" }}
              >
                <SingleSelect
                  placeholder={"Select Item"}
                  label={
                    <span>
                      Select Item<span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  keyOfData={"title"}
                  value={
                    items.find(
                      (element) => element == (salesClassDTO.productName || "")
                    ) || ""
                  }
                  options={items}
                  onChange={(event, value) => {
                    // Handle product name change
                    handleClassSalesListDTO("productName", value);
                  }}
                />
                <label className="error">
                  {salesClassDTO.productNameError}
                </label>
                {salesClassDTO.productName &&
                !isNullOrIsEmptyOrIsUndefined(salesClassDTO.totalStock) &&
                salesClassDTO.totalStock > 0 ? (
                  <label className="success-label">
                    Inventory Total: {salesClassDTO.totalStock}
                  </label>
                ) : null}
              </div>
            </Grid>

            <Grid
              item
              xs={1}
              className="productTylelabelgrid"
              style={{ padding: "0px", paddingLeft: "16px" }}
            >
              {salesClassDTO.productType ? (
                <Chip
                  label={salesClassDTO.productType}
                  size="small"
                  style={{
                    backgroundColor: "darkgray",
                    color: "aliceblue",
                    height: "auto",
                  }}
                />
              ) : null}
            </Grid>

            <Grid item xs={1}>
              <div
                className="TextFieldcontainer col-md-6"
                style={{ width: "100%", marginTop: "10px" }}
              >
                <TextFieldOutlined
                  name={"Item"}
                  placeholder={"Qty."}
                  variant={"outlined"}
                  handleBlur={() => {
                    // Handle blur event for calculating total after entering quantity
                    handleClassSalesListDTO("priceAndQun", null);
                  }}
                  handleChange={(event) => {
                    // Handle quantity change
                    handleClassSalesListDTO("quantity", event.target.value);
                  }}
                  value={salesClassDTO.quantity}
                />
                <label className="error">{salesClassDTO.quantityError}</label>
              </div>
            </Grid>

            <Grid item xs={2}>
              <div
                className="TextFieldcontainer col-md-6"
                style={{ width: "100%", marginTop: "10px" }}
              >
                <TextFieldOutlined
                  name={"Item"}
                  placeholder={"Enter price"}
                  variant={"outlined"}
                  handleBlur={() => {
                    // Handle blur event for calculating total after entering price
                    handleClassSalesListDTO("priceAndQun", null);
                  }}
                  handleChange={(event) => {
                    // Handle price change
                    handleClassSalesListDTO("price", event.target.value);
                  }}
                  value={salesClassDTO.price}
                />
                <label className="error">{salesClassDTO.PriceError}</label>
              </div>
            </Grid>

            <Grid item xs={2}>
              <div
                className="TextFieldcontainer col-md-6"
                style={{ width: "100%", marginTop: "10px" }}
              >
                <TextFieldOutlined
                  name={"total"}
                  placeholder={"total"}
                  variant={"outlined"}
                  value={salesClassDTO.total}
                  readOnly
                />
                <label className="error"></label>
              </div>
            </Grid>

            <Grid item xs={1}>
              <Tooltip title="Add Purchase Product Details">
                <img
                  onClick={() => {
                    handleProductRowData();
                  }}
                  src={salesClassDTO.No ? Edit : AddImage}
                  style={{
                    width: "30px",
                    cursor: "pointer",
                    marginBottom: "10px",
                  }}
                  alt="No"
                  srcset=""
                />
              </Tooltip>
            </Grid>
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
                                    hsnCode: row.hsnCode,
                                    productType: row.productType,
                                    quantity: row.quantity,
                                    price: row.price,
                                    total: row.total,
                                  };
                                  // props.editSalesClassDTOforInputValue(Row);
                                  setSalesClassDTO(Row);
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
        </div>
        <div className="container-fluid" style={{ marginTop: "10px" }}>
          <Card
            className={classes.card}
            style={{ width: "50%", marginLeft: "50%", textAlign: "center" }}
          >
            <span className="cursive-text">Amount Summary</span>
            <img src={line} alt="" style={{ width: "100%", height: "30px" }} />
            <CardContent className={classes.content}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary">
                    Sub total
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary">
                    {classDTO.gstType}
                  </Typography>
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
