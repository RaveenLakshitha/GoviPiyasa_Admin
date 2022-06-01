import axios from "axios";
import { useEffect, useState } from "react";
import "../../App.css";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Preview from "./preview";
import { IconButton} from "@mui/material";
import { Box } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
//import { Badge } from "react-bootstrap";

const User = () => {
  //const [search, setSearch] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [show, setShow] = useState(false);;


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = (id) => {
    setTableData(tableData.filter((data) => data._id !== id));
    console.log(id);
  };

  // const handleView = (id) => {
  //   handleShow();
  //   console.log(id);
  // }

  const handleView = async (id) => {
      try {
        console.log(id);
        const data = await axios.get("https://govi-piyasa-v-0-1.herokuapp.com/api/v1/shops/"+id);
        handleShow();
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };


  const onMouseEnterRow = (event) => {
    const id = event.currentTarget.getAttribute("data-id");
    setHoveredRow(id);
  };

  const onMouseLeaveRow = (event) => {
    setHoveredRow(null);
  };

  const getData = async () => {
    try {
      const data = await axios.get("https://govi-piyasa-v-0-1.herokuapp.com/api/v1/shops");
      setTableData(data.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(()=>{
    getData();
  },[])



  //initialize columns 
  
  const columns = [
    { field: '_id', headerName: 'ID', width: 200 },
    { field: 'shopName', headerName: 'Shop', width: 150 },
    { field: 'userName', headerName: 'Name', width: 100 ,
      valueGetter: (params) => {
        return params.getValue(params.id, "user").userName;
      }
    },
    { field: 'email', headerName: 'Email', width: 200},
    { field: 'city', headerName: 'City', width: 100 ,
      valueGetter: (params) => {
        return params.getValue(params.id, "user").city;
      }
    },
    { field: 'contactNumber', headerName: 'Contact No', width: 100 ,
      valueGetter: (params) => {
        return params.getValue(params.id, "user").contactNumber;
      }
    },
    { field: 'shopItems', headerName: 'No of items', width: 100 },
    { field: 'ratingSum', headerName: 'Rating', width: 100 },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
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
              <IconButton onClick={() => handleDelete(params.id)}>
                <DeleteIcon />
              </IconButton>
              <IconButton onClick={() => handleView(params.id)}>
                <RemoveRedEyeIcon />
              </IconButton>
              <Preview show={show} id={params.id} handleClose={handleClose}/>
            </Box>
          );
        } else return null;
      }
    }
  ]




  return (
    <div className="App1">
      <h3>Shop list</h3>
      <input type="text" placeholder="Search here"
        // onChange={(e) => {
        //   setSearch(e.target.value);
        // }}
      />
      

      <br></br>

      <div style={{ height: 400, width: "100%", padding: "1em" }}>
        <DataGrid
          rows={tableData}
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          disableSelectionOnClick
          initialState={{ pinnedColumns: { right: ['actions'] } }}
          componentsProps={{
            row: {
              onMouseEnter: onMouseEnterRow,
              onMouseLeave: onMouseLeaveRow
            }
          }}
        >  
        </DataGrid>
      </div>
    </div>
  );
};

export default User;
