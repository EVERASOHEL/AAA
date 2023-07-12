import {
    Paper,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material"
import {Delete, Edit} from "@mui/icons-material";
import {TableBody} from "@mui/material";
import React, {Component} from "react";

export default class index extends Component {
    render() {
        const {headers, dataList, keyMapping} = this.props;
        return (
            <div>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 900}} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                {headers && headers.length > 0
                                    ? headers.map((x) => {
                                        return (
                                            <TableCell align="left" key={x.title}
                                                       colSpan={x.title === "Action_Edit_Delete" ? 2 : null}>
                                                {x.title !== "Action_Edit_Delete" ? x.title : "Action"}
                                            </TableCell>
                                        );
                                    })
                                    : ""}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataList && dataList.length > 0
                                ? dataList.map((row, index) => {
                                    return (
                                        <TableRow key={index}>
                                            {keyMapping.map((column, col_index) => {
                                                return (
                                                    <TableCell key={col_index}>
                                                        {row[column.key]}
                                                        {column.key === "Edit_Delete" ? <><Edit/><Delete/></> : null}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })
                                : ""}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}
