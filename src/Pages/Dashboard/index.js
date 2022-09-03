import * as React from "react";
import { styled } from "@mui/material/styles";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import "./styles.css";
import axios from "axios";
import { Toolbar } from "@mui/material";

import { useEffect, useState } from "react";
import { Typography, Avatar } from "@mui/material";



const Dashboard = () => {

  useEffect(() => {
    getExpertCount();
    getDeliverCount();
    getArchitectCount();
  }, []);

  const [data1, setExpert] = useState([]);
  const [data2, setDelivery] = useState([]);
  const [data3, setArchitect] = useState([]);

  const getExpertCount = async () => {
    try {
      const data = await axios.get("https://mongoapi3.herokuapp.com/experts");
      setExpert(data.data.length);
    } catch (e) {
      console.log(e);
    }
  };
  
  const getDeliverCount = async () => {
    try {
      const data = await axios.get("https://mongoapi3.herokuapp.com/delivery");
      console.log(data.data.length);
      setDelivery(data.data.length);
    } catch (e) {
      console.log(e);
    }
  };
  const getArchitectCount = async () => {
    try {
      const data = await axios.get("https://mongoapi3.herokuapp.com/architect");
      console.log(data.data.length);
      setArchitect(data.data.length);
    } catch (e) {
      console.log(e);
    }
  };
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    height: "110px",
    color: theme.palette.text.secondary,
  }));

  const Admin = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    height: "250px",
    color: theme.palette.text.secondary,
  }));

  const Chart = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    height: "300px",
    color: theme.palette.text.secondary,
  }));

  return (
    <div className="content">
      <div>
        <Grid container spacing={3} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item container xs={4} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item xs={12}>
              {" "}
              <Admin>
                Admin profile
                <Toolbar>
                  <Avatar
                    alt="Remy Sharp"
                    display="inline"
                    style={{ alignSelf: "center" }}
                    src="images/mango.jpg"
                    sx={{ width: 80, height: 80 }}
                  />
                </Toolbar>
              </Admin>{" "}
            </Grid>
          </Grid>

          <Grid
            item
            container
            xs={8}
            spacing={3}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item xs={4}>
              {" "}
              <Item>
                <Typography variant="h5" color="primary" align="center">
                  Users {"\n"}
                  {data1}
                </Typography>
              </Item>
              {""}
            </Grid>
            <Grid item xs={4}>
              {" "}
              <Item>Shops</Item>{" "}
            </Grid>
            <Grid item xs={4}>
              {" "}
              <Item>Architects</Item>{" "}
            </Grid>
            <Grid item xs={4}>
              {" "}
              <Item>Experts</Item>{" "}
            </Grid>
            <Grid item xs={4}>
              {" "}
              <Item>Today Orders</Item>{" "}
            </Grid>
            <Grid item xs={4}>
              {" "}
              <Item>Online payments</Item>{" "}
            </Grid>
          </Grid>
        </Grid>

        <br></br>

        <Grid container spacing={3} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item container xs={6} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item xs={12}>
              {" "}
              <Chart>Chart1</Chart>{" "}
            </Grid>
          </Grid>

          <Grid
            item
            container
            xs={6}
            spacing={3}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item xs={12}>
              {" "}
              <Chart>Chart2</Chart>{" "}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Dashboard;