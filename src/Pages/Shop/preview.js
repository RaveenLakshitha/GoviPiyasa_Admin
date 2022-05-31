import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";


const Preview = (props) => {

  const [tableData, setTableData] = useState([]);
  const id = props.id;

  useEffect(()=>{
    const getData = async () => {
      try {
        console.log(id);
        const data = await axios.get("https://govi-piyasa-v-0-1.herokuapp.com/api/v1/shops/"+id);
        setTableData(data.data.data);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  },[id])


  const columns = [
    { field: 'productName', headerName: 'Item', width:150 },
    { field: 'price', headerName: 'Price', width: 60 },
    { field: 'quantity', headerName: 'Qty', width: 50 },
    { field: 'description', headerName: 'Description', width: 200},
  ]


  return ( 
    <div>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Item details</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <p className="space"> Shop name : {tableData.shopName} </p>
          
          <p className="space"> User name : {tableData.user} </p>
        
          <p className="space"> Item list </p>

          <DataGrid
            rows={tableData.shopItems}
            columns={columns}
            getRowId={(row) => row._id}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
           disableSelectionOnClick
          />
         
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