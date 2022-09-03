import * as React from 'react';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Button } from "react-bootstrap";
import InfoDetailsForm from '../../Components/InfoDetailsForm';
import axios from "axios";
import {Card, Box, IconButton} from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CardMedia from '@mui/material/CardMedia';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoCropIntro from '../../Components/InfoCropIntro';



const Details = () => {

  const [details, setDetails] = useState([]);
  const [show, setShow] = useState(false);
  const [intro, setIntro] = useState([]);
  const [data, setData] = useState([]);
  const [showIntro, setShowIntro] = useState(false);


  let params = useParams();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowIntro = () => setShowIntro(true);
  const handleCloseIntro = () => setShowIntro(false);


  useEffect(()=>{

    const getInfo = async () => {
      const data = await axios.get("https://govi-piyasa-v-0-1.herokuapp.com/api/v1/information/"+params.id)
      setIntro(data.data.data);
    }

    const getDetails = async () => {

      try {
        const data = await axios.get("https://govi-piyasa-v-0-1.herokuapp.com/api/v1/information/getInfoByCategory/"+params.id);
        setData(data);
        setIntro(data.data.data[0]);
        setDetails(data.data.data[0].Articles);

      } catch (e) {
        console.log(e);
      }
    }

    getDetails();
  },[intro])



  return ( 
    <div className='content'>

      <div className="row">
      
        <div className="d-flex justify-content-end">
          <Button variant="outline-success" className="float-sm-start m-3" size="sm" onClick={handleShowIntro} >
            Update Intro
          </Button>
          <Button variant="success" className="float-sm-end m-3" size="sm" onClick={handleShow} >
            Add Info
          </Button>
          <InfoDetailsForm show={show} title="Add information" id={intro._id} handleClose={handleClose} />
          <InfoCropIntro show={showIntro} title="Add introduction" id={intro._id} handleClose={handleCloseIntro} />
        </div>
     </div>

      <div>
     
        <Card sx={{ display: 'flex', height: '200px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '30%' , justifyContent: 'space-between'}}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              Name           : {intro.Title} <br></br>
              Botanical Name : {intro.ScientificName} <br></br>
              Family         : {intro.Family} <br></br>
            </CardContent>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '70%' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              {intro.Description}<br></br>
            </CardContent>
          </Box>
        </Card>
         



      {details.map((detail) => {
        return (

       <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography><b>{detail.Title}</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography> {detail.Description} </Typography>
          
          <IconButton sx={{float:'right'}} color="error"><DeleteIcon/></IconButton>
          <IconButton sx={{float:'right'}} color="primary"><EditIcon/></IconButton>
          
        </AccordionDetails>
      </Accordion>

      )})}

      </div>
    </div>
   );
}
 
export default Details;