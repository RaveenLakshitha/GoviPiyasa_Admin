import axios from "axios";
import { useEffect, useState } from "react";
import NotifyMsg from "../../Components/ShowMsg/NotifyMsg";
import "../../App.css";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Alert } from "@mui/material";
import { Box } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';


const User = () => {
  //const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [hoveredRow, setHoveredRow] = useState(null);
  //const [confirmOpen, setConfirmOpen] = useState(false);
  //const [confirmDialog, setConfirmDialog] = useState({isOpen:false, title:'', subTitle:''});


  const handleDelete = (id) => {

    setTableData(tableData.filter((data) => data._id !== id));
    ///alert("Deleted!");
    console.log(id);
  };

  const onMouseEnterRow = (event) => {
    const id = event.currentTarget.getAttribute("data-id");
    setHoveredRow(id);
  };

  const onMouseLeaveRow = (event) => {
    setHoveredRow(null);
  };


  const getProductData = async () => {
    try {
      const data = await axios.get("https://govi-piyasa-v-0-1.herokuapp.com/api/v1/auths/getUsers");
      setTableData(data.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(()=>{
    getProductData();
  },[])

  
  const columns = [
    { field: '_id', headerName: 'ID', width: 200 },
    { field: 'profilePicture', headerName: 'Image' },
    { field: 'userName', headerName: 'Name', width: 100 },
    { field: 'email', headerName: 'Email', width: 200},
    { field: 'city', headerName: 'City', width: 100 },
    { field: 'contactNumber', headerName: 'Contact No', width: 100 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        if (hoveredRow === params.id) {
          return (
            <Box
              sx={{
                backgroundColor: "whitesmoke",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <IconButton onClick={() => {
                  setOpen(true);
                  handleDelete(params.id);
              }}>
                <DeleteIcon />
              </IconButton>
            </Box>
            
          );
        } else return null;
      }
    }
    
  ]

  // {
  //   product.filter((item) => {
  //     if (search === "") {
  //       return item;
  //     } else if (item.name.toLowerCase().includes(search.toLowerCase())) {
  //       return item;
  //     } else {
  //       return false;
  //     }
  //   });
  // }

  return (
    <div className="App1">
      <h3>User list</h3>

      <input type="text" placeholder="Search here"/>

        {/* // onChange={(e) => {
        //   setSearch(e.target.value);
        // }} */}
      

      <Box sx={{ width: '100%',display: 'inline-flex', flexDirection: 'row-reverse'}}>
        <Collapse in={open}>
        <Alert
          action={
            <IconButton aria-label="close" color="error" size="small"
              onClick={() => {
                setOpen(false);
              }}
            ><CloseIcon fontSize="inherit" />
            </IconButton>
          }
          color="error"
        > Deleted successfully! </Alert>
        </Collapse>
      </Box>
      

      <div style={{ height: 400, width: "100%", padding: "1em" }}>
        <DataGrid
          rows={tableData}
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          disableSelectionOnClick
          initialState={{ pinnedColumns: { right: ["actions"] } }}
          componentsProps={{
            row: {
              onMouseEnter: onMouseEnterRow,
              onMouseLeave: onMouseLeaveRow
            }
          }} 
        
        />
        
              
        
      </div>
    </div>
  );
};

export default User;
