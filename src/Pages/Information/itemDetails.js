import * as React from 'react';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Button } from "react-bootstrap";
import InfoDetailsForm from '../../Components/InfoDetailsForm';
import axios from "axios";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Details = () => {

  const [details, setDetails] = useState([]);
  const [show, setShow] = useState(false);

  let params = useParams();
  console.log(params);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  


  useEffect(()=>{

    const getDetails = async () => {

      try {
        const data = await axios.get("https://govi-piyasa-v-0-1.herokuapp.com/api/v1/information/getInfoByCategory/"+params.id);
        setDetails(data.data.data[0].Articles);
  
      } catch (e) {
        console.log(e);
      }
    }

    getDetails();
  },[])



  return ( 
    <div className='content'>

      <div className="row">
      
        <div className="d-flex justify-content-end">
          <Button variant="success" className="float-sm-end m-3" size="sm" onClick={handleShow} >
            Add Info
          </Button>
          <InfoDetailsForm show={show} title="Add information" handleClose={handleClose} />
        </div>
     </div>

      <div>

      {details.map((detail) => {
        return (

       <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">

          <Typography><b>{detail.Title}</b></Typography>

        </AccordionSummary>
        <AccordionDetails>

          <Typography> {detail.Description} </Typography>

        </AccordionDetails>
      </Accordion>

      )})}

      </div>
    </div>
   );
}
 
export default Details;