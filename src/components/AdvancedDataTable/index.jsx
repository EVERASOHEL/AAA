import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { TableBody } from "@mui/material";
import React, { Component } from "react";
import Pagination from "../Shared/Pagination/tablePagination";
import "./styles.scss";
import { ClipLoader } from "react-spinners";
import isNullOrIsEmptyOrIsUndefined from "../../utilities/CommonValidator";
import TextFieldOutlined from "../../web/TextField/TextFieldOutlined";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { FaFilter } from "react-icons/fa";
import AssignmentIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import { MultipleSelect } from "../../web/TextField/MultipleSelect";
import AutocompleteTextField from "../../web/AutocompleteTextField/AutocompleteTextField_1.0";

export default class index extends Component {
  constructor() {
    super();
    this.state = {
      page: 0,
      rowsPerPage: 10,
      expanded: false,
    };
  }

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: +event.target.value });
    this.setState({ page: 0 });
    this.props.handlechangelistPagination({
      page: this.state.page,
      size: event.target.value,
    });
  };

  ElementFunction = (element, innerElement) => {
    if (innerElement.evalFunction) {
      if (innerElement.evalFunction instanceof Function) {
        if (innerElement.key) {
          return innerElement.evalFunction(element[innerElement.key]);
        } else {
          return innerElement.evalFunction(element);
        }
      } else {
        return eval(
          "props.functions." +
            innerElement.evalFunction +
            "('" +
            element[innerElement.key] +
            "')"
        );
      }
    } else {
      return element[innerElement.key];
    }
  };

  ElementHeaderFunction = (innerElement) => {
    if (innerElement.evalFunction) {
      if (innerElement.evalFunction instanceof Function) {
        if (innerElement.key) {
          return innerElement.evalFunction(innerElement.title);
        } else {
          return innerElement.evalFunction(innerElement);
        }
      } else {
        return eval(
          "props.functions." +
            innerElement.evalFunction +
            "('" +
            innerElement.title +
            "')"
        );
      }
    } else {
      return innerElement.title;
    }
  };

  handleFilterClick = () => {
    this.setState((prevState) => ({
      expanded: !prevState.expanded,
    }));
  };

  render() {
    const {
      headers,
      dataList,
      keyMapping,
      currentPage,
      currentPageSize,
      title,
      filters,
      handleFilterChange,
      selectedFilters,
      handleFilterSubmitButton,
      resetFilters
    } = this.props;

    const [firstObject] = dataList || [];
    const { totalcount } = firstObject || {};

    const keysOnly = keyMapping
      .filter((item) => item.key !== undefined)
      .map((item) => item.key);

    const filteredDataList = (dataList || []).map((data) => {
      const filteredData = {};
      keysOnly.forEach((key) => {
        if (data.hasOwnProperty(key)) {
          filteredData[key] = data[key];
        }
      });
      return filteredData;
    });

    const renderFilters = () => {
      const components = (filters && filters.components) || [];

      const rows = [];
      for (let i = 0; i < components.length; i += 3) {
        rows.push(components.slice(i, i + 3));
      }

      return rows.map((row, rowIndex) => (
        <Grid container spacing={2} key={rowIndex}>
          {row.map((filter) => (
            <Grid item xs={4} key={filter.payloadKey}>
              {renderFilterComponent(filter)}
            </Grid>
          ))}
        </Grid>
      ));
    };

    const renderFilterComponent = (filter) => {
      switch (filter.component) {
        case "singleSelect":
          return (
            <AutocompleteTextField
              name={filter.key}
              id={filter.key}
              label={filter.label}
              options={(filter.values || []).map((item) => ({
                value: item.value,
                display: item.display,
              }))}
              value={
                (selectedFilters &&
                  selectedFilters[filter ? filter.payloadKey : ""]) ||
                ""
              }
              onChange={(event, value) =>
                handleFilterChange(filter.payloadKey, value)
              }
            />
          );
        default:
          return null;
      }
    };

    return (
      <div>
        <div style={{ marginTop: "15px" }}>
          <div style={{ display: "flex" }}>
            <Container maxWidth="lg">
              <Card sx={{ minWidth: 500, textAlign: "center" }}>
                <CardContent>
                  <Accordion expanded={this.state.expanded}>
                    <AccordionSummary
                      aria-controls="panel3-content"
                      id="panel3-header"
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                      >
                        <Typography textAlign="-webkit-left">
                          <Button
                            className=""
                            variant="contained"
                            color="primary"
                            size="small"
                            sx={{
                              bgcolor: "#33A1C9",
                              color: "ButtonHighlight",
                              "&:hover": {
                                bgcolor: "#33A1C9", // Keep the same background color on hover
                              },
                            }}
                            startIcon={<FaFilter />}
                            onClick={this.handleFilterClick}
                          >
                            Filter
                          </Button>
                        </Typography>
                        <Typography textAlign="-webkit-center">
                          <h5
                            className="cursive-text"
                            style={{
                              fontSize: "1.5rem", // Adjust font size
                              fontWeight: "bold", // Optional: Make it bold
                              color: "#333", // Optional: Set a custom color
                            }}
                          >
                            {title}
                          </h5>
                        </Typography>
                        <Typography textAlign="-webkit-right">
                          <Button
                            className="addproduct"
                            variant="contained"
                            size="small"
                            startIcon={<AssignmentIcon />}
                            onClick={() => this.props.isModelOpen(true)}
                          >
                            Request
                          </Button>
                        </Typography>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails
                      style={{ display: "flex", justifyContent: "flex-start" }}
                    >
                      <div className="container-fluid">{renderFilters()}</div>
                    </AccordionDetails>
                    <AccordionActions>
                      <Button
                        onClick={() => {
                          resetFilters();
                          this.setState({ expanded: false });
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => {
                          this.props.handleFilterSubmitButton();
                          this.setState({ expanded: false });
                        }}
                      >
                        Submit
                      </Button>
                    </AccordionActions>
                  </Accordion>
                  <hr />
                  <Paper style={{ width: "100%" }}>
                    <TableContainer
                      component={Paper}
                      style={{ maxHeight: "350px", overflow: "scroll" }}
                    >
                      <Table
                        sx={{ minWidth: 900 }}
                        size="small"
                        stickyHeader
                        aria-label="sticky table"
                      >
                        <TableHead>
                          <TableRow>
                            {headers && headers.length > 0
                              ? headers.map((x) => {
                                  return (
                                    <TableCell
                                      align="left"
                                      key={x.title}
                                      style={{
                                        backgroundColor: "#efefef",
                                        fontWeight: "600",
                                      }}
                                    >
                                      {/* {x.title} */}
                                      {this.ElementHeaderFunction(x)}
                                    </TableCell>
                                  );
                                })
                              : ""}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {!isNullOrIsEmptyOrIsUndefined(dataList) ? (
                            dataList.length > 0 ? (
                              dataList
                                .slice(
                                  this.state.page * currentPageSize,
                                  this.state.page * currentPageSize +
                                    currentPageSize
                                )
                                .map((row, index) => {
                                  return (
                                    <TableRow key={index} className="tableRow">
                                      {keyMapping.map((column, col_index) => {
                                        return (
                                          <TableCell key={col_index}>
                                            {this.ElementFunction(row, column)}
                                          </TableCell>
                                        );
                                      })}
                                    </TableRow>
                                  );
                                })
                            ) : null
                          ) : (
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
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[10, 25, 100]}
                      component="div"
                      count={totalcount || 20}
                      rowsPerPage={currentPageSize}
                      page={this.state.page}
                      onPageChange={this.handleChangePage}
                      onRowsPerPageChange={this.handleChangeRowsPerPage}
                    />
                  </Paper>
                </CardContent>
              </Card>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}
