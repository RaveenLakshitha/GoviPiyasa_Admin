import axios from "axios";
import { useEffect, useState } from "react";
import "../../App.css";
import * as React from "react";
import { Badge } from "react-bootstrap"
import { DataGrid } from "@mui/x-data-grid";
import { IconButton} from "@mui/material";
import { Box } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import BlockIcon from '@mui/icons-material/Block';


const Expert = () => {
  
  //const [search, setSearch] = useState("");
  const [tableData, setTableData] = useState([]);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [show, setShow] = useState(false);
  const [notify, setNotify] = useState({isOpen:false, message:'', type:''});


  //const handleClose = () => setShow(false);
  //const handleShow = () => setShow(true);


  const handleDelete = (id) => {
    setTableData(tableData.filter((data) => data._id !== id));
    alert("Deleted!");
    console.log(id);
  };

  const handleView = (id) => {
    //setTableData(tableData.filter((data) => data._id !== id));
    setNotify({isOpen:true, message:'Updated successfully!', type:'warning'});
    alert("Updated!");
    console.log(id);
  };

  const onMouseEnterRow = (event) => {
    const id = event.currentTarget.getAttribute("data-id");
    setHoveredRow(id);
  };

  const onMouseLeaveRow = (event) => {
    setHoveredRow(null);
  };


  const getAllData = async () => {
    try {
      const data = await axios.get("https://govi-piyasa-v-0-1.herokuapp.com/api/v1/auths/getExperts");
      setTableData(data.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(()=>{
    getAllData();
  },[])

  
  const columns = [
    { field: '_id', headerName: 'ID', width: 200 },
    { field: 'profilePicture', headerName: 'Image' },
    { field: 'userName', headerName: 'Name', width: 100 },
    { field: 'email', headerName: 'Email', width: 200},
    { field: 'city', headerName: 'City', width: 100 },
    { field: 'contactNumber', headerName: 'Contact No', width: 100 },
    { field: 'status', headerName: 'Status', width: 80,
      renderCell: (params) => { 
        return(
          <Badge pill bg="primary">Active</Badge>
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
                <BlockIcon color="warning"/>
              </IconButton>
              <IconButton onClick={() => handleDelete(params.id)}>
                <DeleteIcon color="error" />
              </IconButton>
              <IconButton onClick={() => handleView(params.id)}>
                <RemoveRedEyeIcon color="info"/>
              </IconButton>
            </Box>
          );
        } else return null;
      }
    }
  ]



  return (
    <div className="content">
      <h3>Expert list</h3>

        
          <input type="text" placeholder="Search here"
          //  onChange={(e) => {
          //   setSearch(e.target.value);
          //   }}
          />

          {/* <Button variant="success" className="float-sm-end m-3" size="sm" onClick={handleShow}>Add Expert</Button>
          <ExpertForm show={show} handleClose={handleClose} /> */}
        

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
          initialState={{ pinnedColumns: { right: ["actions"] } }}
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

export default Expert;
