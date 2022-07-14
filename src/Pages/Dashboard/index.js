import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import "./styles.css";



const Dashboard = () => {

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    height: '110px',
    color: theme.palette.text.secondary,
  }));

  const Admin = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    height: '250px',
    color: theme.palette.text.secondary,
  }));

  const Chart = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    height: '300px',
    color: theme.palette.text.secondary,
  }));



  return ( 
    
    <div className="content" style={{backgroundColor : "lightgrey"}}>
      <div>

     <Grid container spacing={3} columns={{ xs: 4, sm: 8, md: 12 }}>

      <Grid item container xs={4} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={12}> <Admin>Admin profile</Admin> </Grid>
      </Grid>

      <Grid item container xs={8} spacing={3} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={3}> <Item>Users</Item> </Grid>
        <Grid item xs={3}> <Item>Shops</Item> </Grid>
        <Grid item xs={3}> <Item>Architects</Item> </Grid>
        <Grid item xs={3}> <Item>Experts</Item> </Grid>
        <Grid item xs={3}> <Item>Today Orders</Item> </Grid>
        <Grid item xs={3}> <Item>Online payments</Item> </Grid>
      </Grid>

    </Grid>

    <br></br>

    <Grid container spacing={3} columns={{ xs: 4, sm: 8, md: 12 }}>

      <Grid item container xs={6} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={12}> <Chart>Chart1</Chart> </Grid>
      </Grid>

      <Grid item container xs={6} spacing={3} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={12}> <Chart>Chart2</Chart> </Grid>
      </Grid>
      
    </Grid>

      </div>
    </div>
  );

}
 
export default Dashboard;
