import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Box,
  Paper,
} from "@mui/material";
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
    marginLeft: "0px",
    marginTop: "0px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "0px",
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

  const { vendorcustomerAmountData } = props;

  const classes = useStyles();

  // get value for Vendor
  let totalPaidAmount = vendorcustomerAmountData
    ? vendorcustomerAmountData[0]["totalReceivableOrPayable"]
    : "00";
  let totalPurchaseAmount = vendorcustomerAmountData
    ? vendorcustomerAmountData[0]["totalAmount"]
    : "00";

  // get value for Customer
  let totalReceivableAmount = vendorcustomerAmountData
    ? vendorcustomerAmountData[1]["totalReceivableOrPayable"]
    : "00";
  let totalSalesAmount = vendorcustomerAmountData
    ? vendorcustomerAmountData[1]["totalAmount"]
    : "00";

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

  const products = [
    {
      id: "01",
      name: "Home Decor Range",
      popularity: 0.45,
      color: "bg-blue-500",
      sales: "45%",
      badgeColor: "bg-blue-100 text-blue-500",
    },
    {
      id: "02",
      name: "Disney Princess Pink Bag 18’",
      popularity: 0.29,
      color: "bg-green-500",
      sales: "29%",
      badgeColor: "bg-green-100 text-green-500",
    },
    {
      id: "03",
      name: "Bathroom Essentials",
      popularity: 0.18,
      color: "bg-purple-500",
      sales: "18%",
      badgeColor: "bg-purple-100 text-purple-500",
    },
    {
      id: "04",
      name: "Apple Smartwatches",
      popularity: 0.25,
      color: "bg-orange-500",
      sales: "25%",
      badgeColor: "bg-orange-100 text-orange-500",
    },
  ];

  // Find the top most sell product
  const topProduct = products.reduce(
    (max, product) => (product.popularity > max.popularity ? product : max),
    products[0]
  );

  const ProductCard = ({ product }) => (
    <Paper
      elevation={2}
      style={{
        padding: 12,
        minWidth: 130,
        maxWidth: 150,
        margin: 0,
        background: "#fff",
        borderRadius: 16,
        flex: "1 1 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        boxShadow: "0 2px 8px rgba(33,150,243,0.08)",
      }}
    >
      <Typography
        variant="subtitle2"
        style={{
          fontWeight: 500,
          fontSize: 12,
          color: "#1976d2",
          marginBottom: 8,
          letterSpacing: 0.2,
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
          width: "100%",
        }}
        gutterBottom
        noWrap
      >
        {product.name}
      </Typography>
      <Box display="flex" alignItems="center" width="100%">
        <Box width="80%" mr={1} position="relative">
          <LinearProgress
            variant="determinate"
            value={product.popularity * 100}
            style={{
              height: 10,
              borderRadius: 8,
              background: "#e3e8ee",
            }}
            sx={{
              "& .MuiLinearProgress-bar": {
                background:
                  product.color === "bg-blue-500"
                    ? "linear-gradient(90deg,#1976d2,#64b5f6)"
                    : product.color === "bg-green-500"
                    ? "linear-gradient(90deg,#43a047,#a5d6a7)"
                    : product.color === "bg-purple-500"
                    ? "linear-gradient(90deg,#8e24aa,#ce93d8)"
                    : product.color === "bg-orange-500"
                    ? "linear-gradient(90deg,#fb8c00,#ffd180)"
                    : "#1976d2",
              },
            }}
          />
          {/* Value label inside the bar */}
          <Typography
            variant="caption"
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              transform: "translateX(-50%)",
              color: "#fff",
              fontWeight: 600,
              fontSize: 11,
              lineHeight: "10px",
            }}
          >
            {product.sales}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );

  return (
    <>
      <Card
        className={classes.card}
        style={{
          borderRadius: 0,
          marginBottom: 0,
          // background: "linear-gradient(90deg, #e3f2fd 0%, #fce4ec 100%)",
          boxShadow: "0 2px 12px rgba(33, 150, 243, 0.08)",
          padding: 0,
        }}
      >
        <CardContent style={{ padding: 18 }}>
          {/* Top Products Section */}
          <Typography
            variant="subtitle1"
            style={{
              fontWeight: 600,
              fontSize: 17,
              color: "#1976d2",
              letterSpacing: 0.5,
              marginBottom: 10,
            }}
            gutterBottom
          >
            Top Products
          </Typography>
          <Box
            display="flex"
            flexDirection="row"
            gap={2}
            justifyContent="space-between"
            alignItems="stretch"
            mb={3}
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Box>
          {/* Divider */}
          <Box width="100%" height="1px" bgcolor="#e3e8ee" my={2} />
          {/* Progress Bars Section */}
          <Box
            display="flex"
            flexDirection="row"
            gap={2}
            justifyContent="center"
            alignItems="stretch"
          >
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
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default index;
