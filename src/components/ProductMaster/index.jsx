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
import DeleteIcon from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import TextFieldOutlined from "../../web/TextField/TextFieldOutlined";
import isNullOrIsEmptyOrIsUndefined from "../../utilities/CommonValidator";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import SingleSelect from "../../web/AutocompleteTextField";

export default class AddproductModel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      productList: [],
      flag: 0,
      editProductFlag: -1,
      open: true,
    };
  }

  resetProductList = () => {
    this.setState({
      productList: {
        pname: "",
        pprice: "",
        hsccode: "",
      },
    });
  };

  isNullOrIsEmptyOrIsUndefined = (value) => {
    if (null === value || undefined === value || "" === value) {
      return true;
    } else {
      return false;
    }
  };

  validateAddProduct = (key, value, index) => {
    var obj = value;
    obj.isValidatorAddProduct = true;
    if (key === "pname" || key === "all") {
      if (this.isNullOrIsEmptyOrIsUndefined(obj.pname)) {
        obj.isValidatorAddProduct = false;
        obj.isProductNameError = "Please Enter Product Name";
      } else {
        obj.isProductNameError = "";
      }
    }
    if (key === "sellingprice" || key === "all") {
      if (this.isNullOrIsEmptyOrIsUndefined(obj.sellingprice)) {
        obj.isValidatorAddProduct = false;
        obj.isSellingPriceError = "Please Enter Selling Price";
      } else {
        obj.isSellingPriceError = "";
      }
    }
    if (key === "costprice" || key === "all") {
      if (this.isNullOrIsEmptyOrIsUndefined(obj.costprice)) {
        obj.isValidatorAddProduct = false;
        obj.isCostPriceError = "Please Enter Cost Price";
      } else {
        obj.isCostPriceError = "";
      }
    }
    if (key === "hsccode" || key === "all") {
      if (this.isNullOrIsEmptyOrIsUndefined(obj.hsccode)) {
        obj.isValidatorAddProduct = false;
        obj.isHscCodeError = "Please Enter HscCode";
      } else {
        obj.isHscCodeError = "";
      }
    }
    if (key === "gstpercentage" || key === "all") {
      if (this.isNullOrIsEmptyOrIsUndefined(obj.gstpercentage)) {
        obj.isValidatorAddProduct = false;
        obj.gstpercentageError = "Please select gst type";
      } else {
        obj.gstpercentageError = "";
      }
    } 
    if (key === "productType" || key === "all") {
      if (this.isNullOrIsEmptyOrIsUndefined(obj.productType)) {
        obj.isValidatorAddProduct = false;
        obj.productTypeError = "Please select product type";
      } else {
        obj.productTypeError = "";
      }
    }
    if (
      key === "all" &&
      !isNullOrIsEmptyOrIsUndefined(obj) &&
      obj.isValidatorAddProduct === true
    ) {
      var row_data = [];
      row_data.push(obj);
      this.state.dataList.push(obj);
      this.setState({ flag: 1 });
      obj.setNullProduct = true;
    }
    if (key === "deleteProduct") {
      var list = this.state.dataList;
      list.splice(index, 1);
      this.setState({ dataList: list });
      obj.setNullProduct = true;
    }
    if (key === "updateProduct") {
      obj.setNullProduct = true;
    }
    if (key === "resetdata") {
      if (index !== -1) {
        obj = value;
        var Row = this.state.dataList;
        obj = Row[index];
        obj.setNullProduct = false;
      } else {
        obj.setNullProduct = true;
      }
    }
    return obj;
  };

  handleChangeProduct = (key, value, index) => {
    var obj = { ...this.state.productList };

    switch (key) {
      case "updateSetValue": {
        obj = value;
        this.setState({ editProductFlag: index });
        break;
      }
      case "updateProduct": {
        obj = value;
        var Row = this.state.dataList;
        Row[index] = obj;
        this.setState({ dataList: Row, editProductFlag: -1 });
      }

      default:
        obj[key] = value;
        break;
    }
    var obj = this.validateAddProduct(key, obj, index);
    obj.setNullProduct === true
      ? this.resetProductList()
      : this.setState({ productList: obj });
  };

  saveProduct = () => {
    this.setState({ productList: {} });
  };

  finalsubmit = () => {
    if (this.state.dataList.length < 0) {
      toast.error("Please atleast one record insert");
    } else {
      this.props.ProductclassDTO(this.state.dataList);
    }
  };

  render() {
    const { openModel, handleClose, open } = this.props;
    const style = {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      p: 4,
    };

    return (
      <div>
        <Box display="flex" justifyContent="center">
          <Modal
            style={{ textAlign: "-webkit-center", marginTop: "100px" }}
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Card sx={{ maxWidth: 720 }}>
              <CardContent>
                <div className="modalPaper">
                  <div className="row">
                    <Grid container spacing={2}>
                      <Grid
                        item
                        xs={11}
                        className="productname"
                        style={{ textAlign: "initial" }}
                      >
                        <h3 className="compnayname">Add Product</h3>
                      </Grid>
                      <Grid item xs={1}>
                        <div
                          className="col-md-2 closebuttton"
                          // style={{ textAlign: "end" }}
                          onClick={() => {
                            this.props.isModelOpen(false);
                          }}
                        >
                          <CloseButton style={{ cursor: "pointer" }} />
                        </div>
                      </Grid>
                    </Grid>
                    <div className="container-fluid">
                      <Grid container spacing={2}>
                        <Grid item xs={4}>
                          <div
                            className="TextFieldcontainer col-md-6 mt-3"
                            style={{ width: "100%" }}
                          >
                            <TextFieldOutlined
                              name={"productName"}
                              id={"productName"}
                              label={"Product Name"}
                              variant={"outlined"}
                              handleChange={(event, value) => {
                                this.handleChangeProduct(
                                  "pname",
                                  event.target.value,
                                  null
                                );
                              }}
                              value={this.state.productList.pname}
                            />
                            <label className="error">
                              {this.state.productList.isProductNameError}
                            </label>
                          </div>
                        </Grid>
                        <Grid item xs={4}>
                          <div
                            className="col-md-6 mt-3 TextFieldcontainer"
                            style={{ width: "100%" }}
                          >
                            <TextFieldOutlined
                              name="sellingPrice"
                              label="Selling Price"
                              variant="outlined"
                              maxLength={30}
                              handleChange={(event, value) => {
                                this.handleChangeProduct(
                                  "sellingprice",
                                  event.target.value,
                                  null
                                );
                              }}
                              value={this.state.productList.sellingprice}
                            />
                            <label className="error">
                              {this.state.productList.isSellingPriceError}
                            </label>
                          </div>
                        </Grid>
                        <Grid item xs={4}>
                          <div
                            className="col-md-6 mt-3 TextFieldcontainer"
                            style={{ width: "100%" }}
                          >
                            <TextFieldOutlined
                              name="costPrice"
                              label="Cost Price"
                              variant="outlined"
                              maxLength={30}
                              handleChange={(event, value) => {
                                this.handleChangeProduct(
                                  "costprice",
                                  event.target.value,
                                  null
                                );
                              }}
                              value={this.state.productList.costprice}
                            />
                            <label className="error">
                              {this.state.productList.isCostPriceError}
                            </label>
                          </div>
                        </Grid>
                        <Grid item xs={4}>
                          <div
                            className="col-md-6 TextFieldcontainer"
                            style={{ width: "100%" }}
                          >
                            <TextFieldOutlined
                              name="ProductHsn"
                              label="Product Hsn"
                              variant="outlined"
                              maxLength={30}
                              handleChange={(event, value) => {
                                this.handleChangeProduct(
                                  "hsccode",
                                  event.target.value,
                                  null
                                );
                              }}
                              value={this.state.productList.hsccode}
                            />
                            <label className="error">
                              {this.state.productList.isHscCodeError}
                            </label>
                          </div>
                        </Grid>
                        <Grid item xs={4}>
                          <div
                            className="col-md-6 TextFieldcontainer"
                            style={{ width: "100%" }}
                          >
                            <SingleSelect
                              name={""}
                              id={""}
                              placeholder={"Select Product Type "}
                              option={["18%","12%","5%","28%"]}
                              variant={"outlined"}
                              label={"GST%"}
                              onChange={(event, value) => {
                                this.handleChangeProduct("gstpercentage", value,null);
                              }}
                              value={this.state.productList.gstpercentage}
                            />
                            <label className="error">
                              {this.state.productList.gstpercentageError}
                            </label>
                          </div>
                        </Grid>
                        <Grid item xs={4}>
                          <div
                            className="col-md-6 TextFieldcontainer"
                            style={{ width: "100%" }}
                          >
                            <SingleSelect
                              name={""}
                              id={""}
                              // placeholder={"Select Product Type "}
                              option={["DOZEN","BOX","UNIT","GRAMS","METRES","PIECES"]}
                              variant={"outlined"}
                              label={"Unit"}
                              onChange={(event, value) => {
                                this.handleChangeProduct("productType", value,null);
                              }}
                              value={this.state.productList.productType}
                            />
                            <label className="error">
                              {this.state.productList.productTypeError}
                            </label>
                          </div>
                        </Grid>
                      </Grid>
                      <div className="col-md-12">
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                          marginTop={2}
                        >
                          <Box marginBottom={2} textAlign="center">
                            <Button
                              variant="contained"
                              style={{
                                backgroundColor: "#DC143C",
                                marginRight: "10px",
                              }}
                              size="small"
                              onClick={() =>
                                this.handleChangeProduct(
                                  "resetdata",
                                  this.state.productList,
                                  this.state.editProductFlag
                                )
                              }
                            >
                              Reset
                            </Button>

                            {this.state.editProductFlag === -1 ? (
                              <Button
                                variant="contained"
                                style={{ backgroundColor: "#9fa8da" }}
                                size="small"
                                onClick={() =>
                                  this.handleChangeProduct(
                                    "all",
                                    this.state.productList,
                                    this.state.editProductFlag
                                  )
                                }
                              >
                                Save
                              </Button>
                            ) : (
                              <Button
                                variant="contained"
                                style={{ backgroundColor: "#9fa8da" }}
                                size="small"
                                onClick={() =>
                                  this.handleChangeProduct(
                                    "updateProduct",
                                    this.state.productList,
                                    this.state.editProductFlag
                                  )
                                }
                              >
                                Update
                              </Button>
                            )}
                          </Box>
                        </Typography>
                      </div>
                      <hr />
                      <div className="col-md-12">
                        <TableContainer component={Paper}>
                          <Table
                            sx={{ minWidth: 650 }}
                            size="small"
                            aria-label="a dense table"
                          >
                            <TableHead>
                              <TableRow>
                                <TableCell align="left">No</TableCell>
                                <TableCell align="left">ProductName</TableCell>
                                <TableCell align="left">SellingPrice</TableCell>
                                <TableCell align="left">CostPrice</TableCell>
                                <TableCell align="left">Hsncode</TableCell>
                                <TableCell align="left">Gst Type</TableCell>
                                <TableCell align="left">Product Type</TableCell>
                                <TableCell align="left">Action</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {this.state.flag === 1
                                ? this.state.dataList.map((row, i) => (
                                    <TableRow>
                                      <TableCell
                                        component="th"
                                        scope="row"
                                        align="left"
                                      >
                                        {i + 1}
                                      </TableCell>
                                      <TableCell scope="row" align="left">
                                        {row.pname}
                                      </TableCell>
                                      <TableCell align="left">
                                        {row.sellingprice}
                                      </TableCell>
                                      <TableCell align="left">
                                        {row.costprice}
                                      </TableCell>
                                      <TableCell align="left">
                                        {row.hsccode}
                                      </TableCell>
                                      <TableCell align="left">
                                        {row.gstpercentage}
                                      </TableCell>
                                      <TableCell align="left">
                                        {row.productType}
                                      </TableCell>
                                      <TableCell align="left">
                                        <Edit
                                          className="actionbutton"
                                          onClick={() => {
                                            var Row = {
                                              pname: row.pname,
                                              sellingprice: row.sellingprice,
                                              costprice: row.costprice,
                                              hsccode: row.hsccode,
                                              gstpercentage: row.gstpercentage,
                                              productType: row.productType
                                            };
                                            this.handleChangeProduct(
                                              "updateSetValue",
                                              Row,
                                              i
                                            );
                                            // this.editProductValue(Row,i);
                                          }}
                                        />
                                        <DeleteIcon
                                          className="actionbutton"
                                          onClick={() => {
                                            this.handleChangeProduct(
                                              "deleteProduct",
                                              null,
                                              i
                                            );
                                          }}
                                        />
                                      </TableCell>
                                    </TableRow>
                                  ))
                                : null}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </div>
                      <Box marginTop={2} textAlign="right">
                        <Button
                          variant="contained"
                          style={{
                            backgroundColor: "#9fa8da",
                            marginLeft: "10px",
                          }}
                          size="small"
                          onClick={() => {
                            this.finalsubmit();
                          }}
                        >
                          Submit
                        </Button>
                      </Box>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Modal>
        </Box>
      </div>
    );
  }
}
