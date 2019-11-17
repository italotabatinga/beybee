import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { ResponsiveLine, Line } from "@nivo/line";
import { Grid, Container, Paper, Box } from "@material-ui/core";
import "./App.css";

const App: React.FC = () => {
  const [hiveData, setHiveData] = useState<SensorData[]>([]);
  const [environmentData, setEnvironmentData] = useState<SensorData[]>([]);

  useEffect(() => {
    firebase.initializeApp({
      apiKey: "AIzaSyCNOgllgmUL07HoWCvVvS8gNpz4_nZaj1s",
      authDomain: "bey-bee.firebaseapp.com",
      databaseURL: "https://bey-bee.firebaseio.com",
      projectId: "bey-bee",
      storageBucket: "bey-bee.appspot.com",
      messagingSenderId: "1006733582500",
      appId: "1:1006733582500:web:9f89a134295cb5ba0d8631",
      measurementId: "G-YSYL5L7MGY"
    });

    const hiveSensorRef = firebase
      .database()
      .ref("hive_sensor")
      .limitToLast(50)
      .orderByKey();
    hiveSensorRef.on("child_added", snapshot => {
      const obj = snapshot.val();
      console.log("Updated Hive!", obj);
      setHiveData(hive =>
        hive
          .concat({
            temperature: obj.temperature,
            humidity: obj.humidity,
            captured_at: new Date(obj.captured_at)
          })
          .slice(-50)
      );
    });

    const environmentSensorRef = firebase
      .database()
      .ref("environment_sensor")
      .limitToLast(50)
      .orderByKey();
    environmentSensorRef.on("child_added", snapshot => {
      const obj = snapshot.val();
      console.log("Updated Environment!", obj);

      setEnvironmentData(environment =>
        environment
          .concat({
            temperature: obj.temperature,
            humidity: obj.humidity,
            captured_at: new Date(obj.captured_at)
          })
          .slice(-50)
      );
    });

    return () => {
      hiveSensorRef.off();
      environmentSensorRef.off();
    };
  }, []);

  const commonProps = {};

  return (
    <Grid
      container
      spacing={0}
      alignItems="center"
      alignContent="center"
      justify="center"
      direction="column"
      style={{ minHeight: "100vh" }}
    >
      <Grid
        container
        spacing={3}
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        <Grid item xs={4}>
          <Box height="50vh">
            <ResponsiveLine
              // width={300}
              // height={300}
              data={[
                {
                  id: "Hive",
                  data: hiveData.map(data => ({
                    x: data.captured_at,
                    y: data.humidity
                  }))
                },
                {
                  id: "Environment",
                  data: environmentData.map(data => ({
                    x: data.captured_at,
                    y: data.humidity
                  }))
                }
              ]}
              margin={{ left: 50, bottom: 50 }}
              xScale={{ type: "time", format: "native" }}
              yScale={{ type: "linear", max: 100, min: 50 }}
              animate={false}
              motionDamping={120}
              motionStiffness={50}
              enablePoints={false}
              curve="monotoneX"
              axisBottom={{
                legend: "Time",
                legendPosition: "middle",
                legendOffset: 10,
                tickSize: 14,
                tickValues: "every 1 minutes"
                // format: (unix: number | string | Date) => formatUnix(unix as number)
              }}
              isInteractive={false}
              legends={[
                {
                  anchor: "bottom-right",
                  direction: "column",
                  itemWidth: 10,
                  itemHeight: 5,
                  translateX: -100,
                  translateY: -20,
                  itemsSpacing: 15
                }
              ]}
              axisLeft={{
                legend: "Umidade",
                legendPosition: "middle",
                legendOffset: -10,
                tickSize: 14,
                tickValues: 5
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={4}>
          {/* <Container maxWidth="sm"> */}
          <Box height="50vh">
            <ResponsiveLine
              // width={300}
              // height={300}
              data={[
                {
                  id: "Hive",
                  data: hiveData.map(data => ({
                    x: data.captured_at,
                    y: data.temperature
                  }))
                },
                {
                  id: "Environment",
                  data: environmentData.map(data => ({
                    x: data.captured_at,
                    y: data.temperature
                  }))
                }
              ]}
              margin={{ left: 50, bottom: 50 }}
              xScale={{ type: "time", format: "native" }}
              yScale={{ type: "linear", max: 40, min: 10 }}
              animate={false}
              motionDamping={120}
              motionStiffness={50}
              enablePoints={false}
              curve="monotoneX"
              axisBottom={{
                legend: "Time",
                legendPosition: "middle",
                legendOffset: 10,
                tickSize: 14,
                tickValues: "every 1 minutes"
                // format: (unix: number | string | Date) => formatUnix(unix as number)
              }}
              axisLeft={{
                legend: "Temperature",
                legendPosition: "middle",
                legendOffset: -10,
                tickSize: 14,
                tickValues: 5
              }}
              isInteractive={false}
              legends={[
                {
                  anchor: "bottom-right",
                  direction: "column",
                  itemWidth: 10,
                  itemHeight: 5,
                  translateX: -100,
                  translateY: -20,
                  itemsSpacing: 15
                }
              ]}
            />
          </Box>
          {/* </Container> */}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default App;
