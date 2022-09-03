import axios from "axios";
import { useEffect, useState } from "react";
import "../../App.css";
import * as React from "react";
import { Badge } from "react-bootstrap"
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Avatar } from "@mui/material";
import { Box } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import BlockIcon from '@mui/icons-material/Block';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import Tooltip from '@mui/material/Tooltip';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import AlertMsg from "../../Components/Alert";
import ChooseOption from "../../Components/DialogBox";


const Expert = () => {

  const user_token = window.localStorage.getItem("token");
  
  //const [search, setSearch] = useState("");
  const [tableData, setTableData] = useState([]);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [platform, setPlatform] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [openDlt, setOpenDlt] = useState(false);
  const [openBlk, setOpenBlk] = useState(false);
  const [openUnblk, setOpenUnblk] = useState(false);
  const [openDlg, setOpenDlg] = useState(false);
  //const [show, setShow] = useState(false);
  //const [notify, setNotify] = useState({isOpen:false, message:'', type:''});


  //const handleClose = () => setShow(false);
  //const handleShow = () => setShow(true);


   //alert messages
   const handleCloseDlt = () => setOpenDlt(false);
   const handleCloseBlk = () => setOpenBlk(false);
   const handleCloseUnblk = () => setOpenUnblk(false);
   const handleCloseDlg = () => setOpenDlg(false);


  //delete function
  const handleDelete = (id) => {
    setTableData(tableData.filter((data) => data._id !== id));
    setOpenDlt(true);
    console.log(id);
  };


  //approve the expert request
  const handleApprove = () => {
    console.log("Approved");
  }


  //search function
  function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }
  const requestSearch = (searchValue) => {
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    const filteredRows = platform.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field]);
      });
    });
    setTableData(filteredRows);
  };


  //block the expert
  const handleSuspend = (id) => {
    console.log("Status "+" "+id);

    axios.put("https://govi-piyasa-v-0-1.herokuapp.com/api/v1/experts/setExpertStatus/"+id, 
              {status: "Block"},
              { headers : 
                {'Authorization' : `Bearer ${user_token}`}
              })
    .then(() => {
      console.log("updated");
      getAllData();
      setOpenBlk(true);
    })
  }


  //unblock the expert
  const handleUnblock = (id) => {
    console.log("Status "+id);
    axios.put("https://govi-piyasa-v-0-1.herokuapp.com/api/v1/experts/setExpertStatus/"+id, 
              {status: "Unblock"},
              { headers : 
                {'Authorization' : `Bearer ${user_token}`}
              })
    .then(() => {
      getAllData();
      setOpenUnblk(true);
    })
  }


  //preview the expert
  const handleView = (id) => {
    //setTableData(tableData.filter((data) => data._id !== id));
    //setNotify({isOpen:true, message:'Updated successfully!', type:'warning'});
    console.log(id);
  };


  //show the action buttons on the selected row
  const onMouseEnterRow = (event) => {
    const id = event.currentTarget.getAttribute("data-id");
    setHoveredRow(id);
  };
  const onMouseLeaveRow = (event) => {
    setHoveredRow(null);
  };


  //get all experts
  const getAllData = async () => {
    try {
      const data = await axios.get("https://govi-piyasa-v-0-1.herokuapp.com/api/v1/experts/");
      setTableData(data.data.data);
      setPlatform(data.data.data);
    } catch (e) {
      console.log(e);
    }
  };



  useEffect(()=>{
    getAllData();
  },[tableData])

  
  const columns = [
    { field: 'profilePicture', headerName: 'Image', width: 70,
      renderCell: (params) => { 
        return(
          <Avatar sx={{width:35, height:35}}/>
        );
      }
    },
    { field: 'userName', headerName: 'Name', width: 160 },
    { field: 'email', headerName: 'Email', width: 180},
    { field: 'city', headerName: 'City', width: 100 },
    { field: 'contactNumber', headerName: 'Contact No', width: 120 },
    { field: 'designation', headerName: 'Designation', width: 200 },
    { field: 'description', headerName: 'Description', width: 280 },
    { field: 'expertVisibility', headerName: 'Status', width: 100, sortable: false,
      renderCell: (params) => { 
        return(
          params.getValue(params.id,'expertVisibility') ==="Active" ?   <Badge bg="success">Active</Badge> : 
          (params.getValue(params.id,'expertVisibility')==="Pending" ? <Badge bg="primary">Pending</Badge> :
          (params.getValue(params.id,'expertVisibility')==="Suspend" ? <Badge bg="warning" text="dark">Suspend</Badge> : 
                                                                    <Badge bg="danger">Rejected</Badge>))
        );
      }
    },
    { field: "actions", headerName: "Actions", width: 120, sortable: false, disableColumnMenu: true,
      renderCell: (params) => {
        if (hoveredRow === params.id) {
          return (
            <Box
              sx={{ width: "100%", height: "100%", display: "flex",
                justifyContent: "center", alignItems: "center"
              }}
            >
              <Tooltip title={params.getValue(params.id,'expertVisibility') === "Active" ? "Block" : 
                            ((params.getValue(params.id,'expertVisibility')) === "Pending" ? "Approve" : "Unblock")}  arrow>

                <IconButton onClick={() => params.getValue(params.id,'expertVisibility') === "Active" ? handleSuspend(params.id, params.getValue(params.id,'shopVisibility')) : 
                                          (params.getValue(params.id,'expertVisibility') === "Pending" ? handleApprove(params.id) : 
                                                                                                      handleUnblock(params.id))}>

                  {params.getValue(params.id,'expertVisibility') === "Active" ? <BlockIcon color="warning" /> : 
                  (params.getValue(params.id,'expertVisibility') === "Pending" ? <PendingActionsIcon color="warning" /> : 
                  (params.getValue(params.id,'expertVisibility') === "Suspend" ? <RemoveCircleOutlineIcon color="secondary"/> : 
                                                                                <UnpublishedIcon color="danger"/>))}
                </IconButton>
              </Tooltip>

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

      <Box>
        <TextField variant="standard" value={searchText}
          onChange={(e) => { setSearchText(e.target.value); requestSearch(e.target.value) }}
          placeholder="Search..."
            InputProps={{
              startAdornment: <SearchIcon fontSize="small" color="action" />,
              endAdornment: (
                <IconButton title="Clear" aria-label="Clear" size="small"
                  style={{ visibility: searchText ? 'visible' : 'hidden', borderRadius: "57%", paddingRight: "1px", margin: "0", fontSize: "1.25rem" }}
                  onClick={(e) => {setSearchText(''); setTableData(platform)} }
                >
                  <ClearIcon fontSize="small" color="action" />
                </IconButton>
              ),
            }}
            sx={{ width: { xs: 1, sm: 'auto' }, m: (theme) => theme.spacing(1, 1.5, 1.5, 2.5),
                  '& .MuiSvgIcon-root': { mr: 0.5 },
                  '& .MuiInput-underline:before': { borderBottom: 1, borderColor: 'divider', },
            }}
        />
      </Box>


      <div style={{ height: 500, width: "100%", padding: "1em" }}>
        <DataGrid
          rows={tableData}
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={10}
          rowsPerPageOptions={[10]}
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

      <ChooseOption open={openDlg} handleClose={handleCloseDlg}/>
      <AlertMsg open={openDlt} msg="Deleted successfully" status="error" handleClose={handleCloseDlt}/>
      <AlertMsg open={openBlk} msg="Expert Blocked" status="warning" handleClose={handleCloseBlk}/>
      <AlertMsg open={openUnblk} msg="Expert Unblocked" status="info" handleClose={handleCloseUnblk}/>
    </div>
  );
};

export default Expert;
