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
import PaymentHistoryComponent from "../../../components/PaymentHistory";
import Tabelweb from "../../../components/GenericTable/evelpractice";
import { Add, Close, SearchOffSharp } from "@mui/icons-material";
import AutocompleteTextField from "../../../web/AutocompleteTextField/";
import AssignmentIcon from "@mui/icons-material/Add";
// import { Delete, Edit } from "@mui/icons-material";
import * as commonFunction from "../../../utilities/CommonValidator";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import equal from "../../../components/images/equal1.png";
import Tooltip from "@mui/material/Tooltip";
import PaymnetComponent from "../../Payment";
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
import SendMailPopup from "../../../components/Models/email_Popup";
import PdfViewer from "../../../web/viewPdf/PdfViewer";
import { CONFIRMATION_MAIL_SEND } from "../../../utilities/CommonConstants";
import AdvancedDataTable from "../../AdvancedDataTable";

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
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [isOpenPaymentHistoryModel, setisOpenPaymentHistoryModel] =
    useState(false);
  const [mailData, setMailData] = useState({});
  const [refreshKey, setRefreshKey] = useState(0);
  const [mailconfirmModelisOpen, setmailconfirmModelisOpen] = useState(false);
  useEffect(() => {
    // Anything in here is fired on component mount.
    // props.apiforsalesorderlist({ page: 0, size: 50, companyType: "Customer" });
    props.productListRequest();
    props.companyNameList("Customer");
    props.companyNameListForFilter({ companyType: "Customer" });

    // props.updateClassDTO({"orderDate":new Date()});
    return () => {
      // Anything in here is fired on component unmount.
    };
  }, [confirmModelisOpen,mailconfirmModelisOpen]);

  // useEffect(() => {}, []);

  useEffect(() => {
    // props.listRequest({ page: 0, size: 40});
    // props.companyNameListForFilter();
    if (props.saveSuccess) {
      setRefreshKey((prevKey) => prevKey + 1);
      props.resetSaveSuccessFlag()
    }
    return () => {};
  }, [props.saveSuccess]);

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
    payload.companyType = "Customer";
    props.apiforsalesorderlist(payload);
  }

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
          toast.error("Please Enter less Qty because your Stock is not match.");
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

  // const handleClassSalesDTO = (key, value) => {
  //   var salesClassDTO = { ...props.salesClassDTO };

  //   switch (key) {
  //     case "productName": {
  //       const object = props.productList.filter((x) => x.productName == value);
  //       const price = object.map((x) => x.sellingPrice);
  //       const totalStock = object.map((x) => x.totalStock);
  //       // const productType = object.map((x) => x.productType);
  //       salesClassDTO[key] = value;
  //       if (isNullOrIsEmptyOrIsUndefined(value)) {
  //         salesClassDTO = {};
  //       } else {
  //         if (totalStock[0] > 0) {
  //           salesClassDTO["totalStock"] = totalStock[0];
  //           salesClassDTO["quantity"] = "";
  //           salesClassDTO["price"] = parseFloat(price);
  //           salesClassDTO["productType"] = object[0].productType;
  //           salesClassDTO["hsnCode"] = object[0].productHsn;
  //           salesClassDTO.productNameError = "";
  //           salesClassDTO.isValidationSuccess = true;
  //         } else {
  //           salesClassDTO.productNameError =
  //             value + " Stock is 0 please add new stock.";
  //           salesClassDTO.isValidationSuccess = false;
  //           salesClassDTO["totalStock"] = null;
  //         }
  //       }
  //       break;
  //     }

  //     case "priceAndQun": {
  //       if (
  //         !isNullOrIsEmptyOrIsUndefined(salesClassDTO.quantity) &&
  //         !isNullOrIsEmptyOrIsUndefined(salesClassDTO.price) &&
  //         salesClassDTO.isValidationSuccess === true
  //       ) {
  //         const total =
  //           parseFloat(salesClassDTO.quantity) *
  //           parseFloat(salesClassDTO.price);
  //         salesClassDTO["total"] = total;
  //       }
  //       if (
  //         isNullOrIsEmptyOrIsUndefined(salesClassDTO.quantity) ||
  //         isNullOrIsEmptyOrIsUndefined(salesClassDTO.price)
  //       ) {
  //         salesClassDTO["total"] = "";
  //       }
  //       break;
  //     }

  //     default:
  //       salesClassDTO[key] = value;
  //   }
  //   salesClassDTO = salesValidation(key, salesClassDTO);
  //   props.updateSalesClassDTO(salesClassDTO);
  // };

  const deleteSalesClassDTO = (i) => {
    var salesClassListDTO = [...props.salesClassListDTO];
    var newlist = salesClassListDTO.filter((object, index) => index !== i);
    props.updateSalesClassListDTO(newlist, "delete");
  };

  const editSalesClassDTOforInputValue = (Row) => {
    props.updateSalesClassDTO(Row);
  };

  const handleSalesClassListDTO = () => {
    // var salesClassDTO = { ...props.salesClassDTO };
    // var salesClassListDTO = { ...props.salesClassListDTO };
    // salesClassDTO = salesValidation("all", salesClassDTO);
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
      case "companyName":
        props.companyStateName({ companyName: value });
        classDTO[key] = value;
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

      if (!isNullOrIsEmptyOrIsUndefined(classDTO.id)) {
        finalsalesClassListDTO = finalsalesClassListDTO.map((item) => {
          const matchingProduct = props.productList.find(
            (product) => product.productName === item.productName
          );

          if (matchingProduct) {
            // Create a new object with the updated hsnCode
            return {
              ...item,
              hsnCode: matchingProduct.productHsn,
            };
          }

          // If no matching product found, return the original item
          return item;
        });
      }

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

  const handleCloseSendMailConfirmModel = () => {
    setmailconfirmModelisOpen(false);
  };

  const handleConfirmation = () => {
    if (confirmationMessage === CONFIRMATION_MAIL_SEND) {
      props.apiforSendMail(mailData);
      setMailData({});
    } else if (confirmationMessage === "Are You Sure Update Sales Order?") {
      const id = props.companyOrderDetailsRowData.id;
      const editRowData = props.companyOrderDetailsRowData;
      // const id=editRowData.id;
      props.apiforupdateorder({ id, editRowData });
      setEditRowData({});
    }

    setconfirmModelisOpen(false);
  };

  const handleMailConfirmation = (toEmail) => {
    const updatedMailData = {
      ...mailData,
      toEmail,
    };
    props.apiforSendMail(updatedMailData);
    setMailData({});
    setmailconfirmModelisOpen(false);
  };

  const handleViewPdf = (data) => {
    props.apiforViewPdf(data);
    // setOpenViewPdfModel(true);
  };

  const handleSendMail = (data) => {
    const mailData = {
      companyType: "Sales pdf",
      companyName: data.companyName,
      pdfName: `${data.voucherNo} - ${data.companyName}`,
      voucherNo: data.voucherNo,
      totalTaxableAmount: data.totalTaxableAmount,
      orderDateString: data.orderDateString,
    };

    setMailData(mailData); // Set the mail data
    setConfirmationMessage(CONFIRMATION_MAIL_SEND); // Set the confirmation message
    setmailconfirmModelisOpen(true); // Open the mail confirmation popup
  };

  const ActionFunction = (data) => {
    // setEditRowData(data);
    return (
      <>
        <div style={{ display: "flex" }}>
          <Tooltip title="view pdf">
            <Buttons.ViewPdf
              onClick={() => {
                data = {
                  companyType: "Sales pdf",
                  companyName: data.companyName,
                  pdfName: data.voucherNo + " - " + data.companyName,
                };
                handleViewPdf(data);
                // setOpenViewPdfModel(true);
              }}
            />
          </Tooltip>
          <Tooltip title="Payment History">
            <Buttons.History
              onClick={() => {
                props.apiforhistory(data.id);
                setisOpenPaymentHistoryModel(true);
              }}
            />
          </Tooltip>
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
          <Tooltip title="send pdf via email">
            <Buttons.sendEmail
              onClick={() => {
                handleSendMail(data);
              }}
            />
          </Tooltip>
          <Tooltip title="Edit Sales Order Details">
            <Buttons.EditButton
              onClick={() => {
                props.salesOrderCompanyRowData(data);
                setConfirmationMessage("Are You Sure Update Sales Order?");
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

  const setPaymentHistoryModelSetValue = (modelValue) => {
    setisOpenPaymentHistoryModel(modelValue);
  };

  const handleClosePdf = () => {
    props.isOpenPdfModel(false);
    // setOpenViewPdfModel(false);
  };

  const calllistapi = () => {
    props.apiforsalesorderlist({ page: 0, size: 20, companyType: "Customer" });
  };

  const handleChangePaymentModel = (isPaymentModelClose) => {
    props.isPaymentModelOpen(isPaymentModelClose);
  };

  const handleChangeSavePayment = (paymentData) => {
    props.submitPaymentRequest(paymentData);
  };

  const setFilter = () => {
    const filters = {
      components: [
        {
          payloadKey: "companyName",
          key: "companyName",
          stateKey: "companyName",
          displayKey: "companyName",
          label: "Company Name",
          component: "singleSelect",
          values: props.allTypeCompanyNameList || [],
        },
      ],
      url: "", // API endpoint for filtering
      method: "GET", // HTTP method for the filter API
    };

    return filters;
  };

  const filters = setFilter();

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
          // handleClassSalesDTO={handleClassSalesDTO}
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
        />
      ) : null}
      {mailconfirmModelisOpen === true ? (
        <SendMailPopup
          {...props}
          open={mailconfirmModelisOpen}
          handleClose={handleCloseSendMailConfirmModel}
          handleMailConfirmation={handleMailConfirmation}
          message={confirmationMessage}
        />
      ) : null}
      {props.getPaymentModelOpenStatus === true ? (
        <PaymnetComponent
          {...props}
          PaymentTypeNameHeader={"Customer Payment"}
          flagformodel="istrue"
          calllistapi={calllistapi}
          handleChangePaymentModel={handleChangePaymentModel}
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
          title={"Customer Payment History"}
        />
      ) : null}
      {props.isOpenPdf === true ? (
        <PdfViewer
          {...props}
          title={"View Sales Pdf"}
          pdfData={props.pdfData}
          openPdf={props.isOpenPdf}
          handleClosePdf={handleClosePdf}
        />
      ) : null}
      <AdvancedDataTable
        key={refreshKey}
        {...props}
        url={"/api/salesOrderController/getSalesOrderList?companyType=Customer"}
        headers={[
          { title: "No" },
          { title: "Order Date" },
          { title: "Voucher No" },
          { title: "Company Name" },
          { evalFunction: merageTitleAmount },
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
            evalFunction: merageAmount,
          },
          {
            evalFunction: ActionFunction,
          },
        ]}
        title={"Sales Master"}
        isModelOpen={isModelOpen}
        filters={filters}
      />
      {/* <div style={{ marginTop: "15px" }}>
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
      </div> */}
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
    allTypeCompanyNameList: selectors.getAllTypeCompanyNameList(),
    saveSuccess: selectors.handleSaveSuccess(),
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
    apiforSendMail: (payload) => {
      dispatch(actions.apiforSendMail(payload));
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
    isPaymentModelOpen: (payload) => {
      dispatch(actions.isPaymentModelOpen(payload));
    },
    submitPaymentRequest: (payload) => {
      dispatch(actions.submitPaymentRequest(payload));
    },
    companyNameListForFilter: (payload) => {
      dispatch(actions.companyNameListForFilter(payload));
    },
    companyStateName: (payload) => {
      dispatch(actions.companyStateName(payload));
    },
    resetSaveSuccessFlag: () => {
      dispatch(actions.resetSaveSuccessFlag());
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
