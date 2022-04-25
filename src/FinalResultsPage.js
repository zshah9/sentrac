import Box from "@mui/system/Box";
import { Stack } from "@mui/material";
import { ShapeGraph, VolumeTimeGraph } from "./VolumeTimeGraph";
import {
  Toolbar,
  List,
  ListItem,
  ListItemText,
  Drawer,
  Divider,
  Typography,
} from "@mui/material";
import React from "react";

function splitMeasurements(measurements) {
  let res = [];
  if (measurements.vols.length <= 0) {
    return res;
  }
  res.push(
    measurements.vols.map((e, j) => {
      return { val: measurements.vols[j], date: measurements.dates[j] };
    })
  );
  console.log("to plot: ", res);
  return res;
}

function scrollIntoViewWithOffset(selector, offset = 64) {
  window.scrollTo({
    behavior: "smooth",
    top:
      document.querySelector(selector).getBoundingClientRect().top -
      document.body.getBoundingClientRect().top -
      offset,
  });
}

export default class FinalResultsPage extends React.Component {
  constructor(props) {
    super(props);
    this.graphRefs = [];
    this.state = {
      graphRefs: [],
    };
  }

  render() {
    if (!(this.props.measurements.vols.length > 0)) {
      return (
        <Typography align="center" py={5}>
          No volume data to display. Take a measurement first.
        </Typography>
      );
    }
    const calculatedVols = splitMeasurements(this.props.measurements);
    return (
      <Box sx={{ display: "flex" }}>
        <Stack>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            {calculatedVols.map((e, i) => (
              <div
                id={`graph-${i}`}
                key={i}
                ref={(el) => (this.graphRefs[i] = el)}
              >
                <VolumeTimeGraph data={e} title={"Joint Volume Progression"} />
              </div>
            ))}
          </Box>
          <Divider />
          <Box sx={{ flexGrow: 1, p: 3 }}>
            {calculatedVols.map((e, i) => (
              <div
                id={`graph-${i}`}
                key={i}
                ref={(el) => (this.graphRefs[i] = el)}
              >
                <ShapeGraph
                  data={this.props.measurements.lens}
                  title={"Current Joint Shape"}
                />
              </div>
            ))}
          </Box>
        </Stack>
      </Box>
    );
  }
}
