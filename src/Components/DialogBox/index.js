import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import DialogActions from '@mui/material/DialogActions';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { SettingsOverscanOutlined } from '@material-ui/icons';


const ChooseOption = (props) => {

  const [status, setStatus] = useState("null");
  const [value, setValue] = useState("Approve");
  const [open, setOpen] = useState(props.open);
  console.log(status);

  const handleClose = () => {
    setOpen(false);
  };

  // const handleApproveShop = (status) => {
  //   setValue(status);
  //   props.handleApproveShop(value);
  //   handleClose();
  // }

  return ( 
    <Dialog onClose={props.handleClose} open={props.open}>
    <DialogTitle sx={{backgroundColor: 'green', color:'white'}}>Shop Approval</DialogTitle>
    <List sx={{ pt: 0 }}>
        <ListItem button >
          <DoneIcon color="primary" sx={{marginRight: '10px'}}/>
          <ListItemText primary="Approve" onClick={()=>props.handleApproveShop("Approve")}/>
        </ListItem>
        <ListItem button >
          <ClearIcon color="error" sx={{marginRight: '10px'}}/>
          <ListItemText primary="Reject" onClick={()=>props.handleApproveShop("Decline")}/>
        </ListItem>
    </List>
    <DialogActions>
      <Button size="small" onClick={props.handleClose}>Close</Button>
    </DialogActions>
  </Dialog>
  );
}
 
export default ChooseOption;