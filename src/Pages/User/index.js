import axios from "axios";
import { useEffect, useState } from "react";
import "../../App.css";
import AlertMsg from "../../Components/Alert";
import { Link } from "react-router-dom";
import { Badge } from "react-bootstrap";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from '@mui/icons-material/Block';
import StoreIcon from '@mui/icons-material/Store';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Tooltip from '@mui/material/Tooltip';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';





const User = () => {
  //const [show, setShow] = useState(false);
  const [openDlt, setOpenDlt] = useState(false);
  const [openBlk, setOpenBlk] = useState(false);
  const [openUnblk, setOpenUnblk] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [platform, setPlatform] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [category, setCategory] = useState('Users');

  const user_token = window.localStorage.getItem("token");

  const handleCloseDlt = () => setOpenDlt(false);
  const handleCloseBlk = () => setOpenBlk(false);
  const handleCloseUnblk = () => setOpenUnblk(false);


  //search function
  function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }
  const requestSearch = (searchValue) => {
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    const filteredRows = platform.filter((row) => {
        // return searchRegex.test(row.userName);
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field]);
      });
    });
    setTableData(filteredRows);
  };


  //delete function
  const handleDelete = (id) => {
    setTableData(tableData.filter((data) => data._id !== id));
    console.log(id);
    setOpenDlt(true);
  };


  const handleSuspend = (id) => {
    console.log("Status "+" "+id);

    axios.put("https://govi-piyasa-v-0-1.herokuapp.com/api/v1/auths/setUserVisibility/"+id, 
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


  const handleUnblock = (id) => {
    console.log("Status "+id);
    axios.put("https://govi-piyasa-v-0-1.herokuapp.com/api/v1/auths/setUserVisibility/"+id, 
              {status: "Unblock"},
              { headers : 
                {'Authorization' : `Bearer ${user_token}`}
              })
    .then(() => {
      getAllData();
      setOpenUnblk(true);
    })
  }
  

  const onMouseEnterRow = (event) => {
    const id = event.currentTarget.getAttribute("data-id");
    setHoveredRow(id);
  };

  const onMouseLeaveRow = (event) => {
    setHoveredRow(null);
  };


  const getAllData = async () => {
    try {
      const data = await axios.get("https://govi-piyasa-v-0-1.herokuapp.com/api/v1/auths/getUsers")
      console.log(data);
      setPlatform(data.data.data);
      setTableData(data.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getExperts = async () => {
    const experts = await axios.get("https://govi-piyasa-v-0-1.herokuapp.com/api/v1/auths/getOwners/expert");
    setTableData(experts.data.data);
  }
  const getArchitects = async () => {
    const architects = await axios.get("https://govi-piyasa-v-0-1.herokuapp.com/api/v1/auths/getOwners/architect");
    setTableData(architects.data.data);
  }
  const getSellers = async () => {
    const sellers = await axios.get("https://govi-piyasa-v-0-1.herokuapp.com/api/v1/auths/getOwners/seller");
    setTableData(sellers.data.data);
  }

  useEffect(()=>{

    if(category === "Expert") getExperts(); 
    else if(category === "Architect") getArchitects(); 
    else if(category === "Seller") getSellers(); 
    else getAllData(); 
  },[category])


  
  const columns = [
    { field: 'profilePicture', headerName: 'Image', width: 70,
      renderCell: (params) => { 
        return(
          <Avatar sx={{width:35, height:35}} 
          src={params.getValue(params.id,'profilePicture')}
          />
        );
      }
    },
    { field: 'userName', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 230},
    { field: 'city', headerName: 'City', width: 150 },
    { field: 'contactNumber', headerName: 'Contact No', width: 150 },

    { field: 'userVisibility', headerName: 'Status', width: 100, sortable: false,
      renderCell: (params) => { 
        return(
          params.getValue(params.id,'userVisibility') ==="Active" ?   <Badge pill bg="primary">Active</Badge> : 
          (params.getValue(params.id,'userVisibility')==="Suspend" ? <Badge pill bg="warning" text="dark">Suspend</Badge> :
                                                                    <Badge pill bg="danger">Not Active</Badge>)
        );
      }
    },
    { field: 'shopId', headerName: 'Shop', width: 50, sortable: false,
      renderCell: (params) => {
          return (
            <Box sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
              <Link to="/shop">
              <IconButton>
                {(params.getValue(params.id,'shopId') !== undefined || params.getValue(params.id,'shopId') !== null)
                ? <StoreIcon color="success"/> : <HorizontalRuleIcon color="warning"/>}
              </IconButton>
              </Link>
            </Box>
            
          );
      }
  },
  { field: 'architectId', headerName: 'Architect', width: 50, sortable: false,
    renderCell: (params) => {
        return (
          <Box sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Link to="/architect">
            <IconButton>
              {(params.getValue(params.id,'architectId') === undefined || params.getValue(params.id,'architectId') === null)
              ? <HorizontalRuleIcon color="warning"/> : <AccountBoxIcon color="success"/> }
            </IconButton>
            </Link>
          </Box>
          
        );
    }
  },
  { field: 'expertId', headerName: 'Expert', width: 50, sortable: false,
      renderCell: (params) => {
        return (
          <Box sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Link to="/expert">
            <IconButton>
              {(params.getValue(params.id,'expertId') === undefined || params.getValue(params.id,'expertId') === null)
              ? <HorizontalRuleIcon color="warning"/> : <AdminPanelSettingsIcon color="success"/>  }
            </IconButton>
            </Link>
          </Box>
          
        );
    }
  },


    { field: "actions", headerName: "Actions", width: 100, sortable: false, disableColumnMenu: true,
      renderCell: (params) => {
        if (hoveredRow === params.id) {
          return (
            <Box
              sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
            >
              <Tooltip title={params.getValue(params.id,'userVisibility') === "Active" ? "Block" : "Unblock"}  arrow>
                <IconButton onClick={() => params.getValue(params.id,'userVisibility') === "Active" ? handleSuspend(params.id) : handleUnblock(params.id)}>
                  {params.getValue(params.id,'userVisibility') === "Active" ? <BlockIcon color="warning" /> : <RemoveCircleOutlineIcon color="secondary"/>}
                </IconButton>
              </Tooltip>

              <IconButton onClick={() => { handleDelete(params.id); }}>
                <DeleteIcon color="error"/>
              </IconButton>
            </Box> 
          );
        } else return null;
      }
    }
    
  ]



  return (
    <div className="content">
      <h3>User list</h3>

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

        <FormControl sx={{width : "150px", float: "right", marginRight: "20px" }} size="small">
          <InputLabel id="demo-simple-select-label">User Type</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select"
            label="category" onChange={(event) => setCategory(event.target.value)}
          >
             <MenuItem value={"All"}>All</MenuItem>
            <MenuItem value={"Expert"}>Expert</MenuItem>
            <MenuItem value={"Architect"}>Architect</MenuItem>
            <MenuItem value={"Seller"}>Seller</MenuItem>
          </Select>
        </FormControl>
      </Box>
    
      
      <div style={{ height: 500, width: "100%", padding: "1em" }}>
        <DataGrid
          rows={tableData}
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
          initialState={{ pinnedColumns: { right: ['actions'] } }}
          componentsProps={{
            row: {
              onMouseEnter: onMouseEnterRow,
              onMouseLeave: onMouseLeaveRow
            }
          }} 
        
        />
   
      </div>
      <AlertMsg open={openDlt} msg="Deleted successfully" status="error" handleClose={handleCloseDlt}/>
      <AlertMsg open={openBlk} msg="User Blocked" status="warning" handleClose={handleCloseBlk}/>
      <AlertMsg open={openUnblk} msg="User Unblocked" status="info" handleClose={handleCloseUnblk}/>
    </div>
  );
};

export default User;
