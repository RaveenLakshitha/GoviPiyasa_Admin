import axios from "axios";
import { useEffect, useState } from "react";
import "../../App.css";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { IconButton} from "@mui/material";
import { Box } from "@mui/system";


const Orders = () => {
  //const [search, setSearch] = useState("");
  const [tableData, setTableData] = useState([]);
  const [hoveredRow, setHoveredRow] = useState(null);
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
      const data = await axios.get("https://govi-piyasa-v-0-1.herokuapp.com/api/v1/orders");
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
    { field: 'shopName', headerName: 'Shop' },
    { field: 'userName', headerName: 'Name', width: 100 ,
      valueGetter: (params) => {
        return params.getValue(params.id, "user").userName;
      }
    },
    { field: 'email', headerName: 'Email', width: 200},
    { field: 'shopItems', headerName: 'No of items', width: 100 },
    { field: 'shopReviews', headerName: 'Reviews', width: 100 },
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
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <IconButton onClick={() => console.log(params.id)}>
                <RemoveRedEyeIcon />
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
