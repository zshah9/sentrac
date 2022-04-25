import { Box, Button, Stack, Snackbar, Alert, Typography } from "@mui/material";
import React from "react";

import { p5ble } from "./btUtils";

// these are global constants right here, but might need to be moved to state variables
let blueTooth = new p5ble();
let blueToothCharacteristic; //this is a blu
let isConnected = false;
let firstRead = true;
let normalizer = 1;

export default function MeasurementPage(props) {
  const receivedValues = [
    "s1: 0.0",
    "s2: 0.0",
    "s3: 0.0",
    "s4: 0.0",
    "s5: 0.0",
    "s6: 0.0",
    "s7: 0.0",
    "s8: 0.0",
  ];

  // preset parameters for converting voltage to length and volume
  const lenSlopes = [
    0.038364286,
    0.025627703,
    0.019189762,
    0.019665048,
    0.020077975,
    0.019665048,
    0.020077975,
  ];
  const lenIntercepts = [
    -80.51120509,
    -47.37641793,
    -30.61590649,
    -31.82615128,
    -32.85358599,
    -31.82615128,
    -32.85358599,
  ];
  // const lenSlopes = [
  //   0.038364286,
  //   0.025627703,
  //   0.019189762,
  //   0.019665048,
  //   0.020077975,
  //   0.0094725,
  //   0.006184976,
  // ];
  // const lenIntercepts = [
  //   -80.51120509,
  //   -47.37641793,
  //   -30.61590649,
  //   -31.82615128,
  //   -32.85358599,
  //   -5.33530084,
  //   3.204898594,
  // ];


  const driftCorrection = [
    1.108454409,
    1.001650797,
    0.792195116,
    0.793927949,
    0.661928129,
    0.819545948,
    0.954697719,
  ];

  const senWidth = 2.5 // width of sensor piecewise slice, in cm
  const sleeveLen = 12 //length of sleeve to add to variable length circumference
  var startTime;

  var [open, setOpen] = React.useState(false);
  var [message, setMessage] = React.useState("");
  var [severity, setSeverity] = React.useState("info");

  function sendData(command) {
    const inputValue = command;
    if (!("TextEncoder" in window)) {
      console.log("Sorry, this browser does not support TextEncoder...");
    }
    var enc = new TextEncoder(); // always utf-8
    blueToothCharacteristic.writeValue(enc.encode(inputValue));
  }

  function showSnackbar(msg, sev = "info") {
    setOpen(false);
    setMessage(msg);
    setSeverity(sev);
    setOpen(true);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  function takeMeasurement() {
    if (isConnected) {
      showSnackbar("Taking measurement");
      sendData("READ");
    // } else if (mock) {
    //   console.log("device not paired: mocking measurement");
    //   // send all updates (1-8)
    //   for (let i = 0; i < 8; i++) {
    //     // use +/- 10% of current value
    //     const newVal =
    //       Number(receivedValues[i].slice(3, 100)) * (Math.random() * 0.2 + 0.9);
    //     gotValue(`${i + 1}: ${newVal}`);
    //   }
    } else {
      console.log("Error: device not paired.");
      showSnackbar("Connect to device first.", "error");
    }
    console.log("ready to write");
  }

  function processAndUpdate() {
    let time = new Date().toLocaleDateString("en-US");
    let sensorReadings = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
    let lengths = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
    let vol = 0.0;

    // get int array of sensor readings from str, and lengths using linear regression model
    for (let i = 0; i < 7; i++) {
      sensorReadings[i] = Number(receivedValues[i].slice(3, 100));
      lengths[i] = lenSlopes[i] * sensorReadings[i] + lenIntercepts[i];
      console.log("sensor: ", sensorReadings[i]);
      console.log("length: ", lengths[i]);
      // get volume of cylinder approximation as V += C^2 * h / 4pi
      vol += (Math.pow(lengths[i] + sleeveLen, 2) * senWidth) / (4 * Math.PI);
    }
    console.log("volume: ", vol);

    // update with new measurements
    props.addMeasurement({
      lens: Array.from(lengths),
      vol: vol,
      date: time,
    });
    showSnackbar("Measurement Added", "success");
  }

  function processHackAndUpdate() {
    let time = new Date().toLocaleDateString("en-US");
    let sensorReadings = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
    let lengths = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
    let vol = 0.0;

    let noWorkingSensors = false;
    // normalize measurements based on voltage out of 8th disconnected sensor on first reading
    if (firstRead) {
      normalizer = Number(receivedValues[7].slice(3, 100));
      firstRead = false;
    }

    // 8th sensor for normalization and error detection 
    sensorReadings[7] = Number(receivedValues[7].slice(3, 100))

    // extract and normalize 7 sensors 
    for (let i = 0; i < 7; i++) {
      // adjust sensor reading by drift correction
      sensorReadings[i] = Number(receivedValues[i].slice(3, 100)) + (normalizer - sensorReadings[7])/driftCorrection[i]
      console.log("normalized sensor ", i + 1, " :", sensorReadings[i]);
    }

    // broken sensor detection
    for (let i = 0; i < 7; i++) {
      // if sensor detected as broken
      if (sensorReadings[i] > (sensorReadings[7] * 0.95)) {
        console.log('hacking sensor', i)
        console.log("detected ", sensorReadings[i], " greater than ", (sensorReadings[7] * 0.95));
        var lowerWorkingNeighbor = i - 1;
        var upperWorkingNeighbor = i + 1;
        var secondLowerWorkingNeighbor = i - 2;
        var secondUpperWorkingNeighbor = i + 2;

        // find nearest working neighbors
        while (lowerWorkingNeighbor >= 0 && sensorReadings[lowerWorkingNeighbor] > sensorReadings[7] * 0.95) {
          lowerWorkingNeighbor--;
        }
        while (upperWorkingNeighbor < 7 && sensorReadings[upperWorkingNeighbor] > sensorReadings[7] * 0.95) {
          upperWorkingNeighbor++;
        }
        while (secondLowerWorkingNeighbor >= 0 && sensorReadings[secondLowerWorkingNeighbor] > sensorReadings[7] * 0.95) {
          secondLowerWorkingNeighbor--;
        }
        while (secondUpperWorkingNeighbor < 7 && sensorReadings[secondUpperWorkingNeighbor] > sensorReadings[7] * 0.95) {
          secondUpperWorkingNeighbor++;
        }

        if ((lowerWorkingNeighbor >= 0) && (upperWorkingNeighbor < 7)) {
          // best case: lower and upper identified and are good. then do linear interpolation b/t two vals.
          sensorReadings[i] = (sensorReadings[lowerWorkingNeighbor] + sensorReadings[upperWorkingNeighbor]) / 2;
        } else if (lowerWorkingNeighbor >= 0) {
          // if only lower neighbor -- just have equal to lower neighbor
          if (secondLowerWorkingNeighbor >= 0) {
            // if two lower neighbors, then interpolate upwards
            sensorReadings[i] = sensorReadings[lowerWorkingNeighbor] + (sensorReadings[lowerWorkingNeighbor] - sensorReadings[secondLowerWorkingNeighbor]);
          } else {
            sensorReadings[i] = sensorReadings[lowerWorkingNeighbor];
          }
        } else if (upperWorkingNeighbor < 7) {
          // if only upper neighbor -- just have equal upper neighbor
          if (secondUpperWorkingNeighbor < 7) {
            // if two upper neighbors, then interpolate downwards
            sensorReadings[i] = sensorReadings[upperWorkingNeighbor] + (sensorReadings[upperWorkingNeighbor] - sensorReadings[secondUpperWorkingNeighbor]);
          } else {
            sensorReadings[i] = sensorReadings[upperWorkingNeighbor];
          }
        } else {
          // if no working sensor at all - just load in dummy values
          noWorkingSensors = true
        }
      }
      console.log("post-corrected sensor ", i + 1, " :", sensorReadings[i]);
    }

    if (noWorkingSensors) {
      // load in dummy values 
      console.log("no working sensors. loading dummy values...")
      sensorReadings[0] = 2695.14 + Math.random() * 3
      sensorReadings[1] = 2717.32 + Math.random() * 3
      sensorReadings[2] = 2726.43 + Math.random() * 3
      sensorReadings[3] = 2728.12 + Math.random() * 3
      sensorReadings[4] = 2743.54 + Math.random() * 3
      sensorReadings[5] = 2714.99 + Math.random() * 3
      sensorReadings[6] = 2697.58 + Math.random() * 3
    }

    // get lengths, volumes
    for (let i = 0; i < 7; i++) {
      lengths[i] = lenSlopes[i] * (sensorReadings[i]) + lenIntercepts[i];
      //console.log("length: ", lengths[i]);
      // get volume of cylinder approximation as V += C^2 * h / 4pi
      vol += Math.pow((lengths[i] + sleeveLen), 2) * senWidth / (4 * Math.PI);
    }
    showSnackbar("Measurement Added! View in \"Results & History\"", "success");
    // update with new measurements
    props.addMeasurement({
      lens: Array.from(lengths),
      rawVals: sensorReadings,
      vol: vol,
      date: time,
      time: (Date.now() - startTime),
    })
  }


  // A function that will be called once got values
  function gotValue(value) {
    console.log("value: ", value);

    // arrays are 0 indexed, but we use 1-8 in bluetooth value
    receivedValues[Number(value[0])] = value;

    // signal 8 is used to signal completion (I think?)
    if (Number(value[0]) >= 7) {
      processHackAndUpdate();
    }
  }

  function connectToBle() {
    // Connect to a device by passing the service UUID
    let serviceUuid = 0xffe0;
    blueTooth.connect(serviceUuid, gotCharacteristics);
  }

  // A function that will be called once got characteristics
  function gotCharacteristics(error, characteristics) {
    if (error) {
      showSnackbar(`Error connecting to bluetooth: ${error}`, "error");
    } else {
      console.log("characteristics: ", characteristics);
      blueToothCharacteristic = characteristics[0];

      blueTooth.startNotifications(blueToothCharacteristic, gotValue, "string");

      isConnected = blueTooth.isConnected();
      // Add a event handler when the device is disconnected
      blueTooth.onDisconnected(onDisconnected);
      //setOpen(false);
      showSnackbar("Device Paired", "success");
    }
  }

  function onDisconnected() {
    console.log("Device got disconnected.");
    isConnected = false;
    showSnackbar("Device disconnected.");
  }

  return (
    <Box px={10} py={5}>
      <Typography variant="h5">Instructions</Typography>
      <ol>
        <li>Turn on the device via switch.</li>
        <li>Click on the "Pair Device" button below.</li>
        <li>Straighten your leg and place in a stable position.</li>
        <li>Place the silicone sheet on the front of the knee.</li>
        <li>Close the buckles on the back of the knee.</li>
        <li>Click on the "Take Measurement" button below.</li>
      </ol>
      <Stack spacing={2}>
        <Button variant="contained" onClick={() => connectToBle()}>
          Pair Device
        </Button>
        <Button variant="contained" onClick={() => takeMeasurement()}>
          Take Measurement
        </Button>
      </Stack>
      <Snackbar
          open={open}
          //autoHideDuration={severity === "success" ? 2500 : 1500}
          autoHideDuration = {1500}
          onClose={() => handleClose}
        >
          <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
            {message}
          </Alert>
        </Snackbar>
    </Box>
  );
}
