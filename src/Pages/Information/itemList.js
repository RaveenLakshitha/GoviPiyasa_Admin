import * as React from 'react';
import "./styles.css"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";


const Crops = () => {

  const [crops, setCrops] = useState([]);
  const navigate = useNavigate();

  let params = useParams();
  console.log(params);

  
  const getCrops = async (id) => {
    try {
      const data = await axios.get("https://govi-piyasa-v-0-1.herokuapp.com/api/v1/infoCategories/getCategoryByParent/"+params.id);
      setCrops(data.data.data);

    } catch (e) {
      console.log(e);
    }
  }

  useEffect(()=>{
    getCrops();
  },[])

  const loadInfo = (id) => {
    console.log("detail"+id);
    navigate("/information/crops/details/"+id);
  }


  return ( 
    <div className="grid">

    {crops.map((crop) => {
      if(crop.categoryType === "Sub"){

      return (

      // <Link to="/information/crops/details" style={{textDecoration :'none'}}>

        <Card sx={{ width: 150, height: 180, ':hover': { boxShadow: 6} }} className="cards" hoverable onClick={()=>loadInfo(crop._id)}>
          <CardMedia
            component="img" height="120"
            image={crop.image}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" fontSize={"medium"} component="div" textAlign={"center"}>
              {crop.categoryName}
            </Typography>
          </CardContent>
        </Card>

      // </Link>

      )}})}
    </div>
   );
}
 
export default Crops;