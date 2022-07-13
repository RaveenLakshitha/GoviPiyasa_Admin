import { useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import "../../App.css";
import InfoCropForm from "../../Components/InfoCropForm";
import Crop from "./itemList"
import "./styles.css"
import {Card, CardContent, CardMedia, Typography } from '@mui/material';



const Information = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="content">
      <div className="m-1">
        <div className="row">
          <div className="col-5">
            <input type="text" placeholder="Search..." />
          </div>
          {/* <div className="col-3">
            <br></br>
            <Dropdown>
              <Dropdown.Toggle variant="outline-success" id="dropdown-basic" size="sm" >
                Select category
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Flowers</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Vegetables</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Fruits</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div> */}

          <div className="col-6">
            <Button variant="success" className="float-sm-end m-3" size="sm" onClick={handleShow} >
              Add Crop
            </Button>
            <InfoCropForm show={show} title="Add Crop" handleClose={handleClose} />
          </div>
        </div>

        <div className="w-100">
          <br></br>
          <div className="grid">

          <Card sx={{ minWidth: 250, maxHeight:50, ':hover': { boxShadow: 6} }} className="cards" hoverable>
            <CardContent>
              <Typography gutterBottom variant="h6" fontSize={"medium"} component="div" textAlign={"left"}>
                Fruits
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ minWidth: 250, maxHeight:50, ':hover': { boxShadow: 6} }} className="cards" hoverable>
            <CardContent>
              <Typography gutterBottom variant="h6" fontSize={"medium"} component="div" textAlign={"left"}>
                Vegetables
              </Typography>
            </CardContent>
          </Card>

            <Crop/>
            <Crop/>
            <Crop/>
            <Crop/>
            <Crop/>
            <Crop/>
            <Crop/>
            <Crop/>  <Crop/>
            <Crop/>
            <Crop/>
            <Crop/>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
