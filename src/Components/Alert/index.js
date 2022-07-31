import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


// const Alert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });


const AlertMsg = (props) => {

  const [open, setOpen] = React.useState(false);


  const handleClose = (event, reason) => {
    // if (reason === 'clickaway') {
    //   return;
    // }
    setOpen(false);
  };

  return (

    <Snackbar open={props.open} autoHideDuration={2000} onClose={props.handleClose} anchorOrigin={{ vertical : 'top', horizontal: 'right' }} sx={{marginRight:'20px', marginTop:'60px'}}>
      <Alert onClose={handleClose} severity={props.status} sx={{ width: '100%' }}>
        {props.msg}
      </Alert>
    </Snackbar>
  
  );
}

export default AlertMsg;
