import * as React from 'react';
import axios from "axios";
import img1 from "../../Images/bgImage1.png"
import {Card, Box} from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';

const Advertisement = () => {

  const [ads, setAds] = useState([]);

  const getData = async () => {
    try {
      const data = await axios.get("https://govi-piyasa-v-0-1.herokuapp.com/api/v1/advertisements");
      setAds(data.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(()=>{
    getData();
  },[])

  

  return (
    <div className="content">

      {ads.map((ad)=>{
        return(

          <Card sx={{ display: 'flex' }}>

          <CardMedia
            component="img"
            sx={{ width: '70%' }}
            image={img1}
            alt="Live from space album cover"
          />

          <Box sx={{ display: 'flex', flexDirection: 'column', width: '30%' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h5"> {ad.Title} </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div"> {ad.Description} </Typography>
            </CardContent>
          </Box>
         
        </Card>

    )})}

    </div>
  );

};

export default Advertisement;
