import * as React from 'react';
import { Button } from "react-bootstrap";
import "./styles.css"
import {Card, CardContent, IconButton, Typography, CardActions, CardMedia } from '@mui/material';
import ButtonMui from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
// import { Box, IconButton } from "@mui/material";
// import TextField from '@mui/material/TextField';
// import ClearIcon from '@mui/icons-material/Clear';
// import SearchIcon from '@mui/icons-material/Search';
import InfoCropForm from '../../Components/InfoCropForm';
import { useParams, useNavigate } from 'react-router-dom';
import AlertMsg from "../../Components/Alert";
import { useState, useEffect } from "react";
import axios from "axios";
import { Edit } from '@material-ui/icons';


const Crops = () => {

  const [crops, setCrops] = useState([]);
  const [show, setShow] = useState(false);
  const [openDlt, setOpenDlt] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  // const [platform, setPlatform] = useState([]);
  // const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  let params = useParams();
  const user_token = window.localStorage.getItem("token");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseDlt = () => setOpenDlt(false);
  const handleCloseUpdate = () => setOpenUpdate(false);
  
  const getCrops = async (id) => {
    try {
      console.log(params.id);
      const data = await axios.get("https://govi-piyasa-v-0-1.herokuapp.com/api/v1/infoCategories/getCategoryByParent/"+params.id);
      //setPlatform(data.data.data);
      setCrops(data.data.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(()=>{
    getCrops();
  },[crops])


  const loadInfo = (id) => {
    navigate("/information/crops/details/"+id);
  }

  const deleteCrops = async (id) => {
    console.log("entered");
    console.log("crop "+id);
    await axios.delete("https://govi-piyasa-v-0-1.herokuapp.com/api/v1/information/"+id,
                      { headers : 
                        {'Authorization' : `Bearer ${user_token}`}
                      }
    )
    .then(()=>{
      setOpenDlt(true);
    })
  }

  // //search function
  // function escapeRegExp(value) {
  //   return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  // }
  // const requestSearch = (searchValue) => {
  //   const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
  //   const filteredRows = platform.filter((row) => {
  //       return searchRegex.test(row.categoryName) 
  //   });
  //   setCrops(filteredRows);
  // };


  return ( 
    <div className="content">
      <div className="row">
        
      {/* <Box>
        <TextField variant="standard" value={searchText}
          onChange={(e) => { setSearchText(e.target.value); requestSearch(e.target.value) }}
          placeholder="Search..."
            InputProps={{
              startAdornment: <SearchIcon fontSize="small" color="action" />,
              endAdornment: (
                <IconButton title="Clear" aria-label="Clear" size="small"
                  style={{ visibility: searchText ? 'visible' : 'hidden', borderRadius: "57%", paddingRight: "1px", margin: "0", fontSize: "1.25rem" }}
                  onClick={(e) => {setSearchText(''); setCrops(platform)} }
                >
                  <ClearIcon fontSize="small" color="action" />
                </IconButton>
              ),
            }}
            sx={{ width: { xs: 1, sm: 'auto' }, m: (theme) => theme.spacing(1, 1.5, 1.5, 2.5),
                  '& .MuiSvgIcon-root': { mr: 0.5 },
                  '& .MuiInput-underline:before': { borderBottom: 1, borderColor: 'divider', },
            }}
        /> */}
      
      
        <div className="col-12">
          <Button variant="success" className="float-sm-end m-3" size="sm" onClick={handleShow} >
            Add Crop
          </Button>
          <InfoCropForm show={show} title="Add Crop" handleClose={handleClose} />
        </div>
        {/* </Box> */}
     </div>


     <div className="grid">

    {crops.map((crop) => {
      if(crop.categoryType === "Sub"){

      return (

      // <Link to="/information/crops/details" style={{textDecoration :'none'}}>

        <Card sx={{ width: 180, height: 210, ':hover': { boxShadow: 6} }} className="cards" hoverable >
          <CardMedia
            component="img" height="120"
            image={crop.image}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" fontSize={"medium"} component="div" textAlign={"center"}>
              {crop.categoryName}
            </Typography>
            <ButtonMui size="small" onClick={()=>loadInfo(crop._id)}> View </ButtonMui>
            <IconButton> <EditIcon size="small" color="primary" /> </IconButton>
            <IconButton onClick={()=>deleteCrops(crop._id)}> <DeleteIcon size="small" color="error"/> </IconButton>
          </CardContent>
        </Card>

      // </Link>

      )}})}
           
      {/* <AlertMsg open={openDlt} msg="Deleted successfully" status="error" handleClose={handleCloseDlt}/>  */}
      <AlertMsg open={openUpdate} msg="Crop updated" status="info" handleClose={handleCloseUpdate}/>

        </div>
    </div>
   );
}
 
export default Crops;