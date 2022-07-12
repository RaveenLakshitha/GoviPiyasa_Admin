import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import "./styles.css";
import axios from "axios";
import { useState } from 'react';



const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
      event.preventDefault();
      console.log("Ok");
      axios
        .post("https://govi-piyasa-v-0-1.herokuapp.com/api/v1/auths/register", {
          name: name,
          password: password,
          email: email,
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);
          localStorage.setItem("myData", res.data.token);
          alert("inserted");
        });
  }



  return ( 
    <div className='spacestyle'>
      <form onSubmit={(e) => handleSubmit(e)}>
      <br></br>
      <h4>Register New Admin</h4>
      <br></br>

      <Box component="form"
       sx={{ '& > :not(style)': { m: 2, width: '40ch' }, }} noValidate autoComplete="off"
      >
        <TextField id="outlined-basic" label="Name" variant="outlined" size="small"
          value={name} onChange={(e) => setName(e.target.value)}/>

        <TextField id="outlined-basic" label="Email" variant="outlined" size="small" required
         value={email} onChange={(e) => setEmail(e.target.value)}/>

        <TextField id="outlined-basic" label="Password" variant="outlined" size="small" required 
         helperText="Must be 8 characters long" value={password} onChange={(e) => setPassword(e.target.value)}/>

    </Box>  
      <br></br>
      <Stack spacing={2} direction="row" justifyContent="center" >
        <Button variant="contained" color="success" style={{minWidth:'150px'}} type="submit"> Submit </Button>
        <Button variant="outlined" color="success" style={{minWidth:'130px'}} type="cancel"> Cancel </Button>
      </Stack> 
      </form>
    </div>
   );
}
 
export default Register;