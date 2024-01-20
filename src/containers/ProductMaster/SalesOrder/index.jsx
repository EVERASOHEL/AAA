import React, { Component, useEffect, useState } from "react";

import { compose } from "redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { injectReducer, injectSaga } from "redux-injectors";
import { withRouter } from "../../../utilities/withRouter";
import { withSuspense } from "../../../utilities/withSuspense";
import _ from "lodash";

import * as actions from "./actions";
import { pageName } from "./constants";
import reducer from "./reducer";
import saga from "./saga";
import * as selectors from "./selectors";

import HtmlComponent from "../../../components/Sales/SalesOrder";
import Tabelweb from "../../../components/GenericTable/evelpractice";
import { Add, Close, SearchOffSharp } from "@mui/icons-material";
import AutocompleteTextField from "../../../web/AutocompleteTextField";
import AssignmentIcon from "@mui/icons-material/Add";
// import { Delete, Edit } from "@mui/icons-material";
import * as commonFunction from "../../../utilities/CommonValidator";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import equal from "../../../components/images/equal1.png";
import Tooltip from "@mui/material/Tooltip";
import Delete from "../../../components/images/delete.gif";
import Edit from "../../../components/images/edit.gif";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { FaFilter } from "react-icons/fa";
import { makeStyles } from "@mui/styles";
import isNullOrIsEmptyOrIsUndefined from "../../../utilities/CommonValidator";
import { toast } from "react-toastify";
import { calculateGSTAmount } from "../../../utilities/CommonFunction";
import * as Buttons from "../../../web/Buttons";
import AlertModel from "../../../components/Models";

