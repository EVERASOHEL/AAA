// import React, { useState } from "react";
import HtmlComponent from "../../components/ProductMaster";
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
import { createStructuredSelector } from "reselect";
import { injectReducer, injectSaga } from "redux-inject-reducer-and-saga";
// import React, { Component } from "react";
import { pageName } from "./constant";
import reducer from "./reducer";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "./action";
import saga from "./saga";
import Tabelweb from "../../components/GenericTable/";
import { Close, SearchOffSharp } from "@mui/icons-material";
import AutocompleteTextField from "../../web/AutocompleteTextField/";
import AssignmentIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import { withRouter } from "../../utilities/withRouter";
import { withSuspense } from "../../utilities/withSuspense";
import { Component } from "react";
import * as selectors from "./selector";
import TextFieldOutlined from "../../web/TextField/TextFieldOutlined";

const index = (props) => {

  useEffect(() => {
    console.log("hello world");
  });

  const initialvalues = {
    open: false,
    displayfilter: "none",
  };
  const [data, setData] = useState(initialvalues);

  const updateStateValue = (value) => {
    setData((prevState) => ({
      ...prevState,
      ...value,
    }));
  };

  // render() {
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
  ];

  function handleclassDTO(key, value) {
    var classDTO = { ...this.props.classDTO };
    classDTO[key] = value;
  }

  function ProductclassDTO(product) {
    const { submitProductRquestForm } = props;
    let finalDTO = product.map((x) => {
      return {
        productName: x.pname,
        productPrice: x.pprice,
        productHsn: x.hsccode,
      };
    });
    console.log("finalDTO : ", finalDTO);
    submitProductRquestForm(finalDTO);
  }

  function isModelOpen(isOpen) {
    // this.props.modelOpenRequest(isOpen);
    // setData({ open: isOpen });
  }

  return (
    <>
      {/* {this.state.open === true ? ( */}
      {data.open === true ? (
        <HtmlComponent
          {...props}
          handleclassDTO={handleclassDTO}
          ProductclassDTO={ProductclassDTO}
          open={this.props.open}
          isModelOpen={isModelOpen}
        />
      ) : null}
      <div style={{ marginTop: "65px" }}>
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
                      onClick={() => setData({ displayfilter: "block" })}
                    >
                      Filter
                    </Button>
                  </Typography>
                  <Box
                    className="card-shadow"
                    sx={{ minWidth: 300 }}
                    style={{ display: `${data.displayfilter}` }}
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
                            () => setData({ displayfilter: "none" })
                            // setFilterValue("none")
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
                      Add Product
                    </Button>
                  </Typography>
                </div>
                <hr />
                <Tabelweb
                  dataList={rows}
                  headers={[
                    { title: "No" },
                    { title: "Product Name" },
                    { title: "Created Date" },
                    { title: "Price" },
                    { title: "Hsc" },
                    { title: "Action_Edit_Delete" },
                  ]}
                  keyMapping={[
                    {
                      key: "name",
                    },
                    {
                      key: "calories",
                    },
                    {
                      key: "fat",
                    },
                    {
                      key: "carbs",
                    },
                    {
                      key: "protein",
                    },
                    {
                      key: "Edit_Delete",
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
    // responseDTO: selectors.getResponseDTO(),
    open: selectors.open(),
  });
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateClassDTO: (payload) => {
      dispatch(actions.updateClassDTO(payload));
    },
    submitProductRquestForm: (data) => {
      dispatch(actions.submitProductRquestForm(data));
    },
    registration: (data) => {
      dispatch(actions.registration(data));
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

export default index;
