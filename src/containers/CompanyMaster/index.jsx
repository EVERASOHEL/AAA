import React, { useEffect, useState } from "react";
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
import { compose } from "redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { injectReducer, injectSaga } from "redux-injectors";
import { withRouter } from "../../utilities/withRouter";
import { withSuspense } from "../../utilities/withSuspense";
import AutocompleteTextField from "../../web/AutocompleteTextField/";
import AssignmentIcon from "@mui/icons-material/Add";
import Tabelweb from "../../components/GenericTable/";
import Evelpractice from "../../components/GenericTable/evelpractice";
import AdvancedDataTable from "../AdvancedDataTable";
import { Close, Delete, Edit, SearchOffSharp } from "@mui/icons-material";
import _ from "lodash";

import * as actions from "./actions";
import { pageName } from "./constants";
import {headers} from "./constants"
import {keyMapping} from "./constants"
import reducer from "./reducer";
import saga from "./saga";
import * as selectors from "./selectors";

import HtmlComponent from "../../components/CompanyMaster";
import isNullOrIsEmptyOrIsUndefined from "../../utilities/CommonValidator";
import * as commonFunction from "../../utilities/CommonValidator";
import { makeStyles } from "@mui/styles";
import "./style.scss";
import { toast } from "react-toastify";
import * as Buttons from "../../web/Buttons";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import Button from '@mui/material/Button';

const useStyles = makeStyles((theme) => ({
  iconButton: {
    cursor: "pointer",
    "&:hover": {
      color: "red", // Change the color to your desired hover color
    },
  },
}));

