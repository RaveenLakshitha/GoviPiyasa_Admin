import axios from "axios";
import { useEffect, useState } from "react";
import "../../App.css";
import * as React from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { DataGrid } from "@mui/x-data-grid";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Button, IconButton} from "@mui/material";
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from "@mui/system";
import { Badge } from "react-bootstrap";
import Label from '../../Components/Label.js'


const Orders = () => {
  //const [search, setSearch] = useState("");
  const [tableData, setTableData] = useState([]);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [platform, setPlatform] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [text, setText] = useState("Pay");
  //const [show, setShow] = useState(null);

  const onMouseEnterRow = (event) => {
    const id = event.currentTarget.getAttribute("data-id");
    setHoveredRow(id);
  };

  const onMouseLeaveRow = (event) => {
    setHoveredRow(null);
  };


  const getAllData = async () => {
    try {
      const data = await axios.get("https://govi-piyasa-v-0-1.herokuapp.com/api/v1/shoporders");
      setTableData(data.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handlePay = () => {
    setText("Done");
  }

  useEffect(()=>{
    getAllData();
  },[])
  

  //search function
  function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }
  const requestSearch = (searchValue) => {
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    const filteredRows = platform.filter((row) => {
      
        return searchRegex.test(row.userName);
    });
    setTableData(filteredRows);
  };

  
  const columns = [
    { field: '_id', headerName: 'ID', width: 200 },
    { field: 'shopName', headerName: 'Shop' },
    { field: 'userName', headerName: 'Name', width: 100 ,
      valueGetter: (params) => {
        return params.getValue(params.id, "user").userName;
      }
    },
    { field: 'addressType', headerName: 'Address type', width: 110},
    { field: 'shopItems', headerName: 'No of items', width: 100 },
    { field: 'totalPrice', headerName: 'Total price', width: 100},
    { field: 'orderStatus', headerName: 'Status', width: 100 ,sortable: false,
    renderCell: (params) => { 
      return(
        params.getValue(params.id,'orderStatus') ==="Pending" ?   <Badge bg="primary" sx={{fontSize: '12rem'}}>Pending</Badge> : 
                                                                   <Badge bg="success">Completed</Badge>
      );
    }
    },
    { field: 'userToAdminPay', headerName: 'User to admin', width: 120 ,sortable: false,
    renderCell: (params) => { 
      return(
        params.getValue(params.id,'userToAdminPay') === false ?  <Label color="error">Not paid</Label> : 
                                                                <Label color="success">Paid</Label>
      );
    }
    },
    { field: 'adminToShopPay', headerName: 'Admin to shop', width: 120 ,sortable: false,
    renderCell: (params) => { 
      return(
        params.getValue(params.id,'adminToShopPay') === false ?   <Label color="error">Not paid</Label> : 
                                                                   <Label color="success">Paid</Label>
      );
    }
    },
    // <Button variant="outlined" size="small" onClick={handlePay(params.row._id)}>
   
    { field: 'action', headerName: 'Pay', width: 90,
      renderCell: (params) => {
        return(
          params.getValue(params.id,'orderStatus') === "Pending" ? 
            <Button variant="contained" size="small" onClick={handlePay(params.row._id)}> Pay </Button> : 
            <Button color="success" variant="outlined" size="small"> Done </Button>                                                     
        )
      }
    },
    { field: "actions", headerName: "Actions", width: 120, sortable: false, disableColumnMenu: true,
    renderCell: (params) => {
      if (hoveredRow === params.id) {
        return (
          <Box
            sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <IconButton>
              <DeleteIcon color="error" />
            </IconButton>
            <IconButton>
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
      <h3>Order list</h3>
      
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

      <Tabs defaultActiveKey="online" id="fill-tab-example" className="mb-3" fill style={{ backgroundColor: "#D4F6CC"}}>
        <Tab eventKey="online" title="Online">
            
        </Tab>

        <Tab eventKey="pickup" title="Pickups">

        </Tab>

        <Tab eventKey="cashOnDelivery" title="Cash on delivery">

        </Tab>
      </Tabs>
      
     

      <div style={{ height: 500, width: "100%", padding: "1em" }}>
        <DataGrid
          rows={tableData}
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={10}
          rowsPerPageOptions={[10]}
          // checkboxSelection
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

export default Orders;
