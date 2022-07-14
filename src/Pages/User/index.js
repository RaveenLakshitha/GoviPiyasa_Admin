import axios from "axios";
import { useEffect, useState } from "react";
import "../../App.css";
import { Badge } from "react-bootstrap";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from '@mui/icons-material/Block';
import StoreIcon from '@mui/icons-material/Store';
import AccountBoxIcon from '@mui/icons-material/AccountBox';


const User = () => {
  //const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [hoveredRow, setHoveredRow] = useState(null);


  const handleDelete = (id) => {
    setTableData(tableData.filter((data) => data._id !== id));
    console.log(id);
  };

  const handleShopView = (id) => {
    
  };

  const handleArchitectView = (id) => {
    
  };

  const handleExpertView = (id) => {
    
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
    { field: 'profilePicture', headerName: 'Image' },
    { field: 'userName', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200},
    { field: 'city', headerName: 'City', width: 100 },
    { field: 'contactNumber', headerName: 'Contact No', width: 100 },
    { field: 'noOfItems', headerName:'Buy items', width: 100},
    { field: 'status', headerName: 'Status', width: 80,
      renderCell: (params) => { 
        return(
          <Badge pill bg="primary">Active</Badge>
        );
      }
    },
    { field: 'shopId', headerName: 'Shop', width: 50, sortable: false,
      valueGetter: ({ value }) => value !== null,
      renderCell: (params) => {
          return (
            <Box sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
              <IconButton onLoad={handleShopView(params.id)}>
                <StoreIcon color="success"/>
              </IconButton>
            </Box>
          );
      }
  },
  { field: 'architectId', headerName: 'Architect', width: 50, sortable: false,
      renderCell: () => {
        if('architectId' !== null){
          return (
            <Box sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
              <IconButton>
                <AccountBoxIcon color="success" />
              </IconButton>
            </Box>
          );
        }
          
      }
  },
  // { field: 'expertId', headerName: 'Expert', width: 50, sortable: false,
  //     valueGetter: ({ value }) => value !== null,
  //     renderCell: () => {
  //         return (
  //           <Box sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
  //             <IconButton>
  //               <AdminPanelSettingsIcon color="success"/>
  //             </IconButton>
  //           </Box>
  //         );
  //     }
  // },


    // { field: 'other', headerName: 'Other', width: 160, sortable: false,
    //   renderCell: (params) => {
    //     if(params.shopId !== null){
    //       return (
    //         <Box sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
    //           <IconButton>
    //             <StoreIcon color="success"/>
    //           </IconButton>
    //         </Box>
    //       );
    //     }
    //     if(params.architectId !== null){
    //       return (
    //         <Box sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
    //           <IconButton>
    //             <AdminPanelSettingsIcon color="success"/>
    //           </IconButton>
    //         </Box>
    //       );
    //     }
        // if(params.expertId !== null){
        //   return (
        //     <Box sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
        //       <IconButton>
        //         <AccountBoxIcon color="success" />
        //       </IconButton>
        //     </Box>
        //   );
        // }
     // }},

    { field: "actions", headerName: "Actions", width: 80, sortable: false, disableColumnMenu: true,
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
              <IconButton onClick={() => {
                  setOpen(true);
                  handleDelete(params.id);
              }}>
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
    
        {/* <Box sx={{ width: '100%',display: 'inline-flex', flexDirection: 'row-reverse'}}>
        <Collapse in={open} >
          <NotifyMsg msg="Deleted successfully!" color="error" setOpen={open}/>
         // <Alert
        //   action={
        //     <IconButton aria-label="close" color="error" size="small"
        //       onClick={() => {
        //         setOpen(false);
        //       }}
        //     ><CloseIcon fontSize="inherit" />
        //     </IconButton>
        //   }
        //   color="error"
        // > Deleted successfully! </Alert> 
        </Collapse>
      </Box> */}
      
      
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
        
        />
   
      </div>
    </div>
  );
};

export default User;
