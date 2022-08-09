import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { IconButton, Rating} from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import "../../App.css";

const Architect = () => {
  //const [search, setSearch] = useState("");
  const [tableData, setTableData] = useState([]);
  //const [show, setShow] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);

  const handleDelete = (id) => {
    setTableData(tableData.filter((data) => data._id !== id));
    alert("Deleted!");
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
      const data = await axios.get(
        "https://govi-piyasa-v-0-1.herokuapp.com/api/v1/architects"
      );
      setTableData(data.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  const columns = [
    { field: "businessName", headerName: "Architect name", width: 200 },
    // { field: 'description', headerName: 'Description', width: 200 ,
    //   valueGetter: (params) => {
    //     return params.getValue(params.id, "user").userName;
    //   }
    // },
    { field: "contactNumber", headerName: "Contacts", width: 120 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "city", headerName: "City", width: 100 },
    { field: 'rating', headerName: 'Rating', width: 120,
        renderCell: (params) => { 
          return(
            <Rating name="read-only" size="small" value={params.getValue(params.id,'rating')} precision={0.5} readOnly />
          );
        }
    },
    { field: 'architectVisibility', headerName: 'Status', width: 100, value:'Active' ,sortable: false,
    renderCell: (params) => { 
      return(
        params.getValue(params.id,'architectVisibility') ==="Active" ?   <Badge pill bg="success">Active</Badge> : 
        (params.getValue(params.id,'architectVisibility')==="Inactive" ? <Badge pill bg="danger">Not Active</Badge> :
        (params.getValue(params.id,'architectVisibility')==="Pending" ? <Badge pill bg="primary">Pending</Badge> :
        (params.getValue(params.id,'architectVisibility')==="Suspend" ? <Badge pill bg="warning" text="dark">Suspend</Badge> : 
                                                                  <Badge pill bg="secondary">Rejected</Badge>)))
      );
    }
  },
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
                backgroundColor: "whitesmoke",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconButton onClick={() => handleDelete(params.id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          );
        } else return null;
      },
    },
  ];

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
      <h3>Architect list</h3>
      <input
        type="text"
        placeholder="Search here"
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
              onMouseLeave: onMouseLeaveRow,
            },
          }}
        ></DataGrid>
      </div>
    </div>
  );
};

export default Architect;
