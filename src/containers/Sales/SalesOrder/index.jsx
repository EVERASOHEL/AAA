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
import { render } from "@testing-library/react";

// const index = (props) => {
const index = (props) => {
  // const { classDTO, updateClassDTO } = props;

  // const [state, updateState] = useState({});

  // const updateStateValue = (value) => {
  //   updateState((prevState) => ({
  //     ...prevState,
  //     ...value,
  //   }));
  // };

  // useEffect(() => {
  //   // Anything in here is fired on component mount.
  //   return () => {
  //     // Anything in here is fired on component unmount.
  //   };
  // }, []);

  // useEffect(() => {
  //   // Anything in here is fired on component did update.
  // });

  // const handleClassDTO = (key, value) => {
  //   var classDTOClone = _.cloneDeep(classDTO);

  //   switch (key) {
  //     default: {
  //       classDTOClone[key] = value;
  //       break;
  //     }
  //   }

  //   classDTOClone = checkValidation(key, classDTOClone);
  //   updateClassDTO(classDTOClone);
  // };

  // const handleInputChange = (type, query) => {
  //   switch (type) {
  //     default: {
  //       break;
  //     }
  //   }
  // };

  function isModelOpen(isOpen) {
    props.modelOpenRequest(isOpen);
  }

  function handleChangeProduct(key, value){
    const updateClassDTO = { ...this.props.updateClassDTO };
    var classDTO = { ...this.props.classDTO };
    switch (key) {
      default:
        classDTO[key] = value;
        break;
    }
    this.props.updateClassDTO(classDTO);
  };

  function isModelOpen(isOpen) {
    props.modelOpenRequest(isOpen);
  }
 
  console.log("111");
  return (
    <>
      <HtmlComponent
        {...this.props}
        classDTO={this.props.classDTO}
        isModelOpen={isModelOpen}
        handleChangeProduct={handleChangeProduct}
      />
    </>
  );
};

const mapStateToProps = () => {
  return createStructuredSelector({
    classDTO: selectors.getClassDTO(),
    responseDTO: selectors.getResponseDTO(),
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
