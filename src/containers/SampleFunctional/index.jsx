import React, {Component, useEffect, useState} from "react";

import {compose} from "redux";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {injectReducer, injectSaga} from "redux-injectors";
import {withRouter} from "../../utilities/withRouter";
import {withSuspense} from "../../utilities/withSuspense";
import _ from "lodash";

import * as actions from "./actions";
import {pageName} from "./constants";
import reducer from "./reducer";
import saga from "./saga";
import * as selectors from "./selectors";

import HtmlComponent from "../../components/SampleFunctional";
import {render} from "@testing-library/react";

// const index = (props) => {
class index extends Component {
    constructor(props) {
        super(props);
    }

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

    handleChangeProduct = (key, value) => {
        const updateClassDTO = {...this.props.updateClassDTO};
        var classDTO = {...this.props.classDTO};
        switch (key) {
            default:
                classDTO[key] = value;
                break;
        }
        this.props.updateClassDTO(classDTO);
    };

    // const handleButtons = (name, value) => {
    //   var classDTOClone = _.cloneDeep(classDTO);

    //   switch (name) {
    //     default: {
    //       break;
    //     }
    //   }
    // };

    // const checkValidation = (field, classDTO) => {
    //   // const { announcementTitle } = classDTO;
    //   // classDTO.isValidationSuccess = true;

    //   // if (field == "all" || field == "announcementTitle") {
    //   //   if (isNullOrIsEmptyOrIsUndefinedWithTrim(announcementTitle)) {
    //   //     classDTO.announcementTitleError = "Please enter title";
    //   //     classDTO.isValidationSuccess = false;
    //   //   } else {
    //   //     classDTO.announcementTitleError = "";
    //   //   }
    //   // }

    //   return classDTO;
    // };

    // console.log("classDTO1 : ",classDTO);

    render() {
        return (
            <>
                <HtmlComponent
                    {...this.props}
                    classDTO={this.props.classDTO}
                    handleChangeProduct={this.handleChangeProduct}
                />
            </>
        );
    }
}

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
    };
};

const withReducer = injectReducer({key: pageName, reducer});
const withSaga = injectSaga({key: pageName, saga});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const enhance = compose(
    withReducer,
    withSaga,
    withConnect
)(withSuspense(withRouter(index)));

export default enhance;
