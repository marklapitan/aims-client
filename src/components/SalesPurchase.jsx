import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";
import Title from "./Title";
import { Paper } from "@mui/material";

const chartSetting = {
  yAxis: [
    {
      label: "Sales & purchase",
    },
  ],
  width: 900,
  height: 250,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-20px, 0)",
    },
  },
};
const dataset = [
  {
    sales: 60,
    purchase: 40,
    month: "Jan",
  },
  {
    sales: 50,
    purchase: 42,
    month: "Fev",
  },
  {
    sales: 40,
    purchase: 25,
    month: "Mar",
  },
  {
    sales: 59,
    purchase: 50,
    month: "Apr",
  },
  {
    sales: 30,
    purchase: 40,
    month: "May",
  },
  {
    sales: 20,
    purchase: 45,
    month: "June",
  },
  {
    sales: 10,
    purchase: 70,
    month: "July",
  },
  {
    sales: 35,
    purchase: 65,
    month: "Aug",
  },
  {
    sales: 45,
    purchase: 25,
    month: "Sept",
  },
  {
    sales: 55,
    purchase: 30,
    month: "Oct",
  },
  {
    sales: 65,
    purchase: 50,
    month: "Nov",
  },
  {
    sales: 35,
    purchase: 40,
    month: "Dec",
  },
];
const valueFormatter = (value) => `${value}mm`;
export default function SalesPurchase() {
  return (
    <>
      {" "}
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          height: 300,

          width: "auto",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        }}
      >
        <Title>Sales & Purchase</Title>
        <BarChart
          dataset={dataset}
          xAxis={[{ scaleType: "band", dataKey: "month" }]}
          series={[
            { dataKey: "sales", label: "Sales", valueFormatter },
            { dataKey: "purchase", label: "Purchase", valueFormatter },
          ]}
          {...chartSetting}
        />
      </Paper>
    </>
  );
}
