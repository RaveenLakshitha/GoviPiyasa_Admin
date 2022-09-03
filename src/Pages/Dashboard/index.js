import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import "./styles.css";
import AdminCard from "../../Components/AdminCard";
import AdminCard1 from "../../Components/AdminCard1";




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
    height: '400px',
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
        <Grid item xs={12}>
          <Admin>
          <div className="flip">
            <div className="front" style={{backgroundImage: 'url(https://images.pexels.com/photos/540518/pexels-photo-540518.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb)'}}>
             <h1 className="text-shadow">Buyers</h1>
            </div>
            <div className="back">
              <h2>Buyers</h2>
              <image ></image>
              <p>Good tools make application development quicker and easier to maintain than if you did everything by hand..</p>
            </div>
          </div>
          </Admin>
         </Grid>
      </Grid>

      <Grid item container xs={8} spacing={3} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={6}> 
         <AdminCard1></AdminCard1>
        </Grid>
        <Grid item xs={6}> <Item><AdminCard1></AdminCard1></Item> </Grid>
        <Grid item xs={6}> <Item><AdminCard1></AdminCard1></Item> </Grid>
        <Grid item xs={6}> <Item><AdminCard1></AdminCard1></Item> </Grid>
        <Grid item xs={6}> <Item><AdminCard1></AdminCard1></Item> </Grid>
        <Grid item xs={6}> <Item><AdminCard></AdminCard></Item> </Grid>
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
