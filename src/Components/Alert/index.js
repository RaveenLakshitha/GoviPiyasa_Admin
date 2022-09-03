import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const AlertMsg = (props) => {

  const [open, setOpen] = React.useState(false);


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (

    <Snackbar open={props.open} autoHideDuration={3000} onClose={props.handleClose} anchorOrigin={{ vertical : 'top', horizontal: 'right' }} sx={{marginRight:'10px'}}>
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        {props.msg}
      </Alert>
    </Snackbar>
  
  );
}

export default AlertMsg;
