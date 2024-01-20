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

import HtmlComponent from "../../components/Dashboard";
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

  useEffect(() => {
    // Anything in here is fired on component mount. invoiceData
    props.getTotalAmountReceivableAndPaybleRequest();
    return () => {
      // Anything in here is fired on component unmount.
    };
  }, []);

  function isModelOpen(isOpen) {
    props.isModelOpen(isOpen);
  }

  function handleClassDTO(key, value) {
    var classDTO = { ...props.classDTO };
    switch (key) {
      default:
        classDTO[key] = value;
    }
    // classDTO = handleValidation(key, classDTO);
    props.updateClassDTO(classDTO);
  }

  function PaymentRequest() {
    return (
      <>
        <HtmlComponent
          {...props}
          handleClassDTO={handleClassDTO}
          classDTO={props.classDTO}
          open={props.open}
          isModelOpen={isModelOpen}
          vendorcustomerAmountData={props.vendorcustomerAmountData}
        />
      </>
    );
  }

  return <>{PaymentRequest()}</>;
};

const mapStateToProps = () => {
  return createStructuredSelector({
    classDTO: selectors.getClassDTO(),
    open: selectors.open(),
    vendorcustomerAmountData: selectors.vendorcustomerAmountData(),
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
    isModelOpen: (payload) => {
      dispatch(actions.isModelOpen(payload));
    },
    getTotalAmountReceivableAndPaybleRequest: () => {
      dispatch(actions.getTotalAmountReceivableAndPaybleRequest());
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
