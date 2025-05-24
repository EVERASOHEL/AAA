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
import Evelpractice from "../../../components/GenericTable/evelpractice";
import { Close, Delete, Edit, SearchOffSharp } from "@mui/icons-material";
import _ from "lodash";

import * as actions from "./actions";
import { pageName } from "./constants";
import reducer from "./reducer";
import saga from "./saga";
import * as selectors from "./selectors";

import HtmlComponent from "../../../components/Expense/ExpenseCategory";
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
    props.companyNameList({companyType:"Expense"});
    return () => {
      // Anything in here is fired on component unmount.
    };
  }, []);

  const handleValidation = (key, classDTO) => {
    classDTO.isValidationSuccess = true;

    if (key === "all" || key === "companyId") {
      if (isNullOrIsEmptyOrIsUndefined(classDTO.companyId)) {
        classDTO.compayNameError = "Please select company.";
        classDTO.isValidationSuccess = false;
      } else {
        classDTO.compayNameError = "";
      }
    }

    if (key === "all" || key === "categoryName") {
      if (isNullOrIsEmptyOrIsUndefined(classDTO.categoryName)) {
        classDTO.categoryNameError = "Please enter expense name.";
        classDTO.isValidationSuccess = false;
      } else {
        classDTO.categoryNameError = "";
      }
    }

    if (key === "all" || key === "description") {
      if (isNullOrIsEmptyOrIsUndefined(classDTO.description)) {
        classDTO.descriptionError = "Please enter expense description.";
        classDTO.isValidationSuccess = false;
      } else {
        classDTO.descriptionError = "";
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
    var {submitExpenseCategoryRequestForm} = props;
    classDTO = handleValidation(key, classDTO);
    if (classDTO.isValidationSuccess === true) {
      let finalDTO = {
        expenseCategoryId: classDTO.expenseCategoryId,
        companyId: classDTO.companyId,
        categoryName: classDTO.categoryName,
        description: classDTO.description,
      };
      submitExpenseCategoryRequestForm(finalDTO);
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
            getCompnayNameList={props.getCompnayNameList}
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
                      Add ExpenseCategory
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
    submitExpenseCategoryRequestForm: (payload) => {
      dispatch(actions.submitExpenseCategoryRequestForm(payload));
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
    companyNameList: (payload) => {
      dispatch(actions.companyNameList(payload));
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
