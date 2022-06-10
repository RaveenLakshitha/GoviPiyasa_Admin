import { Alert, Box, Collapse, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";

const NotifyMsg = (props) => {

  const [notify, setNotify] = useState(props);
  const [open, setOpen] = useState(true);

  return (
    
        <Alert
          action={
            <IconButton aria-label="close" color={notify.color} size="small"
              onClick={() => {
                setOpen(false);
              }}
            ><CloseIcon fontSize="inherit" />
            </IconButton>
          }
          color={notify.color}
        > {notify.msg} </Alert>
        
    );
}
 
export default NotifyMsg;