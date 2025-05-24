import React, { Component } from "react";

import { createStructuredSelector } from "reselect";
import { injectReducer, injectSaga } from "redux-injectors";
import { connect } from "react-redux";
import { compose } from "redux";
import _ from "lodash";

import * as actions from "./actions";
import { pageName } from "./constants";
import reducer from "./reducer";
import saga from "./saga";
import * as selectors from "./selectors";

import { withRouter } from "../../utilities/withRouter";
import { withSuspense } from "../../utilities/withSuspense";

import HtmlComponent from "../../components/Sample";

const index = (props) => {
  handleClassDTO = (key, value) => {
    const { classDTO, updateClassDTO } = this.props;
    var classDTOClone = _.cloneDeep(classDTO);

    switch (key) {
      default: {
        classDTOClone[key] = value;
        break;
      }
    }
    updateClassDTO(classDTOClone);
  };

  handleButtons = (name, value) => {
    switch (name) {
      default: {
        break;
      }
    }
  };

  checkValidation = () => {
    const { validationErrorDTO, updateValidationErrorDTO } = this.props;
    var isValidationSuccess = true;
    var validationErrorDTOClone = _.cloneDeep(validationErrorDTO);

    updateValidationErrorDTO(validationErrorDTOClone);
    return isValidationSuccess;
  };

  const { classDTO, validationErrorDTO } = this.props;

  return (
    <>
      <HtmlComponent
        classDTO={classDTO}
        validationErrorDTO={validationErrorDTO}
        handleClassDTO={this.handleClassDTO}
        handleButtons={this.handleButtons}
      />
    </>
  );
};

const mapStateToProps = () => {
  return createStructuredSelector({
    classDTO: selectors.getClassDTO(),
    validationErrorDTO: selectors.getValidationErrorDTO(),
  });
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateClassDTO: (data) => {
      dispatch(actions.updateClassDTO(data));
    },
    updateValidationErrorDTO: (data) => {
      dispatch(actions.updateValidationErrorDTO(data));
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
