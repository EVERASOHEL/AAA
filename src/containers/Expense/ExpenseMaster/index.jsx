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
import { withRouter } from "../../../utilities/withRouter";
import { withSuspense } from "../../../utilities/withSuspense";
import AutocompleteTextField from "../../../web/AutocompleteTextField/";
import AssignmentIcon from "@mui/icons-material/Add";
import Tabelweb from "../../../components/GenericTable/";
import Evelpractice from "../../../components/GenericTable/evelpractice";
import { Close, Delete, Edit, SearchOffSharp } from "@mui/icons-material";
import _ from "lodash";

import * as actions from "./actions";
import { pageName } from "./constants";
import reducer from "./reducer";
import saga from "./saga";
import * as selectors from "./selectors";

import HtmlComponent from "../../../components/CompanyMaster";
import isNullOrIsEmptyOrIsUndefined from "../../../utilities/CommonValidator";
import * as commonFunction from "../../../utilities/CommonValidator";
import { makeStyles } from "@mui/styles";
import "./style.scss";
import { toast } from "react-toastify";
import * as Buttons from "../../../web/Buttons";

const useStyles = makeStyles((theme) => ({
  iconButton: {
    cursor: "pointer",
    "&:hover": {
      color: "red", // Change the color to your desired hover color
    },
  },
}));

const index = (props) => {
  const [displayfilter, setdisplayfilter] = useState("none");

  function updateStateValue(value) {
    updateState((prevState) => ({
      ...prevState,
      ...value,
    }));
  }

  useEffect(() => {
    // Anything in here is fired on component mount.
    props.listRequest({ page: 0, size: 20 });
    props.companyNameList();
    return () => {
      // Anything in here is fired on component unmount.
    };
  }, []);

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

    // else if(classDTO.phoneNo.toString().length!==12){
    //   classDTO.phoneNoError = "Please enter 12 number of phone no.";
    // }
    // if (key === "all" || key === "phoneNo") {
    //   if (isNullOrIsEmptyOrIsUndefined(classDTO.phoneNo)) {
    //     classDTO.phoneNoError = "Please enter phone number";
    //     classDTO.isValidationSuccess = false;
    //   } else if (!commonFunction.isNotEmptyAndValidNumber(classDTO.phoneNo)) {
    //     classDTO.isValidationSuccess = false;
    //     classDTO.phoneNoError = "Please enter valid number";
    //   } else {
    //     classDTO.phoneNoError = "";
    //   }
    // }

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

    // if (key === "all") {
    //   if (
    //     isNullOrIsEmptyOrIsUndefined(classDTO.companyGstNo) &&
    //     isNullOrIsEmptyOrIsUndefined(classDTO.companyPanNumber)
    //   ) {
    //     toast.error("Please insert the GST Number or Pan number.");
    //     classDTO.isValidationSuccess = false;
    //   }
    // }

    // if (key === "all" || key === "companyGstNo") {
    //   if (isNullOrIsEmptyOrIsUndefined(classDTO.companyGstNo)) {
    //     classDTO.companyGstNoError = "Please enter Gst No";
    //     classDTO.isValidationSuccess = false;
    //   } else {
    //     classDTO.companyGstNoError = "";
    //   }
    // }

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
    var {submitCompnayRequestForm} = props;
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

        {/* <Edit
          className={classes.iconButton}
          onClick={() => {
            let classDTO = {
              id: data.id,
              companyName: data.companyName,
              address: data.address,
              phoneNo: data.phoneNo,
              stateName: data.stateName,
              companyGstNo: data.companyGstNo,
            };
            props.openEditModel(classDTO);
          }}
        /> */}
        {/* <Delete
          className={classes.iconButton}
          onClick={()=>{
            props.deleteCompany(data.id);
          }}
        /> */}
      </>
    );
  }

  function handlechangelistPagination(payload) {
    props.listRequest(payload);
  }

  // render() {
  return (
    <>
      {CompnayMasterRequest()}
      <div style={{ marginTop: "15px" }}>
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
                      onClick={
                        () => setdisplayfilter("block")
                        // this.setState({ displayfilter: "block" })
                      }
                    >
                      Filter
                    </Button>
                  </Typography>
                  <Box
                    className="card-shadow"
                    sx={{ minWidth: 300 }}
                    style={{ display: `${displayfilter}` }}
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
                        {/* <Avatar sx={{width: 15, height: 15 , bgcolor: pink[500] }}> */}
                        {/* </Avatar> */}
                        <Close
                          color="red"
                          className="closebutton"
                          onClick={
                            () => setdisplayfilter("none")
                            // this.setState({ displayfilter: "none" })
                          }
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
                      Add Company
                    </Button>
                  </Typography>
                </div>
                <hr />
                <Evelpractice
                  dataList={props.companylist}
                  currentPage={props.currentPage}
                  currentPageSize={props.currentPageSize}
                  handlechangelistPagination={handlechangelistPagination}
                  headers={[
                    { title: "No" },
                    { title: "Company Name" },
                    // { title: "Address" },
                    { title: "Company Type" },
                    { title: "Phone No" },
                    { title: "State" },
                    { title: "GST No" },
                    { title: "Action" },
                  ]}
                  keyMapping={[
                    {
                      key: "No",
                    },
                    {
                      key: "companyName",
                    },
                    // {
                    //   key: "address",
                    // },
                    {
                      key: "companyType",
                    },
                    {
                      key: "phoneNo",
                    },
                    {
                      key: "stateName",
                    },
                    {
                      key: "companyGstNo",
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
      </div>
    </>
  );
  // }
};

const mapStateToProps = () => {
  return createStructuredSelector({
    classDTO: selectors.getClassDTO(),
    responseDTO: selectors.getResponseDTO(),
    open: selectors.open(),
    companylist: selectors.companylist(),
    currentPage: selectors.currentPage(),
    currentPageSize: selectors.currentPageSize(),
    getCompnayNameList: selectors.getCompnayNameList(),
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