const index = (props) => {
  // const [displayfilter, setdisplayfilter] = useState("none");
  // const [expanded, setExpanded] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  function updateStateValue(value) {
    updateState((prevState) => ({
      ...prevState,
      ...value,
    }));
  }

  useEffect(() => {
    // props.listRequest({ page: 0, size: 40});
    props.companyNameListForFilter();
    if (props.saveSuccess) {
      handleSaveSuccess(); // Trigger re-render
    }
    return () => {
    };
  }, [props.saveSuccess]);

  function handleSaveSuccess() {
    // Increment the refresh key to trigger re-render
    setRefreshKey((prevKey) => prevKey + 1);
  }

  

  const handleValidation = (key, classDTO) => {
    classDTO.isValidationSuccess = true;

    if (key === "all" || key === "companyType") {
      if (isNullOrIsEmptyOrIsUndefined(classDTO.companyType)) {
        classDTO.companyTypeError = "Please select company type";
        classDTO.isValidationSuccess = false;
      } else {
        classDTO.companyTypeError = "";
      }
    }

    if (key === "all" || key === "companyName") {
      if (isNullOrIsEmptyOrIsUndefined(classDTO.companyName)) {
        classDTO.companyNameError = "Please enter company name";
        classDTO.isValidationSuccess = false;
      } else if (
        isNullOrIsEmptyOrIsUndefined(classDTO.id) &&
        (props.getCompnayNameList || []).some(
          (list) => (list.value || "") == classDTO.companyName
        )
      ) {
        classDTO.companyNameError = "Company name already exists.";
      } else {
        classDTO.companyNameError = "";
      }
    }

    if (key === "all" || key === "address") {
      if (isNullOrIsEmptyOrIsUndefined(classDTO.address)) {
        classDTO.addressError = "Please enter address";
        classDTO.isValidationSuccess = false;
      } else {
        classDTO.addressError = "";
      }
    }

    if (key === "all" || key === "stateName") {
      if (isNullOrIsEmptyOrIsUndefined(classDTO.stateName)) {
        classDTO.stateNameError = "Please select state";
        classDTO.isValidationSuccess = false;
      } else {
        classDTO.stateNameError = "";
      }
    }
    return classDTO;
  };

  function handleClassDTO(key, value) {
    var classDTO = { ...props.classDTO };
    switch (key) {
      default:
        classDTO[key] = value;
    }
    classDTO = handleValidation(key, classDTO);
    props.updateClassDTO(classDTO);
  }

  function isModelOpen(isOpen) {
    props.isModelOpenRequest(isOpen);
  }

  function handleChangeSave(key) {
    var classDTO = { ...props.classDTO };
    var { submitCompnayRequestForm } = props;
    classDTO = handleValidation(key, classDTO);
    if (classDTO.isValidationSuccess === true) {
      let finalDTO = {
        id: classDTO.id,
        companyType: classDTO.companyType,
        companyName: classDTO.companyName,
        address: classDTO.address,
        phoneNo: classDTO.phoneNo,
        stateName: classDTO.stateName,
        companyGstNo: classDTO.companyGstNo,
        companyPanNumber: classDTO.companyPanNumber,
      };
      submitCompnayRequestForm(finalDTO);
    } else {
      props.updateClassDTO(classDTO);
    }
  }

  function CompnayMasterRequest() {
    return (
      <>
        {props.open === true ? (
          <HtmlComponent
            {...props}
            handleClassDTO={handleClassDTO}
            classDTO={props.classDTO}
            open={props.open}
            isModelOpen={isModelOpen}
            handleChangeSave={handleChangeSave}
          />
        ) : null}
      </>
    );
  }

  const classes = useStyles();
  function ActionFunction(data) {
    return (
      <>
        <Buttons.EditButton
          onClick={() => {
            let classDTO = {
              id: data.id,
              companyName: data.companyName,
              companyType: data.companyType,
              address: data.address,
              phoneNo: data.phoneNo,
              stateName: data.stateName,
              companyGstNo: data.companyGstNo,
              companyPanNumber: data.companyPanNumber,
            };
            props.openEditModel(classDTO);
          }}
        />
        <Buttons.DeleteButton
          onClick={() => {
            props.deleteCompany(data.id);
          }}
        />
      </>
    );
  }

  const handleFilterClick = () => {
    setExpanded((prevExpanded) => !prevExpanded);
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
          values: props.allTypeCompanyNameList || []
        },
      ],
      url: "", // API endpoint for filtering
      method: "GET", // HTTP method for the filter API
    };

    return filters;
  };

  const filters = setFilter();
  

  // function handlechangelistPagination(payload) {
  //   props.listRequest(payload);
  // }

  // render() {
    return (
      <>
        {CompnayMasterRequest()}
        <AdvancedDataTable
          key={refreshKey}
          {...props}
          url="/api/companyController/getCompanylist"
          headers={headers}
          keyMapping={[
            { key: "No" },
            { key: "companyName" },
            { key: "companyType" },
            { key: "phoneNo" },
            { key: "stateName" },
            { key: "companyGstNo" },
            { evalFunction: ActionFunction },
          ]}
          title={"Company Master"}
          isModelOpen={isModelOpen}
          filters={filters}
        />
      </>
    );
  // }
};

const mapStateToProps = () => {
  return createStructuredSelector({
    classDTO: selectors.getClassDTO(),
    responseDTO: selectors.getResponseDTO(),
    open: selectors.open(),
    // companylist: selectors.companylist(),
    // currentPage: selectors.currentPage(),
    // currentPageSize: selectors.currentPageSize(),
    getCompnayNameList: selectors.getCompnayNameList(),
    saveSuccess: selectors.handleSaveSuccess(),
    allTypeCompanyNameList: selectors.getAllTypeCompanyNameList(),
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
    submitCompnayRequestForm: (payload) => {
      dispatch(actions.submitCompnayRequestForm(payload));
    },
    isModelOpenRequest: (payload) => {
      dispatch(actions.isModelOpen(payload));
    },
    listRequest: (payload) => {
      dispatch(actions.listRequest(payload));
    },
    openEditModel: (payload) => {
      dispatch(actions.openEditModel(payload));
    },
    deleteCompany: (payload) => {
      dispatch(actions.deleteCompany(payload));
    },
    companyNameList: () => {
      dispatch(actions.companyNameList());
    },
    companyNameListForFilter: () => {
      dispatch(actions.companyNameListForFilter());
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
