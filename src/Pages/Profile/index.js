<<<<<<< HEAD
const Profile = () => {
  return (
    <div>
      My Profile- my photo and important facts and notes
    </div>
  );
}
 
export default Profile;
=======
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
const Profile = () => {
  const [profileName, setProfileName] = useState("");
  const [profileCell, setProfileCell] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [profileEmail, setProfileEmail] = useState("");

  const profileData = async () => {
    try {
      const token = window.localStorage.getItem("myData");
      const res = await axios.get(
        "https://govi-piyasa-v-0-1.herokuapp.com/api/v1/auths/getLoggedUser",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res);
      setProfileCell(res.data.data.userName);
      setProfileEmail(res.data.data.email);
      //setProfileImage(res.data.results[0].picture.large);
      setProfileName(`${res.data.data.userName} ${res.data.data.userName}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    profileData();
  }, []);

  return (
    <React.Fragment>
      <Container sx={{ maxWidth: "sm", m: "auto", p: "1rem" }}>
        {" "}
        <Box
          sx={{
            m: "auto",
            width: 500,
            height: 500,
            color: "text.secondary",
            border: 1,
            p: "1rem",
            boxShadow: 2,
          }}
        >
          <div className="container">
            <div className="card">
              <img
                src={profileImage}
                alt="test"
                style={{ width: "100%", height: "90%" }}
              />
              <h1>{profileName}</h1>
              <p className="title">{profileEmail}</p>
              <p>{profileCell}</p>
            </div>
          </div>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default Profile;
>>>>>>> 137ea511d1b3790ef59b84eca2e9ab831d5bc0a8
