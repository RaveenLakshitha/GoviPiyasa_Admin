import { ButtonGroup, Button } from "@mui/material";
import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../logo.png";
import "./styles.css";


const Header = () => {
  const navigate = useNavigate();
  const signOutClick = async (event) => {
    event.preventDefault();

    try {
      const data = await axios.post( "http://localhost:3000/api/v1/auths/signoutUser" );
      console.log(data.data.token);
      localStorage.removeItem("token");
      console.log(window.localStorage.getItem("token"));
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };

  ////////////////////////////////////////

  ////////////////////////////////////////
  return (
    <div className="header">
      <div className="homeLogo">
        <Link to="/" className="link">
          <div>
            <div className="image">
              <img src={logo} height="50" alt="" />
            </div>
          </div>
        </Link>
      </div>
      <div style={{margin: "10px"}}>
        {/*  <NotificationsNoneIcon
            className="float-start m-3"
            onClick={() => {
              window.location.pathname = "/notification";
            }}
          /> */}
        {/* <div className="barButtons">
          <Link to="/login" className="link">
            <li className="sideBarList">
              <div id="title">Log in</div>
            </li>
          </Link>
          <button className="float-start m-3" onClick={signOutClick}>
            Sign Out
          </button>
          <Link to="/about" className="link">
            <li className="sideBarList">
              <div id="title">About</div>
            </li>
          </Link>
        </div> */}

        <ButtonGroup size="small" variant="contained" aria-label="outlined success button group" style={{padding:"5px"}}>
            <Button onClick={signOutClick}>
                <Link to="/login" style={{color: "white",textDecoration: 'none'}} >Sign out</Link>
            </Button>
            <Button>
                <Link to="/about" style={{color: "white",textDecoration: 'none'}} >About</Link>
            </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default Header;
