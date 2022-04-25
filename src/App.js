import "./App.css";

import MeasurementPage from "./MeasurementPage";
import ResultsPage from "./ResultsPage";
import FinalResultsPage from "./FinalResultsPage";

import Box from "@mui/material/Box";
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import logo from "./SentracWhiteLogo3.png";
import {CSVLink} from "react-csv";


const PAGE_MEASUREMENT = "measurement";
const PAGE_RESULTS = "results";
const PAGE_FINAL_RESULTS = "finalresults";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    let pseudo_len = Array.from([19.54, 22.73, 22.72, 26.11, 23.66, 20.94, 18.37]);
    pseudo_len = pseudo_len.map(x => x / 1619)
    console.log(pseudo_len*1824/1619)
    this.state = {
      currPage: "",
      measurements: {
        lens: [pseudo_len.map(x => x * 1824), pseudo_len.map(x => x * 1805), pseudo_len.map(x => x * 18217994), pseudo_len.map(x => x * 1750), pseudo_len.map(x => x * 1742)],
        vols: [1824.53330, 1805.9993, 1799.1112, 1750.2223, 1742.3813],
        dates: ["3/22/2022", "3/29/2022", "4/5/2022", "4/12/2022", "4/19/2022"],
      },
    };
  }

  setCurrPage(page) {
    this.setState({ currPage: page });
  }

  addMeasurement({ lens, vol, date }) {
    let measurements = this.state.measurements;
    measurements.lens.push(lens);
    measurements.vols.push(vol);
    measurements.dates.push(date);
    this.setState({ measurements: measurements });
    this.updateData();
  }

  async login() {
    //TODO: sign in with google auth
    console.log("logging in");
    this.setCurrPage("");
  }

  async loadData() {
    //TODO: load from google drive
  }

  async updateData() {
    //TODO: update in google drive
    console.log(
      "TODO: push to google. Current Measurements: ",
      this.state.measurements
    );
  }

  getContents() {
    let currPage = this.state.currPage;
    if (currPage === PAGE_MEASUREMENT) {
      return <MeasurementPage addMeasurement={(m) => this.addMeasurement(m)} />;
    } else if (currPage === PAGE_RESULTS) {
      return <ResultsPage measurements={this.state.measurements} />;
    } else if (currPage === PAGE_FINAL_RESULTS) {
      return <FinalResultsPage measurements={this.state.measurements} />;
    }
    return (
      <Typography align="center" py={5}>Select a page using the tabs above</Typography>
    );
  }

  render() {
    const csvData = this.state.measurements.lens.map((l, i) =>
      [
        this.state.measurements.dates[i],
        this.state.measurements.vols[i],
      ].concat(l)
    );
    let csvHeaders = ["Date", "Volume (mL)"];
    csvHeaders = csvHeaders.concat(
      Array.from({ length: 7 }, (_, i) => `Sensor #${i + 1} Length (cm)`)
    );
    return (
      <Box>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <img
              src={logo}
              width={80}
              style={{ marginBottom: 5 }}
              alt="Sentrac Logo"
            ></img>
            <Typography variant="h4" component="div" sx={{ mx: "25px" }}>
              sentrac
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => this.setCurrPage(PAGE_MEASUREMENT)}
              >
                Take Measurement
              </Button>
              {/* <Button
                variant="outlined"
                color="inherit"
                onClick={() => this.setCurrPage(PAGE_RESULTS)}
              >
                Sensor Results
              </Button> */}
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => this.setCurrPage(PAGE_FINAL_RESULTS)}
              >
                Results & History
              </Button>
            </Box>
            <CSVLink
              data={csvData}
              headers={csvHeaders}
              filename="measurement_data.csv"
            >
              Download Data
            </CSVLink>
          </Toolbar>
        </AppBar>
        <Box>
          <div style={{ marginBottom: 105 }}></div>
          {this.getContents()}
        </Box>
      </Box>
    );
  }
}
