import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  AreaChart,
  Legend,
  Label,
} from "recharts";

function getData() {
  return [
    {
      name: "1 (Top)",
      //uv: 4000,
      Circumference1: 12,
      Circumference2: 11,
    },
    {
      name: "2",
      //uv: 3000,
      Circumference1: 13.5,
      Circumference2: 12,
    },
    {
      name: "3",
      //uv: 2000,
      Circumference1: 15,
      Circumference2: 14,
    },
    {
      name: "4 (Mid)",
      //uv: 2780,
      Circumference1: 17,
      Circumference2: 16,
    },
    {
      name: "5",
      //uv: 1890,
      Circumference1: 16.2,
      Circumference2: 15.8,
    },
    {
      name: "6",
      //uv: 2390,
      Circumference1: 14,
      Circumference2: 13,
    },
    {
      name: "7 (Bottom)",
      //uv: 2390,
      Circumference1: 13,
      Circumference2: 10,
    },
  ];
}

// assumes equally spaced (1 unit)
function cumtrapz(nums) {
  let sum = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    sum += (nums[i] + nums[i + 1]) / 2;
  }
  return sum;
}

export default function App() {
  let area1 = cumtrapz(getData().map((e) => e.Circumference1));
  let area2 = cumtrapz(getData().map((e) => e.Circumference2));
  return (
    <div>
      <AreaChart
        width={730}
        height={250}
        data={getData()}
        margin={{
          top: 30,
          right: 20,
          bottom: 0,
          left: 20,
        }}
      >
        <text
          x={500 / 2}
          y={20}
          fill="black"
          textAnchor="middle"
          dominantBaseline="central"
        >
          <tspan fontSize="14">Comparison of 2 Recent Assessments</tspan>
        </text>
        <XAxis dataKey="name">
          <Label value="Sensor #" offset={0} position="insideBottom" />{" "}
        </XAxis>
        <YAxis
          unit=" cm"
          label={{ value: "Circumference", angle: -90, position: "insideLeft" }}
        />
        <Area
          type="linear"
          dataKey="Circumference1"
          stroke="#8884d8"
          fill="#8884d8"
        />
        <Area
          type="linear"
          dataKey="Circumference2"
          stroke="#8884d8"
          fill="#3884d8"
        />
        <Tooltip />
      </AreaChart>
      <p>Last Assessment: {area1},</p>
      <div />
      Current Assessment: {area2},
      <div />
      <h2>Change from Last Assessment: {area1 - area2}</h2>
    </div>
  );
}
