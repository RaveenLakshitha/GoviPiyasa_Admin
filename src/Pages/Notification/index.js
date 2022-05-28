import { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import "../../App.css";
import NotificationForm from "../../Components/NotificationForm";
const Notification = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="App1">
      <h2 className="text-center">Notifications</h2>
      <div className="row m-4">
        <div className="col-10">
          <input type="text" placeholder="Search..." />
        </div>
        <div className="col-2">
          <Button variant="success" size="sm" onClick={handleShow}>
            Add Notification
          </Button>
          <NotificationForm show={show} handleClose={handleClose} />
        </div>
      </div>

      <div>
        <Row>
          <Col>
            <h4>Uploaded notifications</h4>
            <Card className="m-4 w-75">
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
            <Card className="m-4 w-75">
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
        </Row>
      </div>
    </div>
  );
};

export default Notification;
