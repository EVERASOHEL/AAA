import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import RouterComponent from "../routes";

import {createStructuredSelector} from "reselect";
import {injectReducer, injectSaga} from "redux-injectors";
import {connect} from "react-redux";
import {compose} from "redux";
import {withSuspense} from "../utilities/withSuspense";

import * as actions from "./actions";
import {pageName} from "./constants";
import reducer from "./reducer";
import saga from "./saga";
import * as selectors from "./selectors";

import RootDialog from "../components/Shared/RootDialog";
import Loader from "../components/Shared/Loader";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const index = (props) => {
    const {rootDialogDTO, isLoading} = props;

    const [state, updateStateValue] = useState({});

    const setState = (value) => {
        updateStateValue((prevState) => ({
            ...prevState,
            ...value,
        }));
    };

    useEffect(() => {
        // Anything in here is fired on component mount.

        return () => {
            // Anything in here is fired on component unmount.
        };
    }, []);

    useEffect(() => {
        // Anything in here is fired on component did update.
    });

    return (
        <Router>
            <Routes>
                <Route path="/*" element={<RouterComponent {...props} />}/>
            </Routes>

            {rootDialogDTO.show == true ? <RootDialog {...props} /> : null}
            {isLoading == true ? <Loader/> : null}
            <ToastContainer position="top-center"/>
        </Router>
    );
};

const mapStateToProps = () => {
    return createStructuredSelector({
        exception: selectors.getException(),
        sideBarShow: selectors.getSideBarShow(),
        rootDialogDTO: selectors.getRootDialogDTO(),

        //--------------------------------------------------------------

        isUserAuthenticated: selectors.isUserAuthenticated(),
        isLoading: selectors.isLoading(),
    });
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateDTO: (payload) => {
            dispatch(actions.updateDTO(payload));
        },
    };
};

const withReducer = injectReducer({key: pageName, reducer: reducer});
const withSaga = injectSaga({key: pageName, saga: saga});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const enhance = compose(
    withReducer,
    withSaga,
    withConnect
)(withSuspense(index));

export default enhance;
