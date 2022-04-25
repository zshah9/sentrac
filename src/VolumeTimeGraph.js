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

function getMin(data) {
  let local_min = Infinity;
  for (let i = 0; i < data.length; i++) {
    if (data[i].val < local_min) {
      local_min = data[i].val;
    }
  }
  return Math.round((local_min * 0.95) / 100) * 100;
}

function getMax(data) {
  let local_max = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].val > local_max) {
      local_max = data[i].val;
    }
  }
  return Math.round((local_max * 1.05) / 100) * 100;
}

export function VolumeTimeGraph(props) {
  let minRange = getMin(props.data);
  let maxRange = getMax(props.data);
  console.log("data: ", props.data);
  let graphWidth = Math.max(900, props.data.length * 75);

  return (
    <Box sx={{ py: 5 }}>
      <Box sx={{ width: 900, marginLeft: "100px" }}>
        <Typography variant="h5" align="center">
          {props.title}
        </Typography>
      </Box>
      <LineChart
        width={graphWidth}
        height={500}
        data={props.data}
        margin={{
          top: 10,
          right: 20,
          left: 100,
          bottom: 105,
        }}
      >
        <CartesianGrid strokeDasharray="1 1" />
        <XAxis
          dataKey="date"
          angle={-60}
          dx={-25}
          dy={40}
          interval={0}
          fontSize={17}
        >
          <Label position="bottom" style={{ textAnchor: "middle" }} dy={80}>
            Date
          </Label>
        </XAxis>
        <YAxis
          type="number"
          domain={[minRange, maxRange]}
          tickMargin={10}
          tickCount={3}
          width={100}
        >
          <Label
            angle={270}
            position="left"
            style={{ textAnchor: "middle" }}
            dx={-40}
          >
            Volume (mL)
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

export function ShapeGraph(props) {
  let recentSensorLengths = [];
  if (props.data.length > 0) {
    recentSensorLengths = props.data[props.data.length - 1];
  } else {
    return;
  }
  let data = recentSensorLengths.map((e, j) => {
    return { val: e, sensor: j + 1 };
  });
  console.log(data);
  return (
    <Box sx={{ py: 5 }}>
      <Box sx={{ width: 500, marginLeft: 30 }}>
        <Typography variant="h5" align="center">
          {props.title}
        </Typography>
      </Box>
      <LineChart
        width={900}
        height={450}
        data={data}
        margin={{
          top: 20,
          right: 20,
          left: 20,
          bottom: 80,
        }}
      >
        <CartesianGrid strokeDasharray="1 1" />
        <XAxis dataKey="sensor">
          <Label position="bottom" style={{ textAnchor: "middle" }} dy={10}>
            Sensor
          </Label>
        </XAxis>
        <YAxis
          type="number"
          //domain={[minRange, maxRange]}
          tickMargin={10}
          tickCount={3}
          width={100}
        >
          <Label angle={270} position="left" style={{ textAnchor: "middle" }}>
            Length (cm)
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
