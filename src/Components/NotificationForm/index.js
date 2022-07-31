import { Button, Form, Modal, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

const NotificationForm = (props) => {

  const user_token = window.localStorage.getItem("token");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [datetime, setDatetime] = useState("2022-03-23");

  const createNotification = async () => {
    try{
      const data = await axios.post("https://govi-piyasa-v-0-1.herokuapp.com/api/v1/notifications", 
        { Title: title, 
          Description : description, 
          DateAndTime : datetime
        },
        { headers : 
          {'Authorization' : `Bearer ${user_token}`}
        }
      );
      
    }catch{

    }
  }


  return (
    <div>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Form.Group controlId="formTitle">
                <Form.Label column="sm">Title</Form.Label>
                <Form.Control
                  className="m-2 w-75" type="text" size="sm"
                  placeholder="Enter message title"
                  value={title} onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
            </Row>

            <Row>
              <Form.Group controlId="formMsg">
                <Form.Label column="sm">Message</Form.Label>
                <Form.Control
                  className="m-2 w-75" as="textarea" size="sm"
                  placeholder="Your message here"
                  value={description} onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
            </Row>

            <Button className="m-3" variant="success" onClick={createNotification}> Submit </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NotificationForm;
