import axios from "axios";
import { useEffect, useState } from "react";
import "../../App.css";
import AlertMsg from "../../Components/Alert";
import { Badge } from "react-bootstrap";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from '@mui/icons-material/Block';
import StoreIcon from '@mui/icons-material/Store';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Tooltip from '@mui/material/Tooltip';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AccountBoxIcon from '@mui/icons-material/AccountBox';


const User = () => {
  //const [show, setShow] = useState(false);
  const [openDlt, setOpenDlt] = useState(false);
  const [openBlk, setOpenBlk] = useState(false);
  const [openUnblk, setOpenUnblk] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [hoveredRow, setHoveredRow] = useState(null);

  const user_token = window.localStorage.getItem("token");

  const handleCloseDlt = () => setOpenDlt(false);
  const handleCloseBlk = () => setOpenBlk(false);
  const handleCloseUnblk = () => setOpenUnblk(false);


  const handleDelete = (id) => {
    setTableData(tableData.filter((data) => data._id !== id));
    console.log(id);
    setOpenDlt(true);
  };

  const handleShopView = (id) => {
    
  };

  const handleArchitectView = (id) => {
    
  };

  const handleExpertView = (id) => {
    
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
      getProductData();
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
      console.log("updated");
      getProductData();
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
    { field: 'profilePicture', headerName: 'Image' },
    { field: 'userName', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200},
    { field: 'city', headerName: 'City', width: 100 },
    { field: 'contactNumber', headerName: 'Contact No', width: 100 },
    { field: 'noOfItems', headerName:'Buy items', width: 100},

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
              <IconButton onClick={handleShopView(params.id)}>
                {params.getValue(params.id,'shopId') === null ? <StoreIcon color="success"/> : <HorizontalRuleIcon color="warning"/>}
              </IconButton>
              {/* {console.log(params.getValue(params.id,'shopId'))} */}
            </Box>
            
          );
      }
  },
  { field: 'architectId', headerName: 'Architect', width: 50, sortable: false,
    renderCell: (params) => {
        return (
          <Box sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <IconButton onClick={handleArchitectView(params.id)}>
              {params.getValue(params.id,'architectId') === true ? <AccountBoxIcon color="success"/> : <HorizontalRuleIcon color="warning"/>}
            </IconButton>
            {/* {console.log("Architect "+params.getValue(params.id,'architectId'))} */}
          </Box>
          
        );
    }
  },
  { field: 'expertId', headerName: 'Expert', width: 50, sortable: false,
      renderCell: (params) => {
        return (
          <Box sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <IconButton onClick={handleExpertView(params.id)}>
              {params.getValue(params.id,'expertId') === undefined ? <HorizontalRuleIcon color="warning"/> : <AdminPanelSettingsIcon color="success"/>  }
            </IconButton>
            {/* {console.log("Expert "+params.getValue(params.id,'expertId'))} */}
          </Box>
          
        );
    }
  },


    { field: "actions", headerName: "Actions", width: 100, sortable: false, disableColumnMenu: true,
      renderCell: (params) => {
        if (hoveredRow === params.id) {
          return (
            <Box
              sx={{ backgroundColor: "whitesmoke", width: "100%", height: "100%", display: "flex",
                justifyContent: "center", alignItems: "center"
              }}
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
    <div className="content">
      <h3>User list</h3>

      <input type="text" placeholder="Search here"/>

        {/* // onChange={(e) => {
        //   setSearch(e.target.value);
        // }} */}
    
      
      <div style={{ height: 450, width: "100%", padding: "1em" }}>
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
        
        />
   
      </div>
      <AlertMsg open={openDlt} msg="Deleted successfully" status="error" handleClose={handleCloseDlt}/>
      <AlertMsg open={openBlk} msg="User Blocked" status="warning" handleClose={handleCloseBlk}/>
      <AlertMsg open={openUnblk} msg="User Unblocked" status="info" handleClose={handleCloseUnblk}/>
    </div>
  );
};

export default User;
