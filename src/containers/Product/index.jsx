import React, { Component, useEffect, useState } from "react";

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

import HtmlComponent from "../../components/Product";
import Tabelweb from "../../components/GenericTable/evelpractice";
import { Close, SearchOffSharp } from "@mui/icons-material";
import AutocompleteTextField from "../../web/AutocompleteTextField/";
import AssignmentIcon from "@mui/icons-material/Add";
import { Delete, Edit } from "@mui/icons-material";
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
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  iconButton: {
    cursor: "pointer",
    "&:hover": {
      color: "red", // Change the color to your desired hover color
    },
  },
}));

const index = (props) => {
  useEffect(() => {
    // Anything in here is fired on component mount.
    props.listRequest({ page: 0, size: 20 });
    return () => {
      // Anything in here is fired on component unmount.
    };
  }, []);

  const initialvalues = {
    open: false,
    displayfilter: "none",
    productListForEdit: [],
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
    let finalDTO = [];
    product.map((x) => {
      finalDTO.push({
        id: x.id,
        productName: x.pname,
        sellingPrice: x.sellingprice,
        costPrice: x.costprice,
        productHsn: x.hsccode,
        gstPercentage: x.gstpercentage,
        productType: x.productType,
      });
    });
    submitProductRquestForm(finalDTO);
  }

  function isModelOpen(isOpen) {
    props.modelOpenRequest(isOpen);
  }

  function handlechangelistPagination(payload) {
    props.listRequest(payload);
  }

  const classes = useStyles();
  function ActionFunction(data) {
    return (
      <>
        <Edit
          className={classes.iconButton}
          onClick={() => {
            let classDTO = {
              id: data.id,
              pname: data.productName,
              sellingprice: data.sellingPrice,
              costprice: data.costPrice,
              hsccode: data.productHsn,
              productType: data.productType,
              gstpercentage: data.gstPercentage,
            };
            setData({ productListForEdit: classDTO });
            isModelOpen(true);
          }}
        />
        <Delete
          className={classes.iconButton}
          onClick={() => {
            props.deleteProduct(data.id);
          }}
        />
      </>
    );
  }

  return (
    <>
      {/* {this.state.open === true ? ( */}
      {props.open === true ? (
        <HtmlComponent
          {...props}
          handleclassDTO={handleclassDTO}
          ProductclassDTO={ProductclassDTO}
          open={props.open}
          isModelOpen={isModelOpen}
          productListForEdit={data.productListForEdit}
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
                  dataList={props.productlist}
                  currentPage={props.currentPage}
                  currentPageSize={props.currentPageSize}
                  handlechangelistPagination={handlechangelistPagination}
                  headers={[
                    { title: "No" },
                    { title: "Product Name" },
                    { title: "Selling Price" },
                    { title: "Cost Price" },
                    { title: "Hsc Code" },
                    { title: "GST Type" },
                    { title: "Product Type" },
                    { title: "Action" },
                  ]}
                  keyMapping={[
                    {
                      key: "No",
                    },
                    {
                      key: "productName",
                    },
                    {
                      key: "sellingPrice",
                    },
                    {
                      key: "costPrice",
                    },
                    {
                      key: "productHsn",
                    },
                    {
                      key: "gstPercentage",
                    },
                    {
                      key: "productType",
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
    open: selectors.open(),
    productlist: selectors.productlist(),
    currentPage: selectors.currentPage(),
    currentPageSize: selectors.currentPageSize(),
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
    listRequest: (payload) => {
      dispatch(actions.listRequest(payload));
    },
    deleteProduct: (payload) => {
      dispatch(actions.deleteProduct(payload));
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
