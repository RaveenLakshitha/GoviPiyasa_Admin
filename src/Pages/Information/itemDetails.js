import * as React from 'react';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Details = () => {

  const [details, setDetails] = useState([]);
  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);
  const [crop, setCrop] = useState([]);

  let params = useParams();
  console.log(params);
  

  const getDetails = async () => {

    try {
      const data = await axios.get("https://govi-piyasa-v-0-1.herokuapp.com/api/v1/information/getInfoByCategory/"+params.id);
      console.log(data);
      setDetails(data.data.data);
      setTitle(data.data.data[0].SubTitles);
      setDescription(data.data.data[0].Descriptions);
      console.log(data.data.data);
      console.log(data.data.data[0].SubTitles);
      console.log(data.data.data[0].Descriptions);

    } catch (e) {
      console.log(e);
    }
  }


  useEffect(()=>{
    getDetails();
  },[])



  return ( 
    <div className='content'>
      <div>

      {details.map((detail) => {
        return (

       <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">

          <Typography>{detail.subTitles}</Typography>

        </AccordionSummary>
        <AccordionDetails>

          <Typography> {detail.Descriptions} </Typography>

        </AccordionDetails>
      </Accordion>

      )})}

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Land preparation</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Need one post and supportive structure at the top for one plant. The life time of the plant is nearly 25-30 years; hence the durability of the post is very important.
          The distance between two pits should be 2x2m, 2x3m or 3x3m and the length, width and depth of the pit should be subsequently 2x2x1 ft. To stand the post another deep pit should be prepared at the center of the first pit which is 1x1x1/2 ft in size. Height of the post should be 7 ½ ft and the diameter should be 4-6 inches. The post should be stand at the center of the small pit and for fixing it concrete should be applied until the small pit is totally filled (1/2 ft).
          </Typography>
        </AccordionDetails>
      </Accordion>
      </div>
    </div>
   );
}
 
export default Details;