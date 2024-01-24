import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import Title from "./Title";
import { Paper } from "@mui/material";

const uData = [
  4000, 3000, 2000, 2780, 1890, 2390, 3490, 2780, 1890, 2390, 3490, 2000,
];
const pData = [
  2400, 1398, 9800, 3908, 4800, 3800, 4300, 3908, 4800, 3800, 4300, 3800,
];
const xLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function SimpleLineChart() {
  return (
    <>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Title>Order Summary</Title>
        <LineChart
          width={1360}
          height={500}
          series={[
            { data: pData, label: "Ordered" },
            { data: uData, label: "Delivered" },
          ]}
          xAxis={[{ scaleType: "point", data: xLabels }]}
        />
      </Paper>
    </>
  );
}
