import Box from "@mui/system/Box";
import SensorTimeGraph from "./SensorTimeGraph";
import {
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
  if (measurements.lens.length <= 0) {
    return res;
  }
  let numSensors = measurements.lens[0].length;
  for (let i = 0; i < numSensors; i++) {
    res.push(
      measurements.lens.map((e, j) => {
        return { val: e[i], date: measurements.dates[j] };
      })
    );
  }
  console.log(res);
  return res;
}

function scrollIntoViewWithOffset(selector, offset = 0) {
  window.scrollTo({
    behavior: "smooth",
    top:
      document.querySelector(selector).getBoundingClientRect().top -
      document.body.getBoundingClientRect().top -
      offset,
  });
}

export default class ResultsPage extends React.Component {
  constructor(props) {
    super(props);
    this.graphRefs = [];
    this.state = {
      graphRefs: [],
    };
  }

  render() {
    if (!(this.props.measurements.lens.length > 0)) {
      return (
        <Typography align="center" py={5}>
          No sensor data to display. Take a measurement first.
        </Typography>
      );
    }
    const sensorMeasurements = splitMeasurements(this.props.measurements);
    return (
      <Box sx={{ display: "flex" }}>
        <Drawer
          variant="permanent"
          sx={{
            width: 150,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: 150, boxSizing: "border-box" },
          }}
        >
          {
            // this pushes content below the appbar
          }
          <div style={{ marginBottom: 105 }}></div>

          <Box sx={{ overflow: "auto" }}>
            <List>
              {sensorMeasurements.map((_, index) => (
                <ListItem
                  button
                  key={index}
                  onClick={() => scrollIntoViewWithOffset(`#graph-${index}`)}
                >
                  <ListItemText primary={`Sensor ${index + 1}`} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {sensorMeasurements.map((e, i) => (
            <div
              id={`graph-${i}`}
              key={i}
              ref={(el) => (this.graphRefs[i] = el)}
            >
              <SensorTimeGraph data={e} title={`Sensor ${i + 1}`} />
              <Divider />
            </div>
          ))}
        </Box>
      </Box>
    );
  }
}
