//import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import Paper from '@mui/material/Paper';


const Preview = (props) => {

  const [tableData, setTableData] = useState([]);
  const [answers, setAnswers] = useState([]);

  const id = props.id;

  useEffect(()=>{

    const getData = async (id) => {
      try {
        console.log("modal"+id);
        const data = await axios.get("https://govi-piyasa-v-0-1.herokuapp.com/api/v1/forum/Questions/getQuestion/"+id);
        setTableData(data.data.data);
        setAnswers(data.data.data.Answers);
        console.log(tableData);
      } catch (e) {
        console.log(e);
      }
    };
    getData(id);
  },[id])



  return ( 
    <div>
      <Modal show={props.show} onHide={props.handleClose} size="xl" className="modalstyle" >
        <Modal.Header closeButton>
          <Modal.Title>Answers</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>{tableData.Title}</h5>
          <br></br>

          <p className="space"> Question : <b> {tableData.QuestionBody} </b></p>
        
          <p className="space"> Answers </p>

          {answers.map(() => {
            return(
              <Paper style={{padding: "10px"}} elevation={4}>{answers.AnswerBody}</Paper>
            )
          })}

          {/* <Paper style={{padding: "10px"}} elevation={2}>{answers.AnswerBody}</Paper> */}
         
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
 
export default Preview;