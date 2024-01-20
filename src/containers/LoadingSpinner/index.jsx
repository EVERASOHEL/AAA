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

  return (
    <>
      {props.isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(255, 255, 255, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
           <ClipLoader color="#00BFFF" size={100} />
        </div>
      )}
    </>
  );
};

const mapStateToProps = () => {
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
