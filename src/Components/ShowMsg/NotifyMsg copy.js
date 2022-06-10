import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";

const NotifyMsg = (props) => {

  const [notify, setNotify] = useState(props);

  return (
    <Snackbar
      open={notify.isOpen}
      autoHideDuration={5000}
      anchorOrigin = {{vertical: 'top', horizontal:'right'}}>

      <Alert severity={notify.type}>
          {notify.message}
      </Alert>
      console.log("Worked");
    </Snackbar>
    );
}
 
export default NotifyMsg;