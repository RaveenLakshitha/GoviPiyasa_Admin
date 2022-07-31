import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "../../App.css";
import InfoCategoryForm from "../../Components/InfoCategoryForm";
import axios from "axios";
import "./styles.css"
import { useNavigate } from "react-router-dom";
import {Card, CardContent, Typography } from '@mui/material';



const Information = () => {

  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [category, setCategory] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const getCategory = async () => {
    try {
      const data = await axios.get("https://govi-piyasa-v-0-1.herokuapp.com/api/v1/infoCategories");
      setCategory(data.data.data);

    } catch (e) {
      console.log(e);
    }
  }

  const loadCrops = (id) => {
    console.log("clicked"+id);
    navigate("/information/crops/"+id);
  }

  useEffect(()=>{
    getCategory();
  },[])




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

          <div className="col-7">
            <Button variant="success" className="float-sm-end m-3" size="sm" onClick={handleShow} >
              Add Category
            </Button>
            <InfoCategoryForm show={show} title="Add Category" handleClose={handleClose} />
          </div>
        </div>

        <div className="w-100">
          <br></br>
          <div className="grid">

            {/* <Link to={"/information/crops/"+parentId}>  */}

        {category.map((cat) => {
          if(cat.categoryType === "Main"){

          return (

            <div key={cat._id} onClick={()=>loadCrops(cat._id)}>

            {/* <Link to="/information/crops/" style={{textDecoration :'none'}}> */}

              <Card sx={{ width: 250, maxHeight:50, ':hover': { boxShadow: 6} }} className="cards" key={cat._id}>
                <CardContent>
                  <Typography gutterBottom variant="h6" fontSize={"medium"} component="div" textAlign={"left"}>
                    {cat.categoryName}
                  </Typography>
                </CardContent>
              </Card>  

              {/* </Link> */}
              
              </div> 

          )}})}
            
            
          </div>
        </div>
      </div>
    </div>
  );
};


export default Information;

