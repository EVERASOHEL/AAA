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
import * as Buttons from "../../web/Buttons";
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
import { MultipleSelect } from "../../web/TextField/MultipleSelect";

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
    props.getAllProductName();
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

  function handleclassDTO(key, value) {
    var classDTO = { ...props.classDTO };
    classDTO[key] = value;
    props.updateClassDTO(classDTO);
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
        <Buttons.EditButton
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
        <Buttons.DeleteButton
          onClick={() => {
            props.deleteProduct(data.id);
          }}
        />
        {/* <Edit
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
        /> */}
        {/* <Delete
          className={classes.iconButton}
          onClick={() => {
            props.deleteProduct(data.id);
          }}
        /> */}
      </>
    );
  }

  const employees = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
    { id: 4, name: 'David' }
  ];

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
          productNameList={props.productNameList}
        />
      ) : null}
      <div style={{ marginTop: "15px" }}>
        <div style={{ display: "flex" }}>
          <Container maxWidth="lg">
            <Card sx={{ minWidth: 800, textAlign: "center" }}>
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
                    sx={{ minWidth: 500 }}
                    style={{ display: `${data.displayfilter}` }}
                  >
                    <Grid container spacing={2} className="filtergrid">
                      <Grid item xs={7}>
                        {/* <AutocompleteTextField width="200px" /> */}
                        <div className="form-check form-check-inline multi-sel-wdth">
                          <MultipleSelect
                            // disabled={
                            //   !(
                            //     classDTO.shortFallEmailEmployee &&
                            //     classDTO.shortFallFrequency
                            //   )
                            // }
                            options={(
                              employees || []
                            ).map((element) => element.name || "")}
                            value={(
                              (props.classDTO || []).shortFallEmailEmployeeList || []
                            ).map((element) => element.name || "")}
                            onChange={(event, value, reason) => {
                              const selectedActiveEmployeeListWithID = (
                                employees || []
                              ).filter((element) =>
                                (value || []).includes(element.name)
                              );

                              handleclassDTO(
                                "shortFallEmailEmployeeList",
                                selectedActiveEmployeeListWithID
                              );
                              // handleclassDTO("shortFallEmailEmployeeError", "");
                            }}
                          />
                        </div>
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
                    { title: "Total Stock" },
                    { title: "Selling Price" },
                    { title: "Cost Price" },
                    { title: "Hsc Code" },
                    // { title: "GST Type" },
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
                      key: "totalStock",
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
                    // {
                    //   key: "gstPercentage",
                    // },
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
    productNameList: selectors.productNameList(),
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
    modelOpenRequest: (data) => {
      dispatch(actions.isModelOpen(data));
    },
    listRequest: (payload) => {
      dispatch(actions.listRequest(payload));
    },
    deleteProduct: (payload) => {
      dispatch(actions.deleteProduct(payload));
    },
    getAllProductName: () => {
      dispatch(actions.getAllProductName());
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
