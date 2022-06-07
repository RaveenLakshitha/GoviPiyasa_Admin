import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles.jquery"
import "./index.css";

ReactDOM.render(
  <>
    <App />
  </>,
  document.getElementById("root")
);


//<ConfirmMessage title="Do you want to delete the user?" show={show} handleClose={handleClose}/>