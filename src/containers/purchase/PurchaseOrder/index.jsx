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

import HtmlComponent from "../../../components/Purchase/PurchaseOrder";
import PaymentHistoryComponent from "../../../components/PaymentHistory";
import PaymnetComponent from "../../Payment";
import Tabelweb from "../../../components/GenericTable/evelpractice";
import { Add, Close, SearchOffSharp } from "@mui/icons-material";
import AutocompleteTextField from "../../../web/AutocompleteTextField";
import AssignmentIcon from "@mui/icons-material/Add";
// import { Delete, Edit } from "@mui/icons-material";
import * as commonFunction from "../../../utilities/CommonValidator";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import equal from "../../../components/images/equal1.png";
import Delete from "../../../components/images/delete.gif";
import Edit from "../../../components/images/edit.gif";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Tooltip,
  Typography,
  Badge,
} from "@mui/material";
import { FaFilter } from "react-icons/fa";
import { makeStyles } from "@mui/styles";
import isNullOrIsEmptyOrIsUndefined from "../../../utilities/CommonValidator";
import { toast } from "react-toastify";
import {
  calculateGSTAmount,
  findPercentage,
} from "../../../utilities/CommonFunction";
import * as Buttons from "../../../web/Buttons";
import AlertModel from "../../../components/Models";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { Modal } from "@coreui/coreui";
import PdfViewer from "../../../web/viewPdf/PdfViewer";

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
  const [isOpenPaymentModel, setisOpenPaymentModel] = useState(false);
  const [invoiceData, setInvoiceData] = useState({});
  const [isOpenPaymentHistoryModel, setisOpenPaymentHistoryModel] =
    useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [mailData, setMailData] = useState({});

  const [openViewPdfModel, setOpenViewPdfModel] = useState(false);

  useEffect(() => {
    // Anything in here is fired on component mount.
    // console.log("props.isPaymentModelClose : ",props.isPaymentModelClose);
    // if(props.isPaymentModelClose===false){
    //   props.isPaymentModelOpen(props.isPaymentModelClose);
    // }
    props.apiforsalesorderlist({ page: 0, size: 20, companyType: "Vendor" });
    props.productListRequest();
    props.companyNameList("Vendor");
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
    payload.companyType = "Vendor";
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
          salesClassDTO["hsnCode"] = object[0].productHsn;
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
        hsnCode: salesClassDTO.hsnCode,
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

  const notDetrmineGstValueIsEmpty = (classDTO) => {
    classDTO.gstBillAmountlabel = "0.00";
    classDTO.gstBillAmountPercentage = 0;
    classDTO.withoutGSTBillAmountlabel = "0.00";
    classDTO.withoutGSTBillAmountlabelPercentage = 0;
    return classDTO;
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
    // if (classDTO.PurchaseGST === "Not Dermine GST") {
    //   if (key == "all" || key == "totalPurchaseBillAmount") {
    //     if (isNullOrIsEmptyOrIsUndefined(classDTO.totalPurchaseBillAmount)) {
    //       classDTO.totalPurchaseBillAmountError =
    //         "Please Enter Purchase Bill Amount.";
    //       classDTO = notDetrmineGstValueIsEmpty(classDTO);
    //       classDTO.isValidationSuccess = false;
    //     } else {
    //       classDTO.totalPurchaseBillAmountError = "";
    //     }
    //   }
    //   if (key == "all" || key == "gstBillAmount") {
    //     if (isNullOrIsEmptyOrIsUndefined(classDTO.gstBillAmount)) {
    //       classDTO.gstBillAmountError = "Please Enter GST Bill Amount.";
    //       classDTO = notDetrmineGstValueIsEmpty(classDTO);
    //       classDTO.isValidationSuccess = false;
    //     } else {
    //       classDTO.gstBillAmountError = "";
    //     }
    //   }
    // }
    // if (key == "all" || key == "calculatePercentageAmount") {
    //   if (
    //     !isNullOrIsEmptyOrIsUndefined(classDTO.totalPurchaseBillAmount) &&
    //     !isNullOrIsEmptyOrIsUndefined(classDTO.gstBillAmount)
    //   ) {
    //     if (
    //       parseFloat(classDTO.totalPurchaseBillAmount) >
    //       parseFloat(classDTO.gstBillAmount)
    //     ) {
    //       classDTO.gstBillAmountlabel = classDTO.gstBillAmount;
    //       classDTO.gstBillAmountPercentage = findPercentage(
    //         classDTO.totalPurchaseBillAmount,
    //         classDTO.gstBillAmount
    //       );
    //       const withoutGSTAmount =
    //         classDTO.totalPurchaseBillAmount - classDTO.gstBillAmount;
    //       classDTO.withoutGSTBillAmountlabel = withoutGSTAmount;
    //       classDTO.withoutGSTBillAmountlabelPercentage = findPercentage(
    //         classDTO.totalPurchaseBillAmount,
    //         withoutGSTAmount
    //       );
    //       classDTO.gstBillAmountError = "";
    //     } else {
    //       classDTO.gstBillAmountError =
    //         "can't enter greter Gst Bill Amount value.";
    //       classDTO = notDetrmineGstValueIsEmpty(classDTO);
    //     }
    //   }
    // }
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
      let finalsalesClassListDTO = Object.keys(salesClassListDTO).map(
        (key) => salesClassListDTO[key]
      );

      // if (!isNullOrIsEmptyOrIsUndefined(classDTO.id)) {
      //   finalsalesClassListDTO = finalsalesClassListDTO.map((item) => {
      //     const matchingProduct = props.productList.find(
      //       (product) => product.productName === item.productName
      //     );

      //     if (matchingProduct) {
      //       // Create a new object with the updated hsnCode
      //       return {
      //         ...item,
      //         hsnCode: matchingProduct.productHsn,
      //       };
      //     }

      //     // If no matching product found, return the original item
      //     return item;
      //   });
      // }

      const finalDTO = {
        id: classDTO.id,
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
          {/* <Chip label={data.totalAmount} size="small" color="success" /> */}
          {/* <Add /> */}
          {/* <Chip label={data.totalTaxAmount} size="small" color="secondary" /> */}
          {/* <img src={equal} alt="" srcset="" style={{ width: "15px" }} /> */}

          <Chip label={data.totalTaxableAmount} size="small" color="warning" />
          <Chip label={data.payAmount} size="small" color="success" />
        </Stack>
      </>
    );
  };

  const merageTitleAmount = (data) => {
    return (
      <>
        <Stack direction="row" spacing={1}>
          {/* <Tooltip title="Total">
            <Chip label="Total" size="small" color="success" />
          </Tooltip>
          <Add />
          <Tooltip title="GST Amount">
            <Chip label="GST" size="small" color="secondary" />
          </Tooltip>
          <img src={equal} alt="" srcset="" style={{ width: "15px" }} />
          <Tooltip title="Total Amount">
            <Chip label="Total Amount" size="small" color="primary" />
          </Tooltip> */}
          <Tooltip title="Bill Amount">
            <Chip label="Bill Amount" size="small" color="warning" />
          </Tooltip>
          <Tooltip title="Pay Amount">
            <Chip label="Pay Amount" size="small" color="success" />
          </Tooltip>
        </Stack>
      </>
    );
  };

  const handleCloseConfirmModel = () => {
    setconfirmModelisOpen(false);
  };

  const handleConfirmation = () => {
    if (confirmationMessage === "Are You Sure You Want Send Mail?") {
      props.apiforSendMail(mailData);
      setMailData({});
    } else if (confirmationMessage === "Are You Sure Update Purchase Order?") {
      const id = props.companyOrderDetailsRowData.id;
      const editRowData = props.companyOrderDetailsRowData;
      // const id=editRowData.id;
      props.apiforupdateorder({ id, editRowData });
      setEditRowData({});
    }

    setconfirmModelisOpen(false);
  };

  const handleViewPdf = (data) => {
    props.apiforViewPdf(data);
    // setOpenViewPdfModel(true);
  };

  const isPaymentModelOpen = (flag) => {
    props.isPaymentModelOpen(flag);
  };

  const ActionFunction = (data) => {
    // setEditRowData(data);
    return (
      <>
        <div style={{ display: "flex" }}>
          {data.totalTaxableAmount != null &&
          data.payAmount != null &&
          data.totalTaxableAmount !== data.payAmount ? (
            <Tooltip title="Add Vendor Payment">
              <Buttons.PaymentButton
                onClick={() => {
                  props.isPaymentModelOpen(true);
                  // setisOpenPaymentModel(true);
                  setInvoiceData(data);
                }}
              />
            </Tooltip>
          ) : (
            <div
              className="blank-button"
              style={{
                width: "25px",
                height: "25px",
                marginLeft: "5px",
                background: "transparent",
              }}
            />
          )}
          <Tooltip title="Payment History">
            <Buttons.History
              onClick={() => {
                props.apiforhistory(data.id);
                setisOpenPaymentHistoryModel(true);
              }}
            />
          </Tooltip>
          <Tooltip title="view pdf">
            <Buttons.ViewPdf
              onClick={() => {
                data = {
                  companyType: "Purchase pdf",
                  companyName: data.companyName,
                  pdfName: data.voucherNo + " - " + data.companyName,
                };
                handleViewPdf(data);
                // setOpenViewPdfModel(true);
              }}
            />
          </Tooltip>
          <Tooltip title="Payment History">
            <Buttons.DownloadPdf
            // onClick={() => {
            //   props.apiforhistory(data.id);
            //   setisOpenPaymentHistoryModel(true);
            // }}
            />
          </Tooltip>
          <Tooltip title="send pdf via email">
            <Buttons.sendEmail
              onClick={() => {
                data = {
                  companyType: "Purchase pdf",
                  companyName: data.companyName,
                  pdfName: data.voucherNo + " - " + data.companyName,
                };
                setMailData(data);
                setConfirmationMessage("Are You Sure You Want Send Mail?");
                setconfirmModelisOpen(true);
              }}
            />
          </Tooltip>
          <Tooltip title="Edit Purchase Order Details">
            <Buttons.EditButton
              onClick={() => {
                props.salesOrderCompanyRowData(data);
                setConfirmationMessage("Are You Sure Update Purchase Order?");
                setconfirmModelisOpen(true);
              }}
            />
          </Tooltip>
          <Buttons.DeleteButton />
        </div>
      </>
    );
  };

  const isModelPayemntOpen = (isOpen) => {
    setisOpenPaymentModel(isOpen);
  };

  const calllistapi = () => {
    props.apiforsalesorderlist({ page: 0, size: 20, companyType: "Vendor" });
  };

  const setPaymentHistoryModelSetValue = (modelValue) => {
    setisOpenPaymentHistoryModel(modelValue);
  };

  const handleClosePdf = () => {
    props.isOpenPdfModel(false);
    // setOpenViewPdfModel(false);
  };

  const handleChangePaymentModel = (isPaymentModelClose) => {
    console.log("props.isPaymentModelClose : ", props.isPaymentModelClose);
    props.isPaymentModelOpen(isPaymentModelClose);
  };

  const handleChangeSavePayment=(paymentData)=>{
    props.submitPaymentRequest(paymentData)
  }

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
          message={confirmationMessage}
          // message={"Are You Sure Update Sales Order?"}
          // onConfirm={onconfirm}
        />
      ) : null}
      {props.getPaymentModelOpenStatus === true ? (
        <PaymnetComponent
          {...props}
          PaymentTypeNameHeader={"Vendor Payment"}
          flagformodel="istrue"
          calllistapi={calllistapi}
          handleChangePaymentModel={handleChangePaymentModel}
          // open={isModelPayemntOpen}
          // isPayemntModelOpen={isModelPayemntOpen}
          // modelOpen={isModelPayemntOpen}
          getPaymentModelOpenStatus={props.getPaymentModelOpenStatus}
          invoiceData={invoiceData}
          handleChangeSavePayment={handleChangeSavePayment}
        />
      ) : null}
      {isOpenPaymentHistoryModel === true ? (
        <PaymentHistoryComponent
          paymentHistoryModel={isOpenPaymentHistoryModel}
          setPaymentHistoryModelSetValue={setPaymentHistoryModelSetValue}
          HistoryData={props.paymentHistoryData}
        />
      ) : null}

      {props.isOpenPdf === true ? (
        <PdfViewer
          {...props}
          title={"View Purchase Pdf"}
          pdfData={props.pdfData}
          openPdf={props.isOpenPdf}
          handleClosePdf={handleClosePdf}
        />
      ) : null}

      <div style={{ marginTop: "15px" }}>
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
                      Add Purchase Order
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
                    // { title: "GST Type" },
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
                    // {
                    //   key: "gstType",
                    // },
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
    paymentHistoryData: selectors.paymentHistoryData(),
    pdfData: selectors.getPdfData(),
    isOpenPdf: selectors.getPdfStatus(),
    getPaymentModelOpenStatus: selectors.getPaymentModelStatus(),
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
    companyNameList: (payload) => {
      dispatch(actions.companyNameList(payload));
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
    apiforhistory: (payload) => {
      dispatch(actions.apiforhistory(payload));
    },
    apiforViewPdf: (payload) => {
      dispatch(actions.apiforViewPdf(payload));
    },
    isOpenPdfModel: (payload) => {
      dispatch(actions.isOpenPdfModel(payload));
    },
    apiforSendMail: (payload) => {
      dispatch(actions.apiforSendMail(payload));
    },
    isPaymentModelOpen: (payload) => {
      dispatch(actions.isPaymentModelOpen(payload));
    },
    submitPaymentRequest: (payload) => {
      dispatch(actions.submitPaymentRequest(payload));
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
