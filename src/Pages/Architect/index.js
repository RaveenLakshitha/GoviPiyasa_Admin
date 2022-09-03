import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { IconButton, Rating} from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { Badge } from "react-bootstrap";
import Preview from "./preview";
import "../../App.css";
import BlockIcon from '@mui/icons-material/Block';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Tooltip from '@mui/material/Tooltip';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import AlertMsg from "../../Components/Alert";
import ChooseOption from "../../Components/DialogBox";

const Architect = () => {

  const user_token = window.localStorage.getItem("token");

  //const [search, setSearch] = useState("");
  const [tableData, setTableData] = useState([]);
  const [show, setShow] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [platform, setPlatform] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [openDlt, setOpenDlt] = useState(false);
  const [openBlk, setOpenBlk] = useState(false);
  const [openUnblk, setOpenUnblk] = useState(false);
  const [openAprv, setOpenAprv] = useState(false);
  const [openRjct, setOpenRjct] = useState(false);
  const [openDlg, setOpenDlg] = useState(false);
  const [aproveId, setAproveID] = useState("");


  //architect preview
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);


   //alert window close
   const handleCloseDlt = () => setOpenDlt(false);
   const handleCloseBlk = () => setOpenBlk(false);
   const handleCloseUnblk = () => setOpenUnblk(false);
   const handleCloseAprv = () => setOpenAprv(false);
   const handleCloseRjct = () => setOpenRjct(false);
   const handleCloseDlg = () => setOpenDlg(false);



  //delete an architect
  const handleDelete = (id) => {
    try{
      axios.delete("https://govi-piyasa-v-0-1.herokuapp.com/api/v1/architects/delete/"+id,
                    { headers :  {'Authorization' : `Bearer ${user_token}`} } )
      .then(() => {
        setTableData(tableData.filter((data) => data._id !== id));
        setOpenDlt(true);
        console.log(id);
      })   
    }
    catch{

    }
  };


  //invoke the architect preview
  const handleView = async (id) => {
    try {
      handleShow();
    } catch (e) {
      console.log(e);
    }
  };


//block a shop
const handleSuspend = (id) => {
  axios.put("https://govi-piyasa-v-0-1.herokuapp.com/api/v1/architects/setArchitectStatus/"+id, 
            {status: "Block"},
            { headers : 
              {'Authorization' : `Bearer ${user_token}`}
            })
  .then(() => {
    getData();
    setOpenBlk(true);
  })
}


//unblock the shop
const handleUnblock = (id) => {
  axios.put("https://govi-piyasa-v-0-1.herokuapp.com/api/v1/architects/setArchitectStatus/"+id, 
            {status: "Unblock"},
            { headers : 
              {'Authorization' : `Bearer ${user_token}`}
            })
  .then(() => {
    getData();
    setOpenUnblk(true);
  })
}


//approve the shop
const handleApproveOpen = (id) => {
  setAproveID(id);
  setOpenDlg(true);
}
const handleApprove = (value) => {
  console.log("Approve func "+value);
  setOpenDlg(false);
  axios.put("https://govi-piyasa-v-0-1.herokuapp.com/api/v1/architects/setArchitectStatus/"+aproveId, 
            {status: value},
            { headers : 
              {'Authorization' : `Bearer ${user_token}`}
            })
  .then(() => {
    getData();
    if(value === "Approve") setOpenAprv(true);
    else setOpenRjct(true);
  })
}


//show the action buttons on the selected row
const onMouseEnterRow = (event) => {
  const id = event.currentTarget.getAttribute("data-id");
  setHoveredRow(id);
};
const onMouseLeaveRow = (event) => {
  setHoveredRow(null);
};


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

  
  //get all garden designers
  const getData = async () => {
    try {
      const data = await axios.get(
        "https://govi-piyasa-v-0-1.herokuapp.com/api/v1/architects",
        { headers : 
          {'Authorization' : `Bearer ${user_token}`}
        }
      );
      setTableData(data.data.data);
    } catch (e) {
      console.log(e);
    }
  };



  useEffect(() => {
    getData();
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
        params.getValue(params.id,'architectVisibility') ==="Active" ?   <Badge bg="success">Active</Badge> : 
        (params.getValue(params.id,'architectVisibility')==="Inactive" ? <Badge bg="danger">Not Active</Badge> :
        (params.getValue(params.id,'architectVisibility')==="Pending" ? <Badge bg="primary">Pending</Badge> :
        (params.getValue(params.id,'architectVisibility')==="Suspend" ? <Badge bg="warning" text="dark">Suspend</Badge> : 
                                                                        <Badge bg="secondary">Rejected</Badge>)))
      );
    }
  },
  { field: "actions", headerName: "Actions", width: 120, sortable: false, disableColumnMenu: true,
  renderCell: (params) => {
    if (hoveredRow === params.id) {
      return (
        <Box
          sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <Tooltip title={params.getValue(params.id,'architectVisibility') === "Active" ? "Block" : 
                        ((params.getValue(params.id,'architectVisibility')) === "Pending" ? "Approve" : "Unblock")}  arrow>

            <IconButton onClick={() => params.getValue(params.id,'architectVisibility') === "Active" ? handleSuspend(params.id, params.getValue(params.id,'architectVisibility')) : 
                                      (params.getValue(params.id,'architectVisibility') === "Pending" ? handleApproveOpen(params.id) : 
                                                                                                        handleUnblock(params.id))}>

              {params.getValue(params.id,'architectVisibility') === "Active" ? <BlockIcon color="warning" /> : 
              (params.getValue(params.id,'architectVisibility') === "Pending" ? <PendingActionsIcon color="warning" /> : 
              (params.getValue(params.id,'architectVisibility') === "Suspend" ? <RemoveCircleOutlineIcon color="secondary"/> : 
                                                                                <UnpublishedIcon color="danger"/>))}
            </IconButton>
          </Tooltip>

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
  ];

  

  return (
    <div className="content">
      <h3>Architect list</h3>
      
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
              onMouseLeave: onMouseLeaveRow,
            },
          }}
        ></DataGrid>
      </div>

      <ChooseOption open={openDlg} title="Garden Designer Approval" handleClose={handleCloseDlg} handleApproveShop={handleApprove}/>

      <AlertMsg open={openDlt} msg="Deleted successfully" status="error" handleClose={handleCloseDlt}/>
      <AlertMsg open={openBlk} msg="Architect Blocked" status="warning" handleClose={handleCloseBlk}/>
      <AlertMsg open={openUnblk} msg="Architect Unblocked" status="info" handleClose={handleCloseUnblk}/>
      <AlertMsg open={openAprv} msg="Architect Accepted" status="success" handleClose={handleCloseAprv}/>
      <AlertMsg open={openRjct} msg="Architect Rejected" status="error" handleClose={handleCloseRjct}/>
    </div>
  );
};

export default Architect;
