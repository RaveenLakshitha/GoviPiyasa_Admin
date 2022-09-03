import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Rating} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Badge } from 'react-bootstrap';



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Preview(props) {


  const user_token = window.localStorage.getItem("token");

  const [tableData, setTableData] = useState([]);
  const [shopData, setShopData] = useState([]);
  const [userData, setUserData] = useState([]);
  const id = props.id;


  useEffect(()=>{
    const getData = async () => {
      try {
        console.log(id);

        const data = await axios.get("https://govi-piyasa-v-0-1.herokuapp.com/api/v1/shops/"+id,
                                      { headers :  {'Authorization' : `Bearer ${user_token}`} } 
                                      );
        setShopData(data.data.data);
        setUserData(data.data.data.user);
        setTableData(data.data.data.shopItems);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  },[id])



  const columns = [
    { field: 'productName', headerName: 'Item', width:220 },
    { field: 'categoryName', headerName: 'Category', width:150 },
    { field: 'price', headerName: 'Price', width: 130 },
    { field: 'quantity', headerName: 'Qty', width: 150 },
    { field: 'description', headerName: 'Description', width: 300 },
    { field: 'rating', headerName: 'Rating', width: 120,
        renderCell: (params) => { 
          return(
            <Rating name="read-only" size="small" value={params.getValue(params.id,'rating')} precision={0.5} readOnly />
          );
        }
    },
    { field: 'avilability', headerName: 'Status', width: 100,
      renderCell: (params) => { 
        return(
            (params.getValue(params.id,'avilability') ==="Available") ? <Badge bg="primary">Available</Badge> : 
                                                                        <Badge bg="danger">Not Available</Badge>)
      }
    },
  ]


  return (
    <div>

      <Dialog
        fullScreen
        open={props.show}
        onClose={props.handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative', backgroundColor: 'green' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit"
              onClick={props.handleClose} aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div"> Expert details </Typography>
            <Button autoFocus color="inherit" onClick={props.handleClose}> Done </Button>
          </Toolbar>
        </AppBar>


        <List>
          <ListItem button>
            <ListItemText primary="Shop name" secondary={shopData.shopName} />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="User name" secondary={userData.userName} />
          </ListItem>
          <Divider />
        </List>

        <div style={{margin: '30px'}}>
        <DataGrid
            autoHeight
            rows={tableData}
            columns={columns}
            getRowId={(row) => row._id}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
          />
          </div>
      </Dialog>
    </div>
  );
}