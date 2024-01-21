import { Button, Grid, Typography, Card, CardContent } from "@mui/material";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import "./style.css";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";
import Close from "../../components/images/cross.gif";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import * as Buttons from "../../web/Buttons";

const useStyles = makeStyles((theme) => ({
  card: {
    // backgroundImage: `url(${back_image})`,
    // backgroundSize: 'cover',
    // backgroundPosition: 'center',
    Width: 800,
    minHeight: "400px",
    // margin: "auto",
    marginLeft: "20px",
    marginTop: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: 8,
    transition: "box-shadow 0.2s ease-in-out",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  content: {
    paddingTop: "4px",
    paddingBottom: "4px",
  },
  table: {
    minWidth: 650,
    borderCollapse: "collapse",
  },
  tableCell: {
    padding: 0, // Remove padding from TableCell
    borderBottom: "none", // Remove bottom border for cells
  },
}));
const index = (props) => {
  const updateStateValue = (value) => {
    updateState((prevState) => ({
      ...prevState,
      ...value,
    }));
  };

  useEffect(() => {
    // Anything in here is fired on component mount.
    return () => {
      // Anything in here is fired on component unmount.
    };
  }, []);

  const { HistoryData, paymentHistoryModel, setPaymentHistoryModelSetValue } =
    props;

  //  belove code for vendor

  const classes = useStyles();
  return (
    <Dialog open={paymentHistoryModel} maxWidth="md">
      <DialogTitle>
        {" "}
        <div className="dialogheaderstyle">
          <Typography variant="h5">Vendor Payment History</Typography>
          <Buttons.CloseButton
            onClick={() => {
              setPaymentHistoryModelSetValue(false);
            }}
          />
        </div>
      </DialogTitle>
      <DialogContent>
        <Typography
          variant="h5"
          style={{ fontSize: "18px" }}
          className="cursive-text"
        >
          Order ID - {HistoryData ? HistoryData[0].orderId : ""}
        </Typography>
        <TableContainer component={Paper}>
          <Table size="small" stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableCell}>Invoice#</TableCell>
                <TableCell className={classes.tableCell}>PaymentDate</TableCell>
                <TableCell className={classes.tableCell}>PayAmount</TableCell>
                <TableCell className={classes.tableCell}>PaymentMode</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {HistoryData
                ? HistoryData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className={classes.tableCell}>
                        {row.id}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {moment(
                          row.paymentDateString,
                          "DD-MM-YYYY HH:mm"
                        ).format("DD-MM-YYYY")}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.payAmount}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.paymentMode}
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
};

export default index;
