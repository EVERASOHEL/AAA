import React, { useEffect, useState } from "react";

import { compose } from "redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { injectReducer, injectSaga } from "redux-injectors";
import { withRouter } from "../../utilities/withRouter";
import { withSuspense } from "../../utilities/withSuspense";
import _ from "lodash";

import * as actions from "./actions";
import { pageName } from "./constants";
import reducer from "./reducer";
import saga from "./saga";
import * as selectors from "./selectors";

import HtmlComponent from "../../components/PaymentComponent";
import * as commonFunction from "../../utilities/CommonValidator";
import isNullOrIsEmptyOrIsUndefined from "../../utilities/CommonValidator";
import { toast } from "react-toastify";

const index = (props) => {
  function updateStateValue(value) {
    updateState((prevState) => ({
      ...prevState,
      ...value,
    }));
  }

  const [modelmessage, setmodelmessage] = useState(false);

  useEffect(() => {
    // Anything in here is fired on component mount. 
    setmodelmessage(true);
    props.isModelOpen(true);
    const { invoiceData } = props;
    let newDTO = {
      id: invoiceData.id,
      companyName: invoiceData.companyName,
      billAmount: invoiceData.totalTaxableAmount,
      paybleAmount: invoiceData.payAmount,
      amountDue: invoiceData.totalTaxableAmount - invoiceData.payAmount,
      amountDueBackup: invoiceData.totalTaxableAmount - invoiceData.payAmount,
    };
    props.updateClassDTO(newDTO);
    // props.modelMessageRequest("");
    return () => {
      console.log("hello");
      // Anything in here is fired on component unmount.
    };
  }, []);

  useEffect(() => {
    console.log('ComponentToUpdate has been updated!');
    props.isModelOpen(true);
  }, [modelmessage]);

  function isModelOpen(isOpen) {
    setmodelmessage(true);
    props.isModelOpen(isOpen);
    // props.calllistapi();
  }

  const handleValidation = (key, classDTO) => {
    classDTO.isValidationSuccess = true;

    if (key === "all" || key === "payingamount") {
      if (isNullOrIsEmptyOrIsUndefined(classDTO.payingamount)) {
        classDTO.payingAmountError = "Please enter payable amount.";
        classDTO.isValidationSuccess = false;
      } else {
        classDTO.payingAmountError = "";
      }
      if (!commonFunction.isNotEmptyAndValidNumber(classDTO.payingamount)) {
        classDTO.payingAmountError = "Please enter valid amount value.";
        classDTO.isValidationSuccess = false;
      } else {
        classDTO.payingAmountError = "";
      }
      if (classDTO.payingamount > classDTO.amountDueBackup) {
        classDTO.payingAmountError =
          "do not enter amount value above bill amount.";
        classDTO.isValidationSuccess = false;
      } else {
        classDTO.payingAmountError = "";
      }
    }
    return classDTO;
  };

  function handleClassDTO(key, value) {
    var classDTO = { ...props.classDTO };
    switch (key) {
      case "calculateAmount": {
        console.log("classDTO.payingamount : ",classDTO.payingamount);
        if (isNullOrIsEmptyOrIsUndefined(classDTO.payingamount)) {
          classDTO["amountDue"] = classDTO.amountDueBackup;
        } else {
          if (classDTO.amountDue >= classDTO.payingamount) {
            var payingamount = classDTO.payingamount || 0;
            var amountDue =
              parseFloat(classDTO.amountDue) - parseFloat(payingamount);
            classDTO["amountDue"] = amountDue;
          } else {
            toast.warning("do not enter amount value above bill amount.");
          }
        }
        break;
      }
      case "payfullAmount": {
        classDTO[key] = value;
        if (value == true) {
          classDTO["payingamount"] = classDTO.amountDue;
          classDTO["amountDue"] = 0.0;
          classDTO[key] = value;
        } else if (value == false) {
          // var billAmount = classDTO.billAmount;
          // var payingamount = "";
          // var amountDue = billAmount - 0;
          classDTO["amountDue"] = classDTO.amountDueBackup;
          classDTO["payingamount"] = "";
          classDTO["payingAmountError"] = "";
        }
        break;
      }
      default:
        classDTO[key] = value;
    }
    // classDTO = handleValidation(key, classDTO);
    props.updateClassDTO(classDTO);
  }

  const handleChangeSave = () => {
    var classDTO = { ...props.classDTO };
    classDTO = handleValidation("all", classDTO);
    console.log("classDTO : ",classDTO);
    if (classDTO.isValidationSuccess == true) {
      const newDTO = {
        orderId: classDTO.id,
        companyName: classDTO.companyName,
        payAmount: parseFloat(classDTO.payingamount),
        paymentDate: classDTO.paymentDate,
        paymentMode: classDTO.paymentMode,
      };
      console.log("newDTO : ",newDTO);
      props.submitPaymentRequest(newDTO);
    }
  };

  function PaymentRequest() {
    return (
      <>
        {props.open === true ? (
          <HtmlComponent
            {...props}
            handleClassDTO={handleClassDTO}
            classDTO={props.classDTO}
            open={props.open}
            isModelOpen={isModelOpen}
            PaymentTypeNameHeader={props.PaymentTypeNameHeader}
            handleChangeSave={handleChangeSave}
          />
        ) : null}
      </>
    );
  }

  // console.log("123");
  // if(modelmessage==true){
  //   props.isModelOpen(true);
  //   setmodelmessage(false);
  // }
  return <>{PaymentRequest()}</>;
};

const mapStateToProps = () => {
  return createStructuredSelector({
    classDTO: selectors.getClassDTO(),
    // responseDTO: selectors.getResponseDTO(),
    open: selectors.open(),
    modelmessage:selectors.modelmessage(),
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
    submitPaymentRequest: (payload) => {
      dispatch(actions.submitPaymentRequest(payload));
    },
    openEditModel: (payload) => {
      dispatch(actions.openEditModel(payload));
    },
    isModelOpen: (payload) => {
      dispatch(actions.isModelOpen(payload));
    },
    modelMessageRequest: (payload) => {
      dispatch(actions.modelMessageRequest(payload));
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
