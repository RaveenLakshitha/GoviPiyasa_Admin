import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Details from './itemDetails';


const Crops = () => {

  const viewInfo = () => {

  }

  return ( 
    <div onClick={()=><Details/>}>
      <Card sx={{ maxWidth: 120, ':hover': { boxShadow: 6} }} className="cards" hoverable>
      <CardMedia
        component="img" height="80"
        image="https://doa.gov.lk/wp-content/uploads/2020/06/Banana-1.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" fontSize={"medium"} component="div" textAlign={"center"}>
          Banana
        </Typography>
      </CardContent>
      </Card>
    </div>
   );
}
 
export default Crops;