import axios from "axios";
import { useEffect, useState } from "react";
import "../../App.css";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Preview from "./preview";
import { IconButton, Rating} from "@mui/material";
import { Box } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import BlockIcon from '@mui/icons-material/Block';
import { Badge } from "react-bootstrap";

const Shop = () => {

  //const [search, setSearch] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState("K");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleDelete = (id) => {
    try{
      axios.delete("https://govi-piyasa-v-0-1.herokuapp.com/api/v1/shops/"+id);
      setTableData(tableData.filter((data) => data._id !== id));
      alert("Deleted!");
      console.log(id);
    }
    catch{

    }
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

  const handleSuspend = (id, status) => {
    try{
      console.log(status);
      if(status==="Active"){
        console.log(status);
        setStatus("Suspend");
      }
      axios.put("https://govi-piyasa-v-0-1.herokuapp.com/api/v1/shops/setShopVisibility/"+id, status);
    }
    catch{

    }
  }


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
    { field: 'shopName', headerName: 'Shop', width: 150 },
    { field: 'userName', headerName: 'Name', width: 150 ,
      valueGetter: (params) => {
        return params.getValue(params.id, "user").userName;
      }
    },
    { field: 'email', headerName: 'Email', width: 170},
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
    { field: 'itemCount', headerName: 'No of items', width: 100 },
    { field: 'rating', headerName: 'Rating', width: 120,
        renderCell: (params) => { 
          return(
            <Rating name="read-only" size="small" value={params.getValue(params.id,'rating')} precision={0.5} readOnly />
          );
        }
    },
    { field: 'shopVisibiliy', headerName: 'Status', width: 100, value:'Active' ,sortable: false,
      renderCell: (params) => { 
        return(
          setStatus(params.getValue(params.id,'shopVisibility')),
          params.getValue(params.id,'shopVisibility') ==="Active" ?   <Badge pill bg="success">Active</Badge> : 
          (params.getValue(params.id,'shopVisibility')==="Inactive" ? <Badge pill bg="danger">Not Active</Badge> :
          (params.getValue(params.id,'shopVisibility')==="Pending" ? <Badge pill bg="primary">Pending</Badge> :
          (params.getValue(params.id,'shopVisibility')==="Suspend" ? <Badge pill bg="warning" text="dark">Suspend</Badge> : 
                                                                    <Badge pill bg="secondary">Rejected</Badge>)))
        );
      }
    },
    { field: "actions", headerName: "Actions", width: 120, sortable: false, disableColumnMenu: true,
      renderCell: (params) => {
        if (hoveredRow === params.id) {
          return (
            <Box
              sx={{ backgroundColor: "whitesmoke", width: "100%", height: "100%", display: "flex",
                justifyContent: "center", alignItems: "center"
              }}
            >
              <IconButton>
                <BlockIcon color="warning" onClick={() => handleSuspend(params.id, params.getValue(params.id,'shopVisibiliy'))}/>
              </IconButton>
              <IconButton onClick={() => handleDelete(params.id)}>
                <DeleteIcon color="error" />
              </IconButton>
              <IconButton onClick={() => handleView(params.id)}>
                <RemoveRedEyeIcon color="info"/>
              </IconButton>
              <Preview show={show} id={params.id} handleClose={handleClose}/>
            </Box>
          );
        } else return null;
      }
    }
  ]




  return (
    <div className="content">
      <h3>Shop list</h3>
      <input type="text" placeholder="Search here"
        // onChange={(e) => {
        //   setSearch(e.target.value);
        // }}
      />
      

      <br></br>

      <div style={{ height: 500, width: "100%", padding: "1em" }}>
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

export default Shop;
