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

export default class index extends Component {
  constructor() {
    super();
    this.state = {
      page: 0,
      rowsPerPage: 50,
    };
  }

  //

  //     const [page, setPage] = React.useState(0);
  //   const [rowsPerPage, setRowsPerPage] = React.useState(10);

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
    // setPage(newPage);
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: +event.target.value });
    this.setState({ page: 0 });
    this.props.handlechangelistPagination({
      page: this.state.page,
      size: event.target.value,
    });
    // setRowsPerPage(+event.target.value);
    // setPage(0);
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

  render() {
    const { headers, dataList, keyMapping, currentPage, currentPageSize } =
      this.props;

    const [firstObject] = dataList || [];
    const { totalcount } = firstObject || {};

    return (
      <div>
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
                        this.state.page * currentPageSize + currentPageSize
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
                  <></>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[50, 100, 200]}
            component="div"
            count={totalcount || 50}
            rowsPerPage={this.state.rowsPerPage}
            page={this.state.page}
            onPageChange={this.handleChangePage}
            onRowsPerPageChange={this.handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    );
  }
}
