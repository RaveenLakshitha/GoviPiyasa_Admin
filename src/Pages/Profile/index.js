import React from "react";
import img2 from '../../Images/prof.jpg';
import EditAdmin from "../../Components/EditAdmin";
import "./styles.css";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import DraftsIcon from '@mui/icons-material/Drafts';
import Button from '@mui/material/Button';
import axios from "axios";
import { useState, useEffect } from "react";
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import PersonIcon from '@mui/icons-material/Person';
import LocationCityIcon from '@mui/icons-material/LocationCity';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));




const Profile = () => {

  const user_token = window.localStorage.getItem("token");

  const [admin, setAdmin] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  

  const getData = async () => {
    try{
      const data = await axios.get("https://govi-piyasa-v-0-1.herokuapp.com/api/v1/auths/getLoggedUser",
                          { headers :  {'Authorization' : `Bearer ${user_token}`} });
                          console.log(data.data.data);
      setAdmin(data.data.data);
    }catch (e){
      console.log(e);
    }
  }

  useEffect(() => {
    getData();
  },[]);




  return (
    <div className="content" backgroundImage="prof.jpg" >

      <div className="pro">
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} sx={{backgroundImage : img2}}>

        <Grid  item xs={6} md={4} sx={{backgroundImage : img2}}>
          <img src={admin.profilePicture}  className="img" />
        </Grid>

          {/* <Item sx={{height:"160px", width:"250px"}}>
         */}
        {/* <div className="child"> */}
          {/* </div> */}
          {/* </Item> */}

        <Grid sx={{ display:"flex", alignItems:"center",justifyContent:"left", direction:"column", fontFamily:"initial", fontSize:'2rem', color:"green"}} item xs={6} md={8} >
          {/* <Item sx={{height:"100px", width:"450px" , backgroundColor:"ButtonShadow"}} >   */}
          {admin.userName}
            <Item sx={{display:"flex", margin: '0 auto'}}>
              <Button variant="contained" color="success" onClick={handleShow}> EDIT </Button>
               <EditAdmin show={show} handleClose={handleClose} />
            </Item>
        </Grid>

          {/* </Item> */}
          
        
        <Grid sx={{ display:"flex", alignItems:"center" }}item xs={8} md={4}>
          <Grid item xs={4} md={6} sx={{ paddingLeft:"40px", paddingRight:"10px"}}>
            <Item sx={{ width:"180px"} }>

            <ListItemButton>
              <PersonIcon sx={{marginRight:'10px'}}/> <ListItemText primary="Name" />
            </ListItemButton>

            <ListItemButton>
              <DraftsIcon sx={{marginRight:'10px'}}/>{" "} <ListItemText primary="Email" />
            </ListItemButton>

            <ListItemButton>
              <AddIcCallIcon sx={{marginRight:'10px'}}/> <ListItemText primary="Contact No" />
            </ListItemButton>

            <ListItemButton>
              <LocationCityIcon sx={{marginRight:'10px'}}/> <ListItemText primary="City" />
            </ListItemButton>

            </Item>
          </Grid>
        </Grid>


        <Grid container spacing={2}item xs={6} md={8} >
          <Grid item xs={6} md={8}>
            <Item>
              <ListItemButton>
                <ListItemText primary={admin.userName} />
              </ListItemButton>

              <ListItemButton>
                <ListItemText primary={admin.email} />
              </ListItemButton>

              <ListItemButton>
                <ListItemText primary={admin.contactNumber} />
              </ListItemButton>

              <ListItemButton>
                <ListItemText primary={admin.city}/>
              </ListItemButton>

            </Item>
          </Grid>
          {/* </Item> */}
        </Grid>
      </Grid>
    </Box>

    </div>
 
    </div>
  );
}
 
export default Profile;
