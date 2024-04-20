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
import "./style.scss";

import { ClipLoader } from 'react-spinners';
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// import '../../../public/css/react-spinner-loader.css';

const index = (props) => {
  function updateStateValue(value) {
    updateState((prevState) => ({
      ...prevState,
      ...value,
    }));
  }

  useEffect(() => {
    return () => {};
  }, []);

  console.log('props.isLoading :>> ', props.isLoading);
  return (
    <>
      {props.isLoading && (
        <div
          className="loading-overlay"
        >
           <ClipLoader color="#00BFFF" size={100} />
        </div>
      )}
    </>
  );
};
console.log('selectors.getIsLoading() :>> ', selectors.getIsLoading());
const mapStateToProps = () => {
  console.log("call mapStateToProps");
  return createStructuredSelector({
    classDTO: selectors.getClassDTO(),
    isLoading: selectors.getIsLoading(),
  });
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateClassDTO: (payload) => {
      dispatch(actions.updateClassDTO(payload));
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
