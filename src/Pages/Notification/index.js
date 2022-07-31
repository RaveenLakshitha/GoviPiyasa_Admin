import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, Col, Row } from "react-bootstrap";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import "../../App.css";
import NotificationForm from "../../Components/NotificationForm";


const Notification = () => {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState([]);
  const [myNotifi, setMyNotifi] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  }

  const user_token = window.localStorage.getItem("token");

  const getMyData = async () => {
    try{
      const data = await axios.get("https://govi-piyasa-v-0-1.herokuapp.com/api/v1/notifications");
      setMyNotifi(data.data.data);
    }catch (e) {
      console.log(e);
    }
  }

  const getData = async () => {
    try {
      const data = await axios.get("https://govi-piyasa-v-0-1.herokuapp.com/api/v1/notifications/getUsersNotifications",
      { headers : 
        {'Authorization' : `Bearer ${user_token}`}
      }
      );
      setNotification(data.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(()=>{
    getData();
    getMyData();
  },[])




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

        <Tabs defaultActiveKey="profile" id="fill-tab-example" className="mb-3" fill style={{ borderTopLeftRadius: "20px", borderTopRightRadius: "20px", backgroundColor: "#D4F6CC"}}>
        <Tab eventKey="home" title="Received">

        {notification.map((notify) => { 

           return( 
            <Card className="m-2 w-100">
              <Card.Body>
                <Card.Title>{notify.Title}</Card.Title>
                <Card.Text style={{fontWeight : 'lighter'}}> {notify.Description} </Card.Text>
                <Button size="sm" variant="primary" color="white" float-end> Accept </Button>
                <Button size="sm" variant="secondary" color="white" className="m-2" > Discard </Button>
              </Card.Body>
            </Card>

         )})} 
        </Tab>

        <Tab eventKey="profile" title="Uploaded">

        {myNotifi.map((myNotify) => { 

          return( 
          <Card className="m-2 w-100">
            <Card.Body>
              <Card.Title>{myNotify.Title}</Card.Title>
              <Card.Text style={{fontWeight : 'lighter'}}> {myNotify.Description} </Card.Text>
              <Button size="sm" variant="primary" color="white" float-end> Accept </Button>
              <Button size="sm" variant="secondary" color="white" className="m-2" > Discard </Button>
            </Card.Body>
          </Card>

          )})} 
          
        </Tab>
      </Tabs>

        {/* <Row>
          <Col>
            <h4>Uploaded notifications</h4>
            <br></br>
            <Card className="m-2 w-100">
              <Card.Body>
                <Card.Title>New Update</Card.Title>
                <Card.Text>
                  With supporting text below as a natural lead-in to additional
                  content.
                </Card.Text>
                <Button size="sm" variant="secondary" color="white" float-end>
                  Publish
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  color="white"
                  className="m-2"
                >
                  Discard
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <h4>Received notifications</h4>
            <br></br>
            <Card className="m-2 w-100">
              <Card.Body>
                <Card.Title>New Update</Card.Title>
                <Card.Text>
                  With supporting text below as a natural lead-in to additional
                  content.
                </Card.Text>
                <Button size="sm" variant="secondary" color="white" float-end>
                  Publish
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  color="white"
                  className="m-2"
                >
                  Discard
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row> */}
      </div>
    </div>
  );
};

export default Notification;
