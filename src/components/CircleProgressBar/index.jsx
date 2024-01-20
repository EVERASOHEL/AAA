import React, { Component } from "react";
import Chart from "react-google-charts";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import back_image from "../images/lightgrayimage.jpg";

const PieChart = (props) => {
  // const pieData = [
  //   ["Task", "Hours per Day"],
  //   ["Work", 11],
  //   ["Eat", 2],
  // ];

  const chartContainerStyle = {
    backgroundImage: `url(${back_image})`, // Replace with the actual path to your background image
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "600px", // Set the desired width for the chart container
    height: "250px", // Set the desired height for the chart container
  };

  const { pieData, titleheader,totalPaidOrReceivableAmount,totalAmount } = props;

  const pieOptions = {
    // title: `${titleheader}`,
    pieHole: 0.5,
    legend: {
      position: "right",
      alignment: "center",
    },
    chartArea: {
      left: 10,
      top: 20,
      width: "80%",
      height: "80%",
    },
    colors: ["#7F8F8F", "#CED8D5"], // Set custom colors for the pie slices
  };

  return (
    <div>
      <div className="chart-title">
        <Typography style={{ fontSize: "24", fontWeight: "bold" }}>
          {titleheader}
        </Typography>
      </div>
      <Chart
        width={"350px"}
        height={"200px"}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={pieData}
        options={pieOptions}
        rootProps={{ "data-testid": "3" }}
      />
      <Typography style={{ fontSize: "12px", fontWeight: "bold" }}>
        TotalAmount  -  Rs.{totalAmount}
      </Typography>
      <Typography style={{ fontSize: "12px", fontWeight: "bold" }}>
        {titleheader}  -  Rs.{totalPaidOrReceivableAmount}
      </Typography>
    </div>
  );
};
export default PieChart;
