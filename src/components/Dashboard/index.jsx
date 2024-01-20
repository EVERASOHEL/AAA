import { Card, CardContent } from "@mui/material";
import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import "./style.css";
import "react-toastify/dist/ReactToastify.css";
import CircleProgressBar from "../CircleProgressBar";
import "react-toastify/dist/ReactToastify.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import * as findPecentage from "../../utilities/CommonFunction";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 730,
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

  const {
    vendorcustomerAmountData,
  } = props;

  const classes = useStyles();

  // get value for Vendor
  let totalPaidAmount = vendorcustomerAmountData ? vendorcustomerAmountData[0]["totalReceivableOrPayable"] : "00";
  let totalPurchaseAmount = vendorcustomerAmountData ? vendorcustomerAmountData[0]["totalAmount"] : "00";

  // get value for Customer
  let totalReceivableAmount = vendorcustomerAmountData ? vendorcustomerAmountData[1]["totalReceivableOrPayable"] : "00";
  let totalSalesAmount = vendorcustomerAmountData ? vendorcustomerAmountData[1]["totalAmount"] : "00";

  // Data for vendor
  const vendorData = findPecentage.getDataArray(
    "Total Paid Amount",
    totalPaidAmount,
    totalPurchaseAmount
  );

  // Data for customer
  const customerData = findPecentage.getDataArray(
    "Total Receivables",
    totalReceivableAmount,
    totalSalesAmount
  );

  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <div style={{ display: "flex" }}>
          <CircleProgressBar
            pieData={vendorData}
            totalPaidOrReceivableAmount={totalPaidAmount}
            totalAmount={totalPurchaseAmount}
            titleheader="Total Payables"
          />
          <CircleProgressBar
            pieData={customerData}
            totalPaidOrReceivableAmount={totalReceivableAmount}
            totalAmount={totalSalesAmount}
            titleheader="Total Receivables"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default index;
