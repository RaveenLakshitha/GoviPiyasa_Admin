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
import BlockIcon from '@mui/icons-material/Block';
import Tooltip from '@mui/material/Tooltip';
import { Badge } from "react-bootstrap";


const Forum = () => {
  //const [search, setSearch] = useState("");
  const [hoveredRow, setHoveredRow] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [show, setShow] = useState(false);
  const [ansID, setAnsID] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleDelete = (id) => {
    setTableData(tableData.filter((data) => data._id !== id));
    console.log(id);
  };

  const onMouseEnterRow = (event) => {
    const id = event.currentTarget.getAttribute("data-id");
    setHoveredRow(id);
  };

  const onMouseLeaveRow = (event) => {
    setHoveredRow(null);
  };

  const handleView = async (id) => {
    try {
      setAnsID(id);
      console.log("Hi,"+id);
      //const data = await axios.get("https://govi-piyasa-v-0-1.herokuapp.com/api/v1/forum/Questions/getQuestion/"+ansID);
      handleShow();
      //console.log(data.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getAllData = async () => {
    try {
      const data = await axios.get("https://govi-piyasa-v-0-1.herokuapp.com/api/v1/forum/Questions/");
      setTableData(data.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(()=>{
    getAllData();
  },[])

  
  
  const columns = [

    { field: 'Category', headerName: 'Category', width:130 },
    { field: 'Title', headerName: 'Title', width:250 },
    // { field: 'Category', headerName: 'Name', width: 100 ,
    //   valueGetter: (params) => {
    //     return params.getValue(params.id, "user").userName;
    //   }
    // },
    { field: 'QuestionBody', headerName: 'Question', width: 320},
    { field: 'Answers', headerName: 'View Answer', width: 100, default:"...",
      
      renderCell: (params) => {
        if (hoveredRow === params.id) {
        // customBodyRenderLite: (dataIndex) => {
          return (
          <Box
            sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"
            }}
          >
            <IconButton onClick={() => handleView(params.id)}>
              <RemoveRedEyeIcon color="info"/>
            </IconButton>
            <Preview show={show} id={params.id} handleClose={handleClose}/>
          </Box>
        );
      }
    }},
    //}},
    { field: 'status', headerName: 'Status', width: 100,
      renderCell: (params) => { 
        return(
          params.getValue(params.id,'status') === true ?   <Badge pill bg="success">Enable</Badge> : <Badge pill bg="secondary">Disable</Badge>
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
              <Tooltip title="Hide" arrow>
                <IconButton >
                  <BlockIcon color="warning" />
                </IconButton>
              </Tooltip>
              <IconButton onClick={() => handleDelete(params.id)}>
                <DeleteIcon color="error" />
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
      <h3>QnA Forum</h3>
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

export default Forum;
