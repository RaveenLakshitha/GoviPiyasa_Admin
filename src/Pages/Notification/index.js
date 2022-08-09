import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card } from "react-bootstrap";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AlertMsg from "../../Components/Alert";
import "../../App.css";
import NotificationForm from "../../Components/NotificationForm";

import { Link } from "react-router-dom";



const Notification = () => {


  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState([]);
  const [sentNotifi, setSentNotifi] = useState([]);
  const [myNotifi, setMyNotifi] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const handleCloseAlert = () => setOpen(false);

  const user_token = window.localStorage.getItem("token");

  

  useEffect(()=>{
    
    const getUploadedData = async () => {
      try{
        const data = await axios.get("https://govi-piyasa-v-0-1.herokuapp.com/api/v1/notifications/getNotificationsCreatedByUser",
                                      { headers :  {'Authorization' : `Bearer ${user_token}`} });
        setMyNotifi(data.data.data);
      }catch (e) {
        console.log(e);
      }
    }

    const getSentData = async () => {
      try {
        const data = await axios.get("https://govi-piyasa-v-0-1.herokuapp.com/api/v1/notifications/getNotificationsSendByUser",
        { headers : 
          {'Authorization' : `Bearer ${user_token}`}
        });
        setSentNotifi(data.data.data);
      } catch (e) {
        console.log(e);
      }
    };

    const getData = async () => {
      try {
        const data = await axios.get("https://govi-piyasa-v-0-1.herokuapp.com/api/v1/notifications/getUsersNotifications",
        { headers : 
          {'Authorization' : `Bearer ${user_token}`}
        });
        setNotification(data.data.data);
      } catch (e) {
        console.log(e);
      }
    };

    getData();
    getUploadedData();
    getSentData();
    
  },[sentNotifi,myNotifi])


  const sendNotification = (id) => {
    console.log("inside function");
    const res = axios.put("https://govi-piyasa-v-0-1.herokuapp.com/api/v1/notifications/sendNotificationAll/"+id,
                                { headers : {'Authorization' : `Bearer ${user_token}`}} );
    console.log("Response");
    setOpen(true);
  }



  return (
    <div className="content">
      <h3 className="text-center">Notifications</h3>
      <div className="row">
        <div className="col-10">
          <input type="text" placeholder="Search..." />
        </div>
        <div className="col-2">
          <Button variant="success" size="sm" onClick={handleShow}> Add Notification </Button>
          <NotificationForm show={show} handleClose={handleClose} />
        </div>
      </div>

      <div className="mt-5">

        <Tabs defaultActiveKey="receive" id="fill-tab-example" className="mb-3" fill style={{ backgroundColor: "#D4F6CC"}}>
        <Tab eventKey="receive" title="Received">

        {notification.map((notify) => { 

           return( 
            <Card className="m-2 w-100">
              <Card.Body>
                <Card.Title>{notify.Title}</Card.Title>
                <Card.Text style={{fontWeight : 'lighter'}}> {notify.Description} </Card.Text>

                {notify.Title === "Shop creating Request" 
                  ? <Link to="/shop">
                  <Button size="sm" variant="primary" color="white" float-end> View Shop </Button> </Link>
                  : <Link to="/advertisement">
                  <Button size="sm" variant="primary" color="white" float-end> View Ad </Button></Link>
                }
                <Button size="sm" variant="secondary" color="white" className="m-2" > Discard </Button>
              </Card.Body>
            </Card>

         )})}
        </Tab>

        <Tab eventKey="upload" title="Uploaded">

        {myNotifi.map((myNotify) => { 
          if(myNotify.status === "NotSent"){

          return( 
          <Card className="m-2 w-100">
            <Card.Body>
              <Card.Title>{myNotify.Title} {myNotify._id}</Card.Title>
              <Card.Text style={{fontWeight : 'lighter'}}> {myNotify.Description} </Card.Text>
              <Button size="sm" variant="primary" color="white" float-end onClick={()=>sendNotification(myNotify._id)}> Publish </Button>
              <Button size="sm" variant="secondary" color="white" className="m-2" > Discard </Button>
            </Card.Body>
          </Card>

          )}})}
          
        </Tab>

        <Tab eventKey="sent" title="Sent">

        {myNotifi.map((myNotify) => {
          if(myNotify.status === "Sent"){ 

          return( 
          <Card className="m-2 w-100">
            <Card.Body>
              <Card.Title>{myNotify.Title}</Card.Title>
              <Card.Text style={{fontWeight : 'lighter'}}> {myNotify.Description} </Card.Text>
            </Card.Body>
          </Card>

          )}})}
          
        </Tab>
      </Tabs>
      </div>
      <AlertMsg open={open} msg="Notification uploaded" status="success" handleClose={handleCloseAlert}/>
    </div>
  );
};

export default Notification;
