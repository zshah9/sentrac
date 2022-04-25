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

function getData() {
  return [
    {
      name: "1 (Top)",
      //uv: 4000,
      Circumference: 12,
    },
    {
      name: "2",
      //uv: 3000,
      Circumference: 13.5,
    },
    {
      name: "3",
      //uv: 2000,
      Circumference: 15,
    },
    {
      name: "4 (Mid)",
      //uv: 2780,
      Circumference: 17,
    },
    {
      name: "5",
      //uv: 1890,
      Circumference: 16.2,
    },
    {
      name: "6",
      //uv: 2390,
      Circumference: 14,
    },
    {
      name: "7 (Bottom)",
      //uv: 2390,
      Circumference: 13,
    },
  ];
}

function Chart() {
  return (
    <LineChart
      width={500}
      height={300}
      data={getData()}
      margin={{
        top: 35,
        right: 10,
        left: 20,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <text
        x={500 / 2}
        y={20}
        fill="black"
        textAnchor="middle"
        dominantBaseline="central"
      >
        <tspan fontSize="14">Assessment Result</tspan>
      </text>
      <XAxis dataKey="name">
        <Label value="Sensor #" offset={0} position="insideBottom" />{" "}
      </XAxis>
      <YAxis
        unit=" cm"
        label={{ value: "Circumference", angle: -90, position: "insideLeft" }}
      />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="Circumference"
        legendType="none"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      {/* <Line 
        type="monotone" 
        dataKey="uv" 
        stroke="#82ca9d" 
        /> */}
    </LineChart>
  );
}

export default function MeasurementGraph() {
  return <Chart />;
}
