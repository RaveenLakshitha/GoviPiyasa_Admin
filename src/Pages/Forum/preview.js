//import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import axios from "axios";
import "./styles.css"
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton} from "@mui/material";
import Paper from '@mui/material/Paper';


const Preview = (props) => {

  const [tableData, setTableData] = useState([]);
  const [answers, setAnswers] = useState([]);

  const id = props.id;

  const getData = async (id) => {
    try {
      const data = await axios.get("https://govi-piyasa-v-0-1.herokuapp.com/api/v1/forum/Questions/getQuestion/"+id);
      setTableData(data.data.data);
      setAnswers(data.data.data.Answers);
      console.log(tableData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(()=>{
    getData(id);
  },[id])


  const handleDelete = async (id) => {
    const response = await axios.delete("https://govi-piyasa-v-0-1.herokuapp.com/api/v1/forum/Answers/RemoveAnswer/"+id);
    if(response){
      getData();
    }
  }

  return ( 
    <div>
      <Modal show={props.show} onHide={props.handleClose} size="xl" className="modalstyle" >
        <Modal.Header closeButton>
          <Modal.Title>Answers</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{tableData.Title}</h4>
          <br></br>

          <p className="space1"> <b> {tableData.QuestionBody} </b></p>
        
          <p className="space"> Answers </p>

          {answers.map((ans) => {
            return(
              
              <Paper key={ans.id} style={{padding: "10px", margin: "20px"}} elevation={4}>
                {ans.AnswerBody}
                <IconButton style={{float:"right"}} onClick={() => handleDelete(ans.id)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </Paper>
            )
          })}
         
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}> Close </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
 
export default Preview;