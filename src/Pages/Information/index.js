import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import ButtonMui from '@mui/material/Button';
import "../../App.css";
import InfoCategoryForm from "../../Components/InfoCategoryForm";
import axios from "axios";
import "./styles.css"
import { useNavigate } from "react-router-dom";
import {Card, CardContent, IconButton, Typography, CardActions } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";



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
    navigate("/information/crops/"+id);
  }

  useEffect(()=>{
    getCategory();
  },[category])


  const handleDelete = () => {
    console.log("deleted");
  }


  return (
    <div className="content">
      <div className="m-1">
        <div className="row">
          {/* <div className="col-5">
            <input type="text" placeholder="Search..." />
          </div> */}
          <div className="col-12">
            <Button variant="success" className="float-sm-end m-3" size="sm" onClick={handleShow} >
              Add Category
            </Button>
            <InfoCategoryForm show={show} title="Add Category" handleClose={handleClose} />
          </div>
        </div>

        <div className="w-100">
  
          <div className="grid">

            {/* <Link to={"/information/crops/"+parentId}>  */}

        {category.map((cat) => {
          if(cat.categoryType === "Main"){

          return (
            // <div className="container">
              <div key={cat._id} style={{float: 'left'}}>

              {/* <Link to="/information/crops/" style={{textDecoration :'none'}}> */}

                <Card sx={{ width: 250, maxHeight:100, ':hover': { boxShadow: 6} }} className="cards" key={cat._id}>
                  <CardContent>
                    <Typography gutterBottom variant="h6" fontSize={"medium"} component="div" textAlign={"left"}>
                      {cat.categoryName}
                    </Typography>
                  </CardContent>

                  <CardActions>
                    <ButtonMui size="small" onClick={()=>loadCrops(cat._id)}> View </ButtonMui>
                    <ButtonMui size="small"> Edit </ButtonMui>
                    <ButtonMui size="small" color="error"> Delete </ButtonMui>
                  </CardActions>
                </Card>  
                {/* </Link> */}
              </div> 
            //   <div className="icon">
            //     <IconButton onClick={handleDelete}>
            //       <DeleteIcon color="error" />
            //     </IconButton>
            //   </div>
            // </div>

          )}})}
            
            
          </div>
        </div>
      </div>
    </div>
  );
};


export default Information;