const useStyles = makeStyles((theme) => ({
  iconButton: {
    cursor: "pointer",
    "&:hover": {
      color: "red", // Change the color to your desired hover color
    },
  },
}));
const index = (props) => {
  const [confirmModelisOpen, setconfirmModelisOpen] = useState(false);
  useEffect(() => {
    // Anything in here is fired on component mount.
    props.apiforsalesorderlist({ page: 0, size: 20 });
    props.productListRequest();
    props.companyNameList();
    // props.updateClassDTO({"orderDate":new Date()});
    return () => {
      // Anything in here is fired on component unmount.
    };
  }, [confirmModelisOpen]);

  const classes = useStyles();
  const initialvalues = {
    open: false,
    displayfilter: "none",
    productListForEdit: [],
  };
  const [data, setData] = useState(initialvalues);

  const [editRowData, setEditRowData] = useState([]);

  function isModelOpen(isOpen) {
    props.modelOpenRequest(isOpen);
  }

  function handlechangelistPagination(payload) {
    props.apiforsalesorderlist(payload);
  }

  const salesValidation = (key, salesClassDTO) => {
    salesClassDTO.isValidationSuccess = true;
    if (key == "all" || key == "quantity") {
      if (isNullOrIsEmptyOrIsUndefined(salesClassDTO.quantity)) {
        salesClassDTO.quantityError = "Please Enter Qty.";
        salesClassDTO.isValidationSuccess = false;
      } else if (
        !commonFunction.isNotEmptyAndValidNumber(salesClassDTO.quantity)
      ) {
        salesClassDTO.quantityError = "Please Enter valid number.";
        salesClassDTO.isValidationSuccess = false;
      } else {
        salesClassDTO.quantityError = "";
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

  const handleClassSalesDTO = (key, value) => {
    var salesClassDTO = { ...props.salesClassDTO };
    switch (key) {
      case "productName": {
        const object = props.productList.filter((x) => x.productName == value);
        const price = object.map((x) => x.sellingPrice);
        // const productType = object.map((x) => x.productType);
        salesClassDTO[key] = value;
        if (isNullOrIsEmptyOrIsUndefined(value)) {
          salesClassDTO = {};
        } else {
          salesClassDTO["quantity"] = "";
          salesClassDTO["price"] = parseFloat(price);
          salesClassDTO["productType"] = object[0].productType;
        }
        break;
      }

      case "priceAndQun": {
        if (
          !isNullOrIsEmptyOrIsUndefined(salesClassDTO.quantity) &&
          !isNullOrIsEmptyOrIsUndefined(salesClassDTO.price)
        ) {
          const total =
            parseFloat(salesClassDTO.quantity) *
            parseFloat(salesClassDTO.price);
          salesClassDTO["total"] = total;
        }
        if (
          isNullOrIsEmptyOrIsUndefined(salesClassDTO.quantity) ||
          isNullOrIsEmptyOrIsUndefined(salesClassDTO.price)
        ) {
          salesClassDTO["total"] = "";
        }
        break;
      }
      default:
        salesClassDTO[key] = value;
    }
    salesClassDTO = salesValidation(key, salesClassDTO);
    props.updateSalesClassDTO(salesClassDTO);
  };

  const deleteSalesClassDTO = (i) => {
    var salesClassListDTO = [...props.salesClassListDTO];
    var newlist = salesClassListDTO.filter((object, index) => index !== i);
    props.updateSalesClassListDTO(newlist, "delete");
  };

  const editSalesClassDTOforInputValue = (Row) => {
    props.updateSalesClassDTO(Row);
  };

  const handleSalesClassListDTO = () => {
    var salesClassDTO = { ...props.salesClassDTO };
    var salesClassListDTO = { ...props.salesClassListDTO };
    salesClassDTO = salesValidation("all", salesClassDTO);
    if (salesClassDTO.isValidationSuccess == true) {
      const newSalesDTO = {
        productName: salesClassDTO.productName,
        productType: salesClassDTO.productType,
        quantity: salesClassDTO.quantity,
        price: salesClassDTO.price,
        total: salesClassDTO.total,
      };
      if (isNullOrIsEmptyOrIsUndefined(salesClassDTO.No)) {
        props.updateSalesClassListDTO(newSalesDTO, "new");
      } else {
        salesClassListDTO[salesClassDTO.No] = salesClassDTO;
        props.updateSalesClassListDTO(salesClassListDTO, "update");
      }
    } else {
      toast.error("Please Insert Correct Value!");
    }
  };

  const classDTOvalidation = (key, classDTO) => {
    classDTO.isValidationSuccess = true;
    if (key == "all" || key == "orderDate") {
      if (isNullOrIsEmptyOrIsUndefined(classDTO.orderDate)) {
        classDTO.dateError = "Please Select Date.";
        classDTO.isValidationSuccess = false;
      } else {
        classDTO.dateError = "";
      }
    }
    if (key == "all" || key == "voucherNo") {
      if (isNullOrIsEmptyOrIsUndefined(classDTO.voucherNo)) {
        classDTO.vNoError = "Please Enter Voucher No.";
        classDTO.isValidationSuccess = false;
      } else {
        classDTO.vNoError = "";
      }
    }
    if (key == "all" || key == "gstType") {
      if (isNullOrIsEmptyOrIsUndefined(classDTO.gstType)) {
        classDTO.gstTypeError = "Please Select GST Type.";
        classDTO.isValidationSuccess = false;
      } else {
        classDTO.gstTypeError = "";
      }
    }
    if (key == "all" || key == "companyName") {
      if (isNullOrIsEmptyOrIsUndefined(classDTO.companyName)) {
        classDTO.companyNameError = "Please Select Company Name.";
        classDTO.isValidationSuccess = false;
      } else {
        classDTO.companyNameError = "";
      }
    }
    return classDTO;
  };

  const handleclassDTO = (key, value) => {
    var classDTO = { ...props.classDTO };
    switch (key) {
      case "gstType":
        classDTO[key] = value;
        if (
          !isNullOrIsEmptyOrIsUndefined(classDTO.totalAmount) &&
          classDTO.totalAmount !== 0
        ) {
          var GSTAmount = calculateGSTAmount(classDTO.totalAmount, value);
          classDTO["totalAmount"] = classDTO.totalAmount;
          classDTO["totalTaxAmount"] = GSTAmount;
          classDTO["totalTaxableAmount"] = classDTO.totalAmount + GSTAmount;
        } else {
          toast.error("Please Insert at least one product details");
        }
        break;
      default:
        classDTO[key] = value;
    }
    classDTO = classDTOvalidation(key, classDTO);
    props.updateClassDTO(classDTO);
  };

  const saveSalesOrderRequest = () => {
    var classDTO = { ...props.classDTO };
    var salesClassListDTO = { ...props.salesClassListDTO };
    const { submitSalesOrderRequest } = props;
    classDTO = classDTOvalidation("all", classDTO);
    if (classDTO.isValidationSuccess == true) {
      const finalsalesClassListDTO = Object.keys(salesClassListDTO).map(
        (key) => salesClassListDTO[key]
      );
      const finalDTO = {
        id:classDTO.id,
        orderDate: classDTO.orderDate,
        voucherNo: classDTO.voucherNo,
        companyName: classDTO.companyName,
        totalAmount: classDTO.totalAmount,
        totalTaxAmount: classDTO.totalTaxAmount,
        totalTaxableAmount: classDTO.totalTaxableAmount,
        gstType: classDTO.gstType,
        salesOrderProductDetailsDTOList: finalsalesClassListDTO,
      };
      submitSalesOrderRequest(finalDTO);
    } else {
      props.updateClassDTO(classDTO);
    }
  };

  const merageAmount = (data) => {
    return (
      <>
        <Stack direction="row" spacing={1}>
          <Chip label={data.totalAmount} size="small" color="success" />
          <Add />
          <Chip label={data.totalTaxAmount} size="small" color="secondary" />
          <img src={equal} alt="" srcset="" style={{ width: "15px" }} />
          <Chip label={data.totalTaxableAmount} size="small" color="primary" />
        </Stack>
      </>
    );
  };

  const merageTitleAmount = (data) => {
    return (
      <>
        <Stack direction="row" spacing={1}>
          <Tooltip title="Total">
            <Chip label="Total" size="small" color="success" />
          </Tooltip>
          <Add />
          <Tooltip title="GST Amount">
            <Chip label="GST" size="small" color="secondary" />
          </Tooltip>
          <img src={equal} alt="" srcset="" style={{ width: "15px" }} />
          <Tooltip title="Total Amount">
            <Chip label="Total Amount" size="small" color="primary" />
          </Tooltip>
        </Stack>
      </>
    );
  };

  const handleCloseConfirmModel = () => {
    setconfirmModelisOpen(false);
  };

  const handleConfirmation = () => {
    const id = props.companyOrderDetailsRowData.id;
    const editRowData = props.companyOrderDetailsRowData;
    // const id=editRowData.id;
    props.apiforupdateorder({ id, editRowData });
    setEditRowData({});
    setconfirmModelisOpen(false);
  };

  const ActionFunction = (data) => {
    // setEditRowData(data);
    return (
      <>
        <Buttons.EditButton
          onClick={() => {
            props.salesOrderCompanyRowData(data);
            setconfirmModelisOpen(true);
          }}
        />
        <Buttons.DeleteButton />
      </>
    );
  };

  return (
    <>
      {props.open === true ? (
        <HtmlComponent
          {...props}
          handleclassDTO={handleclassDTO}
          open={props.open}
          isModelOpen={isModelOpen}
          classDTO={props.classDTO}
          // resetData={props.resetData}
          productList={props.productList}
          handleClassSalesDTO={handleClassSalesDTO}
          salesClassDTO={props.salesClassDTO}
          handleSalesClassListDTO={handleSalesClassListDTO}
          salesClassListDTO={props.salesClassListDTO}
          editSalesClassDTOforInputValue={editSalesClassDTOforInputValue}
          deleteSalesClassDTO={deleteSalesClassDTO}
          saveSalesOrderRequest={saveSalesOrderRequest}
          getCompnayNameList={props.getCompnayNameList}
        />
      ) : null}
      {confirmModelisOpen === true ? (
        <AlertModel
          {...props}
          open={confirmModelisOpen}
          handleClose={handleCloseConfirmModel}
          handleConfirmation={handleConfirmation}
          message={"Are You Sure Update Sales Order?"}
          // onConfirm={onconfirm}
        />
      ) : null}
      <div style={{ marginTop: "65px" }}>
        <div style={{ display: "flex" }}>
          <Container maxWidth="lg">
            <Card sx={{ minWidth: 500, textAlign: "center" }}>
              <CardContent>
                <div className="twobuttonmanage">
                  <Typography textAlign="-webkit-left">
                    <Button
                      className="addproduct"
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{ bgcolor: "#33A1C9", color: "ButtonHighlight" }}
                      startIcon={<FaFilter />}
                      onClick={() => setData({ displayfilter: "block" })}
                    >
                      Filter
                    </Button>
                  </Typography>
                  <Box
                    className="card-shadow"
                    sx={{ minWidth: 300 }}
                    style={{ display: `${data.displayfilter}` }}
                  >
                    <Grid container spacing={2} className="filtergrid">
                      <Grid item xs={7}>
                        <AutocompleteTextField width="200px" />
                      </Grid>
                      <Grid item xs={3} style={{ textAlign: "left" }}>
                        <Button
                          size="small"
                          variant="contained"
                          startIcon={<SearchOffSharp />}
                          sx={{
                            bgcolor: "#33A1C9",
                            color: "ButtonHighlight",
                          }}
                        >
                          Submit
                        </Button>
                      </Grid>
                      <Grid item xs={2} style={{ textAlign: "end" }}>
                        <Close
                          color="red"
                          className="closebutton"
                          onClick={() => setData({ displayfilter: "none" })}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                  <Typography textAlign="-webkit-right">
                    <Button
                      className="addproduct"
                      variant="contained"
                      size="small"
                      sx={{ bgcolor: "#9fa8da", color: "ButtonHighlight" }}
                      startIcon={<AssignmentIcon />}
                      // onClick={() => this.setState({ open: true })}
                      onClick={() => isModelOpen(true)}
                    >
                      Add Sales Order
                    </Button>
                  </Typography>
                </div>
                <hr />
                <Tabelweb
                  dataList={props.salesOrderList}
                  currentPage={props.currentPage}
                  currentPageSize={props.currentPageSize}
                  handlechangelistPagination={handlechangelistPagination}
                  headers={[
                    { title: "No" },
                    { title: "Order Date" },
                    { title: "Voucher No" },
                    { title: "Company Name" },
                    { title: "GST Type" },
                    // { title: "Amount" },
                    { evalFunction: merageTitleAmount },
                    // { title: "Total Amount" },
                    // { title: "Total Tax Amount" },
                    // { title: "Total Taxable Amount" },
                    { title: "Action" },
                  ]}
                  keyMapping={[
                    {
                      key: "No",
                    },
                    {
                      key: "orderDateString",
                    },
                    {
                      key: "voucherNo",
                    },
                    {
                      key: "companyName",
                    },
                    {
                      key: "gstType",
                    },
                    {
                      evalFunction: merageAmount,
                    },
                    {
                      evalFunction: ActionFunction,
                    },
                  ]}
                />
              </CardContent>
            </Card>
          </Container>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = () => {
  return createStructuredSelector({
    classDTO: selectors.getClassDTO(),
    responseDTO: selectors.getResponseDTO(),
    open: selectors.getisModelOpen(),
    productList: selectors.productList(),
    salesClassDTO: selectors.getSalesClassDTO(),
    salesClassListDTO: selectors.getSalesClassListDTO(),
    getCompnayNameList: selectors.getCompnayNameList(),
    salesOrderList: selectors.getOrderList(),
    currentPage: selectors.currentPage(),
    currentPageSize: selectors.currentPageSize(),
    companyOrderDetailsRowData: selectors.getupdateforcompanyOrderRowData(),
  });
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateClassDTO: (payload) => {
      dispatch(actions.updateClassDTO(payload));
    },
    resetData: () => {
      dispatch(actions.resetData());
    },
    updateResponseDTO: (payload) => {
      dispatch(actions.updateResponseDTO(payload));
    },
    modelOpenRequest: (data) => {
      dispatch(actions.isModelOpen(data));
    },
    productListRequest: () => {
      dispatch(actions.productListRequest());
    },
    updateSalesClassDTO: (payload) => {
      dispatch(actions.updateSalesClassDTO(payload));
    },
    updateSalesClassListDTO: (payload, flag) => {
      dispatch(actions.updateSalesClassListDTO(payload, flag));
    },
    submitSalesOrderRequest: (payload) => {
      dispatch(actions.submitSalesOrderRequest(payload));
    },
    companyNameList: () => {
      dispatch(actions.companyNameList());
    },
    apiforsalesorderlist: (payload) => {
      dispatch(actions.apiforsalesorderlist(payload));
    },
    apiforupdateorder: (payload) => {
      dispatch(actions.apiforupdateorder(payload));
    },
    salesOrderCompanyRowData: (payload) => {
      dispatch(actions.salesOrderCompanyRowData(payload));
    },
  };
};

const withReducer = injectReducer({ key: pageName, reducer });
const withSaga = injectSaga({ key: pageName, saga });

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const enhance = compose(
  withReducer,
  withSaga,
  withConnect
)(withSuspense(withRouter(index)));

export default enhance;
