import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
} from "recharts";

export default function SensorTimeGraph(props) {
  let graphWidth = Math.max(600, props.data.length * 75);
  return (
    <Box sx={{ py: 5 }}>
      <Box sx={{ width: 600, marginLeft: "25px" }}>
        <Typography variant="h5" align="center">
          {props.title}
        </Typography>
      </Box>
      <LineChart
        width={graphWidth}
        height={500}
        data={props.data}
        margin={{
          top: 20,
          right: 50,
          left: 25,
          bottom: 100,
        }}
      >
        <CartesianGrid strokeDasharray="1 1" />
        <XAxis
          dataKey="date"
          dy={40}
          dx={-25}
          interval={0}
          angle={300}
          fontSize={17}
        >
          <Label position="bottom" style={{ textAnchor: "middle" }} dy={75}>
            Date
          </Label>
        </XAxis>
        <YAxis>
          <Label
            angle={270}
            position="left"
            style={{ textAnchor: "middle" }}
            dx={-10}
          >
            Circumference (cm)
          </Label>
        </YAxis>
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="val"
          legendType="none"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
          strokeWidth={5}
        />
      </LineChart>
    </Box>
  );
}
